from pathlib import Path
import json,re,html,hashlib,xml.etree.ElementTree as ET
from urllib.parse import unquote,urlsplit
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'verification/oct21'
records=json.loads((out/'articles.json').read_text())
archive=(ROOT/'blog.html').read_text(encoding='utf-8')
tree=ET.parse(ROOT/'sitemap.xml')
norm=lambda x:' '.join(x.split())
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='C:/Program Files/Google/Chrome/Application/chrome.exe',headless=True)
    for width in (390,768,1440):
        context=browser.new_context(viewport={'width':width,'height':1000})
        context.route('**/*',lambda route:route.continue_() if route.request.url.startswith('file:') else route.abort())
        page=context.new_page()
        for r in records:
            page.goto((ROOT/r['file']).as_uri(),wait_until='load')
            page.wait_for_timeout(700)
            assert page.title()==r['title']
            assert page.locator('h1').count()==1
            assert page.locator('h1').inner_text()==r['title']
            assert page.locator('meta[name=description]').get_attribute('content')==r['description']
            assert page.locator('link[rel=canonical]').count()==1
            schema=json.loads(page.locator('script[type="application/ld+json"]').inner_text())
            assert schema['datePublished']=='2026-10-21' and schema['headline']==r['title']
            actual=page.locator('.blog-prose > p, .blog-prose > h2').all_inner_texts()
            assert actual==[s[1] for s in r['sections']],r['file']
            assert page.locator('.blog-prose > h2').count()==(5 if r==records[0] else 4)
            assert sum(s[0]=='p' for s in r['sections'])==(6 if r==records[0] else 5)
            assert page.locator('.blog-sources a').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))')==r['urls']
            assert page.locator('.blog-article-cover img').evaluate('(i)=>i.complete && i.naturalWidth===1672 && i.naturalHeight===941')
            assert page.locator('.blog-article-cover img').evaluate('(i)=>Math.abs(i.clientWidth/i.clientHeight-i.naturalWidth/i.naturalHeight)<0.02')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),r['file']
            page.screenshot(path=str(out/f'{r["file"][:-5]}-{width}.png'),full_page=True)
            for target in page.locator('a[href], [src]').evaluate_all('(els)=>els.map(e=>e.getAttribute("href")||e.getAttribute("src"))'):
                if urlsplit(target).scheme or target.startswith('#'):continue
                assert (ROOT/unquote(urlsplit(target).path)).exists(),target
            results.append(f'PASS {width}px: {r["file"]}, exact paragraphs and headings, SEO, sources, local links, featured image, no horizontal overflow')
        page.goto((ROOT/'blog.html').as_uri(),wait_until='load')
        page.wait_for_timeout(700)
        assert page.locator('.oct21-card').count()==3
        for i,r in enumerate(records):
            card=page.locator('.oct21-card').nth(i)
            card.scroll_into_view_if_needed()
            assert card.locator('img').evaluate('(i)=>i.complete && i.naturalWidth===1672 && getComputedStyle(i).objectFit==="cover" && Math.abs(i.clientWidth-i.parentElement.clientWidth)<2 && Math.abs(i.clientHeight-i.parentElement.clientHeight)<2')
            assert all(h==r['file'] for h in card.locator('a').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))'))
            card.locator('.blog-read-more').click()
            assert page.locator('h1').inner_text()==r['title']
            page.go_back(wait_until='load')
        page.screenshot(path=str(out/f'archive-{width}.png'),full_page=True)
        context.close()
    browser.close()
for r in records:
    original=Path(r'C:\Users\Owner\OneDrive\Desktop')/r['image']
    assert hashlib.sha256(original.read_bytes()).digest()==hashlib.sha256((ROOT/'assets/blog'/r['image']).read_bytes()).digest()
    assert sum(e.text=='https://startweb7.com/'+r['file'] for e in tree.findall('.//{*}loc'))==1
    assert len(re.findall(r'<article class="blog-card oct21-card">(?:(?!</article>).)*href="'+re.escape(r['file'])+'"',archive,re.S))==1
results.append('PASS: three byte-identical original images, unique archive cards and sitemap URLs; browser external requests blocked, no analytics or paid services called.')
(out/'test-results.txt').write_text('\n'.join(results),encoding='utf-8')
print('\n'.join(results))
