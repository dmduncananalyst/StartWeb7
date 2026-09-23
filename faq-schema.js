(function(){
  'use strict';
  function addFAQSchema(){
    var entities=[];
    document.querySelectorAll('.faq-item').forEach(function(item){
      var question=item.querySelector('.faq-question');
      var answer=item.querySelector('.faq-answer');
      if(!question||!answer)return;
      entities.push({
        '@type':'Question',
        'name':question.textContent.trim(),
        'acceptedAnswer':{'@type':'Answer','text':answer.textContent.trim()}
      });
    });
    if(!entities.length)return;
    var script=document.createElement('script');
    script.type='application/ld+json';
    script.textContent=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage','mainEntity':entities});
    document.head.appendChild(script);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addFAQSchema);else addFAQSchema();
})();
