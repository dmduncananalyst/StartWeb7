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
 if(process.argv.includes('--home')){
  for(const [width,height] of [[1207,531],[1810,796],[1180,780],[1920,1080],[1060,700],[1207,531]]){
   await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});if(!results.length)await send('Page.navigate',{url:'file:///'+path.join(root,'index.html').replaceAll('\\','/')});await delay(3000);
   const r=await evaluate(`(()=>{const hero=document.getElementById('sw7-home-fit'),engine=hero.querySelector('.analysis-engine'),rect=e=>e.getBoundingClientRect().toJSON();return {width:innerWidth,height:innerHeight,hero:rect(hero),engine:rect(engine),parts:[...hero.querySelectorAll('h1,p,.sw7-hero-actions>a,.journey-row,.analysis-top,.journey-node,.journey-axis')].map(e=>({text:e.textContent,box:rect(e)})),overflow:document.documentElement.scrollWidth>innerWidth}})()`);
   assert(!r.overflow);assert(r.hero.bottom<=height+2,'home hero below fold');assert(r.engine.bottom<=height+2,'home demo below fold');assert(r.engine.right<=width&&r.engine.left>=0,'home demo off screen');for(const e of r.parts)assert(e.box.top>=r.hero.top-1&&e.box.bottom<=height+2&&e.box.right<=width&&e.box.left>=0,'home clipped '+e.text);
   const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,'home-'+width+'x'+height+'.png'),Buffer.from(shot.data,'base64'));results.push(r);console.log('PASS home',width,height);
  }
  fs.writeFileSync(path.join(out,'home-results.json'),JSON.stringify(results,null,2));return;
 }
 if(process.argv.includes('--resize')){
  for(const spec of pages){
   await send('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});await send('Page.navigate',{url:'file:///'+path.join(root,spec.file).replaceAll('\\','/')});await delay(800);
   for(const [width,height] of [[490,598],[1810,796]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width===490});await delay(300);
    const state=await evaluate(`(()=>{const h=document.getElementById('sw7-industry-hero'),r=h.getBoundingClientRect();return {bottom:r.bottom,overflow:document.documentElement.scrollWidth>innerWidth,parts:[...h.querySelectorAll('h1,.sw7-unified-icon,.sw7-unified-intro,.sw7-unified-actions>a,.sw7-unified-media,.sw7-live-demo')].map(e=>{const b=e.getBoundingClientRect();return {top:b.top,bottom:b.bottom,left:b.left,right:b.right}})}})()`);
    assert((width<=700||state.bottom<=height+2)&&!state.overflow,spec.file+' resized hero');for(const p of state.parts)assert(p.top>=0&&p.bottom<=state.bottom+2&&p.left>=-1&&p.right<=width+1,spec.file+' resized clipping');
    await evaluate(`document.querySelector('#sw7-industry-hero [data-open-home-chat]').click()`);assert(await evaluate(`!document.getElementById('homeContactChat').hidden`),spec.file+' chat opens');await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
    results.push({file:spec.file,width,height,fit:true,chatOpens:true});
   }
   console.log('PASS resize and chat',spec.file);
  }
  fs.writeFileSync(path.join(out,'resize-results.json'),JSON.stringify(results,null,2));return;
 }
 for(const [width,height] of (process.argv.includes('--quick')?[[1810,796],[490,598]]:[[390,844],[490,598],[768,900],[1180,780],[1810,796],[1920,1080]])){
 await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=490});
 for(const spec of pages.filter(p=>!process.argv.includes('--no-cleaning')||p.file!=='commercial-cleaning.html')){
 const file=spec.file;await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(650);
 await evaluate(`Promise.all([...document.querySelectorAll('#sw7-industry-hero img')].map(i=>{i.loading='eager';return i.decode()}))`);
 await evaluate(`Promise.all([...document.querySelectorAll('#sw7-industry-hero video')].map(v=>v.videoWidth?Promise.resolve():new Promise(resolve=>{v.addEventListener('loadedmetadata',resolve,{once:true});setTimeout(resolve,4000)})))`);await delay(150);
 const r=await evaluate(`(()=>{const h=document.getElementById('sw7-industry-hero'),rect=e=>e.getBoundingClientRect().toJSON(),m=h.querySelector('.sw7-unified-media'),demo=h.querySelector('.sw7-live-demo');return {file:${JSON.stringify(file)},width:innerWidth,height:innerHeight,hero:rect(h),title:h.querySelector('h1').textContent,h1Count:document.querySelectorAll('h1').length,parts:[...h.querySelectorAll('.sw7-unified-icon,h1,.sw7-unified-intro,.sw7-unified-actions>a')].map(e=>({tag:e.tagName,text:e.textContent,box:rect(e),display:getComputedStyle(e).display})),visual:rect(h.querySelector('.sw7-unified-visual')),media:m?{box:rect(m),fit:getComputedStyle(m).objectFit,w:m.videoWidth||m.naturalWidth,h:m.videoHeight||m.naturalHeight}:null,demo:demo?{box:rect(demo),children:[...demo.children].map(rect)}:null,overflow:document.documentElement.scrollWidth>innerWidth,actions:h.querySelectorAll('.sw7-unified-actions>a').length,below:document.querySelectorAll('.sw7-mobile-below-hero:not([hidden])').length}})()`);
 const inBox=(a,b)=>a.left>=b.left-2&&a.right<=b.right+2&&a.top>=b.top-2&&a.bottom<=b.bottom+2;
 assert.equal(r.title,spec.title);assert.equal(r.h1Count,1);assert.equal(r.actions,2);assert.equal(r.below,0);assert(!r.overflow,file+' overflow');if(width>700)assert(r.hero.bottom<=height+2,file+' below fold');
 for(const p of r.parts)assert(p.display!=='none'&&p.box.width>0&&inBox(p.box,r.hero),file+' content clipped '+p.tag);
 if(r.media){if(!r.media.w)console.log(await evaluate(`(()=>{const v=document.querySelector('#sw7-industry-hero video');return {html:v.outerHTML,src:v.currentSrc,error:v.error?.message,network:v.networkState,ready:v.readyState}})()`));assert(r.media.w>0&&r.media.h>0,file+' media load');assert.equal(r.media.fit,'contain');assert(Math.abs(r.media.box.width/r.media.box.height-r.media.w/r.media.h)<.015,file+' media aspect ratio');assert(inBox(r.media.box,r.visual)&&inBox(r.media.box,r.hero),file+' media cropped');if(width<=700)assert(r.media.box.width>=r.hero.width*.88,file+' mobile picture too small');}
 else{assert(r.demo,file+' missing demo');assert(inBox(r.demo.box,r.visual),file+' demo clipped '+JSON.stringify(r.demo.box));for(const box of r.demo.children)assert(inBox(box,r.demo.box),file+' demo child clipped');}
 const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,file.replace('.html','')+'-'+width+'x'+height+'.png'),Buffer.from(shot.data,'base64'));results.push(r);fs.writeFileSync(path.join(out,process.argv.includes('--quick')?'quick-results.json':'results.json'),JSON.stringify(results,null,2));console.log('PASS',file,width,height);
 }
 }
 console.log('PASS',results.length,'complete-frame layouts');
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
