(function(){
function build(){
var priorHeader=document.querySelector('.sw7-universal-header');
if(priorHeader)priorHeader.remove();
var page=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'').replace(/[^a-z0-9]+/gi,'-').toLowerCase();
document.body.classList.add('sw7-page-'+page);
if(matchMedia('(max-width:900px)').matches&&page==='services'){
  var mobileStage=document.querySelector('.stage');
  if(mobileStage)mobileStage.setAttribute('data-state','launch');
}
var oldLogo=document.querySelector('.brand-logo img,header img.logo,.topbar img.logo,img.logo');
var header=document.createElement('header');header.className='sw7-universal-header';
var brand=document.createElement('a');brand.className='sw7-universal-brand';brand.href='index.html';
if(oldLogo){var logo=oldLogo.cloneNode(true);logo.removeAttribute('class');logo.removeAttribute('style');brand.appendChild(logo)}
var name=document.createElement('span');name.textContent='StartWeb7';brand.appendChild(name);
var mobileButton=document.createElement('button');mobileButton.className='sw7-mobile-toggle';mobileButton.type='button';mobileButton.setAttribute('aria-label','Open navigation menu');mobileButton.setAttribute('aria-expanded','false');mobileButton.innerHTML='<i></i><i></i><i></i>';
var nav=document.createElement('nav');nav.className='sw7-clean-nav';nav.setAttribute('aria-label','Main navigation');
nav.innerHTML='<a href="index.html">Home</a><a href="about.html">About</a><div class="sw7-clean-item"><div class="sw7-item-row"><a href="services.html">Services</a><button type="button" aria-label="Open Services menu" aria-expanded="false">›</button></div><div class="sw7-clean-menu"><div class="sw7-clean-sub"><div class="sw7-sub-row website"><a href="services.html">WEBSITE DESIGN</a><button type="button" aria-label="Open Website Design menu" aria-expanded="false">›</button></div><div class="sw7-clean-submenu"><a href="landing-page.html">LANDING PAGE</a><a href="multi-page-website.html">MULTI-PAGE WEBSITE</a><a href="seo-optimized-website.html">SEO-OPTIMIZED WEBSITE</a></div></div><div class="sw7-clean-sub"><div class="sw7-sub-row seo"><a href="seo-aeo-management.html">SEO + AEO MANAGEMENT</a><button type="button" aria-label="Open SEO and AEO Management menu" aria-expanded="false">›</button></div><div class="sw7-clean-submenu"><a href="essentials.html">ESSENTIALS</a><a href="competitive.html">COMPETITIVE</a></div></div></div></div><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><div class="sw7-clean-item sw7-contact-item"><div class="sw7-item-row"><a href="contact.html">Contact</a><button type="button" aria-label="Open Contact menu" aria-expanded="false">›</button></div><div class="sw7-clean-menu"><a href="contact.html">CONTACT</a><a href="support.html">24/7 SUPPORT</a><a href="careers.html">CAREERS</a></div></div>';
document.querySelectorAll('header,nav,.topbar').forEach(function(el){el.classList.add('sw7-original-header-hidden')});
header.append(brand,mobileButton,nav);document.body.insertBefore(header,document.body.firstChild);
function closeSubs(){header.querySelectorAll('.open').forEach(function(el){el.classList.remove('open')});header.querySelectorAll('.sw7-clean-nav [aria-expanded]').forEach(function(el){el.setAttribute('aria-expanded','false')})}
mobileButton.addEventListener('click',function(e){e.stopPropagation();var open=header.classList.toggle('mobile-open');mobileButton.setAttribute('aria-expanded',String(open));mobileButton.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');document.body.classList.toggle('sw7-menu-open',open);if(!open)closeSubs()});
header.querySelectorAll('.sw7-item-row>button,.sw7-sub-row>button').forEach(function(button){button.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var item=button.closest('.sw7-clean-item,.sw7-clean-sub');var open=item.classList.toggle('open');button.setAttribute('aria-expanded',String(open))})});
nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){header.classList.remove('mobile-open');document.body.classList.remove('sw7-menu-open')})});
document.addEventListener('click',function(e){if(!header.contains(e.target))closeSubs()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){header.classList.remove('mobile-open');document.body.classList.remove('sw7-menu-open');mobileButton.setAttribute('aria-expanded','false');closeSubs()}});
var style=document.createElement('style');style.textContent=`
body{padding-top:78px!important}.sw7-original-header-hidden{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}
.sw7-universal-header{position:fixed!important;z-index:2147483000!important;inset:0 0 auto!important;height:78px!important;background:#fff!important;color:#111!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 max(24px,calc((100vw - 1120px)/2))!important;box-sizing:border-box!important;box-shadow:0 1px 0 rgba(0,0,0,.08)!important}
.sw7-universal-brand{display:flex!important;align-items:center!important;gap:13px!important;color:#111!important;text-decoration:none!important;white-space:nowrap!important}.sw7-universal-brand img{display:block!important;width:112px!important;height:58px!important;object-fit:contain!important}.sw7-universal-brand span{font:900 17px/1 Arial,sans-serif!important;letter-spacing:.04em!important}
.sw7-mobile-toggle{display:none!important}.sw7-clean-nav{display:flex!important;width:min(660px,calc(100% - 256px))!important;height:78px!important;align-items:center!important;justify-content:space-between!important;margin-left:32px!important;background:transparent!important;overflow:visible!important}.sw7-clean-nav>a,.sw7-clean-item{display:flex!important;align-items:center!important;justify-content:center!important;height:78px!important;position:relative!important}.sw7-item-row{display:flex!important;align-items:center!important}.sw7-clean-nav>a,.sw7-item-row>a{font:500 13px/1 Arial,sans-serif!important;color:#111!important;text-decoration:none!important;white-space:nowrap!important}.sw7-item-row>button{border:0!important;background:transparent!important;color:#111!important;font:500 18px/1 Arial!important;margin-left:5px!important;padding:8px!important;cursor:pointer!important}
.sw7-clean-menu{position:absolute!important;z-index:2147483001!important;top:64px!important;left:0!important;min-width:270px!important;padding:10px!important;background:#f4f3ef!important;box-shadow:0 20px 50px rgba(0,0,0,.2)!important;opacity:0!important;visibility:hidden!important;transform:translateY(8px)!important;transition:.2s ease!important}.sw7-contact-item>.sw7-clean-menu{left:auto!important;right:0!important;min-width:210px!important}.sw7-clean-item:hover>.sw7-clean-menu,.sw7-clean-item:focus-within>.sw7-clean-menu,.sw7-clean-item.open>.sw7-clean-menu{opacity:1!important;visibility:visible!important;transform:none!important}
.sw7-clean-menu a,.sw7-clean-sub>button{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;padding:13px 14px!important;border:0!important;background:transparent!important;color:#111!important;text-decoration:none!important;font:800 12px/1.2 Arial!important;letter-spacing:.04em!important;box-sizing:border-box!important;cursor:pointer!important}.sw7-clean-menu a:hover,.sw7-clean-sub>button:hover{background:#fff!important}.sw7-clean-sub{position:relative!important}.sw7-clean-sub>button.website{color:#0784ff!important;border-left:4px solid #0784ff!important}.sw7-clean-sub>button.seo{color:#00a978!important;border-left:4px solid #00a978!important}.sw7-clean-submenu{position:absolute!important;left:100%!important;top:-10px!important;min-width:275px!important;padding:10px!important;background:#fff!important;box-shadow:0 20px 50px rgba(0,0,0,.18)!important;opacity:0!important;visibility:hidden!important;transform:translateX(8px)!important}.sw7-clean-sub:hover>.sw7-clean-submenu,.sw7-clean-sub:focus-within>.sw7-clean-submenu,.sw7-clean-sub.open>.sw7-clean-submenu{opacity:1!important;visibility:visible!important;transform:none!important}
@media(max-width:900px){
body{padding-top:70px!important;overflow-x:hidden!important}body.sw7-menu-open{overflow:hidden!important}.sw7-universal-header{height:70px!important;padding:0 14px!important;overflow:visible!important}.sw7-universal-brand{position:relative!important;z-index:2!important;gap:8px!important}.sw7-universal-brand img{width:82px!important;height:52px!important}.sw7-universal-brand span{font-size:14px!important}
.sw7-mobile-toggle{display:flex!important;position:relative!important;z-index:2!important;width:48px!important;height:48px!important;border:0!important;background:transparent!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important}.sw7-mobile-toggle i{display:block!important;width:25px!important;height:2px!important;background:#111!important;transition:.2s!important}.mobile-open .sw7-mobile-toggle i:nth-child(1){transform:translateY(7px) rotate(45deg)!important}.mobile-open .sw7-mobile-toggle i:nth-child(2){opacity:0!important}.mobile-open .sw7-mobile-toggle i:nth-child(3){transform:translateY(-7px) rotate(-45deg)!important}
.sw7-clean-nav{position:fixed!important;inset:70px 0 0!important;width:100%!important;height:calc(100dvh - 70px)!important;margin:0!important;padding:12px 18px 32px!important;background:#fff!important;display:none!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;overflow-y:auto!important;box-sizing:border-box!important}.mobile-open .sw7-clean-nav{display:flex!important}
.sw7-clean-nav>a,.sw7-clean-item{display:block!important;width:100%!important;height:auto!important;min-height:58px!important;border-bottom:1px solid #e5e5e5!important}.sw7-clean-nav>a,.sw7-item-row>a{display:flex!important;align-items:center!important;min-height:58px!important;font:800 17px/1 Arial,sans-serif!important;text-transform:uppercase!important;letter-spacing:.04em!important}.sw7-item-row{width:100%!important;justify-content:space-between!important}.sw7-item-row>a{flex:1!important}.sw7-item-row>button{width:52px!important;height:52px!important;margin:0!important;font-size:30px!important;transform:rotate(90deg)!important}.sw7-clean-item.open>.sw7-item-row>button{transform:rotate(-90deg)!important}
.sw7-clean-menu{position:static!important;width:100%!important;min-width:0!important;padding:0 0 10px 10px!important;box-shadow:none!important;opacity:1!important;visibility:visible!important;transform:none!important;display:none!important;box-sizing:border-box!important}.sw7-clean-item.open>.sw7-clean-menu{display:block!important}.sw7-clean-item:not(.open):hover>.sw7-clean-menu,.sw7-clean-item:not(.open):focus-within>.sw7-clean-menu{display:none!important}.sw7-clean-menu a,.sw7-clean-sub>button{min-height:48px!important;padding:14px 12px!important}
.sw7-clean-submenu{position:static!important;width:100%!important;min-width:0!important;padding:0 0 6px 12px!important;display:none!important;opacity:1!important;visibility:visible!important;transform:none!important;box-shadow:none!important;background:#fff!important;box-sizing:border-box!important}.sw7-clean-sub.open>.sw7-clean-submenu{display:block!important}.sw7-clean-sub:not(.open):hover>.sw7-clean-submenu,.sw7-clean-sub:not(.open):focus-within>.sw7-clean-submenu{display:none!important}
}
@media(max-width:380px){.sw7-universal-brand span{font-size:12px!important}.sw7-universal-brand img{width:72px!important}.sw7-universal-header{padding:0 10px!important}}
@media(max-width:900px){
body{padding-top:118px!important}.sw7-universal-header{height:118px!important;display:block!important;padding:0!important}.sw7-universal-brand{height:70px!important;width:max-content!important;margin:0 auto!important;justify-content:center!important}.sw7-mobile-toggle{display:none!important}
.sw7-clean-nav,.mobile-open .sw7-clean-nav{position:absolute!important;inset:70px 0 auto!important;width:100%!important;height:48px!important;padding:0 5px!important;background:#fff!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:0!important;overflow:visible!important;box-sizing:border-box!important;border-top:1px solid #e5e5e5!important}
.sw7-clean-nav>a,.sw7-clean-item{display:flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:47px!important;min-height:47px!important;border:0!important;flex:0 1 auto!important}
.sw7-clean-nav>a,.sw7-item-row>a{display:flex!important;align-items:center!important;justify-content:center!important;min-height:47px!important;font:800 clamp(8px,2.55vw,11px)/1 Arial,sans-serif!important;letter-spacing:0!important;text-align:center!important}
.sw7-item-row{width:auto!important;height:47px!important;justify-content:center!important}.sw7-item-row>a{flex:0 1 auto!important}.sw7-item-row>button{width:17px!important;height:40px!important;padding:0!important;font-size:18px!important;margin-left:0!important}
.sw7-clean-menu{position:fixed!important;left:6px!important;right:6px!important;top:112px!important;width:auto!important;max-height:calc(100dvh - 118px)!important;overflow-y:auto!important;padding:10px!important;box-shadow:0 18px 45px rgba(0,0,0,.24)!important;z-index:2147483002!important}.sw7-contact-item>.sw7-clean-menu{left:6px!important;right:6px!important}
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
body *{box-sizing:border-box}
img,video,iframe,svg{max-width:100%!important}
video{max-width:100%!important}
main,section,article,[class*="wrap"],[class*="stage"],[class*="board"],[class*="console"],[class*="engine"],[class*="display"],[class*="showcase"],[class*="visual"]{max-width:100%!important;min-width:0!important}
[class*="grid"]>*{min-width:0!important}
.metric-board,.metrics,.search-stage,.search-card,.competitive-results,.competitive-result,.support-console,.analysis-engine,.equation-field,.journey-chart,.faq-search-wrap,.faq-search,.portfolio-showcase,.portfolio-list,.client-browser,.work-grid,.work-project{width:100%!important;max-width:100%!important;min-width:0!important}
.metrics{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.metric{min-width:0!important;padding:18px 14px!important}.metric strong{font-size:clamp(28px,10vw,46px)!important;overflow-wrap:anywhere!important}.metric span{font-size:10px!important;letter-spacing:.07em!important}
.competitive-result{padding-left:12px!important;padding-right:12px!important;gap:8px!important}.competitive-result strong,.competitive-result span{min-width:0!important;overflow-wrap:anywhere!important}
.support-console,.search-stage,.search-card{overflow:hidden!important}
.client-browser{height:min(64vh,560px)!important}
table{display:block!important;width:100%!important;max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important}
input,select,textarea,button{max-width:100%!important}

/* Phone-first corrections for the animated desktop sections. */
.sw7-page-index .home-hero{min-height:calc(100svh - 118px)!important;height:auto!important;padding:34px 7vw!important;gap:22px!important;overflow:hidden!important}
.sw7-page-index .home-flow{width:100%!important;font-size:clamp(39px,13.5vw,54px)!important;line-height:.86!important;letter-spacing:-.055em!important;overflow-wrap:anywhere!important}
.sw7-page-index .home-flow span{display:block!important;max-width:100%!important}
.sw7-page-index .home-hero-copy p{margin-top:20px!important;font-size:15px!important;line-height:1.4!important}
.sw7-page-index .home-start{margin-top:16px!important;font-size:10px!important}
.sw7-page-index .analysis-engine{padding:15px!important}.sw7-page-index .analysis-top{margin-bottom:8px!important;font-size:7px!important;gap:8px!important}
.sw7-page-index .analysis-row{padding:8px 0!important;gap:8px!important}.sw7-page-index .analysis-label strong{font-size:12px!important}.sw7-page-index .analysis-label span{font-size:7px!important;margin-top:3px!important}.sw7-page-index .analysis-value{font-size:27px!important}.sw7-page-index .analysis-track{margin-top:10px!important}.sw7-page-index .analysis-note{font-size:6px!important;margin-top:7px!important}
.sw7-page-index .home-service{padding:48px 7vw!important;gap:24px!important;overflow:hidden!important}
.sw7-page-index .home-service-label{font-size:clamp(29px,9.8vw,39px)!important;line-height:.94!important;letter-spacing:-.04em!important;word-break:break-word!important;overflow-wrap:anywhere!important}
.sw7-page-index .home-service-copy h2{font-size:clamp(28px,9vw,38px)!important;line-height:1!important}.sw7-page-index .home-service-copy p{font-size:15px!important;line-height:1.5!important}
.sw7-page-index .work-wall{height:calc(100svh - 118px)!important;min-height:500px!important;padding:18px 4vw 22px!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}
.sw7-page-index .work-wall-heading{margin-bottom:10px!important;flex:0 0 auto!important}.sw7-page-index .work-wall-heading h2{font-size:24px!important;line-height:1!important}
.sw7-page-index .work-grid{flex:1 1 auto!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-template-rows:repeat(2,minmax(0,1fr))!important;gap:7px!important;min-height:0!important}
.sw7-page-index .work-project{min-height:0!important;height:auto!important}.sw7-page-index .work-project>img{object-fit:cover!important;object-position:center top!important}
.sw7-page-index .work-overlay{padding:9px!important}.sw7-page-index .work-overlay h3{font-size:clamp(13px,4.2vw,17px)!important;line-height:.9!important}.sw7-page-index .work-actions{padding-top:6px!important;gap:4px!important;display:grid!important;grid-template-columns:1fr!important}
.sw7-page-index .work-actions>a,.sw7-page-index .work-actions .portfolio-contact-trigger{min-height:24px!important;padding:5px 3px!important;font-size:6px!important;white-space:normal!important;width:100%!important}

.sw7-page-services .story{height:auto!important;min-height:0!important}.sw7-page-services .story-grid{display:block!important}.sw7-page-services .story-copy{display:none!important}
.sw7-page-services .stage-wrap{position:relative!important;top:auto!important;height:calc(100svh - 118px)!important;min-height:430px!important;padding:14px 3vw!important}
.sw7-page-services .stage{height:100%!important;min-height:0!important;border-radius:16px!important}
.sw7-page-services .stage-label{left:12px!important;top:10px!important;font-size:7px!important}.sw7-page-services .story-label{top:30px!important;font-size:7px!important}
.sw7-page-services .browser-shell,.sw7-page-services .stage[data-state] .browser-shell{width:94%!important;height:78%!important;border-width:4px!important;border-radius:13px!important;transform:translate(-50%,-46%)!important}
.sw7-page-services .browser-top{height:24px!important;padding:0 7px!important}.sw7-page-services .site{height:calc(100% - 24px)!important}.sw7-page-services .site-title{font-size:clamp(22px,8vw,30px)!important}.sw7-page-services .site-copy{font-size:8px!important;line-height:1.25!important;margin-top:7px!important}.sw7-page-services .site-links{font-size:6px!important;gap:7px!important}.sw7-page-services .site-logo{font-size:8px!important}.sw7-page-services .site-cta{display:none!important}.sw7-page-services .site-bottom{bottom:4%!important;gap:5px!important}.sw7-page-services .site-card{font-size:6px!important;min-height:30px!important;padding-top:4px!important}.sw7-page-services .live-badge{display:none!important}
.sw7-page-services .search-card,.sw7-page-services .lead-card,.sw7-page-services .customer-card,.sw7-page-services .counter-card,.sw7-page-services .location-chip,.sw7-page-services .build-token,.sw7-page-services .revenue-line{display:none!important}

.sw7-page-reviews .reviews-hero{min-height:calc(100svh - 118px)!important;padding:45px 7vw!important;display:flex!important;flex-direction:column!important;justify-content:center!important;overflow:hidden!important}
.sw7-page-reviews .reviews-hero-stars{font-size:20px!important;margin-bottom:15px!important}.sw7-page-reviews .reviews-title{font-size:clamp(52px,18vw,72px)!important;line-height:.88!important;letter-spacing:-.05em!important}.sw7-page-reviews .reviews-hero-line{font-size:clamp(30px,10vw,40px)!important;line-height:.96!important;margin-top:24px!important;overflow-wrap:anywhere!important}.sw7-page-reviews .reviews-hero-copy{font-size:15px!important;margin-top:20px!important}
.sw7-page-reviews .reviews-section{padding:24px 6vw 70px!important;overflow:visible!important}.sw7-page-reviews .review-marquee{display:grid!important;width:100%!important;transform:none!important;animation:none!important;gap:18px!important;padding:0!important}
.sw7-page-reviews .review-card{width:100%!important;min-height:0!important;height:auto!important;padding:24px 20px!important}.sw7-page-reviews .review-card[aria-hidden="true"]{display:none!important}.sw7-page-reviews .review-stars{font-size:21px!important}.sw7-page-reviews .review-quote{margin:20px 0 25px!important;font-size:16px!important;line-height:1.55!important;overflow-wrap:break-word!important}.sw7-page-reviews .review-client{font-size:11px!important}.sw7-page-reviews .contact-client-btn{font-size:10px!important}

.sw7-page-faq .faq-hero{min-height:calc(100svh - 118px)!important;padding:42px 7vw!important;gap:28px!important;overflow:hidden!important}.sw7-page-faq .faq-hero h1{font-size:clamp(72px,27vw,100px)!important}.sw7-page-faq .faq-search{height:58px!important;padding:0 15px!important}.sw7-page-faq .faq-search input{font-size:11px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}

.sw7-page-contact .contact-hero,.sw7-page-index .contact-hero{min-height:calc(100svh - 118px)!important;height:auto!important;padding:26px 7vw!important;grid-template-columns:1fr!important;grid-template-rows:auto 1fr!important;gap:14px!important;overflow:hidden!important}
.sw7-page-contact .contact-kicker,.sw7-page-index .contact-kicker{font-size:clamp(42px,15vw,58px)!important;line-height:.9!important;letter-spacing:-.04em!important;word-break:break-word!important}
.sw7-page-contact .contact-hero h1,.sw7-page-index .contact-hero h1{font-size:clamp(25px,8.5vw,34px)!important;line-height:.95!important;margin-top:16px!important}.sw7-page-contact .contact-hero p,.sw7-page-index .contact-hero p{font-size:13px!important;line-height:1.4!important;margin-top:14px!important}
.sw7-page-contact .hero-map,.sw7-page-index .hero-map{min-width:0!important;overflow:hidden!important}.sw7-page-contact .hero-map .map-heading,.sw7-page-index .hero-map .map-heading{margin-bottom:6px!important}.sw7-page-contact .hero-map .map-heading h2,.sw7-page-index .hero-map .map-heading h2{font-size:22px!important;line-height:1!important}.sw7-page-contact .hero-map .us-map-stage,.sw7-page-index .hero-map .us-map-stage{width:100%!important;height:145px!important;margin:0!important;padding:0!important}.sw7-page-contact .hero-map .us-map-stage img,.sw7-page-index .hero-map .us-map-stage img{width:100%!important;height:100%!important;object-fit:contain!important}.sw7-page-contact .map-origin,.sw7-page-index .map-origin{margin-top:4px!important;font-size:8px!important}

.sw7-page-seo-aeo-management .management-hero{min-height:calc(100svh - 118px)!important;height:auto!important;padding:35px 7vw!important;grid-template-columns:1fr!important;gap:20px!important;overflow:hidden!important}.sw7-page-seo-aeo-management .management-title{font-size:clamp(38px,12vw,48px)!important;line-height:.88!important;letter-spacing:-.045em!important;overflow-wrap:anywhere!important}.sw7-page-seo-aeo-management .management-tagline{font-size:21px!important;margin-top:15px!important}.sw7-page-seo-aeo-management .management-copy{font-size:13px!important;line-height:1.4!important}.sw7-page-seo-aeo-management .management-copy p{margin:10px 0!important}.sw7-page-seo-aeo-management .metric-board{padding:12px!important}.sw7-page-seo-aeo-management .metric{padding:10px!important}.sw7-page-seo-aeo-management .metric strong{font-size:28px!important}.sw7-page-seo-aeo-management .metric-note{font-size:7px!important;margin-top:10px!important}

/* Remove desktop-sized empty space from the About sections. */
.sw7-page-about .belief,.sw7-page-about .purpose,.sw7-page-about .closing{min-height:0!important;height:auto!important;padding:42px 7vw!important;display:block!important}
.sw7-page-about .belief .kicker,.sw7-page-about .purpose .kicker{margin:0 0 18px!important;font-size:17px!important}
.sw7-page-about .belief h2,.sw7-page-about .purpose h2,.sw7-page-about .closing .sw7-lightup{margin:0 0 20px!important;font-size:clamp(32px,10vw,42px)!important;line-height:.95!important}
.sw7-page-about .belief p,.sw7-page-about .purpose p,.sw7-page-about .closing p{margin:0!important;font-size:16px!important;line-height:1.5!important}
.sw7-page-about .closing .closing-copy{display:block!important}
.sw7-page-about .hero .kicker{width:100%!important;max-width:100%!important;font-size:clamp(26px,8.8vw,31px)!important;line-height:1!important;letter-spacing:-.025em!important;white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important;text-align:center!important}

/* The complete Services map and both labels belong in the first phone screen. */
.sw7-page-services .growth-hero{height:calc(100svh - 118px)!important;min-height:362px!important;padding:12px 3vw!important;overflow:hidden!important}
.sw7-page-services .growth-stage{width:100%!important;height:100%!important;min-height:0!important;margin:0!important}
.sw7-page-services .growth-main-title{display:none!important}
.sw7-page-services .growth-title{top:15px!important;bottom:auto!important;transform:none!important;max-width:48%!important;font-size:21px!important;line-height:.9!important;white-space:normal!important}
.sw7-page-services .growth-title.left{left:3%!important}.sw7-page-services .growth-title.right{right:3%!important;text-align:right!important}
.sw7-page-services .growth-map{left:50%!important;top:61%!important;width:96vw!important;height:auto!important;max-height:250px!important;transform:translate(-50%,-50%)!important;overflow:visible!important}
.sw7-page-services .growth-map svg{width:100%!important;height:100%!important;overflow:visible!important}
.sw7-page-services .growth-message{display:none!important}

/* Make the next action obvious below the animated FAQ search. */
.sw7-page-faq .faq-search-wrap::after{content:'SCROLL FOR ANSWERS  ↓';display:block!important;margin-top:18px!important;text-align:center!important;color:#fff!important;font:900 10px/1 Arial,sans-serif!important;letter-spacing:.14em!important;opacity:.9!important}

/* CONTACT must remain a complete single word. */
.sw7-page-contact .contact-kicker,.sw7-page-index .contact-kicker{font-size:clamp(38px,13.5vw,48px)!important;line-height:1!important;letter-spacing:-.045em!important;white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important}

/* The miniature live-site display is not useful on a phone. Remove its entire
   mobile chapter instead of shrinking it until the content is unreadable. */
.sw7-page-services .story{display:none!important}

/* Contact details should read as one continuous mobile page, without the
   desktop section padding creating empty half-screens between items. */
.sw7-page-contact .contact-details{padding:28px 7vw!important}
.sw7-page-contact .detail-section{min-height:0!important;height:auto!important;padding:28px 0!important;gap:16px!important}
.sw7-page-contact .detail-section h2{margin:0 0 20px!important;font-size:clamp(34px,11vw,44px)!important;line-height:.92!important}
.sw7-page-contact .hours{gap:0!important}.sw7-page-contact .hours div{padding:10px 0!important;font-size:15px!important}
.sw7-page-contact .detail-copy{font-size:16px!important;line-height:1.5!important}
.sw7-page-contact .open-roles-label{margin-bottom:12px!important}.sw7-page-contact .career-role{padding:18px 0!important;gap:10px!important}.sw7-page-contact .career-role strong{font-size:22px!important}
.sw7-page-contact .global-contact-block{padding:36px 7vw 44px!important}.sw7-page-contact .contact-options{gap:26px!important}

/* Keep important brand and service names intact at 320px. */
.sw7-universal-brand span,.sw7-brand-name{white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important}
.sw7-page-index .home-service.seo .home-service-label{font-size:clamp(27px,9vw,34px)!important}
.sw7-page-index .home-service.seo .home-service-label span{display:block!important;white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important;letter-spacing:-.045em!important}

/* Remove desktop top/bottom padding before CALL on every mobile page. */
.global-contact-block{min-height:0!important;height:auto!important;padding:32px 7vw 42px!important}
.global-contact-wrap{min-height:0!important;height:auto!important;margin:0!important}
.contact-options{gap:26px!important}

/* Keep the glass-crack focal point centered on phones without changing desktop framing. */
.sw7-page-multi-page-website #heroVideo{object-position:center center!important}

/* Keep the 24/7 response sequence compact; do not stretch the console into an empty full-screen panel. */
.sw7-page-support .support-hero{height:auto!important;min-height:0!important;padding:12px 7vw 18px!important;display:block!important;overflow:hidden!important}
.sw7-page-support .support-hero>div:first-child{display:none!important}
.sw7-page-support .support-console{height:auto!important;min-height:0!important;padding:12px!important;box-shadow:none!important}
.sw7-page-support .console-top{padding-bottom:8px!important}.sw7-page-support .console-label{font-size:8px!important}.sw7-page-support .console-clock{font-size:18px!important}.sw7-page-support .console-date{font-size:7px!important;margin-top:2px!important}
.sw7-page-support .alert-stack{gap:6px!important;margin-top:9px!important}.sw7-page-support .support-alert{padding:8px 10px!important;border-left-width:3px!important;transform:none!important}.sw7-page-support .alert-time{font-size:6px!important}.sw7-page-support .alert-title{margin-top:3px!important;font-size:12px!important;line-height:1.05!important}.sw7-page-support .alert-state{margin-top:4px!important;font-size:7px!important;line-height:1.1!important;letter-spacing:.08em!important}.sw7-page-support .status-pulse{width:5px!important;height:5px!important;margin-right:5px!important}
.sw7-page-support .console-foot{position:static!important;left:auto!important;right:auto!important;bottom:auto!important;margin-top:10px!important;font-size:6px!important;letter-spacing:.05em!important}

/* Essentials and Competitive hero copy plus live display fit in the first phone screen. */
.sw7-page-essentials .essentials-hero,.sw7-page-competitive .essentials-hero{height:calc(100svh - 118px)!important;min-height:362px!important;padding:14px 7vw 12px!important;display:grid!important;grid-template-columns:1fr!important;grid-template-rows:auto minmax(0,1fr)!important;gap:8px!important;align-items:start!important;overflow:hidden!important}
.sw7-page-essentials .growth-title,.sw7-page-competitive .competitive-title{margin:0!important;font-size:30px!important;line-height:.92!important;letter-spacing:-.045em!important;white-space:nowrap!important}
.sw7-page-essentials .essentials-tagline,.sw7-page-competitive .essentials-tagline{margin:8px 0 0!important;font-size:20px!important;line-height:.9!important;letter-spacing:-.035em!important}
.sw7-page-essentials .essentials-intro,.sw7-page-competitive .essentials-intro{margin:8px 0 0!important;font-size:10px!important;line-height:1.28!important}
.sw7-page-essentials .visibility-stage,.sw7-page-competitive .visibility-stage{height:100%!important;min-height:0!important;max-height:none!important;margin:0!important;overflow:hidden!important}
.sw7-page-essentials .growth-feed{transform:none!important;width:100%!important;max-width:none!important;margin:0!important;padding:0 2px!important}
.sw7-page-essentials .growth-feed-label{margin:0 0 4px!important;font-size:7px!important}
.sw7-page-essentials .growth-feed-row{grid-template-columns:7px minmax(0,1fr) auto!important;gap:6px!important;min-height:27px!important;padding:5px 2px!important;transform:none!important}
.sw7-page-essentials .growth-feed-dot{width:5px!important;height:5px!important}
.sw7-page-essentials .growth-feed-row strong{font-size:8px!important;line-height:1.05!important;letter-spacing:.02em!important}
.sw7-page-essentials .growth-feed-row span:last-child{font-size:5.5px!important;letter-spacing:.06em!important}
.sw7-page-essentials .growth-total{padding-top:6px!important}
.sw7-page-essentials .growth-total span{font-size:6px!important}.sw7-page-essentials .growth-total strong{font-size:24px!important}
.sw7-page-essentials .growth-note{margin-top:3px!important;font-size:5px!important}

/* Competitive: keep the complete search-to-customer action visible at once. */
.sw7-page-competitive .essentials-hero{padding:10px 7vw 8px!important;gap:4px!important}
.sw7-page-competitive .competitive-title{font-size:27px!important}
.sw7-page-competitive .essentials-tagline{margin-top:4px!important;font-size:16px!important}
.sw7-page-competitive .essentials-intro{margin-top:5px!important;font-size:11px!important;line-height:1.22!important;letter-spacing:0!important}
.sw7-page-competitive .competitive-board{transform:none!important;width:100%!important;max-width:none!important;margin:0!important}
.sw7-page-competitive .competitive-label{margin:0 0 3px!important;font-size:6px!important}
.sw7-page-competitive .competitive-query{padding:4px 8px!important;border-radius:18px!important;font-size:7px!important}
.sw7-page-competitive .competitive-results{height:100px!important;margin-top:4px!important}
.sw7-page-competitive .competitive-result{height:25px!important;padding:3px 7px!important}
.sw7-page-competitive .competitive-result.r1{top:25px!important}.sw7-page-competitive .competitive-result.r2{top:50px!important}.sw7-page-competitive .competitive-result.r4{top:75px!important}
.sw7-page-competitive .competitive-result strong{font-size:7px!important}.sw7-page-competitive .competitive-result span{font-size:5px!important}
.sw7-page-competitive .competitive-click{right:8px!important;top:4px!important;width:16px!important;height:16px!important;border-width:2px!important}
.sw7-page-competitive .competitive-win{height:11px!important;margin-top:3px!important;font-size:8px!important}
.sw7-page-competitive .competitive-note{margin-top:1px!important;font-size:5px!important}

/* Landing headline stays above the fold instead of sitting on the bottom edge. */
.sw7-page-landing-page .hero{height:calc(100svh - 118px)!important;min-height:362px!important}
.sw7-page-landing-page .hero-content{position:relative!important;height:100%!important;display:block!important;padding:0!important}
.sw7-page-landing-page .hero-copy{position:absolute!important;top:48px!important;left:7vw!important;right:7vw!important;width:auto!important;max-width:none!important;padding:0!important;margin:0!important}
.sw7-page-landing-page .eyebrow{margin-bottom:10px!important;font-size:8px!important}
.sw7-page-landing-page .hero h1{font-size:48px!important;line-height:.86!important}
.sw7-page-landing-page .hero-sub{margin-top:12px!important;font-size:15px!important;line-height:1.25!important}
.sw7-page-landing-page .hero-note{margin-top:14px!important;font-size:8px!important;line-height:1.35!important}
/* Remove the empty gap after item 04 and before the closing call to action. */
.sw7-page-landing-page .features{padding-bottom:0!important}
.sw7-page-landing-page .locked-build{min-height:0!important;height:auto!important;padding:26px 7vw 36px!important}
.sw7-page-landing-page .locked-build-eyebrow{margin:0 0 14px!important}
.sw7-page-landing-page .locked-build-layout{gap:18px!important}
.sw7-page-landing-page .locked-build h2{font-size:48px!important}
.sw7-page-landing-page .locked-build-copy{font-size:14px!important;line-height:1.45!important}

/* Careers: the entire word remains on one line inside a 320px phone. */
.sw7-page-careers .careers-hero{height:calc(100svh - 118px)!important;min-height:362px!important;padding:20px 7vw!important}
.sw7-page-careers .careers-title{width:100%!important;margin:0!important;font-size:50px!important;line-height:.9!important;letter-spacing:-.055em!important;white-space:nowrap!important}
}

/* Parent service labels navigate to their overview pages; the separate arrow opens child choices. */
.sw7-sub-row{display:flex!important;align-items:stretch!important;width:100%!important;border-left:4px solid!important;box-sizing:border-box!important}
.sw7-sub-row.website{border-color:#0784ff!important}.sw7-sub-row.seo{border-color:#00a978!important}
.sw7-sub-row>a{display:flex!important;align-items:center!important;flex:1!important;padding:13px 10px!important;text-decoration:none!important;font:800 12px/1.2 Arial!important;letter-spacing:.04em!important}
.sw7-sub-row.website>a{color:#0784ff!important}.sw7-sub-row.seo>a{color:#00a978!important}
.sw7-sub-row>button{width:44px!important;border:0!important;background:transparent!important;color:inherit!important;font:800 20px/1 Arial!important;cursor:pointer!important}
.sw7-sub-row:hover{background:#fff!important}
@media(max-width:900px){
.sw7-sub-row>a{min-height:48px!important;padding:14px 12px!important}
.sw7-sub-row>button{width:48px!important;font-size:24px!important;transform:rotate(90deg)!important}
.sw7-clean-sub.open>.sw7-sub-row>button{transform:rotate(-90deg)!important}

/* SEO Management package chooser: two compact, readable choices with no split background. */
.sw7-page-seo-aeo-management .levels{padding:24px 7vw!important;background:#ece9e2!important}
.sw7-page-seo-aeo-management .levels-title{margin:0 0 16px!important;font-size:28px!important;line-height:.92!important}
.sw7-page-seo-aeo-management .tier-grid{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;min-height:0!important;background:transparent!important}
.sw7-page-seo-aeo-management .tier,.sw7-page-seo-aeo-management .tier:nth-child(2){display:flex!important;justify-content:center!important;min-height:0!important;height:142px!important;padding:18px 20px!important;border-radius:12px!important;overflow:hidden!important;text-decoration:none!important;box-shadow:none!important}
.sw7-page-seo-aeo-management .tier:nth-child(1){background:#dcecff!important;color:#152033!important}
.sw7-page-seo-aeo-management .tier:nth-child(2){background:#15181d!important;color:#fff!important}
.sw7-page-seo-aeo-management .tier h3,.sw7-page-seo-aeo-management .tier:nth-child(2) h3{margin:0 0 12px!important;font-size:30px!important;line-height:1!important;white-space:nowrap!important}
.sw7-page-seo-aeo-management .tier:nth-child(1) h3{color:#087ef5!important}
.sw7-page-seo-aeo-management .tier:nth-child(2) h3{color:#00c28b!important}
.sw7-page-seo-aeo-management .tier p,.sw7-page-seo-aeo-management .tier:nth-child(2) p{margin:0!important;max-width:none!important;font-size:15px!important;line-height:1.35!important;font-weight:700!important}
.sw7-page-seo-aeo-management .tier:nth-child(1) p{color:#263d56!important}
.sw7-page-seo-aeo-management .tier:nth-child(2) p{color:#d4dae2!important}

/* Keep MANAGEMENT intact on a 320px phone. The explicit BR still separates the two title lines. */
.sw7-page-seo-aeo-management .management-title{font-size:clamp(31px,10.3vw,42px)!important;white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important;letter-spacing:-.05em!important}
}
`;document.head.appendChild(style)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build()
})();
