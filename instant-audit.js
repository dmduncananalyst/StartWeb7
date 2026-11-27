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
 const ending=document.getElementById('auditEnding');
 let running=false;
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
 function render(result,pending=false){
  if(!result||!Array.isArray(result.cards)||result.cards.length!==5)throw new Error('The audit returned an incomplete response. Please try again later.');
  const updateSearch=cards.firstElementChild?.querySelector('.audit-status.pending');
  if(!updateSearch)cards.replaceChildren();
  result.cards.forEach(card=>{
   if(updateSearch&&card.source!=='google_search')return;
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
   if(card.source==='google_search'&&pending){
    status.textContent='Checking Google Search. This may take a few minutes. Your other results are available below.';
    status.className='audit-status pending';
    status.setAttribute('role','status');
   }

   if(card.position!=null)section.appendChild(element('p',(card.source==='google_maps'?'Map position: ':'Organic position: ')+card.position));
   if(card.match){section.appendChild(element('p',card.match.title));if(card.match.url){const p=element('p');p.appendChild(link(card.match.url,card.match.url));section.appendChild(p);}if(card.match.description)section.appendChild(element('p',card.match.description));if(card.match.rating!=null||card.match.reviews!=null)section.appendChild(element('p',[card.match.rating!=null?'Rating: '+card.match.rating:null,card.match.reviews!=null?'Reviews: '+card.match.reviews:null].filter(Boolean).join(', ')));}
   list(section,'Referenced sources',card.citations);
   list(section,ai?(card.evidence?'Other businesses recommended':'Other businesses returned'):card.source==='google_maps'?'Competing listings':'Results appearing above or instead',card.competitors);
   if(updateSearch)cards.firstElementChild.replaceWith(section);
   else cards.appendChild(section);
  });
  ending.textContent='Review the results above and talk with us about your website, SEO + AEO';
  results.hidden=false;progress.hidden=true;
  if(!pending)try{store.set('sw7AuditResultV2',JSON.stringify({result,cached:true,saved_at:Date.now()}));}catch{}
 }
 async function read(response){let data;try{data=await response.json();}catch{throw new Error('The audit service could not return results. Please try again later.');}if(!response.ok)throw new Error(data.error||'The audit is unavailable right now.');return data;}
 async function finishAudit(data){
  let partial=null, retried=false, revealed=false;
  const deadline=Date.now()+600000;
  let backoff=3000;
  while(Date.now()<deadline){
   if(data.result)partial=data.result;
   if(data.state==='interrupted')break;
   if(data.state==='complete'&&(!data.google_retry||retried))return data.result;
   if(partial&&!revealed){
    render(partial,true);
    results.scrollIntoView({block:'start'});
    revealed=true;
   }
   if(data.state==='complete'){
    retried=true;
    try{
     data=await read(await fetch(endpoint+'/audit/retry-google-search',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({request_id:partial.id}),signal:AbortSignal.timeout(25000)
     }));
    }catch{
     // A lost response may follow an accepted retry. Poll the original job.
     data={state:'running',request_id:partial.id};
    }
    continue;
   }
   await new Promise(resolve=>setTimeout(resolve,backoff));
   try{
    data=await read(await fetch(endpoint+'/audit/status?id='+encodeURIComponent(data.request_id),
     {cache:'no-store',signal:AbortSignal.timeout(12000)}));
   }catch{
    backoff=Math.min(backoff*2,15000);
   }
  }
  if(partial)return partial;
  throw new Error('The audit service did not return results before the check timed out.');
 }
 form.addEventListener('submit',async function(event){
  event.preventDefault();if(running||!form.reportValidity())return;
  if(location.protocol==='file:'){
   error.textContent='Open Instant Audit on the StartWeb7 website to run an audit.';
   error.hidden=false;
   return;
  }
  running=true;button.disabled=true;button.textContent='Checking Your Business';error.hidden=true;progress.hidden=false;results.hidden=true;form.setAttribute('aria-busy','true');
  cards.replaceChildren();
  const payload={business_name:form.elements.business_name.value.trim(),website:form.elements.website.value.trim(),city:form.elements.city.value.trim(),industry:form.elements.industry.value.trim()};
  try{
   // Exactly one POST. Polling reads an existing reservation, it never buys
   // another audit. No submit, click, or API call is triggered on page load.
   let data=await read(await fetch(endpoint+'/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(100000)}));
   const finished=await finishAudit(data);
   const firstReveal=results.hidden;
   render(finished);
   if(firstReveal){
    results.focus({preventScroll:true});
    results.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
   }
  }catch(e){progress.hidden=true;error.textContent=e.name==='TimeoutError'||e.name==='AbortError'?'The connection timed out. Your check may still be running, submitting the same details will reuse it.':e instanceof TypeError?'The audit service could not be reached from this page. Open Instant Audit on StartWeb7 or try again later.':e.message||'The audit is unavailable right now. Please try again later.';error.hidden=false;}
  finally{running=false;button.disabled=false;button.textContent='Run My Instant Audit';form.removeAttribute('aria-busy');}
 });
 // Restore only a completed local result. Refreshing never reruns paid checks.
 try{const saved=JSON.parse(store.get('sw7AuditResultV2'));if(saved&&Date.now()-saved.saved_at<86400000)render(saved.result);else store.remove('sw7AuditResultV2');}catch{store.remove('sw7AuditResultV2');}
})();
