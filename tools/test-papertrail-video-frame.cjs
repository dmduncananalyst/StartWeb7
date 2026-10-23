const fs=require('fs'),path=require('path'),{spawn}=require('child_process'),assert=require('assert');
const root=process.cwd(),out=path.join(root,'verification/full-frame'),pages=JSON.parse(fs.readFileSync(path.join(out,'pages.json')));
const source=fs.readFileSync('tools/verify-oct22.cjs','utf8');const LocalWebSocket=Function('require',source.slice(source.indexOf('class LocalWebSocket'),source.indexOf('const chrome=spawn'))+';return LocalWebSocket;')(require);
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+fs.mkdtempSync(path.join(require('os').tmpdir(),'StartWeb7-chrome-profile-')),'about:blank'],{windowsHide:true});
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
await send('Page.navigate',{url:'file:///'+path.join(root,'index.html').replaceAll('\\','/')});await delay(3000);
await evaluate("Promise.all([...document.querySelectorAll('.work-paper-trail img')].map(i=>{i.loading='eager';return i.decode()}))");
const paper=await evaluate("(()=>{const c=document.querySelector('.work-paper-trail'),p=c.querySelector('picture'),i=p.querySelector('img'),o=c.querySelector('.work-overlay'),rect=e=>e.getBoundingClientRect().toJSON();return {card:rect(c),picture:rect(p),image:rect(i),overlay:rect(o),native:[i.naturalWidth,i.naturalHeight]}})()");
assert(Math.abs(paper.picture.width/paper.picture.height-1860/885)<.01,'PaperTrail has unused portrait space');assert(paper.card.height<=paper.picture.height+paper.overlay.height+2,'PaperTrail has extra blank space');if(width<=900)assert(paper.card.width<width*.5,'PaperTrail enlarged');
let shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:paper.card.x,y:paper.card.y,width:paper.card.width,height:paper.card.height,scale:1}});fs.writeFileSync(path.join(out,'papertrail-tight-'+width+'.png'),Buffer.from(shot.data,'base64'));
const frames=[];
for(const file of ['catering.html','landing-page.html']){await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(1300);const r=await evaluate("(()=>{const m=document.querySelector('#sw7-industry-hero video'),f=m.parentElement,rect=e=>e.getBoundingClientRect().toJSON();return {frame:rect(f),media:rect(m),native:[m.videoWidth,m.videoHeight],ready:m.readyState,error:m.error?.message,src:m.currentSrc}})()");assert(!r.error&&r.ready>=2,file+' video unavailable');assert(Math.abs(r.frame.width/r.frame.height-16/9)<.01,file+' frame is not wide');assert(Math.abs(r.media.width-r.frame.width)<1&&Math.abs(r.media.height-r.frame.height)<1,file+' video does not fill frame');frames.push({file,...r});shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,'matched-'+file+'-'+width+'.png'),Buffer.from(shot.data,'base64'));}
assert(Math.abs(frames[0].frame.width-frames[1].frame.width)<2&&Math.abs(frames[0].frame.height-frames[1].frame.height)<2,'Catering does not match Landing Page dimensions');checks.push({width,height,paper,frames});console.log('PASS PaperTrail and matched video frames',width,height);fs.writeFileSync(path.join(out,'papertrail-frame-results.json'),JSON.stringify(checks,null,2));}
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
