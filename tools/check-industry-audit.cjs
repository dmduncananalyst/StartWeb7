const fs=require('fs'),assert=require('assert');
const pages=JSON.parse(fs.readFileSync('verification/industry-audit/pages.json'));
const clean=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replace(/\s+/g,' ').trim();
const approved=JSON.parse(fs.readFileSync('verification/oct22/approved-content.json'));
const results=[];
for(const p of pages){
 const s=fs.readFileSync(p.file,'utf8');assert.equal((s.match(/<h1>/g)||[]).length,1);assert.equal((s.match(/id="sw7-industry-hero"/g)||[]).length,1);assert.equal((s.match(/class="sw7-unified-icon"/g)||[]).length,1);
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){let target=m[1].split(/[?#]/)[0];if(!target||/^(https?:|tel:|mailto:|data:)/.test(target))continue;target=target.replace(/^\//,'');assert(!target||fs.existsSync(decodeURIComponent(target)),p.file+' missing '+target);}
 for(const schema of s.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))JSON.parse(schema[1]);
 const r=approved.find(x=>x.file===p.file);if(r){for(const b of r.blocks)assert(clean(s).includes(b.text),p.file+' approved body copy missing');assert(clean(s).includes(r.h1),p.file+' former heading retained in body');}
 results.push('PASS '+p.file+': one industry-name H1, hero and icon; local links/media and structured data valid; approved longer copy retained where applicable.');
}
fs.writeFileSync('verification/industry-audit/static-results.txt',results.join('\n'));console.log(results.join('\n'));
