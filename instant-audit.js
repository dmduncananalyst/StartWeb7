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
 let currentResult=null;
 const store={get(key){try{return sessionStorage.getItem(key);}catch{return null;}},set(key,value){try{sessionStorage.setItem(key,value);}catch{}},remove(key){try{sessionStorage.removeItem(key);}catch{}}};
 function element(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
 function safeURL(value){try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&!u.username&&!u.password?u.href:null;}catch{return null;}}
 function link(value,label){const url=safeURL(value);if(!url)return element('span',label||'');const n=element('a',label||url);n.href=url;n.target='_blank';n.rel='noopener noreferrer';return n;}
 function list(parent,title,items){if(!items?.length)return;parent.appendChild(element('h4',title));const ul=element('ul');items.forEach(item=>{const li=element('li');li.appendChild(link(item.url,item.title||item.url));if(item.position!=null)li.appendChild(element('span',', position '+item.position));ul.appendChild(li);});parent.appendChild(ul);}
 function inline(parent,text){
  const tokens=/\[([^\]\n]+)\]\(([^\s)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|`?\s*\[Highlight start\]\s*([\s\S]+?)\s*\[Highlight end\]\s*`?|`([^`]+)`|(https?:\/\/[^\s<>()]+)|\*([^*]+)\*/gi;
  let start=0;
  for(const match of text.matchAll(tokens)){
   parent.append(document.createTextNode(text.slice(start,match.index)));
   if(match[1])parent.append(link(match[2],match[1]));
   else if(match[7])parent.append(link(match[7],match[7]));
   else parent.append(element(match[5]?'mark':match[6]?'code':match[8]?'em':'strong',match[3]||match[4]||match[5]||match[6]||match[8]));
   start=match.index+match[0].length;
  }
  parent.append(document.createTextNode(text.slice(start)));
 }
 function formattedAnswer(text){
  const answer=element('div',undefined,'audit-answer');
  const lines=text.replace(/\r\n?/g,'\n')
   .replace(/^(\s*(?:\d+[.)]|[-*+])\s+)\*\*\s*\n+\s*([^\n]+?)\s*\n+\s*\*\*/gm,'$1**$2**')
   .replace(/\[Highlight start\]([\s\S]+?)\[Highlight end\]/gi,(_,value)=>'[Highlight start]'+value.replace(/\s+/g,' ')+'[Highlight end]')
   .split('\n');
  let paragraph=[],lists=[];
  function flush(){if(paragraph.length){const p=element('p');inline(p,paragraph.join(' '));answer.append(p);paragraph=[];}}
  for(const line of lines){
   const trimmed=line.trim();
   if(!trimmed){flush();continue;}
   const heading=trimmed.match(/^#{1,6}\s+(.+)/);
   const item=line.match(/^(\s*)(?:(\d+)[.)]|[-*+])\s+(.+)$/);
   if(item){
    flush();
    const indent=item[1].replace(/\t/g,'    ').length, tag=item[2]?'ol':'ul';
    while(lists.length&&indent<lists.at(-1).indent)lists.pop();
    const previous=lists.at(-1);
    if(!previous||indent>previous.indent||tag!==previous.node.tagName.toLowerCase()){
     if(previous&&indent===previous.indent)lists.pop();
     const node=element(tag);
     if(item[2]&&Number(item[2])!==1)node.start=Number(item[2]);
     (lists.at(-1)?.node.lastElementChild||answer).append(node);
     lists.push({node,indent});
    }
    const li=element('li');inline(li,item[3]);lists.at(-1).node.append(li);continue;
   }
   lists=[];
   if(heading){flush();const h=element('h5');inline(h,heading[1]);answer.append(h);}
   else paragraph.push(trimmed.replace(/^```[a-z]*$/i,''));
  }
  flush();
  return answer;
 }
 function render(result,cached){
  if(!result||!Array.isArray(result.cards)||result.cards.length!==5)throw new Error('The audit returned an incomplete response. Please try again later.');
  currentResult=result;
  cards.replaceChildren();
  result.cards.forEach(card=>{
   const section=element('article',undefined,'audit-result-card');section.appendChild(element('h3',card.label));
   const ai=['google_ai','chatgpt','claude'].includes(card.source);
   const query=typeof card.query==='string'?card.query.trim():'';
   const context=element('div',undefined,'audit-query');
   context.appendChild(element('h4',ai?'Question Asked':'Keyword Search'));
   context.appendChild(element('p',query||'The audit service did not report the submitted query.'));
   section.appendChild(context);
   const aiStatuses={found:'Business Appeared in the Answer',not_found:'Business Did Not Appear in the Recommendations',informational:'Informational Answer',uncertain:'Business match could not be confirmed',unable:'Provider Unavailable'};
   const searchStatuses={found:'Found',not_found:'Not found in this result',uncertain:'Could not confirm',unable:'Unable to check this source right now'};
   const statuses=ai?aiStatuses:searchStatuses;
   const status=element('div',statuses[card.status]||statuses.unable,'audit-status '+card.status);
   if(ai){
    section.appendChild(element('h4','Returned Answer'));
    section.appendChild(card.answer?formattedAnswer(card.answer):element('p','No answer was returned.'));
    section.appendChild(element('h4','Audit Result'));
   }
   section.appendChild(status);
   if(card.source==='google_search'&&card.status==='unable'&&result.id){
    const retry=element('button','Retry Google Search','sw7-feature-button audit-retry');retry.type='button';
    const message=element('p','','audit-retry-message');message.setAttribute('role','status');
    retry.addEventListener('click',async()=>{
     if(running)return;running=true;button.disabled=true;retry.disabled=true;retry.textContent='Checking Google Search';status.textContent='Google Search check in progress';status.className='audit-status pending';message.textContent='This can take a few minutes. Your other results are below';
     try{
      let data=await read(await fetch(endpoint+'/audit/retry-google-search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({request_id:currentResult.id}),signal:AbortSignal.timeout(100000)}));
      if(data.state==='running')data=await waitForResult(data.request_id);
      if(data.state==='interrupted')throw new Error(data.message);
      render(data.result,data.cached);
     }catch(error){status.textContent='Google Search has not returned a new result';status.className='audit-status unable';message.textContent=error.name==='TimeoutError'||error.name==='AbortError'?'The retry is taking longer than expected. Click again to check the existing retry.':error.message||'Google Search is still unavailable. Please try later.';}
     finally{running=false;button.disabled=false;retry.disabled=false;retry.textContent='Retry Google Search';}
    });
    section.appendChild(retry);section.appendChild(message);
   }

   if(card.position!=null)section.appendChild(element('p',(card.source==='google_maps'?'Map position: ':'Organic position: ')+card.position));
   if(card.match){section.appendChild(element('p',card.match.title));if(card.match.url){const p=element('p');p.appendChild(link(card.match.url,card.match.url));section.appendChild(p);}if(card.match.description)section.appendChild(element('p',card.match.description));if(card.match.rating!=null||card.match.reviews!=null)section.appendChild(element('p',[card.match.rating!=null?'Rating: '+card.match.rating:null,card.match.reviews!=null?'Reviews: '+card.match.reviews:null].filter(Boolean).join(', ')));}
   list(section,'Referenced sources',card.citations);
   list(section,ai?(card.evidence?'Other businesses recommended':'Other businesses returned'):card.source==='google_maps'?'Competing listings':'Results appearing above or instead',card.competitors);
   cards.appendChild(section);
  });
  const found=result.cards.filter(c=>c.status==='found').length;
  const unavailable=result.cards.filter(c=>c.status==='unable').length;
  const informational=result.cards.filter(c=>c.status==='informational').length;
  const visibilityChecks=result.cards.filter(c=>['found','not_found'].includes(c.status)).length;
  summary.textContent=unavailable===5?'The five sources could not be checked right now':visibilityChecks?'Your business appeared in '+found+' of '+visibilityChecks+' visibility results':'No visibility finding could be confirmed';
  const date=new Date(result.created_at);metadata.textContent=(cached?'Recent saved audit':'Audit completed')+(Number.isNaN(date.getTime())?'':', '+date.toLocaleString())+(unavailable?', '+unavailable+' source'+(unavailable===1?' was':'s were')+' unavailable':'')+(informational?', '+informational+' informational answer'+(informational===1?'':'s'):'');
  if(['gazetteer_location','unresolved_location','gazetteer_unavailable'].includes(result.location_status)){
   metadata.append(document.createTextNode(result.location_status==='gazetteer_location'
    ?'. Search queries used the requested locality because the provider has no matching location code.'
    :'. The locality could not be independently confirmed. Search queries used the requested locality as entered.'));
  }
  ending.textContent=found===5?'Your business appeared in all five places checked':unavailable===5?'The five sources could not be checked right now':'Review the results above and talk with us about your website, SEO + AEO';
  results.hidden=false;progress.hidden=true;
  try{store.set('sw7AuditResultV2',JSON.stringify({result,cached:true,saved_at:Date.now()}));}catch{}
 }
 async function read(response){let data;try{data=await response.json();}catch{throw new Error('The audit service could not return results. Please try again later.');}if(!response.ok)throw new Error(data.error||'The audit is unavailable right now.');return data;}
 async function waitForResult(id){
  const start=Date.now();
  while(Date.now()-start<900000){
   await new Promise(resolve=>setTimeout(resolve,5000));
   const data=await read(await fetch(endpoint+'/audit/status?id='+encodeURIComponent(id),{cache:'no-store',signal:AbortSignal.timeout(12000)}));
   if(data.state==='complete')return data;
   if(data.state==='interrupted')throw new Error(data.message);
  }
  throw new Error('Google Search is taking longer than expected. Submit the same details again to check your saved audit, without starting new paid checks.');
 }
 form.addEventListener('submit',async function(event){
  event.preventDefault();if(running||!form.reportValidity())return;
  if(location.protocol==='file:'){
   error.textContent='Open Instant Audit on the StartWeb7 website to run an audit.';
   error.hidden=false;
   return;
  }
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
  }catch(e){progress.hidden=true;error.textContent=e.name==='TimeoutError'||e.name==='AbortError'?'The connection timed out. Your check may still be running, submitting the same details will reuse it.':e instanceof TypeError?'The audit service could not be reached from this page. Open Instant Audit on StartWeb7 or try again later.':e.message||'The audit is unavailable right now. Please try again later.';error.hidden=false;}
  finally{running=false;button.disabled=false;button.textContent='Run My Instant Audit';form.removeAttribute('aria-busy');}
 });
 // Restore only a completed local result. Refreshing never reruns paid checks.
 try{const saved=JSON.parse(store.get('sw7AuditResultV2'));if(saved&&Date.now()-saved.saved_at<86400000)render(saved.result,true);else store.remove('sw7AuditResultV2');}catch{store.remove('sw7AuditResultV2');}
})();
