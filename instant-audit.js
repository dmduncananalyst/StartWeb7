(function(){
 'use strict';
 const form=document.getElementById('instantAuditForm');
 if(!form)return;
 const endpoint='https://startweb7-audit.desirae.workers.dev';
 const button=document.getElementById('runInstantAudit');
 const error=document.getElementById('auditError');
 const progress=document.getElementById('auditProgress');
 const results=document.getElementById('auditResults');
 const cards=document.getElementById('auditCards');
 const summary=document.getElementById('auditSummary');
 const metadata=document.getElementById('auditMetadata');
 const ending=document.getElementById('auditEnding');
 let running=false;
 const store={get(key){try{return sessionStorage.getItem(key);}catch{return null;}},set(key,value){try{sessionStorage.setItem(key,value);}catch{}},remove(key){try{sessionStorage.removeItem(key);}catch{}}};
 function element(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
 function safeURL(value){try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&!u.username&&!u.password?u.href:null;}catch{return null;}}
 function link(value,label){const url=safeURL(value);if(!url)return element('span',label||'');const n=element('a',label||url);n.href=url;n.target='_blank';n.rel='noopener noreferrer';return n;}
 function list(parent,title,items){if(!items?.length)return;parent.appendChild(element('h4',title));const ul=element('ul');items.forEach(item=>{const li=element('li');li.appendChild(link(item.url,item.title||item.url));if(item.position!=null)li.appendChild(element('span',', position '+item.position));ul.appendChild(li);});parent.appendChild(ul);}
 function render(result,cached){
  if(!result||!Array.isArray(result.cards)||result.cards.length!==5)throw new Error('The audit returned an incomplete response. Please try again later.');
  cards.replaceChildren();
  result.cards.forEach(card=>{
   const section=element('article',undefined,'audit-result-card');section.appendChild(element('h3',card.label));
   const ai=['google_ai','chatgpt','claude'].includes(card.source);
   const statuses={found:ai?'Mentioned':'Found',not_found:ai?'Not mentioned in this answer':'Not found in this result',uncertain:'Could not confirm',unable:'Unable to check this source right now'};
   section.appendChild(element('div',statuses[card.status]||statuses.unable,'audit-status '+card.status));
   if(card.position!=null)section.appendChild(element('p',(card.source==='google_maps'?'Map position: ':'Organic position: ')+card.position));
   if(card.match){section.appendChild(element('p',card.match.title));if(card.match.url){const p=element('p');p.appendChild(link(card.match.url,card.match.url));section.appendChild(p);}if(card.match.description)section.appendChild(element('p',card.match.description));if(card.match.rating!=null||card.match.reviews!=null)section.appendChild(element('p',[card.match.rating!=null?'Rating: '+card.match.rating:null,card.match.reviews!=null?'Reviews: '+card.match.reviews:null].filter(Boolean).join(', ')));}
   if(card.answer){section.appendChild(element('h4','Returned answer'));section.appendChild(element('div',card.answer,'audit-answer'));}
   list(section,'Referenced sources',card.citations);
   list(section,ai?'Other businesses returned':card.source==='google_maps'?'Competing listings':'Results appearing above or instead',card.competitors);
   cards.appendChild(section);
  });
  const found=result.cards.filter(c=>c.status==='found').length;
  const unavailable=result.cards.filter(c=>c.status==='unable').length;
  summary.textContent='Your business appeared in '+found+' of 5 places checked';
  const date=new Date(result.created_at);metadata.textContent=(cached?'Recent saved audit':'Audit completed')+(Number.isNaN(date.getTime())?'':', '+date.toLocaleString())+(unavailable?', '+unavailable+' source'+(unavailable===1?' was':'s were')+' unavailable':'');
  ending.textContent=found===5?'Your business appeared in all five places checked':unavailable===5?'The five sources could not be checked right now':'Review the results above and talk with us about your website, SEO + AEO';
  results.hidden=false;progress.hidden=true;
  try{store.set('sw7AuditResult',JSON.stringify({result,cached:true,saved_at:Date.now()}));}catch{}
 }
 async function read(response){let data;try{data=await response.json();}catch{throw new Error('The audit service could not return results. Please try again later.');}if(!response.ok)throw new Error(data.error||'The audit is unavailable right now.');return data;}
 async function waitForResult(id){
  const start=Date.now();
  while(Date.now()-start<120000){
   await new Promise(resolve=>setTimeout(resolve,2500));
   const data=await read(await fetch(endpoint+'/audit/status?id='+encodeURIComponent(id),{cache:'no-store',signal:AbortSignal.timeout(12000)}));
   if(data.state==='complete')return data;
   if(data.state==='interrupted')throw new Error(data.message);
  }
  throw new Error('The audit is taking longer than expected. No new checks have been started.');
 }
 form.addEventListener('submit',async function(event){
  event.preventDefault();if(running||!form.reportValidity())return;
  running=true;button.disabled=true;button.textContent='Checking Your Business';error.hidden=true;progress.hidden=false;results.hidden=true;form.setAttribute('aria-busy','true');
  const payload={business_name:form.elements.business_name.value.trim(),website:form.elements.website.value.trim(),city:form.elements.city.value.trim(),industry:form.elements.industry.value.trim()};
  try{
   // Exactly one POST. Polling reads an existing reservation, it never buys
   // another audit. No submit, click, or API call is triggered on page load.
   let data=await read(await fetch(endpoint+'/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(100000)}));
   if(data.state==='running')data=await waitForResult(data.request_id);
   if(data.state==='interrupted')throw new Error(data.message);
   render(data.result,data.cached);
   summary.focus({preventScroll:true});results.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }catch(e){progress.hidden=true;error.textContent=e.name==='TimeoutError'||e.name==='AbortError'?'The connection timed out. Your check may still be running, submitting the same details will reuse it.':e.message||'The audit is unavailable right now. Please try again later.';error.hidden=false;}
  finally{running=false;button.disabled=false;button.textContent='Run My Instant Audit';form.removeAttribute('aria-busy');}
 });
 // Restore only a completed local result. Refreshing never reruns paid checks.
 try{const saved=JSON.parse(store.get('sw7AuditResult'));if(saved&&Date.now()-saved.saved_at<86400000)render(saved.result,true);else store.remove('sw7AuditResult');}catch{store.remove('sw7AuditResult');}
})();
