(function(){
  'use strict';
  var toolSections=document.querySelectorAll('.customer-tool');
  toolSections.forEach(function(section,index){
    var sectionId=section.id||'lead-capture-example-'+(index+1);
    section.id=sectionId;
    section.hidden=true;
    var reveal=document.createElement('div');
    reveal.className='lead-capture-reveal';
    var revealInner=document.createElement('div');
    revealInner.className='lead-capture-reveal-inner';
    var heading=document.createElement('h2');
    heading.textContent='AFTER THE SEARCH, CAPTURE THE LEAD.';
    var button=document.createElement('button');
    button.className='lead-capture-button';
    button.type='button';
    button.textContent='CAPTURE LEADS';
    button.setAttribute('aria-controls',sectionId);
    button.setAttribute('aria-expanded','false');
    button.addEventListener('click',function(){
      section.hidden=false;
      button.setAttribute('aria-expanded','true');
      reveal.remove();
      window.requestAnimationFrame(function(){section.scrollIntoView({behavior:'smooth',block:'start'});});
    });
    revealInner.append(heading,button);
    reveal.appendChild(revealInner);
    section.parentNode.insertBefore(reveal,section);
  });
  var forms=document.querySelectorAll('[data-local-tool]');
  function esc(value){return String(value||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function values(form){
    var rows=[];
    var grouped={};
    Array.prototype.forEach.call(form.elements,function(el){
      if(!el.name||el.type==='file'||el.type==='button'||el.disabled)return;
      if((el.type==='checkbox'||el.type==='radio')&&!el.checked)return;
      var label=el.getAttribute('data-label')||el.name.replace(/_/g,' ');
      var val=el.options&&el.selectedIndex>=0?el.options[el.selectedIndex].text:el.value;
      if(!val)return;
      if(grouped[label])grouped[label]+=', '+val;else grouped[label]=val;
    });
    Object.keys(grouped).forEach(function(k){rows.push([k,grouped[k]]);});
    return rows;
  }
  function download(form){
    var title=form.getAttribute('data-title')||'Completed Website Form';
    var rows=values(form);
    var preview=form.querySelector('.photo-preview.show');
    var images=form._photoData&&form._photoData.length?form._photoData.map(function(src){return '<img src="'+src+'" alt="Selected photo">';}).join(''):(preview&&preview.src.indexOf('data:image/')===0?'<img src="'+preview.src+'" alt="Selected photo">':'');
    var body=rows.map(function(row){return '<div class="row"><strong>'+esc(row[0])+'</strong><span>'+esc(row[1])+'</span></div>';}).join('');
    var html='<!doctype html><html><head><meta charset="utf-8"><title>'+esc(title)+'</title><style>body{font-family:Arial;margin:40px;color:#15202b}h1{border-bottom:4px solid #087cff;padding-bottom:14px}.row{display:grid;grid-template-columns:210px 1fr;gap:20px;padding:12px 0;border-bottom:1px solid #ddd}.row strong{text-transform:capitalize}img{max-width:420px;max-height:320px;object-fit:contain;margin:22px 12px 22px 0;border:1px solid #ccc}.notice{margin-top:28px;padding:14px;background:#f2f5f7;font-size:12px;line-height:1.5}@media print{body{margin:20px}}</style></head><body><h1>'+esc(title)+'</h1>'+images+body+'<p class="notice">Generated locally in your browser. StartWeb7 did not receive, access, transmit, or store the information or selected files.</p></body></html>';
    var blob=new Blob([html],{type:'text/html'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=(form.getAttribute('data-file')||'completed-form')+'.html';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  forms.forEach(function(form){
    var file=form.querySelector('input[type=file]');
    if(file){file.addEventListener('change',function(){
      var name=form.querySelector('.file-name'),preview=form.querySelector('.photo-preview');
      var selected=file.files?Array.prototype.slice.call(file.files):[];
      if(name)name.textContent=selected.length?(selected.length===1?selected[0].name:selected.length+' photos selected'):(file.multiple?'No photos selected':'No photo selected');
      form._photoData=[];
      if(preview){preview.classList.remove('show');preview.removeAttribute('src');}
      selected.filter(function(item){return item.type.indexOf('image/')===0;}).forEach(function(item,index){var reader=new FileReader();reader.onload=function(e){form._photoData[index]=e.target.result;if(index===0&&preview){preview.src=e.target.result;preview.classList.add('show');}};reader.readAsDataURL(item);});
    });}
    form.addEventListener('submit',function(e){e.preventDefault();});
    var dl=form.querySelector('[data-download]');if(dl)dl.addEventListener('click',function(){download(form);});
    var clear=form.querySelector('[data-clear]');if(clear)clear.addEventListener('click',function(){form.reset();form._photoData=[];var p=form.querySelector('.photo-preview');if(p){p.classList.remove('show');p.removeAttribute('src');}var n=form.querySelector('.file-name'),f=form.querySelector('input[type=file]');if(n)n.textContent=f&&f.multiple?'No photos selected':'No photo selected';var result=form.querySelector('.tool-result');if(result)result.classList.remove('show');});
    var show=form.querySelector('[data-show-result]');if(show)show.addEventListener('click',function(){var result=form.querySelector('.tool-result');if(result){result.classList.add('show');result.scrollIntoView({behavior:'smooth',block:'nearest'});}});
    if(form.classList.contains('pool-builder'))form.addEventListener('change',function(){var list=form.querySelector('.pool-summary ul');if(!list)return;var rows=values(form).slice(0,8);list.innerHTML=rows.length?rows.map(function(r){return '<li><strong>'+esc(r[0])+':</strong> '+esc(r[1])+'</li>';}).join(''):'<li>Your pool selections will appear here.</li>';});
  });
})();
