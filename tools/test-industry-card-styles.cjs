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




for(const width of [390,768,1810]){
await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width<700});await send('Page.navigate',{url:'file:///'+path.join(root,'index.html').replaceAll('\\','/')});await delay(1800);
const size=await evaluate("getComputedStyle(document.querySelector('.sw7-home-industry-card h3')).fontSize");assert.equal(size,width<=700?'22px':'18px');
await send('DOM.enable');await send('CSS.enable');const doc=await send('DOM.getDocument');const node=await send('DOM.querySelector',{nodeId:doc.root.nodeId,selector:'.sw7-home-industry-card'});await send('CSS.forcePseudoState',{nodeId:node.nodeId,forcedPseudoClasses:['hover','active']});await delay(350);
const color=await evaluate("getComputedStyle(document.querySelector('.sw7-home-industry-view')).color");assert.equal(color,'rgb(7, 132, 255)');console.log('PASS industry heading and brand blue interaction',width,size,color);
}
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
