/* Fit the remaining legacy opening sections against the actual navigation. */
(function(){
 function init(){
  if(document.querySelector('#sw7-industry-hero,#sw7-home-fit'))return;
  var heading=Array.from(document.querySelectorAll('h1')).find(function(e){return e.getBoundingClientRect().width&&getComputedStyle(e).visibility!=='hidden'}),hero=location.pathname.endsWith('/support.html')?document.querySelector('.support-hero'):null;
  if(!hero&&heading)hero=heading.closest('section,header:not(.sw7-universal-header)');
  if(!hero)return;
  hero.setAttribute('data-sw7-screen-hero','');hero.setAttribute('data-sw7-actions-inline','');
  var next=hero.nextElementSibling;
  if(next&&next.matches('.sw7-mobile-below-hero,.sw7-support-hero-actions')){var actions=next.querySelector('.sw7-hero-actions');if(actions)hero.appendChild(actions);next.hidden=true;}
  var saved=new Map(),queued=false;
  function set(e,p,v){if(!saved.has(e))saved.set(e,e.getAttribute('style'));e.style.setProperty(p,v,'important');}
  function fit(){
   queued=false;saved.forEach(function(s,e){if(s===null)e.removeAttribute('style');else e.setAttribute('style',s)});saved.clear();
   var available=Math.max(180,innerHeight-(hero.getBoundingClientRect().top+scrollY));
   // Inline geometry wins over older, more specific fixed-height page rules.
   set(hero,'height','auto');set(hero,'min-height','0');set(hero,'max-height','none');set(hero,'overflow','visible');
   hero.querySelectorAll('h1,.kicker').forEach(function(e){if(e.scrollWidth>e.clientWidth+1){set(e,'white-space','normal');set(e,'overflow-wrap','anywhere');for(var n=0;n<20&&e.scrollWidth>e.clientWidth+1;n++)set(e,'font-size',(parseFloat(getComputedStyle(e).fontSize)-1)+'px')}});
   if(innerWidth>1050){
    for(var i=0;i<16&&hero.getBoundingClientRect().height>available+1;i++){
     var ratio=Math.max(.72,Math.min(.94,available/hero.getBoundingClientRect().height));
     [hero].concat(Array.from(hero.querySelectorAll('*'))).forEach(function(e){
      if(e.matches('video,source,svg,svg *,script,style')||e.closest('.support-console,.sw7-proto,.sw7-live-demo'))return;
      var s=getComputedStyle(e);
      if(e.matches('h1,h2,p,.kicker,.support-kicker'))set(e,'font-size',Math.max(e.matches('p')?20:30,parseFloat(s.fontSize)*ratio)+'px');
      ['padding-top','padding-bottom','margin-top','margin-bottom','row-gap'].forEach(function(p){var n=parseFloat(s.getPropertyValue(p));if(n>6)set(e,p,Math.max(6,n*ratio)+'px')});
      if(e.tagName==='IMG'&&!e.classList.contains('sw7-city-hero-photo')){set(e,'max-height',Math.max(64,e.getBoundingClientRect().height*ratio)+'px');set(e,'object-fit','contain');}
     });
    }
   }
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(fit)}}
  fit();window.addEventListener('resize',schedule,{passive:true});window.addEventListener('load',schedule);
  document.querySelectorAll('link[rel="stylesheet"]').forEach(function(l){l.addEventListener('load',schedule,{once:true})});
  var nav=document.querySelector('.sw7-universal-header');if(nav)new ResizeObserver(schedule).observe(nav);
  new MutationObserver(schedule).observe(hero,{childList:true,subtree:true,characterData:true});
  document.fonts.ready.then(schedule);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
