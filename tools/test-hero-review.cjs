const fs=require('fs'),path=require('path'),{spawn}=require('child_process'),assert=require('assert');
const root=process.cwd(),out=path.join(root,'verification/hero-review');fs.mkdirSync(out,{recursive:true});
const source=fs.readFileSync('tools/verify-oct22.cjs','utf8');
const LocalWebSocket=Function('require',source.slice(source.indexOf('class LocalWebSocket'),source.indexOf('const chrome=spawn'))+';return LocalWebSocket;')(require);
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+path.join(out,'chrome-profile-'+Date.now()),'about:blank'],{windowsHide:true});
let log='',ws,n=0;chrome.stderr.on('data',d=>log+=d);const pending=new Map(),delay=ms=>new Promise(r=>setTimeout(r,ms));
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
(async()=>{try{
 for(let i=0;i<100&&!log.includes('DevTools listening on');i++)await delay(100);
 if(!log.includes('DevTools listening on'))throw Error(log);const port=log.match(/127.0.0.1:(\d+)/)[1],targets=await(await fetch('http://127.0.0.1:'+port+'/json')).json();ws=new LocalWebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);await ws.ready;
 ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(Error(JSON.stringify(d.error))):p.resolve(d.result);}};
 await send('Page.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['http://*','https://*']});
 const base='assets/industries/interior-design-feature-v3',b64=fs.readFileSync(base+'.png').toString('base64');
 const data=await evaluate(`new Promise(resolve=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);resolve(c.toDataURL('image/webp',.94).split(',')[1])};i.src='data:image/png;base64,${b64}'})`);fs.writeFileSync(base+'.webp',Buffer.from(data,'base64'));
 const results=[];
 for(const [width,height] of [[390,844],[768,900],[1180,780],[1810,796],[1920,1080]]){
 await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width===390});
 for(const file of ['interior-design.html','real-estate-agents.html']){
 await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(1200);
 await evaluate(`Promise.all([...document.querySelectorAll('.sw7-full-hero-photo')].map(i=>i.decode()))`);
 const r=await evaluate(`(()=>{const hero=document.querySelector('.real-estate-hero,.sw7-photo-hero'),media=hero.querySelector('video,img.sw7-full-hero-photo'),copy=hero.querySelector('.real-estate-hero-copy'),p=copy?.querySelector('p'),h=copy?.querySelector('h1'),rect=e=>e.getBoundingClientRect().toJSON();return {file:${JSON.stringify(file)},width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,hero:rect(hero),media:rect(media),fit:getComputedStyle(media).objectFit,position:getComputedStyle(media).position,header:rect(document.querySelector('.sw7-universal-header')),photoCount:hero.querySelectorAll('.sw7-full-hero-photo').length,loaded:media.tagName==='VIDEO'?media.readyState>=1:media.complete&&media.naturalWidth>0,paragraph:p?.textContent,paragraphRect:p?rect(p):null,headingRect:h?rect(h):null,copy:copy?rect(copy):null,marginBottom:p?parseFloat(getComputedStyle(p).marginBottom):null}})()`);
 assert(!r.overflow);assert(r.loaded,file+' media loaded');
 if(file==='interior-design.html'){assert.equal(r.photoCount,1);assert.equal(r.fit,'contain');assert(r.media.height<=height-r.header.height+2,'photo taller than visible screen');}
 else{assert.equal(r.fit,'cover');assert.equal(r.position,'absolute');assert(Math.abs(r.media.width-r.hero.width)<2&&Math.abs(r.media.height-r.hero.height)<2,'full hero video');assert(r.marginBottom>=30);assert(r.paragraphRect.top-r.headingRect.bottom>=25);assert(r.copy.bottom-r.paragraphRect.bottom>=45,'paragraph lower breathing room');assert(r.paragraphRect.bottom<r.hero.bottom-30,'paragraph clipped');}
 const image=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(out,file.replace('.html','')+'-'+width+'x'+height+'.png'),Buffer.from(image.data,'base64'));results.push(r);console.log('PASS',file,width,height);
 }
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
