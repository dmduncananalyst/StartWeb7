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




const results=[];const files=fs.readdirSync(root).filter(f=>f.endsWith('.html')&&fs.readFileSync(f,'utf8').includes('universal-nav-fix.js'));
for(const width of [300,390]){await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:true});for(const file of files){
await send('Page.navigate',{url:'file:///'+path.join(root,file).replaceAll('\\','/')});await delay(450);
const r=await evaluate("(()=>{const issues=[],adjusted=[];for(const h of document.querySelectorAll('h1,h2,h3')){if(!h.getClientRects().length||!h.clientWidth||getComputedStyle(h).clip!=='auto'||getComputedStyle(h).clipPath!=='none')continue;if(h.hasAttribute('data-sw7-title-fit'))adjusted.push({text:h.textContent.trim(),size:getComputedStyle(h).fontSize});const walk=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);while(walk.nextNode()){const n=walk.currentNode;for(const m of n.textContent.matchAll(/\\S+/g)){const range=document.createRange();range.setStart(n,m.index);range.setEnd(n,m.index+m[0].length);const rects=[...range.getClientRects()].filter(r=>r.width&&r.height);if(new Set(rects.map(r=>Math.round(r.top))).size>1)issues.push('split word '+m[0]);if(rects.some(r=>r.left<h.getBoundingClientRect().left-1||r.right>h.getBoundingClientRect().right+1))issues.push('overflow '+m[0]);}}}return{issues,adjusted}})()");results.push({file,width,...r});}
console.log('Audited',files.length,'pages at',width,'pixels');fs.writeFileSync(path.join(out,'mobile-title-results.json'),JSON.stringify(results,null,2));}
const failures=results.filter(r=>r.issues.length);console.log(JSON.stringify(failures));assert.equal(failures.length,0,'Mobile title failures');console.log('PASS',results.length,'mobile title audits');
}finally{if(ws)ws.close();chrome.kill();}})().catch(e=>{fs.writeFileSync(path.join(out,'error.txt'),String(e.stack));console.error(e);process.exitCode=1});
