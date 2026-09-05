(function () {
  if (document.querySelector('.sw7-universal-header')) return;
  {
    const sourceLogo = document.querySelector('.brand-logo img,.topbar .brand img,.brand img,header img.logo,.topbar img.logo,img.logo');
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
    nav.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a><div class="sw7-clean-item sw7-services-item"><a class="sw7-clean-trigger" href="services.html">Services <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><div class="sw7-clean-sub"><button class="website" type="button">WEBSITE DESIGN <span aria-hidden="true">▼</span></button><div class="sw7-clean-submenu"><a href="landing-page.html">LANDING PAGE</a><a href="business-website.html">BUSINESS WEBSITE</a><a href="seo-optimized-website.html">SEO-OPTIMIZED WEBSITE</a></div></div><div class="sw7-clean-sub"><button class="seo" type="button">SEO + AEO MANAGEMENT <span aria-hidden="true">▼</span></button><div class="sw7-clean-submenu"><a href="essentials.html">ESSENTIALS</a><a href="competitive.html">COMPETITIVE</a></div></div></div></div><div class="sw7-clean-item sw7-industries-item"><a class="sw7-clean-trigger" href="industries.html">Industries <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><a href="real-estate-agents.html">REAL ESTATE</a><a href="collision-repair.html">COLLISION REPAIR</a><a href="pool-construction.html">POOL CONSTRUCTION</a><a href="general-contractors.html">GENERAL CONTRACTORS</a></div></div><a href="resources.html">Resources</a><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><div class="sw7-clean-item sw7-contact-item"><a class="sw7-clean-trigger" href="contact.html">Contact <span class="sw7-down-arrow" aria-hidden="true">▼</span></a><div class="sw7-clean-menu"><a href="support.html">24/7 SUPPORT</a><a href="careers.html">CAREERS</a></div></div>';
    const compactMenuButton = document.createElement('button');
    compactMenuButton.className = 'sw7-compact-menu-button';
    compactMenuButton.type = 'button';
    compactMenuButton.setAttribute('aria-label', 'Open menu');
    compactMenuButton.setAttribute('aria-expanded', 'false');
    compactMenuButton.innerHTML = '<span></span><span></span><span></span>';
    const compactMenuOverlay = document.createElement('button');
    compactMenuOverlay.className = 'sw7-compact-menu-overlay';
    compactMenuOverlay.type = 'button';
    compactMenuOverlay.setAttribute('aria-label', 'Close menu');
    header.append(brand, nav, compactMenuButton);
    document.querySelectorAll('body > .page > .nav, body > .nav').forEach(function (oldNav) { oldNav.remove(); });
    document.querySelectorAll('.sw7-footer-disclaimer').forEach(function (disclaimer) { disclaimer.remove(); });
    document.body.insertBefore(header, document.body.firstChild);
    const fallbackStyle = document.createElement('style');
    fallbackStyle.textContent = `
      body{padding-top:78px!important}
      .sw7-universal-header{position:fixed!important;z-index:2147483000!important;inset:0 0 auto!important;height:78px!important;background:#fff!important;color:#111!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 4vw!important;box-sizing:border-box!important;box-shadow:0 1px 0 rgba(0,0,0,.08)!important}
      .sw7-universal-brand{display:flex!important;align-items:center!important;gap:13px!important;min-width:210px!important;color:#111!important;text-decoration:none!important;white-space:nowrap!important}.sw7-universal-brand img{display:block!important;width:112px!important;height:58px!important;object-fit:contain!important}.sw7-universal-brand span{font:900 17px/1 Arial,sans-serif!important;letter-spacing:.04em!important}
      .sw7-clean-nav{display:grid!important;grid-template-columns:repeat(8,minmax(0,1fr))!important;width:min(928px,calc(100vw - 300px))!important;height:78px!important;align-items:center!important;margin-left:34px!important;overflow:visible!important}.sw7-clean-nav>a,.sw7-clean-item{height:78px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important}.sw7-clean-nav>a,.sw7-clean-trigger{font:500 13px/1 Arial,sans-serif!important;color:#111!important;text-decoration:none!important;white-space:nowrap!important}.sw7-down-arrow{display:inline-block!important;margin-left:4px!important;font-size:8px!important}
      .sw7-compact-menu-button,.sw7-compact-menu-overlay{display:none!important}
      @media(min-width:1101px){.sw7-clean-nav>a,.sw7-clean-item{transition:background-color .18s ease!important}.sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible,.sw7-clean-item:hover,.sw7-clean-item:focus-within{background:#006ff1!important}.sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible,.sw7-clean-item:hover>.sw7-clean-trigger,.sw7-clean-item:focus-within>.sw7-clean-trigger{color:#fff!important}.sw7-clean-menu a:hover,.sw7-clean-menu a:focus-visible,.sw7-clean-sub>button:hover,.sw7-clean-sub>button:focus-visible{background:#dceeff!important}.sw7-website-group>.sw7-clean-submenu a:hover,.sw7-website-group>.sw7-clean-submenu a:focus-visible{color:#006ff1!important}.sw7-seo-group>.sw7-clean-submenu a:hover,.sw7-seo-group>.sw7-clean-submenu a:focus-visible{color:#00a978!important}.sw7-clean-submenu{position:relative!important;left:0!important;right:auto!important;top:0!important;width:100%!important;min-width:0!important;transform:none!important;box-sizing:border-box!important}}
      .sw7-clean-menu{position:absolute!important;z-index:2147483001!important;top:78px!important;left:0!important;min-width:270px!important;padding:10px!important;background:#f4f3ef!important;box-shadow:0 20px 50px rgba(0,0,0,.2)!important;opacity:0!important;visibility:hidden!important;transform:translateY(8px)!important}.sw7-contact-item>.sw7-clean-menu{left:0!important;right:auto!important;min-width:210px!important}.sw7-clean-item:not(.sw7-services-item):hover>.sw7-clean-menu,.sw7-clean-item:not(.sw7-services-item):focus-within>.sw7-clean-menu,.sw7-clean-item.open>.sw7-clean-menu{opacity:1!important;visibility:visible!important;transform:none!important}
      .sw7-clean-menu a,.sw7-clean-sub>button{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;padding:13px 14px!important;border:0!important;background:transparent!important;color:#111!important;text-decoration:none!important;font:800 12px/1.2 Arial!important;letter-spacing:.04em!important;box-sizing:border-box!important;cursor:pointer!important}.sw7-clean-sub{position:relative!important}.sw7-clean-sub>button.website{color:#0784ff!important;border-left:4px solid #0784ff!important}.sw7-clean-sub>button.seo{color:#00a978!important;border-left:4px solid #00a978!important}.sw7-clean-submenu{position:static!important;display:none!important;min-width:0!important;padding:0 0 6px 15px!important;background:#fff!important;box-shadow:none!important;opacity:1!important;visibility:visible!important;transform:none!important}.sw7-clean-sub.open>.sw7-clean-submenu{display:block!important}
      @media(min-width:1101px){body{padding-top:86px!important}.sw7-universal-header{height:86px!important;justify-content:flex-start!important;padding:0 4vw!important}.sw7-universal-brand{min-width:220px!important}.sw7-clean-nav{flex:1 1 auto!important;width:auto!important;max-width:none!important;height:86px!important;margin-left:clamp(42px,7vw,130px)!important;border-left:1px solid #e4e9ef!important}.sw7-clean-nav>a,.sw7-clean-item{height:86px!important;border-right:1px solid #e4e9ef!important}.sw7-clean-menu{top:86px!important}}
      @media(min-width:901px) and (max-width:1100px){body{padding-top:78px!important}.sw7-universal-header{height:78px!important;padding:0 28px!important}.sw7-universal-brand{min-width:0!important}.sw7-compact-menu-button{position:relative!important;z-index:2147483004!important;display:flex!important;width:48px!important;height:48px!important;padding:12px!important;border:0!important;background:transparent!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:6px!important;cursor:pointer!important}.sw7-compact-menu-button span{display:block!important;width:26px!important;height:2px!important;background:#071524!important;transition:transform .22s ease,opacity .22s ease!important}.sw7-universal-header.compact-open .sw7-compact-menu-button span:nth-child(1){transform:translateY(8px) rotate(45deg)!important}.sw7-universal-header.compact-open .sw7-compact-menu-button span:nth-child(2){opacity:0!important}.sw7-universal-header.compact-open .sw7-compact-menu-button span:nth-child(3){transform:translateY(-8px) rotate(-45deg)!important}.sw7-clean-nav{position:fixed!important;z-index:2147483003!important;top:0!important;right:0!important;bottom:0!important;left:auto!important;display:block!important;width:min(380px,86vw)!important;height:100dvh!important;margin:0!important;padding:96px 22px 28px!important;background:#fff!important;overflow-y:auto!important;box-shadow:-18px 0 50px rgba(0,0,0,.22)!important;transform:translateX(105%)!important;transition:transform .28s ease!important}.sw7-universal-header.compact-open .sw7-clean-nav{transform:translateX(0)!important}.sw7-clean-nav>a,.sw7-clean-item{display:flex!important;width:100%!important;height:auto!important;min-height:56px!important;align-items:center!important;justify-content:flex-start!important;border-bottom:1px solid #e4e9ef!important}.sw7-clean-nav>a,.sw7-clean-trigger{width:100%!important;min-height:56px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;font:800 16px/1.2 Arial,sans-serif!important;color:#111!important;text-decoration:none!important}.sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible,.sw7-clean-nav>a:active,.sw7-clean-item:hover>.sw7-clean-trigger,.sw7-clean-item:focus-within>.sw7-clean-trigger,.sw7-clean-item.open>.sw7-clean-trigger{background:#006ff1!important;color:#fff!important}.sw7-clean-menu,.sw7-contact-item>.sw7-clean-menu{position:static!important;display:none!important;width:100%!important;min-width:0!important;padding:5px 0 12px 12px!important;background:#f4f6f8!important;box-shadow:none!important;opacity:1!important;visibility:visible!important;transform:none!important}.sw7-clean-item{flex-wrap:wrap!important}.sw7-clean-item.open>.sw7-clean-menu{display:block!important}.sw7-clean-menu a:hover,.sw7-clean-menu a:focus-visible,.sw7-clean-menu a:active,.sw7-clean-sub>button:hover,.sw7-clean-sub>button:focus-visible,.sw7-clean-sub.open>button{background:#dceeff!important;color:#006ff1!important}.sw7-compact-menu-overlay{position:fixed!important;z-index:2147482999!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;border:0!important;background:rgba(7,21,36,.55)!important;opacity:0!important;visibility:hidden!important;transition:opacity .22s ease,visibility .22s ease!important}.sw7-universal-header.compact-open~.sw7-compact-menu-overlay{opacity:1!important;visibility:visible!important}body.sw7-compact-menu-open{overflow:hidden!important}}
      @media(max-width:900px){body{padding-top:118px!important}.sw7-universal-header{height:118px!important;display:block!important;padding:0!important;overflow:visible!important}.sw7-universal-brand{height:70px!important;width:max-content!important;margin:0 auto!important;justify-content:center!important;gap:8px!important}.sw7-universal-brand img{width:82px!important;height:52px!important}.sw7-universal-brand span{font-size:14px!important}.sw7-clean-nav{position:absolute!important;inset:70px 0 auto!important;width:100%!important;height:48px!important;margin:0!important;padding:0 5px!important;background:#fff!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:0!important;overflow:visible!important;box-sizing:border-box!important;border-top:1px solid #e5e5e5!important}.sw7-clean-nav>a,.sw7-clean-item{display:flex!important;align-items:center!important;justify-content:center!important;width:auto!important;height:47px!important;min-height:47px!important;min-width:0!important;flex:0 1 auto!important}.sw7-clean-nav>a,.sw7-clean-trigger{display:flex!important;align-items:center!important;justify-content:center!important;min-height:47px!important;font:800 clamp(8px,2.55vw,11px)/1 Arial,sans-serif!important;text-transform:uppercase!important;letter-spacing:0!important;text-align:center!important}.sw7-down-arrow{margin-left:2px!important;font-size:7px!important}.sw7-clean-menu{position:fixed!important;left:6px!important;right:6px!important;top:112px!important;width:auto!important;min-width:0!important;max-height:calc(100dvh - 118px)!important;overflow-y:auto!important}.sw7-contact-item>.sw7-clean-menu{left:6px!important;right:6px!important}.sw7-clean-submenu{position:static!important;display:none!important;opacity:1!important;visibility:visible!important;transform:none!important;box-shadow:none!important;padding:0 0 6px 15px!important}.sw7-clean-sub.open>.sw7-clean-submenu{display:block!important}}
      @media(max-width:900px){.sw7-clean-nav .sw7-clean-item:not(.open)>.sw7-clean-menu{opacity:0!important;visibility:hidden!important;transform:translateY(8px)!important}.sw7-clean-nav .sw7-clean-item.open>.sw7-clean-menu{opacity:1!important;visibility:visible!important;transform:none!important}}
    `;
    document.head.appendChild(fallbackStyle);
    document.body.appendChild(compactMenuOverlay);
    const industriesNavStyle = document.createElement('style');
    industriesNavStyle.textContent = `
      .sw7-clean-nav{grid-template-columns:repeat(8,minmax(0,1fr))!important;width:min(928px,calc(100vw - 300px))!important}
      .sw7-industries-item>.sw7-clean-menu{left:0!important;right:auto!important;min-width:235px!important}
      @media(max-width:900px){
        .sw7-clean-nav{width:100%!important}
        .sw7-clean-nav>a,.sw7-clean-trigger{font-size:clamp(5.5px,1.82vw,8.5px)!important}
        .sw7-clean-nav>a:hover,.sw7-clean-nav>a:focus-visible,.sw7-clean-nav>a:active,.sw7-clean-item:hover>.sw7-clean-trigger,.sw7-clean-item:focus-within>.sw7-clean-trigger,.sw7-clean-item.open>.sw7-clean-trigger{background:#006ff1!important;color:#fff!important}
        .sw7-clean-item>.sw7-clean-menu,.sw7-contact-item>.sw7-clean-menu{position:absolute!important;right:auto!important;top:47px!important;min-width:0!important;max-height:calc(100dvh - 128px)!important;overflow-y:auto!important;padding:6px!important}
        .sw7-services-item>.sw7-clean-menu{left:0!important;width:min(220px,calc(100vw - 12px))!important}
        .sw7-industries-item>.sw7-clean-menu{left:0!important;width:min(190px,calc(100vw - 12px))!important}
        .sw7-contact-item>.sw7-clean-menu{left:auto!important;right:0!important;width:min(150px,calc(100vw - 12px))!important}
        .sw7-clean-item>.sw7-clean-menu a,.sw7-clean-item>.sw7-clean-menu>.sw7-clean-sub>button{padding:11px 10px!important;font-size:10px!important;white-space:nowrap!important}
        .sw7-clean-nav .sw7-clean-item:not(.open)>.sw7-clean-menu{transform:translateY(8px)!important}
        .sw7-clean-nav .sw7-clean-item.open>.sw7-clean-menu{transform:none!important}
        .sw7-clean-menu a:hover,.sw7-clean-menu a:focus-visible,.sw7-clean-menu a:active,.sw7-clean-sub>button:hover,.sw7-clean-sub>button:focus-visible,.sw7-clean-sub.open>button{background:#dceeff!important;color:#006ff1!important}
      }
    `;
    document.head.appendChild(industriesNavStyle);
    function setCompactMenu(open) {
      header.classList.toggle('compact-open', open);
      document.body.classList.toggle('sw7-compact-menu-open', open);
      compactMenuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      compactMenuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    compactMenuButton.addEventListener('click', function (event) {
      event.stopPropagation();
      setCompactMenu(!header.classList.contains('compact-open'));
    });
    compactMenuOverlay.addEventListener('click', function () { setCompactMenu(false); });
    nav.querySelectorAll('a:not(.sw7-clean-trigger)').forEach(function (link) {
      link.addEventListener('click', function () { setCompactMenu(false); });
    });
    header.querySelectorAll('.sw7-clean-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        if (window.matchMedia('(max-width:1100px)').matches) {
          event.preventDefault();
          event.stopPropagation();
          const item = trigger.closest('.sw7-clean-item');
          const shouldOpen = !item.classList.contains('open');
          header.querySelectorAll('.sw7-clean-item.open').forEach(function (openItem) {
            if (openItem !== item) openItem.classList.remove('open');
          });
          item.classList.toggle('open', shouldOpen);
        }
      });
    });
    header.querySelectorAll('.sw7-clean-sub>button').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        const subsection = button.closest('.sw7-clean-sub');
        subsection.classList.toggle('open');
      });
    });
    const servicesItem = header.querySelector('.sw7-clean-item');
    if (servicesItem) {
      let servicesHoverTimer;
      servicesItem.addEventListener('mouseenter', function () {
        window.clearTimeout(servicesHoverTimer);
        if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
          servicesHoverTimer = window.setTimeout(function () {
            servicesItem.classList.add('open');
          }, 240);
        }
      });
      servicesItem.querySelectorAll('.sw7-clean-sub').forEach(function (subsection) {
        subsection.addEventListener('mouseenter', function () {
          if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
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
        if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) contactItem.classList.add('open');
      });
      contactItem.addEventListener('mouseleave', function () {
        contactHoverTimer = window.setTimeout(function () {
          contactItem.classList.remove('open');
        }, 350);
      });
    }
    function closeOpenMenus() { header.querySelectorAll('.open').forEach(function (item) { item.classList.remove('open'); }); }
    document.addEventListener('click', closeOpenMenus);
    window.addEventListener('scroll', closeOpenMenus, { passive: true });
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
