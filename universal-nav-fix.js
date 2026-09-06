(function () {
  const previousUniversalHeader = document.querySelector('.sw7-universal-header');
  const previousUniversalLogo = previousUniversalHeader && previousUniversalHeader.querySelector('.sw7-universal-brand img')
    ? previousUniversalHeader.querySelector('.sw7-universal-brand img').cloneNode(true)
    : null;
  if (previousUniversalHeader) previousUniversalHeader.remove();
  document.querySelectorAll('.sw7-mobile-overlay,.sw7-compact-overlay').forEach(function (oldOverlay) { oldOverlay.remove(); });
  document.body.classList.remove('sw7-menu-open', 'sw7-compact-menu-open');
  {
    const sourceLogo = previousUniversalLogo || document.querySelector('.brand-logo img,.topbar .brand img,.brand img,header img.logo,.topbar img.logo,img.logo');
    const header = document.createElement('header');
    header.className = 'sw7-universal-header';
    const brand = document.createElement('a');
    brand.className = 'sw7-universal-brand';
    brand.href = 'index.html';
    if (sourceLogo) {
      const logo = sourceLogo.cloneNode(true);
      logo.removeAttribute('class');
      logo.removeAttribute('style');
      brand.appendChild(logo);
    }
    const brandName = document.createElement('span');
    brandName.textContent = 'StartWeb7';
    brand.appendChild(brandName);
    const nav = document.createElement('nav');
    nav.className = 'sw7-clean-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a><div class="sw7-clean-item sw7-services-item"><a class="sw7-clean-trigger" href="services.html">Services <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><div class="sw7-clean-sub"><button class="sw7-website-button" type="button">WEBSITE DESIGN <span aria-hidden="true">▼</span></button><div class="sw7-clean-submenu"><a href="landing-page.html">LANDING PAGE</a><a href="business-website.html">BUSINESS WEBSITE</a><a href="seo-optimized-website.html">SEO-OPTIMIZED WEBSITE</a></div></div><div class="sw7-clean-sub"><button class="sw7-management-toggle" type="button" aria-expanded="false">SEO + AEO MANAGEMENT <span aria-hidden="true">▼</span></button><div class="sw7-clean-submenu"><a href="essentials.html">ESSENTIALS</a><a href="competitive.html">COMPETITIVE</a></div></div></div></div><div class="sw7-clean-item sw7-industries-item"><a class="sw7-clean-trigger" href="industries.html">Industries <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><a href="real-estate-agents.html">REAL ESTATE</a><a href="collision-repair.html">COLLISION REPAIR</a><a href="pool-construction.html">POOL CONSTRUCTION</a><a href="general-contractors.html">GENERAL CONTRACTORS</a></div></div><a href="resources.html">Resources</a><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><div class="sw7-clean-item sw7-contact-item"><a class="sw7-clean-trigger" href="contact.html">Contact <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><a href="support.html">24/7 SUPPORT</a><a href="careers.html">CAREERS</a></div></div>';
    const compactMenuButton = document.createElement('button');
    compactMenuButton.className = 'sw7-compact-toggle';
    compactMenuButton.type = 'button';
    compactMenuButton.setAttribute('aria-label', 'Open menu');
    compactMenuButton.setAttribute('aria-expanded', 'false');
    compactMenuButton.innerHTML = '<span></span><span></span><span></span>';
    const compactMenuOverlay = document.createElement('button');
    compactMenuOverlay.className = 'sw7-compact-overlay';
    compactMenuOverlay.type = 'button';
    compactMenuOverlay.setAttribute('aria-label', 'Close menu');
    header.append(brand, nav, compactMenuButton);
    document.querySelectorAll('body > .page > .nav, body > .nav').forEach(function (oldNav) { oldNav.remove(); });
    document.body.insertBefore(header, document.body.firstChild);
    header.insertAdjacentElement('afterend', compactMenuOverlay);
    const pageName = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    if (/\.html$/i.test(pageName) && pageName !== 'index.html') {
      const pageBack = document.createElement('div');
      pageBack.className = 'sw7-page-back-bar';
      const pageBackLink = document.createElement('a');
      pageBackLink.className = 'sw7-page-back-link';
      pageBackLink.href = 'index.html';
      pageBackLink.textContent = '← BACK';
      pageBackLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.sessionStorage.setItem('sw7RestoreMenuRequested', '1');
        let savedMenuState = null;
        try { savedMenuState = JSON.parse(window.sessionStorage.getItem('sw7CompactMenuState') || 'null'); } catch (error) { savedMenuState = null; }
        if (savedMenuState && savedMenuState.returnUrl) {
          window.location.href = savedMenuState.returnUrl;
        } else if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'index.html';
        }
      });
      pageBack.appendChild(pageBackLink);
      compactMenuOverlay.insertAdjacentElement('afterend', pageBack);
    }
    const fallbackStyle = document.createElement('style');
    fallbackStyle.textContent = `
      body{padding-top:78px!important}
      body.sw7-form-popup-open{overflow:hidden!important}
      .sw7-universal-header{position:fixed!important;z-index:2147483000!important;inset:0 0 auto!important;height:78px!important;background:#fff!important;color:#111!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 4vw!important;box-sizing:border-box!important;box-shadow:0 1px 0 rgba(0,0,0,.08)!important}
      .sw7-universal-brand{display:flex!important;align-items:center!important;gap:13px!important;min-width:210px!important;color:#111!important;text-decoration:none!important;white-space:nowrap!important}.sw7-universal-brand img{display:block!important;width:112px!important;height:58px!important;object-fit:contain!important}.sw7-universal-brand span{font:900 17px/1 Arial,sans-serif!important;letter-spacing:.04em!important}
      .sw7-clean-nav{display:grid!important;grid-template-columns:repeat(8,minmax(0,1fr))!important;width:min(928px,calc(100vw - 300px))!important;height:78px!important;align-items:center!important;margin-left:34px!important;overflow:visible!important}.sw7-clean-nav>a,.sw7-clean-item{height:78px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important}.sw7-clean-nav>a,.sw7-clean-trigger{font:500 13px/1 Arial,sans-serif!important;color:#111!important;text-decoration:none!important;white-space:nowrap!important}.sw7-down-arrow{display:inline-flex!important;align-items:center!important;justify-content:center!important;margin-left:4px!important;font-size:8px!important;cursor:pointer!important}
      @media(min-width:901px){.sw7-clean-nav>a,.sw7-clean-item{transition:background-color .18s ease!important}.sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible,.sw7-clean-item:hover,.sw7-clean-item:focus-within{background:#006ff1!important}.sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible,.sw7-clean-item:hover>.sw7-clean-trigger,.sw7-clean-item:focus-within>.sw7-clean-trigger{color:#fff!important}.sw7-clean-menu a:hover,.sw7-clean-menu a:focus-visible,.sw7-clean-sub>button:hover,.sw7-clean-sub>button:focus-visible{background:#dceeff!important}.sw7-website-group>.sw7-clean-submenu a:hover,.sw7-website-group>.sw7-clean-submenu a:focus-visible{color:#006ff1!important}.sw7-seo-group>.sw7-clean-submenu a:hover,.sw7-seo-group>.sw7-clean-submenu a:focus-visible{color:#00a978!important}.sw7-clean-submenu{position:relative!important;left:0!important;right:auto!important;top:0!important;width:100%!important;min-width:0!important;transform:none!important;box-sizing:border-box!important}}
      .sw7-clean-menu{position:absolute!important;z-index:2147483001!important;top:78px!important;left:0!important;min-width:270px!important;padding:10px!important;background:#f4f3ef!important;box-shadow:0 20px 50px rgba(0,0,0,.2)!important;opacity:0!important;visibility:hidden!important;transform:translateY(8px)!important}.sw7-contact-item>.sw7-clean-menu{left:0!important;right:auto!important;min-width:210px!important}.sw7-clean-item:not(.sw7-services-item):hover>.sw7-clean-menu,.sw7-clean-item:not(.sw7-services-item):focus-within>.sw7-clean-menu,.sw7-clean-item.open>.sw7-clean-menu{opacity:1!important;visibility:visible!important;transform:none!important}
      .sw7-clean-menu a,.sw7-clean-sub>button{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;padding:13px 14px!important;border:0!important;background:transparent!important;color:#111!important;text-decoration:none!important;font:800 12px/1.2 Arial!important;letter-spacing:.04em!important;box-sizing:border-box!important;cursor:pointer!important}.sw7-clean-sub{position:relative!important}.sw7-clean-sub>button.sw7-website-button{color:#0784ff!important;border-left:4px solid #0784ff!important}.sw7-management-toggle{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;min-height:46px!important;padding:13px 14px!important;border:0!important;border-left:4px solid #00a978!important;background:transparent!important;color:#00a978!important;-webkit-text-fill-color:#00a978!important;visibility:visible!important;opacity:1!important;font:800 12px/1.2 Arial,sans-serif!important;letter-spacing:.04em!important;box-sizing:border-box!important;cursor:pointer!important}.sw7-management-toggle:hover,.sw7-management-toggle:focus-visible{background:#dceeff!important;outline:none!important}.sw7-management-toggle>span{display:inline-flex!important;color:#00a978!important;-webkit-text-fill-color:#00a978!important;font-size:11px!important}.sw7-clean-submenu{position:static!important;display:none!important;min-width:0!important;padding:0 0 6px 15px!important;background:#fff!important;box-shadow:none!important;opacity:1!important;visibility:visible!important;transform:none!important}.sw7-clean-sub.open>.sw7-clean-submenu{display:block!important}
      .sw7-page-back-bar{display:none!important;height:46px!important;align-items:center!important;padding:0 5vw!important;background:#fff!important;border-bottom:1px solid #e4e9ef!important;box-sizing:border-box!important}.sw7-page-back-link{display:inline-flex!important;align-items:center!important;min-height:34px!important;color:#07101c!important;text-decoration:none!important;font:900 11px/1 Arial,sans-serif!important;letter-spacing:.1em!important}.sw7-page-back-link:hover,.sw7-page-back-link:focus-visible{color:#006ff1!important;outline:none!important}
      .sw7-compact-toggle,.sw7-compact-overlay{display:none!important}
      .global-contact-block{padding-top:64px!important;padding-bottom:180px!important}
      .global-contact-block .contact-options{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:start!important;gap:28px!important}
      .global-contact-block .contact-option{position:relative!important;min-height:0!important;padding:0!important;border:0!important;background:transparent!important;box-sizing:border-box!important;text-decoration:none!important;gap:8px!important}
      .global-contact-block .contact-label{display:block!important;margin:0!important;line-height:.95!important}
      .global-contact-block a.contact-option{cursor:pointer!important}
      .global-contact-block a.contact-option:hover,.global-contact-block a.contact-option:focus-visible,.global-contact-block .email-option:hover,.global-contact-block .email-option:focus-within,.global-contact-block .form-trigger-block:hover,.global-contact-block .form-trigger-block:focus-within{background:transparent!important;transform:none!important;outline:none!important}
      .global-contact-block .contact-option strong,.global-contact-block .contact-option>a,.global-contact-block .email-address-btn,.global-contact-block .service-select-wrap select{display:flex!important;align-items:center!important;width:100%!important;min-height:48px!important;padding:12px 14px!important;border:1px solid #9fb3c8!important;background:#fff!important;color:#07101c!important;box-sizing:border-box!important;font-weight:800!important;text-align:left!important;text-decoration:none!important;cursor:pointer!important}
      .global-contact-block .email-address-btn:hover,.global-contact-block .email-address-btn:focus-visible,.global-contact-block .service-select-wrap select:hover,.global-contact-block .service-select-wrap select:focus-visible{border-color:#0784ff!important;box-shadow:0 0 0 3px rgba(7,132,255,.14)!important;outline:none!important}
      .global-contact-block .email-address-btn{position:relative!important;justify-content:space-between!important;padding-right:38px!important}
      .global-contact-block .email-address-btn:after{content:"▼"!important;position:absolute!important;right:14px!important;top:50%!important;transform:translateY(-50%)!important;color:#0784ff!important;font-size:11px!important;pointer-events:none!important}
      .global-contact-block .email-option{z-index:4!important}
      .global-contact-block .email-options{position:absolute!important;z-index:5!important;top:100%!important;left:0!important;right:0!important;display:none!important;width:100%!important;min-width:0!important;margin:0!important;padding:0!important;border:1px solid #9fb3c8!important;border-top:0!important;background:#fff!important;box-sizing:border-box!important;box-shadow:0 16px 28px rgba(7,16,28,.14)!important}
      .global-contact-block .email-options.open{display:grid!important;gap:0!important}
      .global-contact-block .email-options a,.global-contact-block .email-options button{display:flex!important;align-items:center!important;width:100%!important;min-height:46px!important;margin:0!important;padding:11px 14px!important;border:0!important;border-top:1px solid #e1e6ec!important;background:#fff!important;color:#07101c!important;box-sizing:border-box!important;text-align:left!important;text-decoration:none!important;font-weight:800!important;cursor:pointer!important}
      .global-contact-block .email-options a,.global-contact-block .email-options button{font:700 clamp(14px,1.25vw,19px)/1.25 Arial,sans-serif!important;letter-spacing:-.02em!important}
      .global-contact-block .email-options a:hover,.global-contact-block .email-options a:focus-visible,.global-contact-block .email-options button:hover,.global-contact-block .email-options button:focus-visible{background:#edf6ff!important;color:#006ff1!important;outline:none!important}
      .global-contact-block .service-select-wrap{position:relative!important;display:block!important;width:100%!important}
      .global-contact-block .service-select-wrap:after{content:"▼"!important;position:absolute!important;right:14px!important;top:50%!important;transform:translateY(-50%)!important;color:#0784ff!important;font-size:11px!important;pointer-events:none!important}
      .global-contact-block .service-select-wrap select{appearance:none!important;padding-right:38px!important}
      .global-contact-block .quick-form-shell{position:fixed!important;z-index:2147483200!important;inset:0!important;width:100%!important;height:100%!important;max-height:none!important;margin:0!important;padding:24px!important;background:rgba(7,16,28,.68)!important;display:none!important;align-items:center!important;justify-content:center!important;overflow-y:auto!important;opacity:1!important;transform:none!important;box-sizing:border-box!important}
      .global-contact-block .quick-form-shell.open{display:flex!important;max-height:none!important;margin:0!important;opacity:1!important;transform:none!important}
      .global-contact-block .quick-form{position:relative!important;width:min(760px,100%)!important;max-height:calc(100dvh - 48px)!important;margin:auto!important;padding:48px!important;background:#fff!important;overflow-y:auto!important;box-shadow:0 28px 90px rgba(0,0,0,.32)!important}
      .global-contact-block .sw7-form-title{margin:0 54px 30px 0!important;color:#07101c!important;font:900 clamp(28px,4vw,46px)/1 Arial,sans-serif!important;letter-spacing:-.04em!important}
      .global-contact-block .sw7-form-close{position:absolute!important;top:18px!important;right:18px!important;width:42px!important;height:42px!important;border:1px solid #b8c4d1!important;background:#fff!important;color:#07101c!important;font:400 30px/1 Arial,sans-serif!important;cursor:pointer!important}
      .global-contact-block .sw7-form-close:hover,.global-contact-block .sw7-form-close:focus-visible{border-color:#0784ff!important;background:#edf6ff!important;outline:none!important}
      .global-contact-block .quick-form .form-fields{display:grid!important;grid-template-columns:1fr 1fr!important;gap:20px 26px!important}
      .global-contact-block .quick-form .form-fields label{display:grid!important;gap:7px!important;color:#07101c!important;font:800 10px/1.2 Arial,sans-serif!important;letter-spacing:.13em!important;text-transform:uppercase!important}
      .global-contact-block .quick-form .form-fields label span{display:block!important;color:#52677f!important;font:inherit!important}
      .global-contact-block .quick-form .form-fields input{display:block!important;width:100%!important;min-height:50px!important;margin:0!important;padding:14px!important;border:1px solid #9fb3c8!important;border-radius:0!important;background:#fff!important;color:#07101c!important;box-sizing:border-box!important;font:600 16px/1.25 Arial,sans-serif!important;outline:none!important}
      .global-contact-block .quick-form .form-fields input:focus{border-color:#0784ff!important;box-shadow:0 0 0 3px rgba(7,132,255,.14)!important}
      .global-contact-block .quick-form .submit-btn{justify-self:start!important;margin-top:4px!important;padding:15px 25px!important;border:1px solid #07101c!important;background:#07101c!important;color:#fff!important;font:900 12px/1 Arial,sans-serif!important;letter-spacing:.1em!important;cursor:pointer!important}
      @media(max-width:700px){.sw7-clean-trigger .sw7-down-arrow{flex:0 0 30px!important;width:30px!important;height:30px!important;margin-left:8px!important;border:1px solid #0784ff!important;background:#edf6ff!important;color:#006ff1!important;box-sizing:border-box!important}.sw7-clean-trigger .sw7-down-arrow:hover,.sw7-clean-trigger .sw7-down-arrow:focus{background:#0784ff!important;color:#fff!important}}
      @media(max-width:900px){.global-contact-block{padding-top:48px!important;padding-bottom:72px!important}.global-contact-block .contact-options{grid-template-columns:1fr!important;gap:30px!important}.global-contact-block .contact-option{min-height:auto!important;padding:0!important}.global-contact-block .email-options{position:static!important;width:100%!important}.global-contact-block .email-options.open{display:grid!important}}
      @media(max-width:600px){.global-contact-block .quick-form-shell{padding:12px!important}.global-contact-block .quick-form{max-height:calc(100dvh - 24px)!important;padding:38px 22px 26px!important}.global-contact-block .form-fields{grid-template-columns:1fr!important}.global-contact-block .sw7-form-close{top:12px!important;right:12px!important}}
      @media(min-width:901px){body{padding-top:86px!important}.sw7-universal-header{height:86px!important;justify-content:flex-start!important;padding:0 4vw!important}.sw7-universal-brand{min-width:220px!important}.sw7-clean-nav{flex:1 1 auto!important;width:auto!important;max-width:none!important;height:86px!important;margin-left:clamp(42px,7vw,130px)!important;border-left:1px solid #e4e9ef!important}.sw7-clean-nav>a,.sw7-clean-item{height:86px!important;border-right:1px solid #e4e9ef!important}.sw7-clean-menu{top:86px!important}}
      @media(max-width:900px){body{padding-top:118px!important}.sw7-universal-header{height:118px!important;display:block!important;padding:0!important;overflow:visible!important}.sw7-universal-brand{height:70px!important;width:max-content!important;margin:0 auto!important;justify-content:center!important;gap:8px!important}.sw7-universal-brand img{width:82px!important;height:52px!important}.sw7-universal-brand span{font-size:14px!important}.sw7-clean-nav{position:absolute!important;inset:70px 0 auto!important;width:100%!important;height:48px!important;margin:0!important;padding:0 5px!important;background:#fff!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:0!important;overflow:visible!important;box-sizing:border-box!important;border-top:1px solid #e5e5e5!important}.sw7-clean-nav>a,.sw7-clean-item{display:flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:47px!important;min-height:47px!important;min-width:0!important;flex:0 1 auto!important}.sw7-clean-nav>a,.sw7-clean-trigger{display:flex!important;align-items:center!important;justify-content:center!important;min-height:47px!important;font:800 clamp(8px,2.55vw,11px)/1 Arial,sans-serif!important;text-transform:uppercase!important;letter-spacing:0!important;text-align:center!important}.sw7-clean-trigger .sw7-down-arrow{flex-basis:20px!important;width:20px!important;height:26px!important;margin:0 -4px 0 2px!important;font-size:7px!important}.sw7-clean-menu{position:fixed!important;left:6px!important;right:6px!important;top:112px!important;width:auto!important;min-width:0!important;max-height:calc(100dvh - 118px)!important;overflow-y:auto!important}.sw7-contact-item>.sw7-clean-menu{left:6px!important;right:6px!important}.sw7-clean-submenu{position:static!important;display:none!important;opacity:1!important;visibility:visible!important;transform:none!important;box-shadow:none!important;padding:0 0 6px 15px!important}.sw7-clean-sub.open>.sw7-clean-submenu{display:block!important}}
      @media(max-width:700px){
        body{padding-top:86px!important}.sw7-page-back-bar{padding:0 22px!important}.sw7-universal-header{z-index:2147483002!important;height:86px!important;padding:0 28px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;overflow:visible!important}.sw7-universal-brand{min-width:0!important;width:auto!important;height:auto!important;margin:0!important}.sw7-compact-toggle{position:fixed!important;z-index:2147483004!important;top:20px!important;right:24px!important;width:46px!important;height:46px!important;border:1px solid #d8dee6!important;background:#fff!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;cursor:pointer!important}.sw7-compact-toggle span{display:block!important;width:21px!important;height:2px!important;background:#07101c!important;transition:transform .24s ease,opacity .2s ease!important}.sw7-universal-header.compact-open .sw7-compact-toggle span:nth-child(1){transform:translateY(7px) rotate(45deg)!important}.sw7-universal-header.compact-open .sw7-compact-toggle span:nth-child(2){opacity:0!important}.sw7-universal-header.compact-open .sw7-compact-toggle span:nth-child(3){transform:translateY(-7px) rotate(-45deg)!important}.sw7-compact-overlay{position:fixed!important;z-index:2147483001!important;inset:0!important;width:100%!important;height:100%!important;border:0!important;background:rgba(7,16,28,.55)!important;opacity:0!important;visibility:hidden!important;display:block!important;transition:opacity .25s ease,visibility .25s ease!important}.sw7-universal-header.compact-open+.sw7-compact-overlay{opacity:1!important;visibility:visible!important}.sw7-clean-nav{position:fixed!important;z-index:2147483003!important;top:0!important;right:0!important;bottom:0!important;left:auto!important;width:min(390px,88vw)!important;height:100dvh!important;margin:0!important;padding:86px 22px 30px!important;background:#fff!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;overflow-y:auto!important;border:0!important;box-shadow:-28px 0 70px rgba(7,16,28,.22)!important;transform:translateX(105%)!important;transition:transform .3s ease!important}.sw7-universal-header.compact-open .sw7-clean-nav{transform:none!important}.sw7-clean-nav>a,.sw7-clean-item{display:block!important;width:100%!important;height:auto!important;min-height:58px!important;border:0!important;border-bottom:1px solid #e4e9ef!important;background:#fff!important}.sw7-clean-nav>a,.sw7-clean-trigger{display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:58px!important;padding:0 12px!important;color:#111!important;font:800 15px/1 Arial,sans-serif!important;text-transform:uppercase!important;letter-spacing:.03em!important}.sw7-clean-item:hover,.sw7-clean-item:focus-within,.sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible{background:#f4f7fb!important;color:#006ff1!important}.sw7-clean-item:hover>.sw7-clean-trigger,.sw7-clean-item:focus-within>.sw7-clean-trigger{color:#006ff1!important}.sw7-clean-menu,.sw7-contact-item>.sw7-clean-menu,.sw7-industries-item>.sw7-clean-menu{position:static!important;width:100%!important;min-width:0!important;max-height:none!important;margin:0!important;padding:4px 0 10px 12px!important;background:#f4f7fb!important;box-shadow:none!important;opacity:0!important;visibility:hidden!important;display:none!important;transform:none!important}.sw7-clean-item.open>.sw7-clean-menu{display:block!important;opacity:1!important;visibility:visible!important}.sw7-services-item.open>.sw7-clean-menu{display:flex!important;flex-direction:column!important;opacity:1!important;visibility:visible!important}.sw7-services-item>.sw7-clean-menu>.sw7-clean-sub{display:block!important;flex:0 0 auto!important;visibility:visible!important;opacity:1!important}.sw7-clean-menu a,.sw7-clean-sub>button{min-height:46px!important;padding:11px 12px!important;font-size:11px!important}.sw7-clean-submenu{position:static!important;width:100%!important;padding-left:12px!important}.sw7-compact-menu-open{overflow:hidden!important}
      }
    `;
    document.head.appendChild(fallbackStyle);
    const industriesNavStyle = document.createElement('style');
    industriesNavStyle.textContent = `
      .sw7-clean-nav{grid-template-columns:repeat(8,minmax(0,1fr))!important;width:min(928px,calc(100vw - 300px))!important}
      .sw7-industries-item>.sw7-clean-menu{left:0!important;right:auto!important;min-width:235px!important}
      @media(max-width:700px){.sw7-clean-nav{width:min(390px,88vw)!important}.sw7-industries-item>.sw7-clean-menu{position:static!important;width:100%!important;min-width:0!important}}
    `;
    document.head.appendChild(industriesNavStyle);
    const compactDesktopNavStyle = document.createElement('style');
    compactDesktopNavStyle.textContent = `
      @media(min-width:701px) and (max-width:1180px){
        body{padding-top:78px!important}
        .sw7-universal-header{height:78px!important;display:flex!important;padding:0 14px!important;overflow:visible!important}
        .sw7-universal-brand{box-sizing:border-box!important;height:78px!important;width:195px!important;min-width:195px!important;margin:0!important;padding-right:18px!important;justify-content:flex-start!important;gap:7px!important}
        .sw7-universal-brand img{width:82px!important;height:52px!important}.sw7-universal-brand span{font-size:14px!important}
        .sw7-compact-toggle,.sw7-compact-overlay{display:none!important}
        .sw7-clean-nav,.sw7-universal-header.compact-open .sw7-clean-nav{position:static!important;inset:auto!important;flex:1 1 auto!important;width:auto!important;height:78px!important;margin:0!important;padding:0!important;display:grid!important;grid-template-columns:repeat(8,minmax(0,1fr))!important;grid-template-rows:none!important;transform:none!important;overflow:visible!important;background:#fff!important;box-shadow:none!important;border-left:1px solid #e4e9ef!important;border-top:0!important}
        .sw7-clean-nav>a,.sw7-clean-item{display:flex!important;width:auto!important;height:78px!important;min-height:78px!important;align-items:center!important;justify-content:center!important;border:0!important;border-right:1px solid #e4e9ef!important;border-bottom:0!important;background:#fff!important}
        .sw7-clean-nav>a,.sw7-clean-trigger{min-height:78px!important;padding:0 3px!important;justify-content:center!important;color:#111!important;font:800 clamp(9px,1.05vw,11px)/1 Arial,sans-serif!important;letter-spacing:0!important;text-align:center!important;white-space:nowrap!important}
        .sw7-clean-item{position:relative!important;align-self:stretch!important}
        .sw7-clean-item>.sw7-clean-trigger{display:flex!important;width:100%!important;height:78px!important;min-height:78px!important;align-items:center!important;justify-content:center!important}
        .sw7-clean-trigger .sw7-down-arrow{display:inline!important;flex:0 0 auto!important;width:auto!important;height:auto!important;margin-left:6px!important;border:0!important;background:transparent!important;color:#111!important;font-size:7px!important}
        .sw7-clean-item.open>.sw7-clean-menu{display:block!important;opacity:1!important;visibility:visible!important}
        .sw7-services-item.open>.sw7-clean-menu{display:flex!important;flex-direction:column!important}
        .sw7-clean-menu,.sw7-contact-item>.sw7-clean-menu,.sw7-industries-item>.sw7-clean-menu{position:absolute!important;z-index:2147483005!important;top:78px!important;left:0!important;right:auto!important;width:min(390px,94vw)!important;min-width:0!important;max-height:calc(100dvh - 78px)!important;margin:0!important;padding:8px!important;overflow-y:auto!important;background:#f4f7fb!important;box-shadow:0 16px 36px rgba(7,16,28,.2)!important}
        .sw7-clean-menu a,.sw7-clean-sub>button{min-height:46px!important;padding:11px 12px!important;font-size:11px!important}
      }
    `;
    document.head.appendChild(compactDesktopNavStyle);
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
      @media(max-width:700px){
        body{padding-top:86px!important}
        .sw7-universal-header{height:86px!important;padding:0 24px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;overflow:visible!important}
        .sw7-universal-brand{height:86px!important;width:auto!important;min-width:0!important;margin:0!important;gap:8px!important}
        .sw7-universal-brand img{width:82px!important;height:54px!important}.sw7-universal-brand span{font-size:15px!important}
        .sw7-compact-toggle{display:flex!important;position:fixed!important;top:20px!important;right:22px!important;width:46px!important;height:46px!important}
        .sw7-compact-overlay{display:block!important}
        .sw7-clean-nav{position:fixed!important;z-index:2147483003!important;top:0!important;right:0!important;bottom:0!important;left:auto!important;width:min(350px,90vw)!important;height:100dvh!important;margin:0!important;padding:82px 18px 24px!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;overflow-y:auto!important;overscroll-behavior:contain!important;background:#fff!important;box-shadow:-24px 0 60px rgba(7,16,28,.2)!important;border:0!important;transform:translateX(105%)!important}
        .sw7-universal-header.compact-open .sw7-clean-nav{transform:none!important}
        .sw7-clean-nav>a,.sw7-clean-item{display:block!important;width:100%!important;height:auto!important;min-height:54px!important;border-bottom:1px solid #e4e9ef!important;background:#fff!important}
        .sw7-clean-nav>a,.sw7-clean-trigger{display:flex!important;min-height:54px!important;padding:0 10px!important;align-items:center!important;justify-content:space-between!important;font:800 14px/1 Arial,sans-serif!important}
        .sw7-clean-trigger .sw7-down-arrow{display:flex!important;flex:0 0 28px!important;width:28px!important;height:28px!important;margin-left:10px!important;border:1px solid #0784ff!important;background:#edf6ff!important;color:#006ff1!important;font-size:7px!important}
        .sw7-clean-menu,.sw7-contact-item>.sw7-clean-menu,.sw7-industries-item>.sw7-clean-menu{position:static!important;width:100%!important;min-width:0!important;max-height:none!important;margin:0!important;padding:5px 0 10px 10px!important;display:none!important;overflow:visible!important;background:#f6f8fb!important;box-shadow:none!important;opacity:0!important;visibility:hidden!important;transform:none!important}
        .sw7-clean-item.open>.sw7-clean-menu{display:block!important;opacity:1!important;visibility:visible!important}.sw7-services-item.open>.sw7-clean-menu{display:block!important}
        .sw7-clean-menu a,.sw7-clean-sub>button{min-height:42px!important;padding:10px 12px!important;font-size:11px!important}
        .sw7-services-item.open .sw7-clean-submenu{display:block!important;padding:0 0 5px 12px!important}.sw7-services-item.open .sw7-clean-sub>button{pointer-events:none!important}.sw7-services-item.open .sw7-clean-sub>button span{display:none!important}
        .sw7-clean-submenu a{min-height:39px!important}
      }
    `;
    document.head.appendChild(mobileMenuStyle);
    const mobileBackStyle = document.createElement('style');
    mobileBackStyle.textContent = `
      @media(max-width:700px){
        body{padding-top:132px!important}
        .sw7-page-back-bar{position:fixed!important;z-index:2147483001!important;top:86px!important;right:0!important;left:0!important;display:flex!important;height:46px!important;align-items:center!important;padding:0 22px!important;background:#fff!important;border-bottom:1px solid #e4e9ef!important}
      }
    `;
    document.head.appendChild(mobileBackStyle);
    function setCompactMenu(open) {
      header.classList.toggle('compact-open', open);
      document.body.classList.toggle('sw7-compact-menu-open', open);
      compactMenuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      compactMenuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open) header.querySelectorAll('.open').forEach(function (item) { item.classList.remove('open'); });
    }
    function saveCompactMenuState(link) {
      const item = link.closest('.sw7-clean-item');
      let itemName = '';
      if (item && item.classList.contains('sw7-services-item')) itemName = 'services';
      if (item && item.classList.contains('sw7-industries-item')) itemName = 'industries';
      if (item && item.classList.contains('sw7-contact-item')) itemName = 'contact';
      const subsection = link.closest('.sw7-clean-sub');
      const subsections = item ? Array.from(item.querySelectorAll(':scope > .sw7-clean-menu > .sw7-clean-sub')) : [];
      window.sessionStorage.setItem('sw7CompactMenuState', JSON.stringify({
        returnUrl: window.location.href,
        destinationUrl: link.href,
        itemName: itemName,
        subsectionIndex: subsection ? subsections.indexOf(subsection) : -1,
        scrollTop: nav.scrollTop
      }));
    }
    let restoringCompactMenu = false;
    function restoreCompactMenuState() {
      if (window.sessionStorage.getItem('sw7RestoreMenuRequested') !== '1') return;
      let state;
      try { state = JSON.parse(window.sessionStorage.getItem('sw7CompactMenuState') || 'null'); } catch (error) { state = null; }
      if (!state || state.returnUrl !== window.location.href || !window.matchMedia('(max-width:700px)').matches) return;
      window.sessionStorage.removeItem('sw7RestoreMenuRequested');
      restoringCompactMenu = true;
      window.requestAnimationFrame(function () {
        window.setTimeout(function () {
          setCompactMenu(true);
          const item = state.itemName ? header.querySelector('.sw7-' + state.itemName + '-item') : null;
          if (item) {
            item.classList.add('open');
            const subsections = item.querySelectorAll(':scope > .sw7-clean-menu > .sw7-clean-sub');
            if (state.subsectionIndex >= 0 && subsections[state.subsectionIndex]) subsections[state.subsectionIndex].classList.add('open');
          }
          nav.scrollTop = state.scrollTop || 0;
          window.setTimeout(function () { restoringCompactMenu = false; }, 350);
        }, 0);
      });
    }
    compactMenuButton.addEventListener('click', function (event) {
      event.stopPropagation();
      setCompactMenu(!header.classList.contains('compact-open'));
    });
    compactMenuOverlay.addEventListener('click', function () { setCompactMenu(false); });
    nav.querySelectorAll('a:not(.sw7-clean-trigger)').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width:700px)').matches) {
          saveCompactMenuState(link);
        }
      });
    });
    header.querySelectorAll('.sw7-clean-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        if (window.matchMedia('(max-width:700px)').matches) {
          if (event.target.closest('.sw7-down-arrow')) {
            event.preventDefault();
            event.stopPropagation();
            trigger.closest('.sw7-clean-item').classList.toggle('open');
          } else {
            saveCompactMenuState(trigger);
          }
        }
      });
    });
    header.querySelectorAll('.sw7-clean-sub>button,.sw7-management-toggle').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        const subsection = button.closest('.sw7-clean-sub');
        subsection.parentElement.querySelectorAll('.sw7-clean-sub.open').forEach(function (otherSubsection) {
          if (otherSubsection !== subsection) otherSubsection.classList.remove('open');
        });
        subsection.classList.toggle('open');
        button.setAttribute('aria-expanded', subsection.classList.contains('open') ? 'true' : 'false');
      });
      button.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });
    });
    const servicesItem = header.querySelector('.sw7-clean-item');
    if (servicesItem) {
      let servicesHoverTimer;
      servicesItem.addEventListener('mouseenter', function () {
        window.clearTimeout(servicesHoverTimer);
        if (window.matchMedia('(min-width:1181px) and (hover:hover) and (pointer:fine)').matches) {
          servicesHoverTimer = window.setTimeout(function () {
            servicesItem.classList.add('open');
          }, 240);
        }
      });
      servicesItem.querySelectorAll('.sw7-clean-sub').forEach(function (subsection) {
        subsection.addEventListener('mouseenter', function () {
          if (window.matchMedia('(min-width:1181px) and (hover:hover) and (pointer:fine)').matches) {
            window.clearTimeout(servicesHoverTimer);
            servicesItem.classList.add('open');
            subsection.classList.add('open');
          }
        });
        subsection.addEventListener('focusin', function () {
          subsection.classList.add('open');
        });
      });
      servicesItem.addEventListener('mouseleave', function () {
        window.clearTimeout(servicesHoverTimer);
        servicesHoverTimer = window.setTimeout(function () {
          servicesItem.classList.remove('open');
          servicesItem.querySelectorAll('.sw7-clean-sub.open').forEach(function (subsection) {
            subsection.classList.remove('open');
          });
        }, 20);
      });
    }
    const contactItem = header.querySelector('.sw7-contact-item');
    if (contactItem) {
      let contactHoverTimer;
      contactItem.addEventListener('mouseenter', function () {
        window.clearTimeout(contactHoverTimer);
        if (window.matchMedia('(min-width:1181px) and (hover:hover) and (pointer:fine)').matches) contactItem.classList.add('open');
      });
      contactItem.addEventListener('mouseleave', function () {
        contactHoverTimer = window.setTimeout(function () {
          contactItem.classList.remove('open');
        }, 350);
      });
    }
    function closeOpenMenus() { if (!restoringCompactMenu) header.querySelectorAll('.open').forEach(function (item) { item.classList.remove('open'); }); }
    document.addEventListener('click', closeOpenMenus);
    window.addEventListener('scroll', closeOpenMenus, { passive: true });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') setCompactMenu(false); });
    window.addEventListener('resize', function () { if (!window.matchMedia('(max-width:700px)').matches) setCompactMenu(false); });
    window.addEventListener('pageshow', restoreCompactMenuState);
    restoreCompactMenuState();
    return;
  }
  // Remove an accidental standalone header row if one appears before the
  // real site header. This keeps the logo and StartWeb7 name together.
  document.querySelectorAll('body > .topbar-wrap').forEach(function (row) {
    if (document.querySelector('header.topbar .topbar-wrap')) row.remove();
  });
  // Every page must show the S7 mark next to the StartWeb7 name. Some older
  // page headers use `.brand img`, so restore that logo into the universal
  // header when the page-specific builder did not find it.
  const universalBrand = document.querySelector('.sw7-universal-brand');
  if (universalBrand && !universalBrand.querySelector('img')) {
    const logoSource = document.querySelector('.topbar .brand img, .brand img, .brand-logo img, header img.logo, img.logo');
    if (logoSource) {
      const restoredLogo = logoSource.cloneNode(true);
      restoredLogo.removeAttribute('class');
      restoredLogo.removeAttribute('style');
      universalBrand.insertBefore(restoredLogo, universalBrand.firstChild);
    }
  }
  if (/business-website\.html$/i.test(location.pathname)) {
    const duplicateWebsiteTitle = document.querySelector('.heroTitle .outline');
    if (duplicateWebsiteTitle) duplicateWebsiteTitle.remove();
  }
  const style = document.createElement('style');
  style.textContent = `
    body > .topbar-wrap{display:none!important}
    .nav{width:min(1120px,calc(100% - 48px))!important;height:78px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;margin:0 auto!important;padding:0!important}
    .sw7-nav-links{display:grid!important;grid-template-columns:repeat(6,minmax(72px,1fr))!important;align-items:center!important;gap:12px!important;width:min(660px,68vw)!important;margin-left:auto!important}
    .sw7-nav-links>a,.sw7-nav-links>.sw7-nav-item{margin:0!important;justify-content:center!important;text-align:center!important}
    .sw7-nav-links>a,.sw7-nav-item>a{color:#111!important;font:500 13px/1 Arial,Helvetica,sans-serif!important;text-decoration:none!important;white-space:nowrap!important}
    .brand-logo{display:inline-flex!important;align-items:center;gap:13px;width:auto!important;line-height:1!important;white-space:nowrap}
    .brand-logo img{width:112px!important;height:auto!important;flex:0 0 auto}
    .sw7-brand-name{font-size:17px;font-weight:900;letter-spacing:.04em;color:#111}
    .sw7-nav-item{position:relative;display:inline-flex;align-items:center;gap:5px}
    .sw7-nav-toggle{appearance:none;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer;padding:5px;line-height:1}
    .sw7-nav-toggle:after{content:'\\203A';font-size:16px}
    .sw7-nav-menu{position:absolute;z-index:9999;top:calc(100% + 14px);left:0;min-width:270px;padding:10px;background:#f4f3ef;color:#111;box-shadow:0 20px 50px rgba(0,0,0,.2);opacity:0;visibility:hidden;transform:translateY(8px);transition:.2s ease;text-align:left}
    .sw7-nav-item:hover>.sw7-nav-menu,.sw7-nav-item:focus-within>.sw7-nav-menu,.sw7-nav-item.open>.sw7-nav-menu{opacity:1;visibility:visible;transform:none}
    .sw7-nav-menu a,.sw7-sub-head{display:flex!important;align-items:center;justify-content:space-between;width:100%;margin:0!important;padding:13px 14px!important;color:#111!important;text-decoration:none!important;font-size:12px!important;font-weight:800!important;letter-spacing:.04em;background:transparent;white-space:normal}
    .sw7-nav-menu a:hover,.sw7-nav-menu a:focus,.sw7-sub-head:hover{background:#fff}
    .sw7-sub{position:relative}
    .sw7-sub-head{border:0;cursor:pointer;font-family:inherit}
    .sw7-sub-head:after{content:'\\203A';font-size:18px}
    .sw7-website-group>.sw7-sub-head{color:#0784ff!important;border-left:4px solid #0784ff}
    .sw7-seo-group>.sw7-sub-head{color:#00a978!important;border-left:4px solid #00a978}
    .sw7-sub-menu{position:static;display:none;min-width:0;padding:0 0 6px 15px;background:#fff;color:#111;box-shadow:none;opacity:1;visibility:visible;transform:none}
    .sw7-website-group>.sw7-sub-menu{border-top:4px solid #0784ff}
    .sw7-seo-group>.sw7-sub-menu{border-top:4px solid #00a978}
    .sw7-website-group>.sw7-sub-menu a:hover,.sw7-website-group>.sw7-sub-menu a:focus{color:#0784ff!important}
    .sw7-seo-group>.sw7-sub-menu a:hover,.sw7-seo-group>.sw7-sub-menu a:focus{color:#00a978!important}
    .sw7-sub:hover>.sw7-sub-menu,.sw7-sub:focus-within>.sw7-sub-menu,.sw7-sub.open>.sw7-sub-menu{display:block}
    .sw7-contact-menu{position:absolute;z-index:9999;top:calc(100% + 14px);right:0;min-width:210px;padding:10px;background:#f4f3ef;color:#111;box-shadow:0 20px 50px rgba(0,0,0,.2);opacity:0;visibility:hidden;transform:translateY(8px);transition:.2s ease;text-align:left}
    .sw7-nav-item:hover>.sw7-contact-menu,.sw7-nav-item:focus-within>.sw7-contact-menu,.sw7-nav-item.open>.sw7-contact-menu{opacity:1;visibility:visible;transform:none}
    .sw7-contact-menu a{display:block!important;width:100%;margin:0!important;padding:13px 14px!important;color:#111!important;text-decoration:none!important;font-size:12px!important;font-weight:800!important;letter-spacing:.04em;white-space:normal}
    .sw7-contact-menu a:hover,.sw7-contact-menu a:focus{background:#fff}
    .sw7-universal-copyright{display:block!important;width:100%!important;margin:0!important;padding:24px 20px!important;background:#111!important;color:#fff!important;text-align:center!important;font:700 12px/1.4 Arial,Helvetica,sans-serif!important;letter-spacing:.04em!important;text-transform:none!important}
    @media(max-width:820px){
      .nav{height:118px!important;display:block!important;padding:0!important;overflow:visible!important}
      .nav>.brand-logo{height:70px!important;width:max-content!important;margin:0 auto!important;justify-content:center!important}
      .sw7-nav-links{height:48px!important;width:100%!important;grid-template-columns:repeat(6,1fr)!important;gap:0!important;margin:0!important;padding:0 4px!important}
      .sw7-nav-links>a,.sw7-nav-links>.sw7-nav-item,.sw7-nav-links .sw7-nav-item>a{display:flex!important;align-items:center!important;justify-content:center!important;min-width:0!important}
      .sw7-nav-links>a,.sw7-nav-item>a{font:900 7px/1 Arial,Helvetica,sans-serif!important;text-transform:uppercase!important;letter-spacing:0!important;white-space:nowrap!important}
      .sw7-nav-links .sw7-down-arrow{display:inline-block!important;margin-left:2px!important;font-size:6px!important;line-height:1!important}
      .sw7-nav-links>.sw7-nav-item{width:100%!important;gap:0!important;overflow:visible!important}
      .sw7-nav-links{grid-template-columns:repeat(6,1fr)!important;width:100%!important;gap:0!important}
      .brand-logo img{width:88px!important}.sw7-brand-name{font-size:14px}
      .sw7-nav-menu{left:auto;right:0;min-width:min(300px,88vw)}
      .sw7-contact-menu{position:fixed;top:92px;right:12px;min-width:min(260px,calc(100vw - 24px))}
      .sw7-sub-menu{position:static;display:none;box-shadow:none;padding:0 0 6px 15px;opacity:1;visibility:visible;transform:none;background:#e9e7e0}
      .sw7-sub.open>.sw7-sub-menu{display:block}
    }
  `;
  document.head.appendChild(style);
  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo && !brandLogo.querySelector('.sw7-brand-name')) {
    const brandName = document.createElement('span');
    brandName.className = 'sw7-brand-name';
    brandName.textContent = 'StartWeb7';
    brandLogo.appendChild(brandName);
  }
  const copyrightText = '© 2026 WebStart7. All rights reserved.';
  const copyrightMatches = [...document.querySelectorAll('body *')].filter(function (element) {
    return element.children.length === 0 && /all rights reserved/i.test(element.textContent || '');
  });
  if (copyrightMatches.length) {
    copyrightMatches[0].textContent = copyrightText;
    copyrightMatches[0].classList.add('sw7-universal-copyright');
    copyrightMatches.slice(1).forEach(function (element) { element.style.display = 'none'; });
  } else {
    const copyright = document.createElement('div');
    copyright.className = 'sw7-universal-copyright';
    copyright.textContent = copyrightText;
    document.body.appendChild(copyright);
  }
  const existingCandidates = [...document.querySelectorAll('header nav a, header .nav a, body > .page > nav a, .topbar .service-nav a, .nav a')];
  const existingServiceLink = existingCandidates.find(a => a.textContent.trim().toLowerCase().startsWith('services'));
  if (!existingServiceLink || existingServiceLink.closest('.sw7-nav-item')) return;
  const navLinks = existingServiceLink.parentElement;
  navLinks.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><a href="contact.html">Contact <span class="sw7-down-arrow" aria-hidden="true">▼</span></a>';
  navLinks.classList.add('sw7-nav-links');
  const candidates = [...navLinks.querySelectorAll('a')];
  const serviceLink = candidates.find(a => a.textContent.trim().toLowerCase().startsWith('services'));
  const wrapper = document.createElement('div');
  wrapper.className = 'sw7-nav-item';
  serviceLink.parentNode.insertBefore(wrapper, serviceLink);
  wrapper.appendChild(serviceLink);
  const toggle = document.createElement('button');
  toggle.className = 'sw7-nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open Services menu');
  toggle.setAttribute('aria-expanded', 'false');
  wrapper.appendChild(toggle);
  const menu = document.createElement('div');
  menu.className = 'sw7-nav-menu';
  menu.innerHTML = `
    <div class="sw7-sub sw7-website-group"><button class="sw7-sub-head" type="button">WEBSITE DESIGN <span class="sw7-down-arrow" aria-hidden="true">▼</span></button><div class="sw7-sub-menu"><a href="landing-page.html">LANDING PAGE</a><a href="business-website.html">BUSINESS WEBSITE</a><a href="seo-optimized-website.html">SEO-OPTIMIZED WEBSITE</a></div></div>
    <div class="sw7-sub sw7-seo-group"><button class="sw7-sub-head" type="button">SEO + AEO MANAGEMENT <span class="sw7-down-arrow" aria-hidden="true">▼</span></button><div class="sw7-sub-menu"><a href="essentials.html">ESSENTIALS</a><a href="competitive.html">COMPETITIVE</a></div></div>
  `;
  wrapper.appendChild(menu);
  serviceLink.addEventListener('click', function (event) {
    if (window.matchMedia('(max-width:820px)').matches) {
      event.preventDefault();
      event.stopPropagation();
      wrapper.classList.toggle('open');
    }
  });
  toggle.addEventListener('click', function (event) { event.stopPropagation(); wrapper.classList.toggle('open'); toggle.setAttribute('aria-expanded', wrapper.classList.contains('open') ? 'true' : 'false'); });
  menu.querySelectorAll('.sw7-sub-head').forEach(button => { button.addEventListener('click', function (event) { event.stopPropagation(); button.parentElement.classList.toggle('open'); }); });
  const contactLink = candidates.find(a => a.textContent.trim().toLowerCase().startsWith('contact'));
  if (contactLink && !contactLink.closest('.sw7-contact-item')) {
    const contactWrapper = document.createElement('div');
    contactWrapper.className = 'sw7-nav-item sw7-contact-item';
    contactLink.parentNode.insertBefore(contactWrapper, contactLink);
    contactWrapper.appendChild(contactLink);
    const contactToggle = document.createElement('button');
    contactToggle.className = 'sw7-nav-toggle';
    contactToggle.type = 'button';
    contactToggle.setAttribute('aria-label', 'Open Contact menu');
    contactToggle.setAttribute('aria-expanded', 'false');
    contactWrapper.appendChild(contactToggle);
    const contactMenu = document.createElement('div');
    contactMenu.className = 'sw7-contact-menu';
    contactMenu.innerHTML = '<a href="support.html">24/7 SUPPORT</a><a href="careers.html">CAREERS</a>';
    contactWrapper.appendChild(contactMenu);
    contactLink.addEventListener('click', function (event) {
      if (window.matchMedia('(max-width:820px)').matches) {
        event.preventDefault();
        event.stopPropagation();
        contactWrapper.classList.toggle('open');
      }
    });
    contactToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      contactWrapper.classList.toggle('open');
      contactToggle.setAttribute('aria-expanded', contactWrapper.classList.contains('open') ? 'true' : 'false');
    });
    document.addEventListener('click', function () {
      contactWrapper.classList.remove('open');
      contactToggle.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', () => { wrapper.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
  if (document.querySelector('.journey-demo')) {
    const industryActionStyles = document.createElement('link');
    industryActionStyles.rel = 'stylesheet';
    industryActionStyles.href = 'industry-live-actions.css';
    document.head.appendChild(industryActionStyles);
    const industryDistinctStyles = document.createElement('link');
    industryDistinctStyles.rel = 'stylesheet';
    industryDistinctStyles.href = 'industry-distinct-visuals.css';
    document.head.appendChild(industryDistinctStyles);
  }
})();

(function () {
  const footer = document.querySelector('.global-contact-block');
  if (!footer || document.querySelector('.resource-cta')) return;
  const appointment = document.createElement('section');
  appointment.className = 'resource-cta sw7-lead-source-cta';
  appointment.innerHTML = '<div class="resource-inner"><h2>Build a lead source you own.</h2><a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3w4acYUDZ6bDD4a3BT5IjqMcrN7_OqtNHk6iglerJgKkBYj2Cv_1UXoj2u7f_B9sLNZOI1PjWj?gv=true" target="_blank" rel="noopener">BOOK AN APPOINTMENT →</a></div>';
  const style = document.createElement('style');
  style.textContent = '.sw7-lead-source-cta{padding:62px 5vw;background:#0784ff;color:#fff}.sw7-lead-source-cta .resource-inner{width:min(1120px,100%);margin:auto;display:flex;align-items:center;justify-content:space-between;gap:40px}.sw7-lead-source-cta h2{margin:0;font:900 clamp(30px,3.5vw,48px)/1 Arial,Helvetica,sans-serif;letter-spacing:-.04em}.sw7-lead-source-cta a{flex:0 0 auto;padding:17px 20px;border:2px solid #fff;color:#fff;text-decoration:none;font:900 12px/1 Arial,Helvetica,sans-serif;letter-spacing:.1em}@media(max-width:700px){.sw7-lead-source-cta{padding:48px 7vw}.sw7-lead-source-cta .resource-inner{display:block}.sw7-lead-source-cta a{display:inline-block;margin-top:25px}}';
  document.head.appendChild(style);
  footer.parentNode.insertBefore(appointment, footer);
})();

(function () {
  const emailButton = document.getElementById('openEmailOptions');
  const emailOptions = document.getElementById('emailOptions');
  if (!emailButton || !emailOptions) return;
  emailOptions.classList.remove('open');
  emailOptions.setAttribute('aria-hidden', 'true');
  emailButton.setAttribute('aria-expanded', emailOptions.classList.contains('open') ? 'true' : 'false');
  document.addEventListener('click', function (event) {
    window.setTimeout(function () {
      const emailArea = emailButton.closest('.email-option') || emailButton.parentElement;
      if (emailArea && emailArea.contains(event.target)) {
        emailButton.setAttribute('aria-expanded', emailOptions.classList.contains('open') ? 'true' : 'false');
        return;
      }
      emailOptions.classList.remove('open');
      emailOptions.setAttribute('aria-hidden', 'true');
      emailButton.setAttribute('aria-expanded', 'false');
    }, 0);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    emailOptions.classList.remove('open');
    emailOptions.setAttribute('aria-hidden', 'true');
    emailButton.setAttribute('aria-expanded', 'false');
  });
})();

(function () {
  const serviceSelect = document.getElementById('serviceSelect');
  const quickForm = document.getElementById('quickForm');
  if (!serviceSelect || !quickForm) return;
  const form = quickForm.querySelector('form');
  if (!form) return;

  quickForm.setAttribute('role', 'dialog');
  quickForm.setAttribute('aria-modal', 'true');
  quickForm.setAttribute('aria-hidden', 'true');

  let title = form.querySelector('.sw7-form-title');
  if (!title) {
    title = document.createElement('h2');
    title.className = 'sw7-form-title';
    form.insertBefore(title, form.firstChild);
  }
  title.id = 'sw7FormTitle';
  quickForm.setAttribute('aria-labelledby', title.id);

  let closeButton = form.querySelector('.sw7-form-close');
  if (!closeButton) {
    closeButton = document.createElement('button');
    closeButton.className = 'sw7-form-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close form');
    closeButton.innerHTML = '&times;';
    form.insertBefore(closeButton, form.firstChild);
  }

  function closeForm() {
    quickForm.classList.remove('open');
    quickForm.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sw7-form-popup-open');
    serviceSelect.selectedIndex = 0;
  }

  function openForm(formTitle) {
    title.textContent = formTitle || 'Tell Us About Your Business';
    quickForm.classList.add('open');
    quickForm.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sw7-form-popup-open');
    window.setTimeout(function () {
      const firstInput = form.querySelector('input:not([type="hidden"]), textarea');
      if (firstInput) firstInput.focus();
    }, 80);
  }

  serviceSelect.addEventListener('change', function () {
    const selectedText = serviceSelect.options[serviceSelect.selectedIndex].text;
    openForm(selectedText + ' Form');
  });

  document.addEventListener('sw7:open-contact-form', function (event) {
    openForm(event.detail && event.detail.title ? event.detail.title : 'Tell Us About Your Business');
  });

  closeButton.addEventListener('click', closeForm);
  quickForm.addEventListener('click', function (event) {
    if (event.target === quickForm) closeForm();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && quickForm.classList.contains('open')) closeForm();
  });
})();

(function () {
  const actionButtons = document.querySelectorAll('.hero-action,.sw7-lead-source-cta a,.tool-cta-action a,.home-start');
  actionButtons.forEach(function (action) {
    action.addEventListener('click', function (event) {
      const label = (action.textContent || '').replace(/[→]/g, '').trim();
      const href = action.getAttribute('href') || '';
      const hashTarget = href.indexOf('#') >= 0 ? href.split('#').pop().toLowerCase() : '';
      const opensForm = hashTarget === 'form-fill' || hashTarget === 'contact' ||
        action.closest('.tool-cta-action') ||
        /^(tell us about|choose a service|turn search traffic into leads)/i.test(label);
      if (!opensForm) return;
      event.preventDefault();
      document.dispatchEvent(new CustomEvent('sw7:open-contact-form', {
        detail: { title: label || 'Tell Us About Your Business' }
      }));
    });
  });
})();
