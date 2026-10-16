"""Offline integration tests: copies of real pages and isolated counter fixtures."""
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import time
import unittest
from unittest.mock import patch

SPEC=importlib.util.spec_from_file_location('startweb_translation',Path(__file__).with_name('translate-home-blog.py'))
runner=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(runner)
from translation_pipeline.budget import Budget,ExistingBudget


class Integration(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='startweb7-offline-');self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name)/'site';self.root.mkdir()
        self.article='how-craigslist-kept-its-1990s-look.html'
        # Use a real existing article solely as an exclusion/preservation check.
        links=runner.Parser();links.feed((runner.ROOT/'blog.html').read_text(encoding='utf-8'))
        self.article=links.root.find(lambda n:n.tag=='article' and n.has('blog-card'))[0].find(lambda n:n.tag=='a')[0].attrs['href']
        for page in (*runner.PAGES,self.article):shutil.copyfile(runner.ROOT/page,self.root/page)
        (self.root/runner.BASE).mkdir(parents=True)
        for file in ('current.js','display.js'):shutil.copyfile(runner.ROOT/runner.BASE/file,self.root/runner.BASE/file)
        self.article_before=(self.root/self.article).read_bytes()
        self.budget=Budget(Path(self.temp.name)/'OFFLINE-COUNTER.sqlite')
        now=time.time();self.snapshot=dict(mode='shared-counter',project=runner.PROJECT,period_start=now-15*86400,
            period_end=now+15*86400,approved_at=now,opening_characters=500000,all_jobs_use_counter=True,
            report_reference='OFFLINE fixture only',included_reservations=[],price_per_million='20',soft_usd='12',hard_usd='15')
        self.budget.reconcile(self.snapshot);self.calls=[]
        self.no_network=patch.object(runner,'google_translate',side_effect=AssertionError('Google forbidden'))
        self.no_network.start();self.addCleanup(self.no_network.stop)
        self.no_auth=patch.object(runner,'access_token',side_effect=AssertionError('OAuth forbidden'))
        self.no_auth.start();self.addCleanup(self.no_auth.stop)

    def tearDown(self):self.assertEqual((self.root/self.article).read_bytes(),self.article_before)

    def translate(self,locale,texts):
        reservation=self.budget.status()['reservations'][-1]
        self.assertEqual(reservation['site'],'startweb7');self.assertEqual(reservation['result'],'reserved')
        self.calls.append((locale,list(texts)))
        return ['OFFLINE '+locale+': '+text for text in texts]

    def build(self,translator=None):
        return runner.run(self.root,'mock',offline_budget=self.budget,offline_translator=translator or self.translate)

    def test_all_three_sites_use_one_counter_before_provider_dispatch(self):
        for site,count in [('dommydom',2610),('paper-trail',1000)]:
            r=self.budget.reserve(site,count);self.budget.finish(r['reservation'],'complete')
        source,_=runner.sources(self.root);texts=set(t for items in source.values() for t in items)
        expected=sum(map(len,texts))*9;report=self.build()
        self.assertEqual(report['characters_total'],expected)
        records=self.budget.status()['reservations']
        self.assertEqual([(r['site'],r['chars']) for r in records],[('dommydom',2610),('paper-trail',1000),('startweb7',expected)])
        self.assertEqual(sum(len(t) for _,texts in self.calls for t in texts),expected)

    def test_repeat_and_fresh_cache_restore_use_zero_provider_requests(self):
        first=self.build();self.calls.clear();second=self.build()
        self.assertEqual(second['characters_total'],0);self.assertEqual(first['revision'],second['revision'])
        self.assertEqual(self.calls,[])
        shutil.rmtree(self.root/'.translation-cache');third=self.build()
        self.assertEqual(third['characters_total'],0);self.assertEqual(self.calls,[])
        self.assertEqual(len(self.budget.status()['reservations']),1)

    def test_later_request_failure_keeps_earlier_success_and_retries_only_missing(self):
        attempt=[];failed=[]
        def partial(locale,texts):
            attempt.append(1)
            if len(attempt)==2:
                self.assertTrue((self.root/'.translation-cache/google-fields.json').exists())
                failed.extend((locale,t) for t in texts);raise TimeoutError('Offline failure')
            return self.translate(locale,texts)
        report=self.build(partial);self.assertGreater(report['pending_fields'],0)
        self.assertEqual(self.budget.status()['reservations'][-1]['result'],'partial')
        self.calls.clear();self.build()
        self.assertEqual([(l,t) for l,texts in self.calls for t in texts],failed)

    def test_interruption_keeps_saved_responses_and_full_reservation(self):
        saved=[]
        def interrupted(locale,texts):
            if saved:raise KeyboardInterrupt('Offline interruption')
            saved.extend((locale,t) for t in texts);return self.translate(locale,texts)
        with self.assertRaises(KeyboardInterrupt):self.build(interrupted)
        self.assertEqual(self.budget.status()['reservations'][-1]['result'],'uncertain')
        self.calls.clear();self.build()
        self.assertFalse(set(saved)&{(l,t) for l,ts in self.calls for t in ts})

    def test_changed_real_card_title_and_two_sentence_description_are_detected(self):
        self.build();self.calls.clear();_,cards=runner.sources(self.root)
        old=cards[0];title=old['title']+' (updated)';description=old['description']+' Review the complete story in English.'
        page=self.root/'blog.html';text=page.read_text(encoding='utf-8')
        page.write_text(text.replace(old['title'],title).replace(old['description'],description),encoding='utf-8')
        report=self.build();self.assertEqual(report['characters_total'],(len(title)+len(description))*9)
        self.assertEqual({l for l,_ in self.calls},set(runner.LOCALES))
        for _,texts in self.calls:self.assertEqual(set(texts),{title,description})
        self.calls.clear();self.build();self.assertEqual(self.calls,[])

    def test_only_approved_pages_and_editorial_copy_enter_source(self):
        source,cards=runner.sources(self.root)
        self.assertEqual(set(source),set(runner.PAGES));self.assertEqual(len(cards),14)
        self.assertNotIn(self.article,source)
        text='<html><body><nav><p>MENU ONLY</p></nav><h2><a href="keep.html">TITLE COPY</a></h2><p>BODY COPY</p><a>CONTROL</a><form><p>FORM ONLY</p></form><script>API SECRET</script></body></html>'
        parsed=runner.Parser();parsed.feed(text)
        found=[n.text() for n in parsed.root.find(lambda n:n.tag in ('p','h2','a')) if runner.eligible(n)]
        self.assertIn('BODY COPY',found);self.assertIn('TITLE COPY',found)
        self.assertNotIn('MENU ONLY',found);self.assertNotIn('CONTROL',found);self.assertNotIn('FORM ONLY',found)

    def test_saved_bundle_contains_all_nine_language_maps(self):
        self.build();bundle=(self.root/runner.BASE/'current.js').read_text(encoding='utf-8')
        data=json.loads(bundle.split('window.STARTWEB7_TRANSLATIONS=',1)[1].strip().rstrip(';'))
        self.assertEqual(set(data['locales']),set(runner.LOCALES));self.assertEqual(data['source_pages'],list(runner.PAGES))
        _,cards=runner.sources(self.root)
        for locale in runner.LOCALES:
            self.assertTrue(data['locales'][locale][cards[0]['title']].startswith('OFFLINE '+locale+': '))
            self.assertTrue(data['locales'][locale][cards[0]['description']].startswith('OFFLINE '+locale+': '))

    def test_live_requires_approval_before_authentication_or_reservation(self):
        with self.assertRaises(ValueError):runner.run(self.root,'live')
        runner.access_token.assert_not_called();self.assertEqual(self.budget.status()['reservations'],[])

    def test_project_mismatch_blocks_before_authentication(self):
        snapshot=dict(self.snapshot,project='OFFLINE-WRONG-PROJECT')
        with self.budget.db() as c:c.execute('UPDATE snapshot SET data=? WHERE id=1',(json.dumps(snapshot),))
        with patch.dict('os.environ',{'DOMMYDOM_SHARED_BUDGET_DB':self.budget.path}):
            with self.assertRaises(ValueError):runner.run(self.root,'live',approve=True)
        runner.access_token.assert_not_called();self.assertEqual(self.budget.status()['reservations'],[])

    def test_participation_block_prevents_dispatch(self):
        with self.budget.db() as c:c.execute('UPDATE snapshot SET data=? WHERE id=1',(json.dumps(dict(self.snapshot,all_jobs_use_counter=False)),))
        with self.assertRaises(ValueError):self.build()
        self.assertEqual(self.calls,[]);self.assertEqual(self.budget.status()['reservations'],[])

    def test_readonly_connection_cannot_change_or_create_database(self):
        path=Path(self.budget.path);before=path.read_bytes()
        with patch.dict('os.environ',{'DOMMYDOM_SHARED_BUDGET_DB':str(path)}):r=runner.counter_connection(self.root)
        self.assertTrue(r['connected'] and r['project_matches']);self.assertEqual(path.read_bytes(),before)
        missing=path.with_name('MISSING.sqlite')
        with self.assertRaises(FileNotFoundError):ExistingBudget(missing)
        self.assertFalse(missing.exists())

    def test_shared_warning_is_reported_and_disk_failure_stops_requests(self):
        self.budget.reconcile(dict(self.snapshot,opening_characters=590000))
        original=runner.atomic
        def failed_checkpoint(path,data):
            if Path(path).name=='google-fields.json':raise OSError('Offline disk failure')
            return original(path,data)
        with patch.object(runner,'atomic',side_effect=failed_checkpoint):
            with self.assertRaises(OSError):self.build()
        self.assertEqual(len(self.calls),1);self.assertEqual(self.budget.status()['reservations'][-1]['result'],'uncertain')
        # Counter reservation is retained; do not repeat a potentially billed batch.


if __name__=='__main__':unittest.main(verbosity=2)
