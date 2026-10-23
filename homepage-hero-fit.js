(function(){
 function init(){
  var hero=document.getElementById('sw7-home-fit');if(!hero)return;
  var engine=hero.querySelector('.analysis-engine'),copy=hero.querySelector('.home-hero-copy'),queued=false;
  function fit(){
   queued=false;engine.style.removeProperty('zoom');copy.style.removeProperty('zoom');engine.style.removeProperty('width');engine.style.removeProperty('max-width');copy.style.removeProperty('--home-title-size');
   if(window.innerWidth<=1050)return;
   var available=Math.max(240,innerHeight-hero.getBoundingClientRect().top-scrollY);hero.style.setProperty('--home-visible-height',available+'px');
   var room=available-40;hero.toggleAttribute('data-home-compact',available<540);
   hero.style.setProperty('--sw7-analysis-row-height','64px');
   var rows=engine.querySelectorAll('.journey-row').length;
   var extra=engine.getBoundingClientRect().height-rows*64;
   hero.style.setProperty('--sw7-analysis-row-height',Math.max(64,Math.min(112,(room-extra)/rows))+'px');
   var title=copy.querySelector('h1');
   for(var i=0;i<30&&copy.getBoundingClientRect().height>room;i++){
    var size=parseFloat(getComputedStyle(title).fontSize);if(size<=28)break;copy.style.setProperty('--home-title-size',(size-2)+'px');
   }
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(fit);}}
  fit();window.addEventListener('resize',schedule,{passive:true});window.addEventListener('load',schedule);new ResizeObserver(schedule).observe(document.querySelector('.sw7-universal-header'));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
