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
      var controls=document.createElement('div');controls.className='sw7-article-controls';
      controls.innerHTML='<label class="sw7-article-search"><span>Find articles about getting more customers</span><input type="search" placeholder="Google Maps, sales, or AI" aria-label="Find articles by topic"></label><label class="sw7-article-topic"><span>Topic</span><select aria-label="Filter articles by topic"><option value="">All topics</option></select></label>';
      var list=document.createElement('div');list.className='sw7-article-library';
      var topics=[];
      stories.forEach(function(story){
        var category=story.querySelector('small');var topic=category?category.textContent.trim():'';
        story.dataset.articleTopic=topic;
        if(topic&&topics.indexOf(topic)<0)topics.push(topic);
        list.appendChild(story);
      });
      edition.querySelectorAll('.edition-top,.edition-bottom,.edition-heading').forEach(function(old){old.remove();});
      edition.appendChild(controls);edition.appendChild(list);
      var status=document.createElement('p');status.className='sw7-article-status';status.setAttribute('role','status');status.hidden=true;edition.appendChild(status);
      var select=controls.querySelector('select'),search=controls.querySelector('input');
      topics.forEach(function(topic){var option=document.createElement('option');option.value=topic;option.textContent=topic;select.appendChild(option);});
      function filterArticles(){
        var query=search.value.trim().toLowerCase(),count=0;
        stories.forEach(function(story){var matches=(!select.value||story.dataset.articleTopic===select.value)&&story.textContent.toLowerCase().includes(query);story.hidden=!matches;if(matches)count++;});
        status.hidden=count>0;status.textContent=count?'':'No articles match this search.';
      }
      search.addEventListener('input',filterArticles);select.addEventListener('change',filterArticles);
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
