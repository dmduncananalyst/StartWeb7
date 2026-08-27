(function () {
  const style = document.createElement('style');
  style.textContent = `
    .nav{width:min(1120px,calc(100% - 48px))!important;height:78px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;margin:0 auto!important;padding:0!important}
    .sw7-nav-links{display:grid!important;grid-template-columns:repeat(6,minmax(72px,1fr))!important;align-items:center!important;gap:12px!important;width:min(660px,68vw)!important;margin-left:auto!important}
    .sw7-nav-links>a,.sw7-nav-links>.sw7-nav-item{margin:0!important;justify-content:center!important;text-align:center!important}
    .sw7-nav-links>a,.sw7-nav-item>a{color:#111!important;font:500 13px/1 Arial,Helvetica,sans-serif!important;text-decoration:none!important;white-space:nowrap!important}
    .brand-logo{display:inline-flex!important;align-items:center;gap:13px;width:auto!important;line-height:1!important;white-space:nowrap}
    .brand-logo img{width:112px!important;height:auto!important;flex:0 0 auto}
    .sw7-brand-name{font-size:17px;font-weight:900;letter-spacing:.04em;color:#111}
    .sw7-nav-item{position:relative;display:inline-flex;align-items:center;gap:5px}
    .sw7-nav-toggle{appearance:none;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer;padding:5px;line-height:1}
    .sw7-nav-toggle:after{content:'\203A';font-size:16px}
    .sw7-nav-menu{position:absolute;z-index:9999;top:calc(100% + 14px);left:0;min-width:270px;padding:10px;background:#f4f3ef;color:#111;box-shadow:0 20px 50px rgba(0,0,0,.2);opacity:0;visibility:hidden;transform:translateY(8px);transition:.2s ease;text-align:left}
    .sw7-nav-item:hover>.sw7-nav-menu,.sw7-nav-item:focus-within>.sw7-nav-menu,.sw7-nav-item.open>.sw7-nav-menu{opacity:1;visibility:visible;transform:none}
    .sw7-nav-menu a,.sw7-sub-head{display:flex!important;align-items:center;justify-content:space-between;width:100%;margin:0!important;padding:13px 14px!important;color:#111!important;text-decoration:none!important;font-size:12px!important;font-weight:800!important;letter-spacing:.04em;background:transparent;white-space:normal}
    .sw7-nav-menu a:hover,.sw7-nav-menu a:focus,.sw7-sub-head:hover{background:#fff}
    .sw7-sub{position:relative}
    .sw7-sub-head{border:0;cursor:pointer;font-family:inherit}
    .sw7-sub-head:after{content:'\203A';font-size:18px}
    .sw7-website-group>.sw7-sub-head{color:#0784ff!important;border-left:4px solid #0784ff}
    .sw7-seo-group>.sw7-sub-head{color:#00a978!important;border-left:4px solid #00a978}
    .sw7-sub-menu{position:absolute;z-index:10000;left:100%;top:-10px;min-width:275px;padding:10px;background:#fff;color:#111;box-shadow:0 20px 50px rgba(0,0,0,.18);opacity:0;visibility:hidden;transform:translateX(8px);transition:.2s ease}
    .sw7-website-group>.sw7-sub-menu{border-top:4px solid #0784ff}
    .sw7-seo-group>.sw7-sub-menu{border-top:4px solid #00a978}
    .sw7-website-group>.sw7-sub-menu a:hover,.sw7-website-group>.sw7-sub-menu a:focus{color:#0784ff!important}
    .sw7-seo-group>.sw7-sub-menu a:hover,.sw7-seo-group>.sw7-sub-menu a:focus{color:#00a978!important}
    .sw7-sub:hover>.sw7-sub-menu,.sw7-sub:focus-within>.sw7-sub-menu,.sw7-sub.open>.sw7-sub-menu{opacity:1;visibility:visible;transform:none}
    .sw7-contact-menu{position:absolute;z-index:9999;top:calc(100% + 14px);right:0;min-width:210px;padding:10px;background:#f4f3ef;color:#111;box-shadow:0 20px 50px rgba(0,0,0,.2);opacity:0;visibility:hidden;transform:translateY(8px);transition:.2s ease;text-align:left}
    .sw7-nav-item:hover>.sw7-contact-menu,.sw7-nav-item:focus-within>.sw7-contact-menu,.sw7-nav-item.open>.sw7-contact-menu{opacity:1;visibility:visible;transform:none}
    .sw7-contact-menu a{display:block!important;width:100%;margin:0!important;padding:13px 14px!important;color:#111!important;text-decoration:none!important;font-size:12px!important;font-weight:800!important;letter-spacing:.04em;white-space:normal}
    .sw7-contact-menu a:hover,.sw7-contact-menu a:focus{background:#fff}
    .sw7-universal-copyright{display:block!important;width:100%!important;margin:0!important;padding:24px 20px!important;background:#111!important;color:#fff!important;text-align:center!important;font:700 12px/1.4 Arial,Helvetica,sans-serif!important;letter-spacing:.04em!important;text-transform:none!important}
    @media(max-width:820px){
      .sw7-nav-links{grid-template-columns:repeat(6,max-content)!important;width:auto!important;gap:15px!important}
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
  const copyrightText = '© 2026 StartWeb7. All Rights Reserved.';
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
  const existingServiceLink = existingCandidates.find(a => a.textContent.trim().toLowerCase() === 'services');
  if (!existingServiceLink || existingServiceLink.closest('.sw7-nav-item')) return;
  const navLinks = existingServiceLink.parentElement;
  navLinks.innerHTML = '<a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services</a><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a>';
  navLinks.classList.add('sw7-nav-links');
  const candidates = [...navLinks.querySelectorAll('a')];
  const serviceLink = candidates.find(a => a.textContent.trim().toLowerCase() === 'services');
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
    <div class="sw7-sub sw7-website-group"><button class="sw7-sub-head" type="button">WEBSITE DESIGN</button><div class="sw7-sub-menu"><a href="business-website.html">BUSINESS WEBSITE</a><a href="seo-optimized-website.html">SEO-OPTIMIZED WEBSITE</a></div></div>
    <div class="sw7-sub sw7-seo-group"><button class="sw7-sub-head" type="button">SEO + AEO MANAGEMENT</button><div class="sw7-sub-menu"><a href="seo-aeo-management.html">SEO MANAGEMENT</a><a href="essentials.html">ESSENTIALS</a><a href="competitive.html">COMPETITIVE</a></div></div>
  `;
  wrapper.appendChild(menu);
  toggle.addEventListener('click', function (event) { event.stopPropagation(); wrapper.classList.toggle('open'); toggle.setAttribute('aria-expanded', wrapper.classList.contains('open') ? 'true' : 'false'); });
  menu.querySelectorAll('.sw7-sub-head').forEach(button => { button.addEventListener('click', function (event) { event.stopPropagation(); button.parentElement.classList.toggle('open'); }); });
  const contactLink = candidates.find(a => a.textContent.trim().toLowerCase() === 'contact');
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
    contactMenu.innerHTML = '<a href="contact.html">CONTACT</a><a href="support.html">24/7 SUPPORT</a><a href="careers.html">CAREERS</a>';
    contactWrapper.appendChild(contactMenu);
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
})();
