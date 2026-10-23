const fs=require('fs'),path=require('path'),{spawn}=require('child_process'),assert=require('assert');
const root=process.cwd(),out=path.join(root,'verification/oct22');
class LocalWebSocket {
 constructor(url){this.ready=new Promise((resolve,reject)=>{const u=new URL(url);this.socket=require('net').connect(+u.port,u.hostname,()=>this.socket.write(`GET ${u.pathname} HTTP/1.1\r\nHost: ${u.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${require('crypto').randomBytes(16).toString('base64')}\r\nSec-WebSocket-Version: 13\r\n\r\n`));let handshake=true,buf=Buffer.alloc(0);this.socket.on('error',reject);this.socket.on('data',chunk=>{buf=Buffer.concat([buf,chunk]);if(handshake){const i=buf.indexOf('\r\n\r\n');if(i<0)return;buf=buf.subarray(i+4);handshake=false;resolve();}while(buf.length>=2){let len=buf[1]&127,offset=2;if(len===126){if(buf.length<4)return;len=buf.readUInt16BE(2);offset=4;}else if(len===127){if(buf.length<10)return;len=Number(buf.readBigUInt64BE(2));offset=10;}if(buf.length<offset+len)return;const msg=buf.subarray(offset,offset+len).toString();buf=buf.subarray(offset+len);if(this.onmessage)this.onmessage({data:msg});}});});}
 send(s){const data=Buffer.from(s),mask=require('crypto').randomBytes(4);let head;if(data.length<126){head=Buffer.from([129,128|data.length]);}else if(data.length<65536){head=Buffer.alloc(4);head[0]=129;head[1]=254;head.writeUInt16BE(data.length,2);}else{head=Buffer.alloc(10);head[0]=129;head[1]=255;head.writeBigUInt64BE(BigInt(data.length),2);}const body=Buffer.from(data);for(let i=0;i<body.length;i++)body[i]^=mask[i%4];this.socket.write(Buffer.concat([head,mask,body]));}
 close(){this.socket.destroy();}
}
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+path.join(out,'chrome-profile-'+Date.now()),'about:blank'],{windowsHide:true});
let logs='';chrome.stderr.on('data',d=>logs+=d.toString());
const delay=n=>new Promise(r=>setTimeout(r,n));
let ws,id=0;const pending=new Map();
function send(method,params={}){return new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
(async()=>{
 try{
 for(let i=0;i<100&&!logs.includes('DevTools listening on');i++)await delay(100);
 const port=logs.match(/ws:\/\/127.0.0.1:(\d+)/)?.[1];if(!port)throw Error(logs||'Chrome did not start');console.log('Chrome ready',port);
 const targets=await (await fetch('http://127.0.0.1:'+port+'/json')).json();
 console.log('Connecting CDP');ws=new LocalWebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await ws.ready;console.log('CDP ready');
 ws.onmessage=e=>{let d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);if(d.error)p.reject(Error(JSON.stringify(d.error)));else p.resolve(d.result);}};
 console.log(await send('Browser.getVersion'));await send('Page.enable');await send('Network.enable');await send('Network.setBlockedURLs',{urls:['http://*','https://*']});
 for(const name of ['card','feature']){
 const b64=fs.readFileSync('assets/industries/interior-design-'+name+'.png').toString('base64');
 const result=await evaluate(`new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);resolve({w:c.width,h:c.height,data:c.toDataURL('image/webp',.94).split(',')[1]})};i.onerror=reject;i.src='data:image/png;base64,${b64}';})`);
 fs.writeFileSync('assets/industries/interior-design-'+name+'.webp',Buffer.from(result.data,'base64'));console.log(name,result.w,result.h);
 }
 const iconB64=fs.readFileSync('assets/industries/interior-design-icon.png').toString('base64');
 const iconData=await evaluate(`new Promise(resolve=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=360;c.height=280;c.getContext('2d').drawImage(i,0,0,360,280);resolve(c.toDataURL('image/png').split(',')[1])};i.src='data:image/png;base64,${iconB64}';})`);
 fs.writeFileSync('assets/industries/interior-design-icon.png',Buffer.from(iconData,'base64'));
 const specs=JSON.parse(fs.readFileSync(out+'/approved-content.json','utf8'));
 const results=[];
 for(const width of (process.argv.includes('--debug')?[390]:[390,768,1440])){
 await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});
 for(const file of (process.argv.includes('--cards')?['index.html']:process.argv.includes('--final')?['interior-design.html','index.html','industries.html','about.html']:[...specs.map(s=>s.file),'index.html','industries.html'])){
 await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(2000);
 await evaluate(`Promise.all([...document.querySelectorAll('img[src*="interior-design"]')].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))`);
 const state=await evaluate(`({title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim()),meta:document.querySelector('meta[name="description"]').content,canonical:document.querySelector('link[rel="canonical"]').href,blocks:[...document.querySelectorAll('.sw7-approved-intro,.city-hero-description,.sw7-approved-body > h2,.sw7-approved-body > p')].map(e=>e.textContent.trim()),overflow:document.documentElement.scrollWidth>innerWidth,bodyWidth:document.documentElement.scrollWidth,images:[...document.querySelectorAll('img[src*="interior-design"]')].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})),cards:[...document.querySelectorAll('a.sw7-interior-card')].filter(e=>!e.closest('[data-sw7-industry-clone]')).map(e=>({text:e.innerText,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})),nav:!!document.querySelector('.sw7-industries-visual-menu a[href="interior-design.html"]'),chat:!!document.querySelector('#homeContactChat'),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)),hero:document.querySelector('h1').getBoundingClientRect().toJSON()})`);
 const spec=specs.find(s=>s.file===file);
 if(spec){assert.deepEqual(state.h1,[spec.h1],file);assert.equal(state.meta,spec.meta,file);assert.equal(state.canonical,'https://startweb7.com/'+file);const expected=spec.blocks.map(b=>b.text);assert.deepEqual(state.blocks.slice(0,expected.length),expected,file+' exact copy');assert(state.schema.some(s=>s['@type']==='Service'&&s.description===spec.meta));}
 assert(!state.overflow,file+' '+width+' overflow '+state.bodyWidth);assert(state.images.every(i=>i.ok),file+' missing images '+JSON.stringify(state.images));assert(state.nav,file+' navigation');assert(state.chat,file+' chat');
 if(file==='index.html'||file==='industries.html'){assert.equal(state.cards.length,1,file+' card count');assert(state.cards[0].text.includes(file==='index.html'?'A distinctive online presence for studios creating remarkable residential and commercial spaces.':'Website design and search visibility services for interior designers and design studios.'));
 const card=await evaluate(`(()=>{const c=document.querySelector('.sw7-interior-card'),p=c.previousElementSibling,r=c.getBoundingClientRect(),pr=p.getBoundingClientRect();c.style.animation='none';c.scrollIntoView({block:'center',behavior:'instant'});return {w:r.width,h:r.height,pw:pr.width,ph:pr.height}})()`);assert(Math.abs(card.w-card.pw)<2&&Math.abs(card.h-card.ph)<2,file+' matching dimensions');
 if(file==='index.html'){await evaluate(`(()=>{document.querySelector('.sw7-home-industry-track').style.animation='none';const w=document.querySelector('.sw7-home-industry-window'),c=document.querySelector('.sw7-interior-card');w.style.scrollSnapType='none';w.scrollBy({left:c.getBoundingClientRect().left-w.getBoundingClientRect().left,behavior:'instant'})})()`);await delay(600);}
 const rect=await evaluate(`(()=>{const r=document.querySelector('.sw7-interior-card').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height,scale:1}})()`);
 console.log('Card rect',file,width,rect,await evaluate(`[...document.querySelectorAll('.sw7-home-industry-window,.sw7-home-industry-track,.sw7-home-industry-grid')].map(e=>({class:e.className,display:getComputedStyle(e).display,transform:getComputedStyle(e).transform,animation:getComputedStyle(e).animation,scrollLeft:e.scrollLeft,width:e.clientWidth}))`));const cardShot=await send('Page.captureScreenshot',{format:'png',fromSurface:false});fs.writeFileSync(out+'/'+file.replace('.html','')+'-interior-card-'+width+'.png',Buffer.from(cardShot.data,'base64'));
 await evaluate(`document.querySelector('.sw7-interior-card').click()`);await delay(700);assert.equal(await evaluate('location.pathname.split("/").pop()'),'interior-design.html',file+' card target');await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(700);
 }
 if(file==='interior-design.html'){
 const chat=await evaluate(`(()=>{document.querySelector('[data-open-home-chat]').click();const c=document.querySelector('#homeContactChat');return {display:getComputedStyle(c).display,hidden:c.hidden,cls:c.className}})()`);assert(!chat.hidden&&chat.display!=='none','chat opens');state.chatOpened=chat;await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
 }
 const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(out+'/'+file.replace('.html','')+'-'+width+'.png',Buffer.from(shot.data,'base64'));
 results.push({file,width,...state});console.log('PASS',file,width);
 }
 }
 fs.writeFileSync(out+(process.argv.includes('--cards')?'/card-browser-results.json':process.argv.includes('--final')?'/final-browser-results.json':'/browser-results.json'),JSON.stringify(results,null,2));
 }finally{if(ws)ws.close();chrome.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
