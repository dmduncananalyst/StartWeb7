(function () {
  'use strict';
  var protectedSelector = 'nav,footer:not(.global-contact-block),.sw7-universal-header,.sw7-clean-menu,.sw7-payment-intro,.sw7-payment-scene,.sw7-home-chat,.catering-chat,.customer-tool,.lead-capture-reveal,.sw7-specific-cta,.sw7-support-coverage,.sw7-rebuilt,[data-sw7-preserved]';
  function init() {
    // Mark complete hero experiences, including their nested sections.
    document.querySelectorAll('section,.hero,.hero-inner').forEach(function (section) {
      if (section.matches('.home-hero,.support-hero,.growth-hero,.faq-hero,.search-stage') || section.querySelector('video,.analysis-engine,.support-console,.visibility-stage,.live-action-preview,.journey-demo,.search-stage')) section.setAttribute('data-sw7-preserved', '');
    });
    var tone = 0;
    document.querySelectorAll('section,.article-hero,.resource-hero,.article-wrap,.briefing-hero,.briefing-layout,.global-contact-block').forEach(function (section) {
      if (section.closest(protectedSelector) || section.parentElement.closest('.sw7-redesign-section') || section.hidden || getComputedStyle(section).display === 'none') return;
      section.classList.add('sw7-redesign-section', ['sw7-surface-pearl','sw7-surface-ink','sw7-surface-white'][tone++ % 3]);
    });

    // Service information is always visible; no content-switching tabs.
    document.querySelectorAll('.sw7-topic-collection h2 br').forEach(function(br){
      br.replaceWith(document.createTextNode(' '));
    });

    var edition=document.querySelector('.resource-edition');
    if(edition){
      var stories=Array.from(edition.querySelectorAll('.resource-story'));
      var list=document.createElement('div');list.className='sw7-article-library';
      stories.forEach(function(story){
        list.appendChild(story);
      });
      edition.querySelectorAll('.edition-top,.edition-bottom,.edition-heading').forEach(function(old){old.remove();});
      edition.appendChild(list);
    }
    document.querySelectorAll('.article-body,.briefing-article').forEach(function (article) {
      if (article.classList.contains('sw7-reading-grid')) return;
      var children = Array.from(article.children), panel;
      children.forEach(function (child) {
        if (!panel || child.tagName === 'H2') {
          panel = document.createElement('div');
          panel.className = 'sw7-reading-panel';
          article.appendChild(panel);
        }
        panel.appendChild(child);
      });
      article.classList.add('sw7-reading-grid');
    });
    document.querySelectorAll('.sw7-redesign-section').forEach(function (section) {
      section.querySelectorAll('.split,.trustLayout,.buildLayout,.intro-grid,.locked-build-layout,.catering-copy-inner,.content-inner,.home-service-copy,.closing-fit-wrap,.content-wrap').forEach(function (panel) {
        if (panel.matches('.content-wrap') && panel.querySelector('.split')) return;
        if (!panel.closest(protectedSelector)) panel.classList.add('sw7-editorial-panel');
      });
    });
    document.querySelectorAll('.sw7-editorial-panel h2 br').forEach(function (lineBreak) {
      lineBreak.replaceWith(document.createTextNode(' '));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
