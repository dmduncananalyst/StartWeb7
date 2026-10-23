/* Keep each hero's actions with its content at every viewport width. */
(function(){
 function mark(){document.querySelectorAll('.home-hero,.growth-hero,.essentials-hero,.article-hero,.resource-hero,.reviews-hero,.faq-hero,.industry-hero,.sw7-new-hero,.careers-hero,.hero').forEach(function(hero){hero.setAttribute('data-sw7-actions-inline','')});}
 mark();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mark,{once:true});
})();
