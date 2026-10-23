const fs=require('fs'),path=require('path'),{spawn}=require('child_process'),assert=require('assert');
const root=process.cwd(),out=path.join(root,'verification/interior-review');fs.mkdirSync(out,{recursive:true});
const source=fs.readFileSync('tools/verify-oct22.cjs','utf8');
const LocalWebSocket=Function('require',source.slice(source.indexOf('class LocalWebSocket'),source.indexOf('const chrome=spawn'))+';return LocalWebSocket;')(require);
const profile=path.join(out,'chrome-profile');
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true});
let log='',ws,n=0;chrome.stderr.on('data',d=>log+=d);const pending=new Map(),delay=ms=>new Promise(r=>setTimeout(r,ms));
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
(async()=>{try{
 for(let i=0;i<100&&!log.includes('DevTools listening on');i++)await delay(100);
 const port=log.match(/127.0.0.1:(\d+)/)[1],targets=await(await fetch('http://127.0.0.1:'+port+'/json')).json();ws=new LocalWebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);await ws.ready;
 ws.onmessage=e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(Error(JSON.stringify(d.error))):p.resolve(d.result);}};
 await send('Page.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['http://*','https://*']});
 for(const [name,format,w,h] of [['card','webp'],['directory','webp'],['feature','webp'],['icon','png',360,280]]){
 const base='assets/industries/interior-design-'+name+'-v2',b64=fs.readFileSync(base+'.png').toString('base64');
 const result=await evaluate(`new Promise((resolve,reject)=>{let i=new Image();i.onload=()=>{let c=document.createElement('canvas');c.width=${w||'i.naturalWidth'};c.height=${h||'i.naturalHeight'};c.getContext('2d').drawImage(i,0,0,c.width,c.height);resolve({width:c.width,height:c.height,data:c.toDataURL('image/${format}',.94).split(',')[1]})};i.onerror=reject;i.src='data:image/png;base64,${b64}'})`);
 fs.writeFileSync(base+'.'+format,Buffer.from(result.data,'base64'));console.log('ASSET',base,result.width,result.height);
 }
 const results=[];
 for(const width of [390,768,1920]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});
 for(const file of ['index.html','industries.html','interior-design.html']){
 await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(1000);
 await evaluate(`Promise.all([...document.querySelectorAll('img[src*="interior-design"]')].map(i=>{i.loading='eager';return i.decode()}))`);
 const r=await evaluate(`(()=>{const card=document.querySelector('.sw7-interior-card'),p=document.querySelector('.home-service.web p'),button=document.querySelector('.home-service.web .home-link');return {file:${JSON.stringify(file)},width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,cardText:card?.innerText,cardParagraphs:card?.querySelectorAll('p').length,cardSize:card?{w:card.getBoundingClientRect().width,h:card.getBoundingClientRect().height,pw:card.previousElementSibling.getBoundingClientRect().width,ph:card.previousElementSibling.getBoundingClientRect().height}:null,gap:button?button.getBoundingClientRect().top-p.getBoundingClientRect().bottom:null,buttons:[...document.querySelectorAll('.sw7-new-cta,.sw7-bottom-cta-pair .sw7-hero-primary')].map(x=>x.textContent),photo:document.querySelector('.sw7-interior-card img,.sw7-full-hero-photo')?.getAttribute('src')||card?.style.getPropertyValue('--card-image'),navIcon:document.querySelector('.sw7-industries-visual-menu a[href="interior-design.html"] .sw7-visual-art')?.getAttribute('style')}})()`);
 assert(!r.overflow);if(r.cardSize){assert.equal(r.cardParagraphs,0);assert(r.cardText.includes('INTERIOR DESIGN'));assert(Math.abs(r.cardSize.w-r.cardSize.pw)<2&&Math.abs(r.cardSize.h-r.cardSize.ph)<2);}if(r.gap!==null)assert(r.gap>=0&&r.gap<50,'button dead space '+r.gap);if(file==='interior-design.html')assert.deepEqual(r.buttons,['Get More Clients','Get More Clients']);assert(r.navIcon.includes('icon-v2.png'));
 const image=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(out,file.replace('.html','')+'-'+width+'.png'),Buffer.from(image.data,'base64'));results.push(r);console.log('PASS',file,width);
 }
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{console.error(e);process.exitCode=1});
