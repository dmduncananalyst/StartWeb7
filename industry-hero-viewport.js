/* Measure only these industry heroes against the live header/back bar. */
(function(){
  'use strict';
  if(!document.body.matches('.pool-page,.contractor-page,.collision-video-page'))return;
  var root=document.documentElement,queued=false;
  function update(){
    queued=false;
    var header=document.querySelector('.sw7-universal-header'),back=document.querySelector('.sw7-page-back-bar');
    var bottom=header?header.getBoundingClientRect().bottom:0;
    if(back&&getComputedStyle(back).display!=='none')bottom=Math.max(bottom,back.getBoundingClientRect().bottom);
    if(bottom>0){var height=Math.ceil(bottom)+'px';if(root.style.getPropertyValue('--sw7-industry-header-height')!==height)root.style.setProperty('--sw7-industry-header-height',height);}
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
  update();
  var observer=new ResizeObserver(schedule);
  document.querySelectorAll('.sw7-universal-header,.sw7-page-back-bar').forEach(function(el){observer.observe(el);});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  window.addEventListener('pageshow',schedule);
})();
