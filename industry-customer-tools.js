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
  async function download(form){
    if(!window.PDFLib){window.alert('The PDF generator did not load. Please refresh the page and try again.');return;}
    var title=form.getAttribute('data-title')||'Completed Request';
    var rows=values(form);
    var pdf=await PDFLib.PDFDocument.create();
    var regular=await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    var bold=await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
    var page=pdf.addPage([612,792]);
    var y=742;
    function freshPage(){page=pdf.addPage([612,792]);y=742;}
    function wrapped(text,font,size,maxWidth){
      var words=String(text||'').split(/\s+/),lines=[],line='';
      words.forEach(function(word){var next=line?line+' '+word:word;if(font.widthOfTextAtSize(next,size)<=maxWidth)line=next;else{if(line)lines.push(line);line=word;}});
      if(line)lines.push(line);return lines.length?lines:[''];
    }
    page.drawText(title,{x:44,y:y,size:24,font:bold,color:PDFLib.rgb(.06,.13,.2)});y-=20;
    page.drawRectangle({x:44,y:y,width:524,height:2,color:PDFLib.rgb(.06,.13,.2)});y-=34;
    var photos=(form._photoData||[]).filter(Boolean);
    for(var p=0;p<photos.length;p++){
      try{
        var source=photos[p],bytes=Uint8Array.from(atob(source.split(',')[1]),function(c){return c.charCodeAt(0);});
        var image=source.indexOf('image/png')>-1?await pdf.embedPng(bytes):await pdf.embedJpg(bytes);
        var scale=Math.min(500/image.width,250/image.height,1),width=image.width*scale,height=image.height*scale;
        if(y-height<70)freshPage();
        page.drawImage(image,{x:44,y:y-height,width:width,height:height});y-=height+22;
      }catch(ignore){}
    }
    rows.forEach(function(row){
      var label=String(row[0]).replace(/\b\w/g,function(c){return c.toUpperCase();});
      var lines=wrapped(row[1],regular,11,338),height=Math.max(28,lines.length*15+12);
      if(y-height<44)freshPage();
      page.drawText(label,{x:44,y:y-15,size:11,font:bold,color:PDFLib.rgb(.06,.13,.2)});
      lines.forEach(function(line,index){page.drawText(line,{x:220,y:y-15-(index*15),size:11,font:regular,color:PDFLib.rgb(.06,.13,.2)});});
      page.drawLine({start:{x:44,y:y-height},end:{x:568,y:y-height},thickness:.5,color:PDFLib.rgb(.82,.84,.86)});y-=height;
    });
    var bytes=await pdf.save(),blob=new Blob([bytes],{type:'application/pdf'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=(form.getAttribute('data-file')||'completed-request')+'.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);
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
