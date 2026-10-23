const fs=require('fs'),path=require('path'),{spawn}=require('child_process'),assert=require('assert');
const root=process.cwd(),out=path.join(root,'verification/full-frame'),pages=JSON.parse(fs.readFileSync(path.join(out,'pages.json')));
const source=fs.readFileSync('tools/verify-oct22.cjs','utf8');const LocalWebSocket=Function('require',source.slice(source.indexOf('class LocalWebSocket'),source.indexOf('const chrome=spawn'))+';return LocalWebSocket;')(require);
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+path.join(out,'chrome-profile-'+Date.now()),'about:blank'],{windowsHide:true});
let log='',ws,n=0;chrome.stderr.on('data',d=>log+=d);const pending=new Map(),delay=ms=>new Promise(r=>setTimeout(r,ms));
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
(async()=>{try{
 for(let i=0;i<150&&!log.includes('DevTools listening on');i++)await delay(100);
 if(!log.includes('DevTools listening on'))throw Error(log);const port=log.match(/127.0.0.1:(\d+)/)[1],targets=await(await fetch('http://127.0.0.1:'+port+'/json')).json();ws=new LocalWebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);await ws.ready;
 ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(Error(JSON.stringify(d.error))):p.resolve(d.result);}};
 await send('Page.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['http://*','https://*']});


 const results=[];
 const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&fs.readFileSync(f,'utf8').includes('universal-nav-fix.js')&&(!process.argv.includes('--target')||['about.html','careers.html','support.html','instant-audit.html','reviews.html','nationwide.html','what-is-seo.html','santa-clarita.html','index.html','industries.html'].includes(f)));
 for(const [width,height] of [[1207,531],[390,844],[260,530],[1810,796]]){
 for(const file of files){
 await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
 await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(file==='index.html'?2800:450);
 const r=await evaluate("(()=>{const h=document.querySelector('main h1,.page h1,h1');if(!h)return {issues:['No heading']};const hero=document.querySelector('.support-hero')||h.closest('section,header:not(.sw7-universal-header)')||h.parentElement;const rect=e=>e.getBoundingClientRect().toJSON(),b=rect(hero),issues=[];const parts=[...hero.querySelectorAll('h1,h2,p,.kicker,a,button,img,video,.sw7-live-demo')].filter(e=>e.getBoundingClientRect().width&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('[hidden]'));for(const e of parts){const q=rect(e);if(q.left< -2||q.right>innerWidth+2)issues.push('horizontal: '+e.tagName+' '+e.className);if(q.bottom>b.bottom+2||q.top<b.top-2)issues.push('hero boundary: '+e.tagName+' '+e.className);if(e.matches('h1,h2,p,a,button,.kicker')){const range=document.createRange();range.selectNodeContents(e);for(const t of range.getClientRects()){if(t.width&&t.height&&(t.left< -2||t.right>innerWidth+2||t.bottom>b.bottom+3))issues.push('text clipped: '+e.tagName+' '+e.className);}}}if(innerWidth>700&&b.bottom>innerHeight+2)issues.push('hero below fold');return {selector:hero.tagName+'.'+hero.className,hero:b,heading:h.textContent.trim(),issues:[...new Set(issues)]}})()");
 results.push({file,width,height,...r});
 if(process.argv.includes('--target')){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,'audit-'+file+'-'+width+'.png'),Buffer.from(shot.data,'base64'));}
 }
 console.log('AUDITED',files.length,width,height);fs.writeFileSync(path.join(out,process.argv.includes('--target')?'site-hero-target-audit.json':'site-hero-audit.json'),JSON.stringify(results,null,2));
 }
 console.log('ISSUES',results.filter(r=>r.issues?.length).map(r=>r.file+' '+r.width+': '+r.issues.join(', ')).join('\n'));
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
