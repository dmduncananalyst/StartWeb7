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

 for(const [width,height] of [[260,530],[390,844],[490,598],[1207,531],[1810,796]]){
 await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
 for(const file of ['index.html','industries.html']){
 await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(3200);
 const r=await evaluate(`(()=>{const rect=e=>e.getBoundingClientRect().toJSON();return {overflow:document.documentElement.scrollWidth>innerWidth,hero:rect(document.querySelector('#sw7-industry-hero,#sw7-home-fit')),engine:document.querySelector('.analysis-engine')?rect(document.querySelector('.analysis-engine')):null,nodes:[...document.querySelectorAll('.journey-row')].filter(e=>getComputedStyle(e).display!=='none').flatMap(e=>[...e.querySelectorAll('.journey-node,.journey-stage')].map(rect))}})()`);
 assert(!r.overflow,file+' overflow '+width);if(width>700)assert(r.hero.bottom<=height+2,file+' hero fold');
 if(width<=600&&r.engine){assert(r.engine.height<270,'phone demo too tall');for(const b of r.nodes)assert(b.left>=r.engine.left&&b.right<=r.engine.right,'phone stages clipped');}
 if(file==='index.html'&&width<600){await evaluate(`document.querySelector('.work-grid').scrollIntoView()`);await delay(150);const cards=await evaluate(`[...document.querySelectorAll('.work-project')].filter(e=>e.querySelector('.work-preview--mobile')).map(e=>{const i=e.querySelector('.work-preview--mobile'),o=e.querySelector('.work-overlay');return {image:i.getBoundingClientRect().toJSON(),overlay:o.getBoundingClientRect().toJSON(),buttons:[...e.querySelectorAll('.work-actions>a,.portfolio-contact-trigger')].map(b=>b.getBoundingClientRect().height)}})`);for(const c of cards){assert(c.overlay.top>=c.image.bottom-2,'overlay covers website');for(const h of c.buttons)assert(h<=42,'portfolio button too tall '+JSON.stringify(c));}}
 await evaluate('scrollTo(0,0)');let shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,'corrected-'+file+'-'+width+'.png'),Buffer.from(shot.data,'base64'));
 if(width<600){await evaluate(`document.querySelector('.sw7-compact-toggle').click();[...document.querySelectorAll('.sw7-clean-trigger')].find(e=>e.textContent.trim()==='Industries').click()`);await delay(350);const tiles=await evaluate(`[...document.querySelectorAll('.sw7-industries-visual-menu .sw7-visual-tile')].map(e=>{const b=e.getBoundingClientRect(),a=e.querySelector('.sw7-visual-art').getBoundingClientRect();return {left:b.left,right:b.right,center:b.left+b.width/2,art:a.left+a.width/2}})`);for(const t of tiles){assert(t.left>=-1&&t.right<=width+1,'menu overflows');assert(Math.abs(t.center-t.art)<2,'icon off center');}shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,'menu-'+width+'.png'),Buffer.from(shot.data,'base64'));}
 console.log('PASS',file,width,height);
 }
 }
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
