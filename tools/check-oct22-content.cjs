const fs=require('fs'),assert=require('assert'),{execFileSync}=require('child_process');
const specs=JSON.parse(fs.readFileSync('verification/oct22/approved-content.json','utf8'));
const clean=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replace(/\s+/g,' ').trim();
const results=[];
for(const r of specs){
 const s=fs.readFileSync(r.file,'utf8');
 assert.equal((s.match(/<h1>/g)||[]).length,1);
 assert.equal((s.match(/rel="canonical"/g)||[]).length,1);
 assert(!s.includes('FAQPage')&&!s.includes('Quick Answer'));
 for(const b of r.blocks){assert(clean(s).includes(b.text),r.file+' missing approved text');assert(!/[\u2013\u2014]/.test(b.text),'dash in approved copy');}
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){let target=m[1].split(/[?#]/)[0];if(!target||/^(https?:|tel:|mailto:|data:)/.test(target))continue;target=target.replace(/^\//,'');assert(!target||fs.existsSync(decodeURIComponent(target)),r.file+' missing '+target);}
 if(r.file!=='interior-design.html'){
  const old=execFileSync('git',['show','HEAD:'+r.file],{encoding:'utf8'});
  assert.equal(s.match(/<title>.*?<\/title>/)[0],old.match(/<title>.*?<\/title>/)[0],'existing SEO title changed');
  for(const src of old.matchAll(/<script[^>]+src="([^"]+)"/g))assert(s.includes(src[1]),'existing integration removed');
 }
 results.push('PASS '+r.file+': approved copy, unique H1/canonical, valid local links, no FAQ; existing SEO titles and script integrations preserved.');
}
for(const file of ['index.html','industries.html']){
 const s=fs.readFileSync(file,'utf8'),old=execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'});
 const type=file==='index.html'?'sw7-home-industry-card':'sw7-industry-card';
 const cards=x=>[...x.matchAll(new RegExp('<a class="'+type+'[^\"]*" href="([^\"]+)"','g'))].map(m=>m[1]);
 assert.deepEqual(cards(s),[...cards(old),'interior-design.html']);results.push('PASS '+file+': all 12 existing industry cards preserved in order; one Interior Design card appended.');
}
const xml=fs.readFileSync('sitemap.xml','utf8');assert.equal((xml.match(/<loc>https:\/\/startweb7.com\/interior-design.html<\/loc>/g)||[]).length,1);
results.push('PASS sitemap: one Interior Design URL.');
const newPage=specs.find(r=>r.file==='interior-design.html');
const overlaps=[];
for(const f of ['real-estate-agents.html','collision-repair.html','pool-construction.html','general-contractors.html','catering.html','commercial-cleaning.html','security-services.html','home-health-care.html','assisted-living.html','lawyers.html','doctors.html','dentists.html']){
 const text=clean(fs.readFileSync(f,'utf8'));for(const b of newPage.blocks)if(text.includes(b.text))overlaps.push({file:f,text:b.text});
}
assert.equal(overlaps.length,0);results.push('PASS editorial overlap: no exact Interior Design headings or complete paragraphs found in the 12 existing industry pages.');
fs.writeFileSync('verification/oct22/static-results.txt',results.join('\n'));console.log(results.join('\n'));
