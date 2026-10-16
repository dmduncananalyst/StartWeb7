"""StartWeb7 Home/Blog saved translations. Default: offline, read-only preflight."""
import argparse
from contextlib import contextmanager
import json
import os
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SHARED = ROOT.parent / 'sun-and-sage/scripts'
if not (SHARED / 'translation_pipeline/budget.py').is_file():
    raise RuntimeError('The existing sibling DommyDom translation modules are required')
sys.path.insert(0, str(SHARED))
from translation_pipeline.budget import ExistingBudget
from translation_pipeline.connection import private_path, access_token
from translation_pipeline.pipeline import Parser, Node, LOCALES, atomic, encoded, digest, google_translate, budget_warning

PROJECT = 'project-2e0d7d9d-d482-4fcf-b6d'
PAGES = ('index.html', 'blog.html')
BASE = Path('assets/translations')
TARGET_TAGS = {'h1','h2','h3','h4','h5','h6','p','li','time'}
SKIP_TAGS = {'head','script','style','noscript','svg','nav','footer','form','input','textarea','select','button'}
SKIP_CLASSES = {'sw7-universal-header','sw7-mobile-overlay','sw7-compact-overlay','topbar','rights-footer'}


def ledger(root, read_only=True):
    path = private_path('DOMMYDOM_SHARED_BUDGET_DB', 'shared-usage.sqlite')
    if not path.is_absolute() or path.resolve().is_relative_to(Path(root).resolve()):
        raise ValueError('Existing private shared ledger outside StartWeb7 is required')
    return ExistingBudget(path, read_only=read_only)


def counter_connection(root=ROOT):
    budget = ledger(root)
    status = budget.status(); snapshot = status['snapshot'] or {}
    matches = snapshot.get('project') == PROJECT
    quote = budget.quote(0)
    return dict(connected=True, project_matches=matches, shared_database=budget.path,
        opening_characters=snapshot.get('opening_characters'), warning_usd=snapshot.get('soft_usd'),
        cutoff_usd=snapshot.get('hard_usd'), reservation_count=len(status['reservations']),
        live_dispatch_allowed=matches and quote['allowed'], read_only=True,
        blocked_reason=quote['reason'] if not quote['allowed'] else (None if matches else 'Project mismatch'),google_calls=0)


def eligible(node):
    ancestors = []; current = node
    while current.parent:
        ancestors.append(current); current = current.parent
    if any(n.tag in SKIP_TAGS or SKIP_CLASSES.intersection(n.attrs.get('class','').split()) or
           'hidden' in n.attrs or n.attrs.get('aria-hidden') == 'true' or n.attrs.get('role') == 'dialog' or
           'data-sw7-no-translate' in n.attrs for n in ancestors): return False
    if any(n.tag == 'a' for n in ancestors) and not any(n.tag.startswith('h') and n.tag[1:].isdigit() for n in ancestors):
        return False  # Keep action labels used by existing JS text matching intact.
    return any(n.tag in TARGET_TAGS for n in ancestors)


def sources(root):
    fields = {}; cards = []
    for page in PAGES:
        parser = Parser(); parser.feed((root / page).read_text(encoding='utf-8'))
        texts = []
        def walk(node):
            for child in node.children:
                if isinstance(child, Node): walk(child)
                elif eligible(node):
                    text = ' '.join(child.split())
                    if text and re.search(r'[A-Za-z]',text): texts.append(text)
        walk(parser.root)
        fields[page] = list(dict.fromkeys(texts))
        if page == 'blog.html':
            for card in parser.root.find(lambda n:n.tag == 'article' and n.has('blog-card')):
                titles = card.find(lambda n:n.tag=='h2')
                previews = card.find(lambda n:n.tag=='p')
                links = card.find(lambda n:n.tag=='a' and n.attrs.get('href'))
                if len(titles)!=1 or not previews or not links: raise ValueError('Incomplete real Blog card')
                description = previews[0].text()
                cards.append(dict(article=links[0].attrs['href'],title=titles[0].text(),description=description,
                    two_sentence_source=len(re.split(r'(?<=[.!?])\s+(?=[A-Z])',description))==2))
    if not all(fields.values()): raise ValueError('Approved page source text is empty')
    return fields, cards


def load_cache(root):
    cache = {}
    path = root / '.translation-cache/google-fields.json'
    if path.exists(): cache.update(json.loads(path.read_text(encoding='utf-8')))
    pointer = root / BASE / 'provider-current.json'
    if pointer.exists():
        revision = json.loads(pointer.read_text(encoding='utf-8'))['revision']
        if not re.fullmatch('[a-f0-9]{64}', revision): raise ValueError('Invalid saved release revision')
        cache.update(json.loads((root/BASE/'releases'/revision/'provider.json').read_text(encoding='utf-8'))['fields'])
    return {k:v for k,v in cache.items() if v.get('provider')=='google' and isinstance(v.get('text'),str)
            and v['text'].strip() and v.get('source_sha256')==digest(v['source'])}


@contextmanager
def build_lock(root):
    lock = root / '.translation-cache/build.lock'; lock.parent.mkdir(parents=True,exist_ok=True)
    try: fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    except FileExistsError: raise ValueError('StartWeb7 translation build is already active')
    try:
        with os.fdopen(fd,'w') as out: out.write(str(os.getpid()))
        yield
    finally: lock.unlink(missing_ok=True)


def run(root=ROOT, mode='dry-run', approve=False, *, offline_budget=None, offline_translator=None):
    root=Path(root).resolve()
    if mode not in ('dry-run','prepare','live','mock'): raise ValueError('Invalid mode')
    if mode=='live' and not approve: raise ValueError('Explicit live-run approval required')
    if mode=='mock' and (root==ROOT.resolve() or offline_budget is None or offline_translator is None):
        raise ValueError('Mock responses require an isolated copy of the real pages')
    if mode!='mock' and (offline_budget is not None or offline_translator is not None): raise ValueError('Offline injection requires mock mode')
    if mode=='dry-run': return build(root,mode)
    with build_lock(root): return build(root,mode,offline_budget,offline_translator)


def build(root,mode,budget=None,translator=None):
    source,cards=sources(root); cache=load_cache(root)
    unique=list(dict.fromkeys(text for texts in source.values() for text in texts))
    groups={locale:[text for text in unique if digest(text)+'|'+locale not in cache] for locale in LOCALES}
    counts={locale:sum(len(text) for text in texts) for locale,texts in groups.items()};total=sum(counts.values())
    report=dict(site='startweb7',mode=mode,source_pages=list(PAGES),source_fields=sum(map(len,source.values())),
        characters_per_language=counts,characters_total=total,missing_fields=sum(map(len,groups.values())),
        blog_cards=len(cards),single_sentence_or_other_previews=[c['article'] for c in cards if not c['two_sentence_source']],
        google_calls=0,actual_characters_sent=0,pending=[],budget_warnings=[])
    if mode!='mock':
        budget=ledger(root,read_only=mode!='live')
        snapshot=budget.status()['snapshot'] or {}
        if snapshot.get('project')!=PROJECT: raise ValueError('Existing shared ledger Google project mismatch or missing baseline')
    quote=budget.quote(total)
    report['budget']={k:v for k,v in quote.items() if k not in ('project','reservation')}
    def warn(q):
        message=budget_warning(q)
        if message and message not in report['budget_warnings']:
            report['budget_warnings'].append(message); print(message,file=sys.stderr)
    warn(quote)
    def pending(locale,texts,reason): report['pending'].extend(dict(locale=locale,source_sha256=digest(t),reason=reason) for t in texts)
    if total and mode in ('live','mock'):
        if not quote.get('allowed'): raise ValueError('Shared counter blocked: '+quote['reason'])
        if os.environ.get('DOMMYDOM_GOOGLE_PROJECT',PROJECT)!=PROJECT: raise ValueError('Environment project mismatch')
        reservation=budget.reserve('startweb7',total)
        if not reservation.get('allowed'): raise ValueError('Shared reservation blocked; no Google calls')
        warn(reservation);complete=False;partial=False
        try:
            if mode=='live':
                if reservation.get('project')!=PROJECT: raise ValueError('Reserved project mismatch')
                token=access_token();translator=lambda locale,texts:google_translate(locale,texts,PROJECT,token)
            for locale in LOCALES:
                remaining=list(groups[locale])
                while remaining:
                    chunk=[];size=0
                    while remaining and len(chunk)<50 and size+len(remaining[0])<=25000:
                        text=remaining.pop(0);chunk.append(text);size+=len(text)
                    if not chunk:
                        pending(locale,[remaining.pop(0)],'Field exceeds provider request limit');partial=True;continue
                    try:
                        if mode=='live':report['google_calls']+=1;report['actual_characters_sent']+=size
                        values=translator(locale,chunk)
                        if len(values)!=len(chunk):raise ValueError('Incomplete provider response')
                        for text,value in zip(chunk,values):
                            if not isinstance(value,str) or not value.strip():pending(locale,[text],'Empty provider response');partial=True;continue
                            cache[digest(text)+'|'+locale]=dict(provider='google',source=text,source_sha256=digest(text),text=value)
                    except Exception:pending(locale,chunk,'Provider request failed; no automatic retry');partial=True
                    atomic(root/'.translation-cache/google-fields.json',encoded(cache))
            complete=True
        finally:
            try:budget.finish(reservation['reservation'],'uncertain' if not complete else ('partial' if partial else 'complete'))
            except Exception:report['accounting_reconciliation_required']=True
    else:
        for locale,texts in groups.items():pending(locale,texts,'Saved Google translation missing; no dispatch in this mode')
    report['pending_fields']=len(report['pending'])
    if mode!='dry-run':
        payload=dict(schema=1,source_pages=list(PAGES),source=source,fields=cache)
        revision=digest(json.dumps(payload,sort_keys=True));directory=root/BASE/'releases'/revision
        bundles={locale:{text:cache[digest(text)+'|'+locale]['text'] for text in unique if digest(text)+'|'+locale in cache} for locale in LOCALES}
        bundle=('/* Saved translations for Home/Blog only; no browser provider calls. */\nwindow.STARTWEB7_TRANSLATIONS='+
                json.dumps(dict(schema=1,revision=revision,source_pages=list(PAGES),locales=bundles),ensure_ascii=True)+';\n').encode()
        atomic(directory/'provider.json',encoded(payload));atomic(directory/'current.js',bundle)
        atomic(root/BASE/'provider-current.json',encoded(dict(revision=revision)))
        atomic(root/BASE/'current.js',bundle)
        for page in PAGES:
            path=root/page;markup=path.read_text(encoding='utf-8')
            markup=re.sub(r'(assets/translations/current\.js)(?:\?[^\"\s>]*)?',r'\1?v='+revision,markup)
            atomic(path,markup.encode('utf-8'))
        atomic(root/'.translation-cache/google-fields.json',encoded(cache))
        report['revision']=revision;atomic(root/'verification/shared-translation/latest.json',encoded(report))
    return report


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--mode',choices=('dry-run','prepare','live'),default='dry-run')
    parser.add_argument('--approve-google-calls',action='store_true');parser.add_argument('--details',action='store_true')
    args=parser.parse_args()
    try:
        report=run(mode=args.mode,approve=args.approve_google_calls)
        print(json.dumps(report if args.details else {k:v for k,v in report.items() if k!='pending'},indent=2))
    except Exception as exc:
        print('StartWeb7 translation stopped: '+(str(exc) if isinstance(exc,ValueError) else type(exc).__name__),file=sys.stderr)
        raise SystemExit(1)


if __name__=='__main__':main()
