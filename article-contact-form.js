(function(){
  const serviceSelect=document.getElementById('serviceSelect');
  const quickForm=document.getElementById('quickForm');
  const selectedService=document.getElementById('selectedService');
  if(serviceSelect&&quickForm){
    serviceSelect.addEventListener('change',()=>{
      if(selectedService)selectedService.value=serviceSelect.value;
      quickForm.classList.add('open');
      quickForm.setAttribute('aria-hidden','false');
      setTimeout(()=>quickForm.scrollIntoView({behavior:'smooth',block:'nearest'}),80);
    });
  }
  const emailButton=document.getElementById('openEmailOptions');
  const emailOptions=document.getElementById('emailOptions');
  const copyEmail=document.getElementById('copyEmail');
  if(emailButton&&emailOptions){
    emailButton.addEventListener('click',()=>{
      const open=emailOptions.classList.toggle('open');
      emailOptions.setAttribute('aria-hidden',open?'false':'true');
    });
  }
  if(copyEmail){
    copyEmail.addEventListener('click',async()=>{
      try{
        await navigator.clipboard.writeText('desirae@startweb7.com');
        copyEmail.textContent='Copied';
        setTimeout(()=>copyEmail.textContent='Copy desirae@startweb7.com',1400);
      }catch(e){copyEmail.textContent='desirae@startweb7.com'}
    });
  }
})();
