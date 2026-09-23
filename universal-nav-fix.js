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
    const brandCopy = document.createElement('span');
    brandCopy.className = 'sw7-brand-copy';
    const brandName = document.createElement('span');
    brandName.className = 'sw7-brand-name';
    brandName.textContent = 'StartWeb7';
    const brandSlogan = document.createElement('span');
    brandSlogan.className = 'sw7-brand-slogan';
    brandSlogan.textContent = 'We bring leads to you.';
    brandCopy.append(brandName, brandSlogan);
    brand.appendChild(brandCopy);
    const nav = document.createElement('nav');
    nav.className = 'sw7-clean-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a><div class="sw7-clean-item sw7-services-item"><a class="sw7-clean-trigger" href="services.html">Services <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><div class="sw7-clean-sub"><button class="sw7-website-button" type="button">WEBSITE DESIGN <span aria-hidden="true">▼</span></button><div class="sw7-clean-submenu"><a href="landing-page.html">LANDING PAGE</a><a href="business-website.html">BUSINESS WEBSITE</a><a href="seo-optimized-website.html">SEO-OPTIMIZED WEBSITE</a></div></div><div class="sw7-clean-sub"><button class="sw7-management-toggle" type="button" aria-expanded="false">SEO + AEO MANAGEMENT <span aria-hidden="true">▼</span></button><div class="sw7-clean-submenu"><a href="essentials.html">ESSENTIALS</a><a href="competitive.html">COMPETITIVE</a></div></div></div></div><div class="sw7-clean-item sw7-industries-item"><a class="sw7-clean-trigger" href="industries.html">Industries <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><a href="real-estate-agents.html">REAL ESTATE</a><a href="collision-repair.html">COLLISION REPAIR</a><a href="pool-construction.html">POOL CONSTRUCTION</a><a href="general-contractors.html">GENERAL CONTRACTORS</a><a href="catering.html">CATERING</a></div></div><a href="resources.html">Resources</a><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><div class="sw7-clean-item sw7-contact-item"><a class="sw7-clean-trigger" href="contact.html">Contact <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><a href="support.html">24/7 SUPPORT</a><a href="careers.html">CAREERS</a></div></div>';
    const mobileScrollTrack = document.createElement('div');
    mobileScrollTrack.className = 'sw7-mobile-scroll-track';
    mobileScrollTrack.setAttribute('aria-hidden', 'true');
    const mobileScrollThumb = document.createElement('div');
    mobileScrollThumb.className = 'sw7-mobile-scroll-thumb';
    mobileScrollTrack.appendChild(mobileScrollThumb);
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
    /* The separate scroll rail looked like a broken gray bar in the compact menu.
       The menu itself has its own normal scrollbar, so never place this extra rail
       in the header. */
    header.append(brand, nav, compactMenuButton);
    /* Older pages use three different top navigation shells. Remove every
       legacy shell after the logo has been copied, so the shared header is
       the only navigation that can ever remain on screen. */
    document.querySelectorAll([
      'body > .page > .nav',
      'body > .nav',
      'body > .topbar-wrap',
      'body > header.header',
      'body > header.topbar',
      'body > .page > header.header',
      'body > .page > header.topbar'
    ].join(',')).forEach(function (oldNav) { oldNav.remove(); });
    document.body.insertBefore(header, document.body.firstChild);
    header.insertAdjacentElement('afterend', compactMenuOverlay);
    /* The shared header is now in the page, so never let a later menu
       interaction error leave the navigation hidden behind the paint gate. */
    document.documentElement.classList.remove('sw7-nav-pending');
    const sessionStore = {
      getItem: function (key) {
        try { return window.sessionStorage.getItem(key); } catch (error) { return null; }
      },
      setItem: function (key, value) {
        try { window.sessionStorage.setItem(key, value); } catch (error) { /* file:// storage may be blocked */ }
      },
      removeItem: function (key) {
        try { window.sessionStorage.removeItem(key); } catch (error) { /* file:// storage may be blocked */ }
      }
    };
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
        /* This is a real Back button: do not redirect or recreate a menu.
           The browser restores the visitor's actual previous state. */
        sessionStore.removeItem('sw7RestoreMenuRequested');
        if (window.history.length > 1) {
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
      .global-contact-block{padding-top:64px!important;padding-bottom:48px!important}
      .global-contact-block .contact-options{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:start!important;gap:28px!important}
      .global-contact-block .contact-option{position:relative!important;min-height:0!important;padding:0!important;border:0!important;background:transparent!important;box-sizing:border-box!important;text-decoration:none!important;gap:8px!important}
      .global-contact-block .contact-label{display:block!important;margin:0!important;line-height:.95!important}
      .global-contact-block a.contact-option{cursor:pointer!important}
      .global-contact-block a.contact-option:hover,.global-contact-block a.contact-option:focus-visible,.global-contact-block .email-option:hover,.global-contact-block .email-option:focus-within,.global-contact-block .form-trigger-block:hover,.global-contact-block .form-trigger-block:focus-within{background:transparent!important;transform:none!important;outline:none!important}
      .global-contact-block .contact-option strong,.global-contact-block .contact-option>a,.global-contact-block .email-address-btn,.global-contact-block .service-select-wrap select{display:flex!important;align-items:center!important;width:100%!important;min-height:48px!important;padding:12px 14px!important;border:1px solid #9fb3c8!important;background:#fff!important;color:#07101c!important;box-sizing:border-box!important;font-weight:800!important;text-align:left!important;text-decoration:none!important;cursor:pointer!important}
      .global-contact-block .email-address-btn:hover,.global-contact-block .email-address-btn:focus-visible,.global-contact-block .service-select-wrap select:hover,.global-contact-block .service-select-wrap select:focus-visible{border-color:#0784ff!important;box-shadow:0 0 0 3px rgba(7,132,255,.14)!important;outline:none!important}
      .global-contact-block .email-address-btn{position:relative!important;justify-content:space-between!important;padding-right:38px!important}
      .global-contact-block .home-contact-options .email-address-btn{justify-content:center!important;text-align:center!important;padding:12px 0!important}
      .global-contact-block .email-address-btn:after{display:none!important}
      .global-contact-block .email-contact-menu{position:relative!important;display:block!important;width:100%!important}
      .global-contact-block .email-contact-menu summary{list-style:none!important}
      .global-contact-block .email-contact-menu summary::-webkit-details-marker{display:none!important}
      .global-contact-block .email-contact-menu[open] .email-options{display:grid!important;gap:0!important}
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
      .sw7-mobile-scroll-track{display:none}
      @media(max-width:700px){
        body{padding-top:86px!important}
        .sw7-universal-header{height:86px!important;padding:0 24px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;overflow:visible!important}
        .sw7-universal-brand{height:86px!important;width:auto!important;min-width:0!important;margin:0!important;gap:8px!important}
        .sw7-universal-brand img{width:82px!important;height:54px!important}.sw7-universal-brand span{font-size:15px!important}
        .sw7-compact-toggle{display:flex!important;position:fixed!important;top:20px!important;right:22px!important;width:46px!important;height:46px!important}
        .sw7-compact-overlay{display:block!important}
        .sw7-clean-nav{position:fixed!important;z-index:2147483003!important;top:0!important;right:0!important;bottom:auto!important;left:auto!important;box-sizing:border-box!important;width:min(350px,90vw)!important;height:100vh!important;height:100dvh!important;max-height:100dvh!important;margin:0!important;padding:82px 28px 24px 18px!important;display:block!important;overflow-x:hidden!important;overflow-y:scroll!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-y:contain!important;touch-action:pan-y!important;scrollbar-gutter:stable!important;scrollbar-width:thin!important;scrollbar-color:#7f8790 #e1e5e9!important;background:#fff!important;box-shadow:-24px 0 60px rgba(7,16,28,.2)!important;border:0!important;transform:translateX(105%)!important}
        .sw7-clean-nav::-webkit-scrollbar{width:7px!important}.sw7-clean-nav::-webkit-scrollbar-track{background:#e8edf3!important}.sw7-clean-nav::-webkit-scrollbar-thumb{background:#0784ff!important;border-radius:8px!important}
        .sw7-clean-nav::after{content:""!important;display:block!important;width:100%!important;height:calc(100dvh - 150px)!important;min-height:420px!important;pointer-events:none!important}
        .sw7-mobile-scroll-track{display:none!important;position:fixed!important;z-index:2147483640!important;top:86px!important;right:4px!important;bottom:10px!important;width:10px!important;border-radius:10px!important;background:#d7dde5!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;touch-action:none!important}
        .sw7-universal-header.compact-open .sw7-mobile-scroll-track{display:block!important}
        .sw7-universal-header.compact-open::after{content:none!important;display:none!important}
        .sw7-mobile-scroll-thumb{position:absolute!important;top:0!important;right:0!important;width:10px!important;height:120px;min-height:52px!important;border-radius:10px!important;background:#0784ff!important;box-shadow:0 0 0 1px rgba(0,77,160,.18)!important;cursor:grab!important}
        .sw7-universal-header.compact-open .sw7-clean-nav{transform:none!important}
        .sw7-clean-nav>a,.sw7-clean-item{display:block!important;flex:0 0 auto!important;width:100%!important;height:auto!important;min-height:54px!important;border-bottom:1px solid #e4e9ef!important;background:#fff!important}
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
    function updateMobileScrollThumb() {
      if (window.innerWidth > 700) return;
      const trackHeight = mobileScrollTrack.clientHeight;
      const scrollRange = nav.scrollHeight - nav.clientHeight;
      if (!trackHeight || scrollRange <= 1) {
        mobileScrollThumb.style.height = Math.max(52, Math.round(trackHeight * .28)) + 'px';
        mobileScrollThumb.style.transform = 'translateY(0)';
        return;
      }
      const thumbHeight = Math.max(44, Math.round(trackHeight * nav.clientHeight / nav.scrollHeight));
      const thumbRange = Math.max(0, trackHeight - thumbHeight);
      const thumbTop = scrollRange ? Math.round(thumbRange * nav.scrollTop / scrollRange) : 0;
      mobileScrollThumb.style.height = thumbHeight + 'px';
      mobileScrollThumb.style.transform = 'translateY(' + thumbTop + 'px)';
    }
    function revealMobileDropdown(item) {
      if (!item || !window.matchMedia('(max-width:700px)').matches) return;
      window.requestAnimationFrame(function () {
        const topPadding = 94;
        const targetTop = Math.max(0, item.offsetTop - topPadding);
        nav.scrollTo({ top: targetTop, behavior: 'smooth' });
        updateMobileScrollThumb();
        window.setTimeout(updateMobileScrollThumb, 80);
        window.setTimeout(updateMobileScrollThumb, 180);
        window.setTimeout(updateMobileScrollThumb, 350);
      });
    }
    nav.addEventListener('scroll', updateMobileScrollThumb, { passive: true });
    window.addEventListener('resize', updateMobileScrollThumb);
    new MutationObserver(function () { window.requestAnimationFrame(updateMobileScrollThumb); }).observe(nav, { attributes: true, subtree: true, attributeFilter: ['class'] });
    let scrollDragStartY = 0;
    let scrollDragStartTop = 0;
    mobileScrollThumb.addEventListener('pointerdown', function (event) {
      event.preventDefault();
      scrollDragStartY = event.clientY;
      scrollDragStartTop = nav.scrollTop;
      mobileScrollThumb.setPointerCapture(event.pointerId);
    });
    mobileScrollThumb.addEventListener('pointermove', function (event) {
      if (!mobileScrollThumb.hasPointerCapture(event.pointerId)) return;
      event.preventDefault();
      const trackRange = mobileScrollTrack.clientHeight - mobileScrollThumb.offsetHeight;
      const scrollRange = nav.scrollHeight - nav.clientHeight;
      if (trackRange > 0) nav.scrollTop = scrollDragStartTop + (event.clientY - scrollDragStartY) * scrollRange / trackRange;
    });
    mobileScrollTrack.addEventListener('pointerdown', function (event) {
      if (event.target === mobileScrollThumb) return;
      const rect = mobileScrollTrack.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      nav.scrollTop = ratio * (nav.scrollHeight - nav.clientHeight);
    });
    const mobileBackStyle = document.createElement('style');
    mobileBackStyle.textContent = `
      @media(max-width:700px){
        body{padding-top:132px!important}
        body.sw7-page-index,body[data-sw7-page="home"]{padding-top:86px!important}
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
      if (!open) sessionStore.removeItem('sw7CompactMenuState');
      window.requestAnimationFrame(updateMobileScrollThumb);
    }
    function saveCompactMenuState(link) {
      /* Do not leave a saved menu behind when navigation happened normally. */
      if (!header.classList.contains('compact-open')) {
        sessionStore.removeItem('sw7CompactMenuState');
        return;
      }
      const item = link.closest('.sw7-clean-item');
      let itemName = '';
      if (item && item.classList.contains('sw7-services-item')) itemName = 'services';
      if (item && item.classList.contains('sw7-industries-item')) itemName = 'industries';
      if (item && item.classList.contains('sw7-contact-item')) itemName = 'contact';
      const subsection = link.closest('.sw7-clean-sub');
      const subsections = item ? Array.from(item.querySelectorAll(':scope > .sw7-clean-menu > .sw7-clean-sub')) : [];
      sessionStore.setItem('sw7CompactMenuState', JSON.stringify({
        returnUrl: window.location.href,
        destinationUrl: link.href,
        itemName: itemName,
        subsectionIndex: subsection ? subsections.indexOf(subsection) : -1,
        scrollTop: nav.scrollTop
      }));
    }
    let restoringCompactMenu = false;
    function restoreCompactMenuState() {
      if (sessionStore.getItem('sw7RestoreMenuRequested') !== '1') return;
      let state;
      try { state = JSON.parse(sessionStore.getItem('sw7CompactMenuState') || 'null'); } catch (error) { state = null; }
      if (!state || state.returnUrl !== window.location.href || !window.matchMedia('(max-width:700px)').matches) return;
      sessionStore.removeItem('sw7RestoreMenuRequested');
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
        if (event.target.closest('.sw7-down-arrow')) {
          event.preventDefault();
          event.stopPropagation();
          const item = trigger.closest('.sw7-clean-item');
          const willOpen = !item.classList.contains('open');
          header.querySelectorAll('.sw7-clean-item.open').forEach(function (otherItem) {
            if (otherItem !== item) otherItem.classList.remove('open');
          });
          item.classList.toggle('open', willOpen);
          if (window.matchMedia('(max-width:700px)').matches) revealMobileDropdown(item);
        } else if (window.matchMedia('(max-width:700px)').matches) {
            saveCompactMenuState(trigger);
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
        if (window.matchMedia('(min-width:701px) and (hover:hover) and (pointer:fine)').matches) {
          servicesHoverTimer = window.setTimeout(function () {
            servicesItem.classList.add('open');
          }, 240);
        }
      });
      servicesItem.querySelectorAll('.sw7-clean-sub').forEach(function (subsection) {
        subsection.addEventListener('mouseenter', function () {
          if (window.matchMedia('(min-width:701px) and (hover:hover) and (pointer:fine)').matches) {
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
  const copyrightText = '© 2026 StartWeb7. All rights reserved.';
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

/* Visual tile dropdowns, shared by every page. */
(function () {
  const nav = document.querySelector('.sw7-clean-nav');
  if (!nav) return;
  /* This old visual scrollbar was still being made by an earlier menu layer. */
  document.querySelectorAll('.sw7-mobile-scroll-track').forEach(function (track) { track.remove(); });
  const tile = function (href, label, graphic) {
    return '<a class="sw7-visual-tile" href="' + href + '"><span class="sw7-visual-art" style="background-image:url(\'' + graphic + '\')"></span><span class="sw7-visual-label">' + label + '</span></a>';
  };
  nav.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a>' +
    '<div class="sw7-clean-item sw7-visual-dropdown"><a class="sw7-clean-trigger" href="services.html">Services <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><button class="sw7-visual-menu-toggle" type="button" aria-label="Open Services menu" aria-expanded="false">•••</button><div class="sw7-clean-menu sw7-visual-menu sw7-services-visual-menu"><div class="sw7-visual-grid">' +
      tile('landing-page.html','LANDING PAGE','menu-phone.png') + tile('business-website.html','BUSINESS WEBSITE','menu-screen.png') + tile('seo-optimized-website.html','SEO OPTIMIZED WEBSITE','menu-search-results.png') + tile('essentials.html','SEO + AEO ESSENTIALS','menu-bottle.png') + tile('competitive.html','SEO + AEO COMPETITIVE','menu-trophy.png') +
    '</div></div></div>' +
    '<div class="sw7-clean-item sw7-visual-dropdown"><a class="sw7-clean-trigger" href="industries.html">Industries <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><button class="sw7-visual-menu-toggle" type="button" aria-label="Open Industries menu" aria-expanded="false">•••</button><div class="sw7-clean-menu sw7-visual-menu sw7-industries-visual-menu"><div class="sw7-visual-grid">' +
      tile('real-estate-agents.html','REAL ESTATE','menu-screen.png') + tile('collision-repair.html','COLLISION REPAIR','menu-repair-tool.png') + tile('pool-construction.html','POOL CONSTRUCTION','menu-pool.png') + tile('general-contractors.html','GENERAL CONTRACTORS','menu-bricks.png') + tile('catering.html','CATERING','menu-serving-tray.png') + tile('commercial-cleaning.html','COMMERCIAL CLEANING','menu-cleaning-cart.png') + tile('security-services.html','SECURITY SERVICES','menu-patrol-car.png') +
    '</div></div></div><a href="resources.html">Resources</a><a href="reviews.html">Reviews</a>' +
    '<div class="sw7-clean-item sw7-visual-dropdown"><a class="sw7-clean-trigger" href="contact.html">Contact <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><button class="sw7-visual-menu-toggle" type="button" aria-label="Open Contact menu" aria-expanded="false">•••</button><div class="sw7-clean-menu sw7-visual-menu sw7-contact-visual-menu"><div class="sw7-visual-grid">' +
      tile('faq.html','FAQ','menu-question-mark.png') + tile('nationwide.html','NATIONWIDE','menu-usa-flag.png') + tile('support.html','24/7 SUPPORT','menu-question-mark.png') + tile('careers.html','JOIN THE TEAM','menu-join-the-team-v2.png') +
    '</div></div></div>';
  const style = document.createElement('style');
  style.textContent = `
    .sw7-visual-dropdown>.sw7-clean-menu{padding:16px!important;min-width:620px!important;background:#07101c!important;border:1px solid #233e5c!important;box-shadow:0 22px 58px rgba(0,0,0,.35)!important}.sw7-visual-dropdown:hover>.sw7-clean-menu,.sw7-visual-dropdown:focus-within>.sw7-clean-menu,.sw7-visual-dropdown.open>.sw7-clean-menu{opacity:1!important;visibility:visible!important;transform:none!important}.sw7-visual-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}.sw7-services-visual-menu .sw7-visual-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}.sw7-visual-tile{display:flex!important;min-height:154px!important;padding:13px!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;background:#0d1d30!important;border:1px solid #294966!important;color:#fff!important;text-decoration:none!important;overflow:hidden!important;transition:border-color .24s ease,background .24s ease!important}.sw7-visual-tile:hover,.sw7-visual-tile:focus-visible{background:#102845!important;border-color:#0784ff!important;outline:none!important}.sw7-visual-art{display:block!important;width:100%!important;height:108px!important;background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important;transition:transform 1.7s cubic-bezier(.2,.8,.2,1)!important}.sw7-visual-tile:hover .sw7-visual-art,.sw7-visual-tile:focus-visible .sw7-visual-art{transform:translateY(-5px) rotate(-2deg) scale(1.05)!important}.sw7-visual-label{display:block!important;width:100%!important;margin-top:5px!important;color:#fff!important;text-align:center!important;font:900 10px/1.15 Arial,sans-serif!important;letter-spacing:.08em!important}.sw7-contact-visual-menu{left:auto!important;right:0!important;min-width:500px!important}.sw7-contact-visual-menu .sw7-visual-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.sw7-contact-visual-menu .sw7-visual-tile{min-height:144px!important}@media(max-width:900px){.sw7-visual-dropdown>.sw7-clean-menu{position:static!important;min-width:0!important;width:100%!important;padding:12px!important;border:0!important;box-shadow:none!important;background:#091827!important}.sw7-visual-grid,.sw7-services-visual-menu .sw7-visual-grid,.sw7-contact-visual-menu .sw7-visual-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.sw7-visual-tile{min-height:138px!important}.sw7-visual-art{height:94px!important}.sw7-visual-dropdown.open>.sw7-clean-menu{display:block!important}.sw7-visual-tile:active .sw7-visual-art{transform:translateY(-4px) rotate(-2deg) scale(1.05)!important}}
  `;
  document.head.appendChild(style);
  nav.querySelectorAll('.sw7-visual-dropdown > .sw7-clean-trigger').forEach(function (trigger) {
    const oldArrow = trigger.querySelector('.sw7-down-arrow');
    if (oldArrow) oldArrow.remove();
    trigger.addEventListener('click', function (event) {
      if (window.matchMedia('(max-width:900px)').matches && event.target.closest('.sw7-visual-menu-toggle')) {
        event.preventDefault();
        event.stopPropagation();
        const item = trigger.parentElement;
        const isOpen = item.classList.contains('open');
        nav.querySelectorAll('.sw7-visual-dropdown.open').forEach(function (node) { node.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      }
    });
  });
})();

/* Give the original resource articles the same reading-page sidebar as newer articles. */
(function () {
  var related = {
    'mojo-vs-vulcan7-real-estate-leads.html': [['google-maps-leads.html','How Google Maps Leads Work'],['google-business-profile-vs-website.html','Google Business Profile vs. Your Website']],
    'ccc-one-vs-mitchell-collision-repair.html': [['google-maps-leads.html','How Google Maps Leads Work'],['seo-vs-paid-ads.html','SEO vs Paid Ads']]
  };
  var file = location.pathname.split('/').pop();
  if (!related[file] || document.querySelector('.briefing-page .article-aside')) return;
  var article = document.querySelector('.briefing-page .briefing-article');
  if (!article) return;
  var aside = document.createElement('aside');
  aside.className = 'article-aside';
  aside.innerHTML = '<strong>RELATED RESOURCES</strong>' + related[file].map(function (item) { return '<a href="' + item[0] + '">' + item[1] + '</a>'; }).join('') + '<a href="resources.html">All Resources</a>';
  article.insertAdjacentElement('afterend', aside);
})();

(function () {
  if (!document.querySelector('.article-body') || document.querySelector('.global-contact-block')) return;
  const footer = document.createElement('footer');
  footer.className = 'global-contact-block';
  footer.innerHTML = '<div class="global-contact-wrap"><div class="contact-options"><a class="contact-option" href="tel:+18189340444"><span class="contact-label">CALL</span><strong>(818) 934-0444</strong></a><div class="contact-option email-option"><span class="contact-label">EMAIL</span><details class="email-contact-menu"><summary class="email-address-btn">desirae@startweb7.com</summary><div class="email-options"><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=desirae@startweb7.com" target="_blank" rel="noopener">GMAIL</a><a href="https://outlook.live.com/mail/0/deeplink/compose?to=desirae@startweb7.com" target="_blank" rel="noopener">OUTLOOK</a><button type="button" data-copy-email="desirae@startweb7.com">COPY EMAIL</button></div></details></div><div class="contact-option form-trigger-block"><span class="contact-label">FORM FILL</span><label class="service-select-wrap"><select id="serviceSelect" aria-label="Choose your service"><option value="" selected disabled>Choose what you\'re interested in</option><option value="Landing Page">Landing Page</option><option value="Business Website">Business Website</option><option value="SEO-Optimized Website">SEO-Optimized Website</option><option value="SEO + AEO Essentials">SEO + AEO Essentials</option><option value="SEO + AEO Competitive">SEO + AEO Competitive</option></select></label></div></div><div class="quick-form-shell" id="quickForm" aria-hidden="true"><form class="quick-form" onsubmit="event.preventDefault()"><input type="hidden" name="service" id="selectedService"><div class="form-fields"><label><span>Name</span><input type="text" name="name" autocomplete="name"></label><label><span>Business Name</span><input type="text" name="business"></label><label><span>Email</span><input type="email" name="email" autocomplete="email"></label><label><span>Phone</span><input type="tel" name="phone" autocomplete="tel"></label></div><button class="submit-btn" type="submit">SUBMIT</button></form></div></div>';
  const copyright = document.querySelector('.sw7-universal-copyright');
  if (copyright) copyright.parentNode.insertBefore(footer, copyright);
  else document.body.appendChild(footer);
})();



(function () {
  /* Use the same Call / Email / Social footer throughout the site. The home page
     already contains this version plus its separate AI chat, so it is left alone. */
  if (document.body && document.body.getAttribute('data-sw7-page') === 'home') return;
  var footerMarkup = '<div class="global-contact-wrap"><div class="contact-options sw7-global-footer-options"><a class="contact-option" href="tel:+18189340444"><span class="contact-label">CALL</span><strong>(818) 934-0444</strong></a><div class="contact-option email-option"><span class="contact-label">EMAIL</span><details class="email-contact-menu"><summary class="email-address-btn">desirae@startweb7.com</summary><div class="email-options"><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=desirae@startweb7.com" target="_blank" rel="noopener">GMAIL</a><a href="https://outlook.live.com/mail/0/deeplink/compose?to=desirae@startweb7.com" target="_blank" rel="noopener">OUTLOOK</a><button type="button" data-copy-email="desirae@startweb7.com">COPY EMAIL</button></div></details></div><div class="contact-option social-option"><span class="contact-label">SOCIAL</span><div class="sw7-global-social-links"><a href="https://www.instagram.com/startweb7_?stkn=MTl4ZnpmeWswNHo3Zg%3D%3D&amp;utm_source=qr" target="_blank" rel="noopener noreferrer">INSTAGRAM</a><a href="https://www.tiktok.com/@startweb7?_r=1&amp;_t=ZP-99kVDkkjaL1" target="_blank" rel="noopener noreferrer">TIKTOK</a><a href="https://www.facebook.com/profile.php?id=61594153382875" target="_blank" rel="noopener noreferrer">FACEBOOK</a></div></div></div></div>';
  document.querySelectorAll('.global-contact-block').forEach(function (footer) {
    footer.classList.add('sw7-global-footer');
    footer.innerHTML = footerMarkup;
  });
  var footerStyle = document.createElement('style');
  footerStyle.textContent = '.sw7-global-footer{text-align:center!important}.sw7-global-footer .sw7-global-footer-options{grid-template-columns:repeat(3,minmax(0,1fr));gap:34px;align-items:start}.sw7-global-footer .contact-option{align-items:center;text-align:center;gap:20px!important}.sw7-global-footer .contact-option strong,.sw7-global-footer .email-address-btn{justify-content:center!important;text-align:center!important;width:100%!important;min-height:48px!important;box-sizing:border-box!important;font-size:16px!important}.sw7-global-footer .email-address-btn{display:flex!important;align-items:center!important;justify-content:center!important;padding:12px 0!important}.sw7-global-footer .email-options{text-align:left}.sw7-global-social-links{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:nowrap;white-space:nowrap}.sw7-global-social-links a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 11px;border:1px solid #9fb3c8;color:#07101c;background:#fff;text-decoration:none;font:800 11px/1 Arial,Helvetica,sans-serif}.sw7-global-social-links a:hover,.sw7-global-social-links a:focus-visible{border-color:#0784ff;color:#0784ff}@media(max-width:700px){.sw7-global-footer .sw7-global-footer-options{grid-template-columns:1fr;gap:26px}}';
  document.head.appendChild(footerStyle);
})();

(function () {
  /* Every FORM FILL button opens the same HubSpot-connected AI chat. */
  if ((window.location.pathname.split('/').pop() || '').toLowerCase() === 'careers.html') return;
  if (document.body && document.body.getAttribute('data-sw7-page') === 'home') return;
  if (document.getElementById('homeContactChat')) return;
  var chatStyles = document.createElement('link');
  chatStyles.rel = 'stylesheet';
  chatStyles.href = 'homepage-contact-chat.css?v=10';
  document.head.appendChild(chatStyles);
  var openButton = document.createElement('button');
  openButton.id = 'openHomeChat';
  openButton.type = 'button';
  openButton.hidden = true;
  openButton.setAttribute('aria-controls', 'homeContactChat');
  openButton.textContent = 'Open form fill';
  var chat = document.createElement('section');
  chat.className = 'sw7-home-chat';
  chat.id = 'homeContactChat';
  chat.hidden = true;
  chat.setAttribute('aria-label', 'StartWeb7 Form');
  chat.innerHTML = '<div class="sw7-home-chat-window"><div class="sw7-home-chat-header"><div class="sw7-home-chat-agent"><span class="sw7-home-chat-avatar"><img src="startweb7-logo.png" alt="StartWeb7"></span><span><strong>StartWeb7 Form</strong><small>Don’t worry, it will be quick.</small></span></div><button class="sw7-home-chat-reset" id="resetHomeChat" type="button">START OVER</button><button class="sw7-home-chat-close" id="closeHomeChat" type="button" aria-label="Close form fill">×</button></div><div class="sw7-home-chat-messages" id="homeChatMessages" role="log" aria-live="polite"></div><div class="sw7-home-chat-choices" id="homeChatChoices" aria-label="Interest options"></div><form class="sw7-home-chat-composer" id="homeChatComposer" hidden><input id="homeChatInput" type="text" autocomplete="off" aria-label="Type your reply" placeholder="Type your reply…"><button class="sw7-home-chat-send" type="submit">SEND</button></form></div><p class="sw7-home-chat-note">Your information is only used to follow up about your inquiry.</p>';
  var rights = document.querySelector('.rights-footer');
  if (rights && rights.parentNode) {
    rights.parentNode.insertBefore(openButton, rights);
    rights.parentNode.insertBefore(chat, rights);
  } else {
    document.body.appendChild(openButton);
    document.body.appendChild(chat);
  }
  var chatScript = document.createElement('script');
  chatScript.src = 'homepage-contact-chat.js?v=23';
  document.body.appendChild(chatScript);
})();

(function () {
  /* The old scheduling links are retired: every site CTA now opens Form Fill. */
  document.querySelectorAll('a[href*="calendar.google.com/calendar/appointments"]').forEach(function (link) {
    link.href = '#homeContactChat';
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.setAttribute('data-open-home-chat', '');
    link.textContent = 'FORM FILL';
  });
})();

(function () {
  /* Every legacy contact/form CTA opens the shared AI chat. */
  document.querySelectorAll('a[href="#contact"], a[href="#form-fill"]').forEach(function (link) {
    link.href = '#homeContactChat';
    link.setAttribute('data-open-home-chat', '');
  });
})();

(function () {
  /* Make the collision-repair preview request button interactive too. */
  var request = document.querySelector('.autobody-estimate button');
  var confirmation = document.querySelector('.autobody-confirm');
  if (!request || !confirmation) return;
  request.type = 'button';
  request.addEventListener('click', function () {
    confirmation.textContent = '✓ ESTIMATE REQUEST RECEIVED';
    confirmation.style.opacity = '1';
    confirmation.style.transform = 'none';
    request.textContent = 'REQUEST RECEIVED';
    request.disabled = true;
  });
})();

(function () {
  const emailButton = document.getElementById('openEmailOptions');
  const emailOptions = document.getElementById('emailOptions');
  if (!emailButton || !emailOptions) return;
  emailOptions.classList.remove('open');
  emailOptions.setAttribute('aria-hidden', 'true');
  emailButton.setAttribute('aria-expanded', emailOptions.classList.contains('open') ? 'true' : 'false');
  emailButton.addEventListener('click', function () {
    const open = emailOptions.classList.toggle('open');
    emailOptions.setAttribute('aria-hidden', open ? 'false' : 'true');
    emailButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
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
  document.addEventListener('click', function (event) {
    document.querySelectorAll('.email-contact-menu[open]').forEach(function (menu) {
      if (!menu.contains(event.target)) menu.removeAttribute('open');
    });
  });
})();

(function () {
  document.addEventListener('click', function (event) {
    const copyButton = event.target.closest('[data-copy-email]');
    if (!copyButton) return;
    const email = copyButton.getAttribute('data-copy-email');
    if (!email) return;
    navigator.clipboard.writeText(email).then(function () {
      copyButton.textContent = 'COPIED';
      window.setTimeout(function () { copyButton.textContent = 'COPY EMAIL'; }, 1400);
    }).catch(function () {
      copyButton.textContent = email;
    });
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

/* Final mobile layout pass: remove desktop-sized blank chapters and keep demos readable. */
(function () {
  const style = document.createElement('style');
  style.textContent = `
  .sw7-universal-brand .sw7-brand-copy{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:4px!important}
  .sw7-universal-brand .sw7-brand-name{font:900 17px/1 Arial,sans-serif!important;letter-spacing:.04em!important}
  .sw7-universal-brand .sw7-brand-slogan{font:700 10px/1 Arial,sans-serif!important;letter-spacing:.01em!important;color:#4f5964!important}
  @media(min-width:901px){.sw7-universal-brand{min-width:270px!important}.sw7-clean-nav{margin-left:clamp(18px,3vw,54px)!important}}
  @media(max-width:900px){.sw7-universal-brand .sw7-brand-name{font-size:14px!important}.sw7-universal-brand .sw7-brand-slogan{font-size:9px!important}}
  @media(max-width:700px){.sw7-universal-brand{gap:7px!important}.sw7-universal-brand .sw7-brand-copy{gap:3px!important}.sw7-universal-brand .sw7-brand-slogan{font-size:12px!important}}
  @media(min-width:1000px){
    .belief,.purpose,.closing,
    .support-intro,.support-details,.support-close,
    .home-service,.content-section,.essentials-close{
      grid-template-columns:minmax(0,620px) minmax(0,620px)!important;
      column-gap:clamp(70px,5.75vw,110px)!important;
      padding-left:max(7vw,calc((100vw - 1350px)/2))!important;
      padding-right:max(7vw,calc((100vw - 1350px)/2))!important;
    }
    .home-service.seo .home-service-label{
      font-size:clamp(52px,5vw,82px)!important;
    }
  }
  @media(max-width:850px){
    .content-section,.intro,.split-section,.build,.optimized-intro,.benefits,.bottom-line{height:auto!important;min-height:0!important}
    .content-section,.intro{padding-top:58px!important;padding-bottom:58px!important}
    .build{padding-top:54px!important;padding-bottom:58px!important;overflow:hidden!important}
    [class*="section"],.intro,.build,.optimized-intro,.benefits,.bottom-line,.home-service{min-height:0!important;height:auto!important}
    [class*="section"],.intro,.build,.home-service{padding-top:48px!important;padding-bottom:48px!important}
    .analysis-note{display:none!important}
    .sw7-page-index .home-service-label{font-size:clamp(30px,8.5vw,34px)!important;line-height:.95!important;letter-spacing:-.04em!important;white-space:nowrap!important}
    .sw7-page-index .home-service.seo .home-service-label{font-size:clamp(29px,8.25vw,33px)!important;white-space:normal!important}
    .growth-hero{height:calc(100svh - 132px)!important;min-height:560px!important;padding:0!important;overflow:hidden!important}
    .growth-stage{height:100%!important;min-height:0!important;margin:0!important}
    .growth-main-title{top:5%!important;font-size:clamp(43px,13vw,54px)!important}
    .growth-title{top:auto!important;bottom:auto!important;max-width:48%!important;transform:none!important;font-size:clamp(22px,6.7vw,28px)!important;line-height:.9!important;white-space:normal!important}
    .growth-title.left{left:5%!important;top:25%!important}
    .growth-title.right{right:5%!important;top:69%!important;text-align:right!important}
    .growth-map{left:50%!important;top:53%!important;width:92%!important;max-height:245px!important;transform:translate(-50%,-50%)!important}
    .growth-message{bottom:4%!important;font-size:8px!important;padding:8px 10px!important}
  }`;
  document.head.appendChild(style);
  document.querySelectorAll('.analysis-note').forEach(function (note) { note.remove(); });
})();

/* Final visual-menu and footer pass, placed last so it also wins on mobile. */
(function () {
  const footer = document.querySelector('.rights-footer');
  if (footer) {
    footer.innerHTML = '<nav class="sw7-footer-links" aria-label="Footer"><a href="services.html">Services</a><a href="industries.html">Industries</a><a href="resources.html">Resources</a><a href="reviews.html">Reviews</a><a href="contact.html">Contact</a><a href="support.html">24/7 Support</a></nav><span class="sw7-footer-legal"><span>© 2026 StartWeb7.</span><span class="sw7-footer-rights">All Rights Reserved.</span></span>';
  }
  const style = document.createElement('style');
  style.textContent = `
    .rights-footer{display:flex!important;flex-direction:column!important;gap:16px!important}.sw7-footer-links{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:18px!important}.sw7-footer-links a{color:#fff!important;text-decoration:none!important;font:800 11px/1 Arial,sans-serif!important;letter-spacing:.08em!important}.sw7-footer-links a:hover,.sw7-footer-links a:focus-visible{color:#75b8ff!important;outline:none!important}.sw7-footer-legal{display:inline-flex!important;align-items:baseline!important;justify-content:center!important;gap:16px!important;flex-wrap:wrap!important}
    @media(max-width:700px){.sw7-visual-dropdown>.sw7-clean-menu{padding:12px!important;background:#091827!important}.sw7-visual-grid,.sw7-services-visual-menu .sw7-visual-grid,.sw7-contact-visual-menu .sw7-visual-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.sw7-visual-tile{display:flex!important;min-height:138px!important;padding:11px!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;background:#0d1d30!important;border:1px solid #294966!important}.sw7-visual-art{display:block!important;height:94px!important;width:100%!important;background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important}.sw7-visual-label{display:block!important;color:#fff!important;text-align:center!important;font:900 9px/1.15 Arial,sans-serif!important;letter-spacing:.05em!important}.sw7-visual-dropdown.open>.sw7-clean-menu{display:block!important;opacity:1!important;visibility:visible!important}.sw7-visual-dropdown.open>.sw7-clean-menu .sw7-visual-grid{display:grid!important}.sw7-footer-links{gap:12px!important}}
  `;
  document.head.appendChild(style);
  const mobileDrawerStyle = document.createElement('style');
  mobileDrawerStyle.textContent = '@media(max-width:700px){.sw7-clean-nav{left:0!important;right:0!important;width:100%!important;max-width:none!important;padding:82px 24px 24px!important}}';
  document.head.appendChild(mobileDrawerStyle);
})();

/* Page-specific hero and CTA corrections. */
(function () {
  const page = window.location.pathname.split('/').pop().toLowerCase();
  if (page === 'security-services.html') {
    const securityVideo = document.querySelector('.sw7-new-hero video');
    if (securityVideo) securityVideo.style.objectPosition = 'center top';
  }
  if (page === 'nationwide.html') {
    const nationwideCTA = document.querySelector('.sw7-new-hero .sw7-new-cta');
    if (nationwideCTA) {
      nationwideCTA.href = '#homeContactChat';
      nationwideCTA.setAttribute('data-open-home-chat', '');
    }
  }
})();

/* Final menu usability and graphic fit pass. */
(function () {
  const nav = document.querySelector('.sw7-clean-nav');
  if (!nav) return;
  const graphics = {
    'LANDING PAGE': 'menu-phone.png',
    'BUSINESS WEBSITE': 'menu-screen.png',
    'SEO OPTIMIZED WEBSITE': 'menu-search-results.png',
    'REAL ESTATE': 'menu-house.png',
    'POOL CONSTRUCTION': 'menu-pool-full.png',
    'SECURITY SERVICES': 'menu-walkie-talkie.png',
    '24/7 SUPPORT': 'menu-24-hour-clock.png'
  };
  nav.querySelectorAll('.sw7-visual-tile').forEach(function (tile) {
    const label = tile.querySelector('.sw7-visual-label');
    const art = tile.querySelector('.sw7-visual-art');
    const image = label && graphics[label.textContent.trim()];
    if (art && image) art.style.backgroundImage = "url('" + image + "')";
  });
  nav.querySelectorAll('.sw7-visual-dropdown > .sw7-clean-trigger').forEach(function (trigger) {
    const menu = trigger.parentElement.querySelector('.sw7-clean-menu');
    const showFromTop = function () {
      if (menu) menu.scrollTop = 0;
    };
    /* Never reopen a dropdown partway down, the first graphic must be visible. */
    trigger.addEventListener('mouseenter', showFromTop);
    trigger.addEventListener('focus', showFromTop);
  });
  /* One reliable handler for the compact three-dot controls.  The word link
     remains a normal page link, the dots alone open the visual choices. */
  nav.addEventListener('click', function (event) {
    const toggle = event.target.closest('.sw7-visual-menu-toggle');
    if (!toggle || !nav.contains(toggle) || !window.matchMedia('(max-width:700px)').matches) return;
    event.preventDefault();
    event.stopPropagation();
    const item = toggle.closest('.sw7-visual-dropdown');
    if (!item) return;
    const menu = item.querySelector(':scope > .sw7-clean-menu');
    if (menu) menu.scrollTop = 0;
    const opens = !item.classList.contains('open');
    nav.querySelectorAll('.sw7-visual-dropdown.open').forEach(function (other) {
      other.classList.remove('open');
      const otherToggle = other.querySelector('.sw7-visual-menu-toggle');
      if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('open', opens);
    toggle.setAttribute('aria-expanded', String(opens));
  });
  const style = document.createElement('style');
  style.textContent = `
    /* Every dropdown is one straight vertical sequence of graphic rows. */
    .sw7-mobile-scroll-track{display:none!important}.sw7-visual-dropdown>.sw7-clean-menu{top:92px!important;min-width:390px!important;max-height:calc(100dvh - 106px)!important;padding:14px!important;overflow-y:auto!important}.sw7-visual-grid,.sw7-services-visual-menu .sw7-visual-grid,.sw7-contact-visual-menu .sw7-visual-grid{display:flex!important;flex-direction:column!important;gap:10px!important}.sw7-visual-art{width:86px!important;height:72px!important;background-size:contain!important;background-position:center!important;overflow:visible!important}.sw7-visual-tile,.sw7-contact-visual-menu .sw7-visual-tile{display:grid!important;grid-template-columns:86px minmax(0,1fr)!important;gap:14px!important;align-items:center!important;justify-content:start!important;min-height:92px!important;padding:9px 16px!important;overflow:visible!important;border-bottom:1px solid #294966!important}.sw7-visual-tile:hover,.sw7-visual-tile:focus-visible,.sw7-clean-menu .sw7-visual-tile:hover,.sw7-clean-menu .sw7-visual-tile:focus-visible{background:#102845!important;color:#fff!important}.sw7-visual-label{width:auto!important;margin:0!important;color:#fff!important;text-align:left!important;font-size:11px!important;line-height:1.2!important}.sw7-clean-menu .sw7-visual-tile:hover .sw7-visual-label,.sw7-clean-menu .sw7-visual-tile:focus-visible .sw7-visual-label{color:#fff!important}.sw7-visual-menu-toggle{display:none!important}.sw7-contact-visual-menu{left:0!important;right:auto!important}.sw7-contact-visual-menu .sw7-visual-tile{display:flex!important;min-height:108px!important;padding:12px 16px!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:7px!important}.sw7-contact-visual-menu .sw7-visual-art{background-position:center!important}.sw7-contact-visual-menu .sw7-visual-label{text-align:center!important}
    /* On desktop, every visual menu is the same width as its own tab and drops straight down from it. */
    @media(min-width:1101px){.sw7-visual-dropdown>.sw7-clean-menu{top:100%!important;left:0!important;right:auto!important;width:100%!important;min-width:0!important;max-width:100%!important;padding:8px!important;box-sizing:border-box!important;transform:translateY(8px)!important}.sw7-visual-dropdown:hover>.sw7-clean-menu,.sw7-visual-dropdown:focus-within>.sw7-clean-menu,.sw7-visual-dropdown.open>.sw7-clean-menu{transform:none!important}.sw7-visual-tile,.sw7-contact-visual-menu .sw7-visual-tile{display:flex!important;grid-template-columns:none!important;min-height:126px!important;padding:11px 8px!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:7px!important;box-sizing:border-box!important}.sw7-visual-art{width:86px!important;height:72px!important;background-position:center!important;background-size:contain!important}.sw7-visual-label,.sw7-contact-visual-menu .sw7-visual-label{width:100%!important;margin:0!important;text-align:center!important;font-size:9px!important;line-height:1.15!important;white-space:normal!important}}
    /* Compact widths use one vertical list, never the desktop tile grid. */
    @media(max-width:1100px){.sw7-clean-trigger{padding-right:0!important}.sw7-visual-menu-toggle{display:none!important}.sw7-visual-dropdown.open>.sw7-clean-menu{display:block!important;opacity:1!important;visibility:visible!important}.sw7-visual-dropdown.open>.sw7-clean-menu .sw7-visual-grid{display:flex!important;flex-direction:column!important;gap:10px!important}}
    /* Mobile-only menu dots, the word opens its page and the dots open its choices. */
    @media(max-width:700px){.sw7-visual-dropdown>.sw7-clean-trigger{padding-right:48px!important}.sw7-visual-dropdown>.sw7-visual-menu-toggle{position:absolute!important;z-index:2!important;top:50%!important;right:8px!important;display:inline-flex!important;width:32px!important;height:30px!important;margin:0!important;padding:0!important;align-items:center!important;justify-content:center!important;border:1px solid #0784ff!important;background:#07101c!important;color:#0784ff!important;font:900 13px/1 Arial,sans-serif!important;letter-spacing:2px!important;box-sizing:border-box!important;cursor:pointer!important;transform:translateY(-50%)!important}.sw7-visual-dropdown>.sw7-visual-menu-toggle:hover,.sw7-visual-dropdown>.sw7-visual-menu-toggle:focus-visible,.sw7-visual-dropdown.open>.sw7-visual-menu-toggle{border-color:#0784ff!important;background:#0784ff!important;color:#07101c!important;outline:none!important}}
    @media(min-width:701px){.sw7-visual-menu-toggle{display:none!important}.sw7-visual-dropdown>.sw7-clean-trigger{padding-right:0!important}}
    @media(min-width:701px) and (max-width:1100px){.sw7-universal-header,.sw7-clean-nav{overflow:visible!important}.sw7-visual-dropdown>.sw7-clean-menu{position:fixed!important;z-index:2147483010!important;top:77px!important;left:16px!important;right:16px!important;width:auto!important;min-width:0!important;max-height:calc(100dvh - 77px)!important;margin:0!important;overflow-y:auto!important;padding:14px!important;background:#07101c!important;border:1px solid #233e5c!important;box-shadow:0 22px 58px rgba(0,0,0,.35)!important}.sw7-visual-dropdown.open>.sw7-clean-menu{display:block!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:none!important}}
    @media(max-width:700px){.sw7-visual-dropdown>.sw7-clean-menu{position:static!important;width:100%!important;max-height:none!important;padding:12px!important;overflow:visible!important}.sw7-visual-dropdown>.sw7-visual-menu-toggle{top:12px!important;right:10px!important;transform:none!important}.sw7-visual-tile,.sw7-contact-visual-menu .sw7-visual-tile{display:flex!important;grid-template-columns:none!important;min-height:98px!important;padding:10px 12px!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:7px!important}.sw7-visual-art{width:74px!important;height:62px!important;margin:0 auto!important;background-position:center!important}.sw7-visual-label,.sw7-contact-visual-menu .sw7-visual-label{width:100%!important;margin:0!important;text-align:center!important}}
    /* Mobile dropdown graphics and their labels share the exact same center. */
    @media(max-width:700px){.sw7-visual-dropdown>.sw7-clean-menu{box-sizing:border-box!important;padding:12px!important}.sw7-visual-menu .sw7-visual-grid,.sw7-services-visual-menu .sw7-visual-grid,.sw7-industries-visual-menu .sw7-visual-grid,.sw7-contact-visual-menu .sw7-visual-grid{display:flex!important;flex-direction:column!important;align-items:stretch!important;width:100%!important;margin:0!important;padding:0!important}.sw7-visual-menu .sw7-visual-tile,.sw7-contact-visual-menu .sw7-visual-tile{display:grid!important;grid-template-columns:1fr!important;place-items:center!important;width:100%!important;box-sizing:border-box!important;text-align:center!important}.sw7-visual-menu .sw7-visual-art,.sw7-contact-visual-menu .sw7-visual-art{align-self:center!important;justify-self:center!important;margin:0 auto!important}.sw7-visual-menu .sw7-visual-label,.sw7-contact-visual-menu .sw7-visual-label{align-self:center!important;justify-self:center!important;width:100%!important;margin:0!important;text-align:center!important}}
  `;
  document.head.appendChild(style);
})();

/* Mobile visual menus are one full navy surface, not a navy card inside a white drawer. */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:700px){
      /* When Services, Industries, or Contact is expanded, the drawer's
         unused lower area becomes navy.  The regular navigation rows remain
         their original white, only the visual dropdown is the navy panel. */
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open){
        padding:82px 0 0!important;
        background:#07101c!important;
        scrollbar-color:#7f8790 #07101c!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)::-webkit-scrollbar-track{
        background:#07101c!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>a,
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>.sw7-clean-item{
        background:#fff!important;
        border-bottom-color:#e4e9ef!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>a,
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>.sw7-clean-item>.sw7-clean-trigger{
        padding-inline:24px!important;
        color:#111!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>.sw7-visual-dropdown.open>.sw7-clean-trigger{
        background:#f4f7fb!important;
        color:#006ff1!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>.sw7-visual-dropdown>.sw7-clean-trigger{
        padding-right:72px!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>.sw7-visual-dropdown>.sw7-visual-menu-toggle{
        right:24px!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open)>.sw7-visual-dropdown.open>.sw7-clean-menu{
        width:100%!important;
        margin:0!important;
        padding:0 24px 28px!important;
        box-sizing:border-box!important;
        background:#07101c!important;
      }
      /* The new edge-to-edge panel has one true center. */
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open) .sw7-visual-grid{
        display:flex!important;
        flex-direction:column!important;
        align-items:stretch!important;
        width:100%!important;
        margin:0!important;
        padding:0!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open) .sw7-visual-tile{
        display:grid!important;
        grid-template-columns:1fr!important;
        place-items:center!important;
        width:100%!important;
        box-sizing:border-box!important;
        text-align:center!important;
      }
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open) .sw7-visual-art,
      .sw7-universal-header.compact-open .sw7-clean-nav:has(.sw7-visual-dropdown.open) .sw7-visual-label{
        align-self:center!important;
        justify-self:center!important;
        margin-inline:auto!important;
        text-align:center!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* The head-level gate hides each page's legacy menu until this one shared
   navigation has been built. Removing it here prevents the old-menu flash
   during page changes without changing the final menu design. */
if (!document.querySelector('link[data-sw7-single-column]')) {
  const singleColumnStyles = document.createElement('link');
  singleColumnStyles.rel = 'stylesheet';
  singleColumnStyles.href = 'sitewide-single-column.css?v=12';
  singleColumnStyles.setAttribute('data-sw7-single-column', '');
  document.head.appendChild(singleColumnStyles);
}
if (!document.querySelector('script[data-sw7-redesign]')) {
  const redesignScript = document.createElement('script');
  redesignScript.src = 'startweb7-redesign.js?v=9';
  redesignScript.defer = true;
  redesignScript.setAttribute('data-sw7-redesign', '');
  document.head.appendChild(redesignScript);
}
document.documentElement.classList.remove('sw7-nav-pending');
