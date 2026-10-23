const fs=require('fs'),path=require('path'),{spawn}=require('child_process'),assert=require('assert');
const root=process.cwd(),out=path.join(root,'verification/industry-audit');
const pages=JSON.parse(fs.readFileSync(path.join(out,'pages.json')));
const source=fs.readFileSync('tools/verify-oct22.cjs','utf8');
const LocalWebSocket=Function('require',source.slice(source.indexOf('class LocalWebSocket'),source.indexOf('const chrome=spawn'))+';return LocalWebSocket;')(require);
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
 if(process.argv.includes('--resize')){
  for(const spec of pages){
   await send('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
   await send('Page.navigate',{url:'file:///'+path.join(root,spec.file).replaceAll('\\','/')});await delay(700);
   for(const [width,height] of [[490,598],[1180,780],[390,844]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=490});await delay(300);
    const r=await evaluate(`(()=>{const h=document.getElementById('sw7-industry-hero'),b=h.getBoundingClientRect();return {bottom:b.bottom,top:b.top,overflow:document.documentElement.scrollWidth>innerWidth,parts:[...h.querySelectorAll('.sw7-unified-icon,h1,p,.sw7-unified-actions>a')].map(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right}})}})()`);
    assert(!r.overflow&&r.bottom<=height+2,spec.file+' resized hero');for(const p of r.parts)assert(p.top>=r.top-1&&p.bottom<=r.bottom+1&&p.left>=-1&&p.right<=width+1,spec.file+' resized clipping');
    await evaluate(`document.querySelector('#sw7-industry-hero [data-open-home-chat]').click()`);await delay(50);
    assert(await evaluate(`(()=>{const c=document.getElementById('homeContactChat');return !c.hidden&&getComputedStyle(c).display!=='none'})()`),spec.file+' chat');
    await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
    results.push({file:spec.file,width,height,heroFits:true,chatOpens:true});
   }
   console.log('PASS resize and chat',spec.file);
  }
  fs.writeFileSync(path.join(out,'resize-results.json'),JSON.stringify(results,null,2));return;
 }
 for(const [width,height] of [[390,844],[490,598],[768,900],[1180,780],[1810,796],[1920,1080]]){
 await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=490});
 for(const spec of pages){
 const file=spec.file;await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(650);
 await evaluate(`Promise.all([...document.querySelectorAll('#sw7-industry-hero img')].map(i=>i.decode()))`);await delay(100);
 const r=await evaluate(`(()=>{const hero=document.getElementById('sw7-industry-hero'),rect=e=>e.getBoundingClientRect().toJSON(),els=[...hero.querySelectorAll('.sw7-unified-icon,h1,p,.sw7-unified-actions>a')],m=hero.querySelector('.sw7-unified-media');return {file:${JSON.stringify(file)},width:innerWidth,height:innerHeight,hero:rect(hero),h1:hero.querySelector('h1').textContent,h1Count:document.querySelectorAll('h1').length,elements:els.map(e=>({tag:e.tagName,text:e.textContent,box:rect(e),display:getComputedStyle(e).display,visible:getComputedStyle(e).visibility})),media:rect(m),fit:getComputedStyle(m).objectFit,loaded:m.tagName==='VIDEO'?!!m.currentSrc:m.complete&&m.naturalWidth>0,icon:hero.querySelector('.sw7-unified-icon').naturalWidth,overflow:document.documentElement.scrollWidth>innerWidth,actions:hero.querySelectorAll('.sw7-unified-actions>a').length,belowHero:document.querySelectorAll('.sw7-mobile-below-hero:not([hidden])').length}})()`);
 assert.equal(r.h1,spec.title);assert.equal(r.h1Count,1);assert.equal(r.actions,2);assert.equal(r.belowHero,0);assert(!r.overflow,file+' overflow');assert(r.loaded&&r.icon>0,file+' media/icon');assert.equal(r.fit,'cover');assert(Math.abs(r.media.width-r.hero.width)<2&&Math.abs(r.media.height-r.hero.height)<2,file+' media fills hero');assert(r.hero.bottom<=height+2,file+' hero below fold '+r.hero.bottom);
 for(const e of r.elements){assert(e.display!=='none'&&e.visible!=='hidden'&&e.box.width>0&&e.box.height>0,file+' hidden '+e.tag);assert(e.box.top>=r.hero.top-1&&e.box.bottom<=r.hero.bottom+1,file+' vertical clipping '+e.tag);assert(e.box.left>=-1&&e.box.right<=width+1,file+' horizontal clipping '+e.tag);}
 const image=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,file.replace('.html','')+'-'+width+'x'+height+'.png'),Buffer.from(image.data,'base64'));results.push(r);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log('PASS',file,width,height);
 }
 }
 console.log('PASS',results.length,'industry hero layouts');
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
