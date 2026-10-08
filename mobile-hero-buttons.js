(function () {
  'use strict';
  var mobile = window.matchMedia('(max-width: 700px)');
  var heroes = '.home-hero,.growth-hero,.essentials-hero,.article-hero,.resource-hero,.reviews-hero,.faq-hero,.industry-hero,.sw7-new-hero,.careers-hero,.hero';
  var placements = [];
  var scheduled = false;
  function update() {
    scheduled = false;
    if (!mobile.matches) {
      placements.forEach(function (p) {
        if (p.marker.parentNode && p.actions.parentNode === p.panel) {
          p.marker.parentNode.insertBefore(p.actions, p.marker.nextSibling);
        }
        p.panel.hidden = true;
      });
      return;
    }
    document.querySelectorAll(heroes).forEach(function (hero) {
      if (hero.closest('.sw7-city-hero') || hero.closest('nav,footer,.sw7-home-chat')) return;
      var actions = hero.querySelector('.sw7-hero-actions');
      if (!actions || placements.some(function (p) { return p.actions === actions; })) return;
      var marker = document.createComment('Mobile hero button placement');
      actions.parentNode.insertBefore(marker, actions);
      var panel = document.createElement('div');
      panel.className = 'sw7-mobile-below-hero';
      panel.setAttribute('data-sw7-preserved', '');
      panel.setAttribute('aria-label', 'Next actions');
      panel.hidden = true;
      hero.parentNode.insertBefore(panel, hero.nextSibling);
      placements.push({actions:actions, marker:marker, panel:panel});
    });
    placements.forEach(function (p) {
      if (!p.marker.isConnected || !p.panel.isConnected) return;
      p.panel.hidden = false;
      if (p.actions.parentNode !== p.panel) p.panel.appendChild(p.actions);
    });
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }
  function start() {
    update();
    // Shared navigation and layout code can add or rebuild a hero after loading.
    new MutationObserver(function (records) {
      if (records.some(function (r) { return r.addedNodes.length || r.removedNodes.length; })) schedule();
    }).observe(document.body, {childList:true, subtree:true});
    if (mobile.addEventListener) mobile.addEventListener('change', update);
    else mobile.addListener(update);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
