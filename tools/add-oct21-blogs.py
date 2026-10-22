from pathlib import Path
import re, json, html, shutil
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
reader = PdfReader(r'C:\Users\Owner\Downloads\StartWeb7_October_21_Revised_Blogs_With_Photo_Assignments.pdf')
out = ROOT / 'verification/oct21'
out.mkdir(exist_ok=True)
pages = [p.extract_text(extraction_mode='layout').strip() for p in reader.pages]
(out / 'complete-pdf-text.txt').write_text('\n\n'.join(pages), encoding='utf-8')
specs = [
 ('the-aol-greeting-that-made-the-internet-feel-personal.html', 'Dial-Up Dreams in a Cozy Bedroom.png', 'A woman using an AOL dial-up desktop computer in a warmly lit bedroom', 1, 4, 'business-website.html', 'digital action'),
 ('the-day-digital-design-let-go-of-leather-and-wood.html', 'Skeuomorphic to Modern iPhone Evolution.png', 'Early and modern iPhones showing textured skeuomorphic icons beside contemporary flat icons', 4, 7, 'business-website.html', 'websites'),
 ('before-the-feed-the-comment-section-was-the-conversation.html', 'Nostalgic LA Sunset Blog Desk.png', 'A laptop displaying a personal Los Angeles sunset blog and reader comments on a nostalgic desk', 7, 10, 'how-email-newsletters-became-a-media-business-again.html', 'subscription'),
]
esc = lambda s: html.escape(s, quote=True)
template = (ROOT / 'how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals.html').read_text(encoding='utf-8')
archive = (ROOT / 'blog.html').read_text(encoding='utf-8')
existing = json.loads((out/'articles.json').read_text()) if (out/'articles.json').exists() else []
archive = re.sub(r'<article class="blog-card oct21-card">.*?</article>', '', archive, flags=re.S)
archive = archive.replace('<style>.blog-posts .oct21-card>a:first-child>img{object-fit:contain!important}</style>', '')
headings = [
 ['A Voice Recorded on a Cassette in a Living Room','The Ritual of Getting Online','A Walled Garden That Felt Like a Town','The Long Fade and the Final Goodbye','Why That Voice Still Echoes'],
 ['Why the First Phones Dressed Up as Desks','The Shakeup That Cleared the Desk','What Flat Design Gave, and What It Quietly Took','The Pendulum Never Really Stopped'],
 ['From Guest Books to the Bottom of Every Page','The Years When Publishers Walked Away','What Was Lost in the Move to the Feed','The Quiet Return, Behind a Paywall']
]
records, cards, entries = [], [], []
for index, (file, image, alt, start, end, link, anchor) in enumerate(specs):
    assert not (ROOT/file).exists() or any(r['file']==file for r in existing), f'Duplicate: {file}'
    # A page break is a line wrap, not a paragraph boundary.
    text = '\n'.join(pages[start:end])
    pre, sources = text.split('Sources and references', 1)
    title, rest = pre.split('October 21, 2026', 1)
    title = ' '.join(title.split())
    for heading in headings[index]:
        assert heading in rest
        rest = rest.replace(heading, '\n\n'+heading+'\n\n')
    blocks = [b.strip() for b in re.split(r'\n\s*\n', rest.strip()) if b.strip()]
    description = ' '.join(blocks.pop(0).removeprefix('SEO description:').split())
    sections = []
    for b in blocks:
        value = ' '.join(b.split())
        sections.append(('h2' if '\n' not in b else 'p', value))
    assert sections[0][0] == 'p'
    urls = re.findall(r'https?://.*?(?=\s+https?://|\Z)', sources.strip(), re.S)
    urls = [re.sub(r'\s+', '', u) for u in urls]
    src = 'assets/blog/' + __import__('urllib.parse', fromlist=['quote']).quote(image)
    shutil.copy2(Path(r'C:\Users\Owner\OneDrive\Desktop')/image, ROOT/'assets/blog'/image)
    img = f'<img src="{src}" alt="{esc(alt)}" width="1672" height="941" decoding="async"'
    prose = '\n'.join(f'<{tag}>{esc(value)}</{tag}>' for tag, value in sections)
    # Add a contextual link without changing any supplied words.
    prose, count = re.subn(r'\b'+anchor+r'\b', f'<a href="{link}">{anchor}</a>', prose, count=1)
    assert count == 1
    prose += '<section class="blog-sources"><h2>Sources and references</h2><ul>' + ''.join(f'<li><a href="{esc(u)}">{esc(u)}</a></li>' for u in urls) + '</ul></section>'
    url = 'https://startweb7.com/' + file
    schema = {'@context':'https://schema.org','@type':'BlogPosting','headline':title,'description':description,'datePublished':'2026-10-21','dateModified':'2026-10-21','url':url,'mainEntityOfPage':url,'inLanguage':'en','image':'https://startweb7.com/'+src,'author':{'@type':'Organization','name':'StartWeb7','url':'https://startweb7.com/'},'publisher':{'@type':'Organization','name':'StartWeb7','logo':{'@type':'ImageObject','url':'https://startweb7.com/startweb7-logo.png'}}}
    head = f'<title>{esc(title)}</title><meta name="description" content="{esc(description)}"/><link rel="canonical" href="{url}"/>'
    for key,value in {'og:title':title,'og:description':description,'og:url':url,'og:type':'article','og:site_name':'StartWeb7','og:image':schema['image'],'og:image:alt':alt,'article:published_time':'2026-10-21','article:modified_time':'2026-10-21'}.items():
        head += f'<meta property="{key}" content="{esc(value)}"/>'
    for key,value in {'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':schema['image'],'twitter:image:alt':alt}.items():
        head += f'<meta name="{key}" content="{esc(value)}"/>'
    head += '<script type="application/ld+json">'+json.dumps(schema)+'</script>'
    page = re.sub(r'<title>.*?</title>|<meta\b(?=[^>]*(?:name="(?:description|twitter:[^"]+)"|property="(?:og:[^"]+|article:[^"]+)"))[^>]*>|<link\b(?=[^>]*(?:rel="canonical"|as="image"))[^>]*>|<script type="application/ld\+json">.*?</script>', '', template, flags=re.S)
    page = page.replace('</head>', head+'</head>').replace('data-sw7-fit-page="how-craigslist-kept-its-1990s-look-and-outlived-prettier-rivals"', f'data-sw7-fit-page="{file[:-5]}"')
    main = f'<main><header class="blog-heading" data-sw7-preserved=""><div class="sw7-feature-inner"><h1>{esc(title)}</h1><time data-publish-date="" datetime="2026-10-21">October 21, 2026</time></div></header><div class="sw7-feature-inner blog-article" data-sw7-preserved=""><figure class="blog-article-cover">{img} loading="eager" fetchpriority="high"/></figure><article class="blog-prose">{prose}</article><p><a class="blog-read-more" href="blog.html">Back to Blog</a></p></div></main>'
    page = re.sub(r'<main>.*?</main>', lambda m:main, page, flags=re.S)
    (ROOT/file).write_text(page, encoding='utf-8')
    cards.append(f'<article class="blog-card oct21-card"><a href="{file}">{img} loading="lazy"/></a><div class="blog-card-copy"><time data-publish-date="" datetime="2026-10-21">October 21, 2026</time><h2><a href="{file}">{esc(title)}</a></h2><p>{esc(description)}</p><a class="blog-read-more" href="{file}">Read more</a></div></article>')
    entries.append({'@type':'BlogPosting','headline':title,'datePublished':'2026-10-21','url':url,'image':schema['image']})
    records.append(dict(file=file,title=title,description=description,image=image,alt=alt,sections=sections,urls=urls))
archive = re.sub(r'(<div[^>]*class="[^"]*blog-posts[^"]*"[^>]*>)', lambda m:m[0]+''.join(cards), archive, count=1)
def update_schema(m):
    data = json.loads(m[1]); data['blogPost'] = entries + [e for e in data['blogPost'] if e['url'] not in {x['url'] for x in entries}]
    return '<script type="application/ld+json">'+json.dumps(data)+'</script>'
archive = re.sub(r'<script type="application/ld\+json">(.*?)</script>', update_schema, archive, flags=re.S)
(ROOT/'blog.html').write_text(archive,encoding='utf-8')
sitemap = (ROOT/'sitemap.xml').read_text(encoding='utf-8')
for r in records:
    sitemap = re.sub(r'<url>\s*<loc>https://startweb7.com/'+re.escape(r['file'])+r'</loc>.*?</url>\s*','',sitemap,flags=re.S)
sitemap = sitemap.replace('</urlset>', ''.join(f'<url><loc>https://startweb7.com/{r["file"]}</loc><lastmod>2026-10-21</lastmod></url>\n' for r in records)+'</urlset>')
sitemap = re.sub(r'(<loc>https://startweb7.com/blog.html</loc>\s*<lastmod>)[^<]+', r'\g<1>2026-10-21', sitemap)
(ROOT/'sitemap.xml').write_text(sitemap,encoding='utf-8')
(out/'articles.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
print('Created all three articles, approved image copies, cards, SEO and sitemap entries.')

