/* Measure the shared header so these two heroes fit the actual window. */
(function(){
 function init(){
  var header=document.querySelector('.sw7-universal-header');
  if(!header)return;
  function fit(){document.documentElement.style.setProperty('--sw7-review-header-height',Math.ceil(header.getBoundingClientRect().height)+'px');}
  fit();new ResizeObserver(fit).observe(header);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
