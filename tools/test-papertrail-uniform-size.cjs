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




const checks=[];
for(const [width,height] of [[300,598],[390,844],[768,1024],[1207,531],[1810,796]]){
await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<1050});
await send('Page.navigate',{url:'file:///'+path.join(root,'index.html').replaceAll('\\','/')});await delay(2200);
const cards=await evaluate("[...document.querySelectorAll('.work-grid>.work-project')].map(e=>({name:e.getAttribute('aria-label'),paper:e.classList.contains('work-paper-trail'),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))");
const preview=await evaluate("(async()=>{const i=document.querySelector('.work-paper-trail img');i.loading='eager';await i.decode();const r=i.getBoundingClientRect();return {src:i.currentSrc,w:i.naturalWidth,h:i.naturalHeight,fit:getComputedStyle(i).objectFit,width:r.width,height:r.height}})()");assert(preview.src.includes(width<=900?'papertrail-mobile-user.png':'papertrail-desktop-1440.png'),'Wrong responsive image');assert(preview.fit==='cover','Preview adds empty space');console.log('PASS responsive preview',width,preview.w,preview.h);const paper=cards.find(c=>c.paper);assert(paper,'PaperTrail missing');
for(const card of cards){assert(Math.abs(card.width-paper.width)<1,'Card widths differ');assert(Math.abs(card.height-paper.height)<1,'Card heights differ');}
checks.push({width,height,cards});console.log('PASS equal portfolio card sizes',width,height,paper.width,paper.height);
}
fs.writeFileSync(path.join(out,'papertrail-uniform-size-results.json'),JSON.stringify(checks,null,2));
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
