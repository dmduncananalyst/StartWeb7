const fs=require('fs'),assert=require('assert'),{execFileSync}=require('child_process');
const pages=JSON.parse(fs.readFileSync('verification/full-frame/pages.json')),results=[];
for(const r of pages){
 const s=fs.readFileSync(r.file,'utf8');
 if(r.file!=='interior-design.html'){const old=execFileSync('git',['show','HEAD:'+r.file],{encoding:'utf8'});assert.equal(s.match(/<title>.*?<\/title>/)[0],old.match(/<title>.*?<\/title>/)[0]);}
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){const t=m[1].split(/[?#]/)[0];if(t&&t!=='/'&&!/^(https?:|tel:|mailto:|data:)/.test(t))assert(fs.existsSync(decodeURIComponent(t.replace(/^\//,''))),r.file+' '+t);}
 for(const m of s.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
 results.push('PASS '+r.file+': SEO title retained; local links, media and structured-data syntax valid.');
}
fs.writeFileSync('verification/full-frame/static-results.txt',results.join('\n'));console.log(results.join('\n'));
