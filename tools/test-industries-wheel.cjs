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




for(const width of [1207,1810]){
await send('Emulation.setDeviceMetricsOverride',{width,height:796,deviceScaleFactor:1,mobile:false});await send('Page.navigate',{url:'file:///'+path.join(root,'index.html').replaceAll('\\','/')});await delay(1800);
const point=await evaluate("(()=>{const m=document.querySelector('.sw7-industries-visual-menu'),t=m.parentElement.querySelector('.sw7-clean-trigger');t.click();const r=m.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+50}})()");
const state=()=>evaluate("(()=>{const m=document.querySelector('.sw7-industries-visual-menu');return{menu:m.scrollTop,page:scrollY,max:m.scrollHeight-m.clientHeight,open:m.parentElement.classList.contains('open')}})()");
const start=await state();assert(start.max>0,'Menu not scrollable');await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point});await send('Input.dispatchMouseEvent',{type:'mouseWheel',...point,deltaX:0,deltaY:180});await delay(300);const moved=await state();assert(moved.menu>start.menu,'Wheel failed over menu content');assert.equal(moved.page,start.page);assert(moved.open);
await evaluate("document.querySelector('.sw7-industries-visual-menu').scrollTop=100000");await send('Input.dispatchMouseEvent',{type:'mouseWheel',...point,deltaX:0,deltaY:250});await delay(300);assert.equal((await state()).page,start.page,'Scroll escaped at bottom');
await send('Input.dispatchMouseEvent',{type:'mouseWheel',...point,deltaX:0,deltaY:-180});await delay(300);assert((await state()).menu<start.max,'Upward scroll failed');
await evaluate("document.querySelector('.sw7-industries-visual-menu').scrollTop=0");await send('Input.dispatchMouseEvent',{type:'mouseWheel',...point,deltaX:0,deltaY:-250});await delay(200);assert.equal((await state()).page,start.page,'Scroll escaped at top');console.log('PASS Industries wheel scrolling and both boundaries',width);
}
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
