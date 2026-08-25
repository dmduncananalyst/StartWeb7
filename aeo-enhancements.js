(function () {
  'use strict';

  var origin = 'https://startweb7.com/';
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var pageUrl = origin + (path === 'index.html' ? '' : path);
  var title = document.title.replace(/\s*\|\s*StartWeb7.*$/i, '').trim() || 'StartWeb7';
  var graph = [{
    '@type': 'WebPage', '@id': pageUrl + '#aeo-page', 'url': pageUrl,
    'name': document.title, 'isPartOf': {'@id': origin + '#website'},
    'about': {'@id': origin + '#organization'},
    'speakable': {'@type': 'SpeakableSpecification', 'cssSelector': ['h1', 'h2', '.hero-sub', '.faq-answer']}
  }];

  if (path !== 'index.html') {
    graph.push({
      '@type': 'BreadcrumbList', '@id': pageUrl + '#breadcrumb',
      'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': origin},
        {'@type': 'ListItem', 'position': 2, 'name': title, 'item': pageUrl}
      ]
    });
  }

  if (path === 'faq.html') {
    var questions = [];
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (question && answer) {
        questions.push({
          '@type': 'Question', 'name': question.textContent.trim(),
          'acceptedAnswer': {'@type': 'Answer', 'text': answer.textContent.trim()}
        });
      }
    });
    if (questions.length) graph.push({'@type': 'FAQPage', '@id': pageUrl + '#faq', 'mainEntity': questions});
  }

  if (path === 'landing-page.html') {
    var landingQuestions = [
      {
        question: 'What is a landing page?',
        answer: 'A landing page is one focused web page designed to explain an offer and guide visitors toward one clear next step, such as calling, submitting a form, or making a purchase.'
      },
      {
        question: 'What should a landing page include?',
        answer: 'A strong landing page includes a clear headline, a direct explanation of the offer, helpful business information, proof or trust signals, and an easy way for customers to take action.'
      },
      {
        question: 'How long does a landing page take to build?',
        answer: 'StartWeb7 landing pages are normally completed within three business days after the required content and project information are received.'
      }
    ];

    var section = document.createElement('section');
    section.className = 'sw7-service-questions';
    section.setAttribute('aria-labelledby', 'landing-page-questions-title');
    section.innerHTML = '<div class="sw7-service-questions-inner"><p class="sw7-service-questions-label">LANDING PAGE QUESTIONS</p><h2 id="landing-page-questions-title">Answers before you get started.</h2>' + landingQuestions.map(function (item) {
      return '<details><summary>' + item.question + '</summary><p>' + item.answer + '</p></details>';
    }).join('') + '</div>';

    var footer = document.querySelector('.rights-footer, footer');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);

    var style = document.createElement('style');
    style.textContent = '.sw7-service-questions{background:#fff;color:#111;padding:72px 6vw}.sw7-service-questions-inner{width:min(920px,100%);margin:0 auto}.sw7-service-questions-label{margin:0 0 18px;color:#087ff5;font:800 12px/1.2 Arial,sans-serif;letter-spacing:.18em}.sw7-service-questions h2{max-width:720px;margin:0 0 34px;font:900 clamp(34px,6vw,68px)/.96 Arial,sans-serif;text-transform:uppercase}.sw7-service-questions details{border-top:1px solid #bdb8ae;padding:22px 0}.sw7-service-questions details:last-child{border-bottom:1px solid #bdb8ae}.sw7-service-questions summary{cursor:pointer;list-style:none;padding-right:34px;position:relative;font:800 clamp(18px,2.2vw,24px)/1.2 Arial,sans-serif}.sw7-service-questions summary::-webkit-details-marker{display:none}.sw7-service-questions summary:after{content:"+";position:absolute;right:4px;top:-3px;color:#087ff5;font-size:28px}.sw7-service-questions details[open] summary:after{content:"−"}.sw7-service-questions details p{max-width:760px;margin:16px 0 2px;color:#4f4b45;font:400 18px/1.55 Arial,sans-serif}@media(max-width:600px){.sw7-service-questions{padding:48px 7vw}.sw7-service-questions h2{font-size:36px}.sw7-service-questions summary{font-size:18px}.sw7-service-questions details p{font-size:16px}}';
    document.head.appendChild(style);

    graph.push({
      '@type': 'FAQPage', '@id': pageUrl + '#service-questions',
      'mainEntity': landingQuestions.map(function (item) {
        return {'@type': 'Question', 'name': item.question, 'acceptedAnswer': {'@type': 'Answer', 'text': item.answer}};
      })
    });
  }

  var schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.setAttribute('data-startweb7-aeo', 'enhanced');
  schema.textContent = JSON.stringify({'@context': 'https://schema.org', '@graph': graph});
  document.head.appendChild(schema);
})();
