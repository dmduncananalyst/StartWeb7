/* Scale complete live demos when the available screen is smaller than their design. */
(function(){
 'use strict';
 var selectors='.visibility-stage>.competitive-board,.visibility-stage>.sw7-calendar,.visibility-stage>.sw7-la-map,.analysis-engine,.support-console,.sw7-small-search,.sw7-sales-report';
 var queued=false;
 function fit(){
  queued=false;
  document.querySelectorAll(selectors).forEach(function(el){
   if(el.closest('[hidden]'))return;
   el.style.zoom='1';
   var box=el.getBoundingClientRect(),parent=el.parentElement.getBoundingClientRect();
   if(!box.width||!box.height)return;
   var header=document.querySelector('.sw7-universal-header');
   var headerHeight=header?header.getBoundingClientRect().height:86;
   var remaining=window.innerHeight-Math.max(headerHeight+20,box.top)-24;
   var availableHeight=Math.max(180,remaining>180?remaining:window.innerHeight-headerHeight-48);
   var availableWidth=Math.min(parent.width,window.innerWidth-32);
   var ratio=Math.min(1,availableWidth/box.width,availableHeight/box.height);
   if(ratio<1)el.style.zoom=String(Math.max(0.1,ratio));
  });
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(fit);}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fit,{once:true});else fit();
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('orientationchange',schedule,{passive:true});
 window.addEventListener('pageshow',schedule);
})();
