"""Dependency-free Chrome checks; disposable profiles and captures stay in TEMP."""
import base64
import json
import os
from pathlib import Path
import socket
import struct
import subprocess
import sys
import tempfile
import time
from urllib.parse import urlsplit
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
CHROME = Path(os.environ.get('PROGRAMFILES', 'C:/Program Files')) / 'Google/Chrome/Application/chrome.exe'


class CDP:
    def __init__(self, url):
        parsed = urlsplit(url)
        self.socket = socket.create_connection((parsed.hostname, parsed.port), timeout=15)
        key = base64.b64encode(os.urandom(16)).decode()
        self.socket.sendall((f'GET {parsed.path} HTTP/1.1\r\nHost: {parsed.netloc}\r\n'
                             f'Upgrade: websocket\r\nConnection: Upgrade\r\n'
                             f'Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n').encode())
        header = b''
        while not header.endswith(b'\r\n\r\n'):
            header += self.read(1)
        if b' 101 ' not in header.split(b'\r\n')[0]:
            raise RuntimeError('Chrome debugging handshake failed')
        self.identifier = 0
        self.exceptions = []

    def read(self, size):
        data = b''
        while len(data) < size:
            part = self.socket.recv(size - len(data))
            if not part:
                raise RuntimeError('Chrome debugging connection closed')
            data += part
        return data

    def send(self, method, params=None):
        self.identifier += 1
        data = json.dumps(dict(id=self.identifier, method=method, params=params or {})).encode()
        length = len(data)
        header = bytes([0x81, 0x80 | length]) if length < 126 else (
            bytes([0x81, 0xFE]) + struct.pack('!H', length) if length < 65536 else
            bytes([0x81, 0xFF]) + struct.pack('!Q', length))
        mask = os.urandom(4)
        self.socket.sendall(header + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(data)))
        while True:
            first, second = self.read(2)
            size = second & 127
            if size == 126:
                size = struct.unpack('!H', self.read(2))[0]
            elif size == 127:
                size = struct.unpack('!Q', self.read(8))[0]
            if second & 128:
                raise RuntimeError('Unexpected masked server frame')
            payload = self.read(size)
            if first & 15 == 8:
                raise RuntimeError('Chrome closed debugging connection')
            if first & 15 != 1:
                continue
            message = json.loads(payload)
            if message.get('method') == 'Runtime.exceptionThrown':
                self.exceptions.append(message['params']['exceptionDetails'].get('text', 'Runtime exception'))
            if message.get('id') == self.identifier:
                if 'error' in message:
                    raise RuntimeError('Chrome command failed: ' + method)
                return message.get('result', {})

    def evaluate(self, expression):
        result = self.send('Runtime.evaluate', dict(expression=expression, awaitPromise=True, returnByValue=True))
        if result.get('exceptionDetails'):
            raise RuntimeError('Browser assertion expression failed')
        return result['result'].get('value')


def main():
    live = '--live' in sys.argv
    output = Path(tempfile.mkdtemp(prefix='startweb7-package-qa-'))
    profile = output / 'profile'
    cdp = None
    with (output / 'chrome-stderr.txt').open('w') as errors:
        chrome = subprocess.Popen([str(CHROME), '--headless=new', '--disable-gpu', '--no-first-run',
                                   '--no-default-browser-check', '--remote-debugging-port=0',
                                   '--user-data-dir=' + str(profile), 'about:blank'],
                                  stdout=subprocess.DEVNULL, stderr=errors)
        try:
            port_file = profile / 'DevToolsActivePort'
            for _ in range(150):
                if port_file.is_file():
                    break
                if chrome.poll() is not None:
                    raise RuntimeError('Chrome exited before debugging became available')
                time.sleep(.1)
            if not port_file.is_file():
                raise RuntimeError('Chrome debugging startup timed out')
            port = port_file.read_text().splitlines()[0]
            with urlopen(f'http://127.0.0.1:{port}/json', timeout=10) as response:
                targets = json.load(response)
            cdp = CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type'] == 'page'))
            cdp.send('Page.enable')
            cdp.send('Runtime.enable')
            cdp.send('Network.enable')
            cdp.send('Network.setBlockedURLs', {'urls': ['*googletagmanager.com/*', '*google-analytics.com/*', '*clarity.ms/*'] if live else ['http://*', 'https://*']})
            checks = []
            for width, height in [(1440, 1000), (768, 1000), (390, 844)]:
                for page in ['pricing.html', 'essentials.html', 'competitive.html', 'dominance.html']:
                    cdp.exceptions.clear()
                    cdp.send('Emulation.setDeviceMetricsOverride', dict(width=width, height=height, deviceScaleFactor=1, mobile=False))
                    url = 'https://startweb7.com/' + page if live else (ROOT / page).as_uri()
                    cdp.send('Page.navigate', {'url': url})
                    time.sleep(1.5)
                    state = cdp.evaluate("""({
                        heading:document.querySelector('h1')?.innerText,
                        overflow:document.documentElement.scrollWidth>innerWidth+1,
                        nav:!!document.querySelector('nav a[href="pricing.html"],nav a[href="about.html"]'),
                        brokenImages:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.getBoundingClientRect().height&&(!i.complete||!i.naturalWidth)).length,
                        cards:[...document.querySelectorAll('.sw7-price-card')].map(c=>({name:c.querySelector('h3').innerText,text:c.innerText}))
                    })""")
                    assert state['heading'] and state['nav'], (page, width, 'Missing heading/navigation')
                    assert not state['overflow'] and not state['brokenImages'], (page, width, state)
                    if page == 'pricing.html':
                        for name, count, price in [('Essentials', 2, '$1,800'), ('Competitive', 4, '$3,200'), ('Dominance', 8, '$5,200')]:
                            card = next(c for c in state['cards'] if c['name'] == name)
                            assert f'{count} Google Business Profile posts per month.' in card['text'], name
                            assert price + ' per month' in card['text'], name
                        assert not any('1 Google Business Profile post per week' in c['text'] for c in state['cards'])
                        capture = cdp.send('Page.captureScreenshot', {'format': 'png'})
                        (output / f'pricing-{width}.png').write_bytes(base64.b64decode(capture['data']))
                    assert not cdp.exceptions, (page, width, cdp.exceptions)
                    if width == 390:
                        menu = cdp.evaluate("""(() => {
                            const button = [...document.querySelectorAll('.sw7-compact-toggle')].find(b=>b.getBoundingClientRect().width);
                            if (!button) return false;
                            button.click();
                            const opened = button.getAttribute('aria-expanded') === 'true';
                            button.click();
                            return opened && button.getAttribute('aria-expanded') === 'false';
                        })()""")
                        assert menu, (page, 'Mobile menu toggle failed')
                    checks.append(dict(page=page, width=width, status='PASS'))
                    print('PASS:', page, width, flush=True)
            (output / 'results.json').write_text(json.dumps(checks, indent=2))
            print('PASS: 12 desktop/tablet/mobile checks. Output:', output)
        finally:
            if cdp:
                cdp.socket.close()
            if chrome.poll() is None:
                chrome.terminate()
                chrome.wait(timeout=10)


if __name__ == '__main__':
    main()
