"""Offline browser check of real pages + mocked saved responses. All external requests blocked."""
import functools
import http.server
import importlib.util
import json
import os
from pathlib import Path
import sys
import threading

sys.path.insert(0,str(Path(os.environ['TEMP'])/'dommydom-language-browser-tools'))
from playwright.sync_api import sync_playwright

spec=importlib.util.spec_from_file_location('offline_tests',Path(__file__).with_name('test-shared-translation.py'))
test=importlib.util.module_from_spec(spec);spec.loader.exec_module(test)
fixture=test.Integration(methodName='test_saved_bundle_contains_all_nine_language_maps')
fixture.setUp()
fixture.build()

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
    def translate_path(self,path):
        normal=Path(super().translate_path(path))
        if normal.is_file():return str(normal)
        return str(test.runner.ROOT/normal.relative_to(fixture.root))

server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(fixture.root)))
threading.Thread(target=server.serve_forever,daemon=True).start()
rows=[]
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1000})
        context.route('**/*',lambda route:route.continue_() if route.request.url.startswith(f'http://127.0.0.1:{server.server_port}/') and route.request.resource_type not in ('media','image') else route.abort())
        page=context.new_page()
        signature='''() => ({title:document.title,nav:[...document.querySelectorAll('.sw7-universal-header a')].map(a=>[a.textContent,a.getAttribute('href')]),images:[...document.images].map(i=>[i.getAttribute('src'),i.getAttribute('alt')]),links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent)})'''
        for width in (1440,390):
            page.set_viewport_size({'width':width,'height':1000})
            for source in test.runner.PAGES:
                base=f'http://127.0.0.1:{server.server_port}/{source}'
                page.goto(base+'?lang=en',wait_until='load');baseline=page.evaluate(signature)
                for locale in test.runner.LOCALES:
                    page.goto(base+'?lang='+locale,wait_until='load')
                    assert page.locator('html').get_attribute('lang')==locale
                    if source=='blog.html':assert page.locator('.blog-card h2').first.inner_text().startswith('OFFLINE '+locale+': ')
                    else:assert 'OFFLINE '+locale+': ' in page.locator('#homeWebsiteTitle').inner_text()
                    assert page.evaluate(signature)==baseline,(width,source,locale)
                    rows.append(dict(width=width,page=source,locale=locale,saved_copy_rendered=True,menus_links_photos_seo_unchanged=True))
                print(f'PASS {width}px {source}: all nine saved languages; menus/links/photos/SEO unchanged',flush=True)
        article=f'http://127.0.0.1:{server.server_port}/{fixture.article}?lang=es'
        page.goto(article,wait_until='load')
        assert page.locator('html').get_attribute('lang')=='en'
        assert not page.locator('body').inner_text().startswith('OFFLINE')
        browser.close()
    result=dict(browser_cases=rows,case_count=len(rows),full_article_still_english=True,google_calls=0,external_requests_blocked=True)
    destination=Path(__file__).resolve().parent/'browser-results.json'
    destination.write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
    print('PASS 36 saved-language browser cases and English full article; external requests blocked',flush=True)
finally:
    server.shutdown();server.server_close();fixture.doCleanups()
