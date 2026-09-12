(function () {
  'use strict';

  function sendEvent(name, parameters) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, parameters || {});
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;

    var href = (link.getAttribute('href') || '').trim();
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);

    if (href.indexOf('tel:') === 0) {
      sendEvent('contact_click', { contact_method: 'phone', link_text: label });
    } else if (href.indexOf('mailto:') === 0) {
      sendEvent('contact_click', { contact_method: 'email', link_text: label });
    } else if (/appointment|schedule|book/i.test(href + ' ' + label)) {
      sendEvent('contact_click', { contact_method: 'appointment', link_text: label });
    }
  });

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || form.tagName !== 'FORM') return;
    sendEvent('generate_lead', { form_id: form.id || 'contact_form' });
  });
})();
