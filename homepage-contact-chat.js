(function(){
  'use strict';

  function flow(category,cta,opening,q1,q2,q3,interest){
    return {category:category,cta:cta,opening:opening,questions:[q1,q2,q3],interest:interest||'Website;SEO + AEO Management'};
  }

  var configs={
  "index.html": {
    "category": "Home",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "about.html": {
    "category": "About",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "services.html": {
    "category": "Services",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "landing-page.html": {
    "category": "Service",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "business-website.html": {
    "category": "Service",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "seo-optimized-website.html": {
    "category": "Service",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "essentials.html": {
    "category": "Service",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "competitive.html": {
    "category": "Service",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "industries.html": {
    "category": "Industries",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "real-estate-agents.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting real estate clients right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Mojo",
      "Vulcan7",
      "Zillow",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "real-estate-brokerages.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting real estate clients right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Mojo",
      "Vulcan7",
      "Zillow",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "collision-repair.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting collision repair jobs right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Insurance referrals",
      "Repair shops or dealerships",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "pool-construction.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting pool projects right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Angi",
      "Thumbtack",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "general-contractors.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting construction or remodeling projects right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Angi",
      "Thumbtack",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "catering.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting catering bookings right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Event planners or venues",
      "Thumbtack",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "commercial-cleaning.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting cleaning contracts right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Angi",
      "Thumbtack",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "security-services.html": {
    "category": "Industry",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting security contracts right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Property managers",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "nationwide.html": {
    "category": "Nationwide",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "support.html": {
    "category": "Support",
    "cta": "SEE WHAT 24/7 COVERAGE WOULD PROTECT",
    "opening": "Support should match the parts of your website that cannot wait until the next business day.",
    "questions": [
      "What website problem do you need support with?",
      "Does your website take bookings or payments?",
      "Do you need support outside normal business hours?"
    ],
    "interest": "Website"
  },
  "resources.html": {
    "category": "Resources",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "reviews.html": {
    "category": "Reviews",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "faq.html": {
    "category": "FAQ",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "contact.html": {
    "category": "Contact",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "careers.html": {
    "category": "Careers",
    "cta": "SHOW ME WHERE I COULD FIT ON THE STARTWEB7 TEAM",
    "opening": "This conversation is for people interested in working with StartWeb7, not purchasing a service.",
    "questions": [
      "What kind of role are you interested in?",
      "What experience do you have in that role?",
      "Do you have a résumé or examples of your work to share?"
    ],
    "interest": "Careers"
  },
  "aeo-ai-search.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "angi-vs-thumbtack-pool-builders.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting pool projects right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Angi",
      "Thumbtack",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "ccc-one-vs-mitchell-collision-repair.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting collision repair jobs right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Insurance referrals",
      "Repair shops or dealerships",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "digital-marketing-vs-seo.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "google-business-profile-vs-website.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "google-maps-leads.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "how-long-does-it-take-to-get-leads-from-angi-commercial-cleaning.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting cleaning contracts right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Angi",
      "Thumbtack",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "how-to-get-more-monthly-security-contracts.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting security contracts right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Property managers",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "increase-sales.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "mojo-vs-vulcan7-real-estate-leads.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting real estate clients right now?"
    ],
    "interest": "Website;SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Mojo",
      "Vulcan7",
      "Zillow",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "sales-during-slow-season.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  },
  "seo-vs-paid-ads.html": {
    "category": "Article",
    "questions": [
      "What’s on your mind about your business?",
      "How are you getting customers right now?"
    ],
    "interest": "SEO + AEO Management",
    "choices": [
      "Referrals",
      "Paid ads",
      "Social media",
      "Repeat customers",
      "Other"
    ],
    "transition": "Don’t stress, let’s work on getting you on a vacation next year."
  }
};

  var pageKey=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(pageKey==='careers.html')return;
  var config=configs[pageKey]||configs['index.html'];
  // Every destination has its own invitation; the chat retains that page's questions.
  var specificInvitations={
    "index.html": [
        "Turn website visits into calls and bookings.",
        "",
        "Get More Customers"
    ],
    "about.html": [
        "Website design. SEO + AEO. StartWeb7.",
        "",
        "Get More Customers"
    ],
    "services.html": [
        "A website, ongoing SEO, or both.",
        "",
        "Choose My Service"
    ],
    "landing-page.html": [
        "Landing Page Design",
        "",
        "Get More Bookings"
    ],
    "business-website.html": [
        "Make every service easy to understand.",
        "",
        "Build My Website"
    ],
    "seo-optimized-website.html": [
        "A website built for Google and AI recommendations.",
        "",
        "Reach More Customers"
    ],
    "essentials.html": [
        "Monthly SEO + AEO for your services and locations.",
        "",
        "Get More Calls"
    ],
    "competitive.html": [
        "When your competitors keep showing up first.",
        "",
        "Get More Customers"
    ],
    "industries.html": [
        "Websites and SEO + AEO for your industry.",
        "",
        "Bring In More Business"
    ],
    "real-estate-agents.html": [
        "Be an option before they choose an agent.",
        "",
        "Get More Real Estate Clients"
    ],
    "real-estate-brokerages.html": [
        "A stronger online presence for every agent.",
        "",
        "Grow My Brokerage"
    ],
    "collision-repair.html": [
        "Be the shop drivers find after an accident.",
        "",
        "Get More Repair Jobs"
    ],
    "pool-construction.html": [
        "Be There When the Planning Starts",
        "",
        "Get More Pool Projects"
    ],
    "general-contractors.html": [
        "Reach homeowners before they hire a contractor.",
        "",
        "Book More Remodeling Projects"
    ],
    "catering.html": [
        "Be on the shortlist before the event is booked.",
        "",
        "Get More Catering Bookings"
    ],
    "commercial-cleaning.html": [
        "Reach the people choosing their next cleaning company.",
        "",
        "Get More Cleaning Contracts"
    ],
    "security-services.html": [
        "Be visible when a property needs protection.",
        "",
        "Get More Security Contracts"
    ],
    "nationwide.html": [
        "StartWeb7 provides SEO + AEO management nationwide.",
        "",
        "Ask About SEO + AEO"
    ],
    "support.html": [
        "Your website matters after business hours, too.",
        "",
        "Add 24/7 Support"
    ],
    "resources.html": [
        "More calls. More bookings. More sales.",
        "",
        "Get More Customers"
    ],
    "reviews.html": [
        "Real businesses. Websites you can see for yourself.",
        "",
        "Build My Website"
    ],
    "faq.html": [
        "Already getting website visits? Make more of them count.",
        "",
        "Get More Calls"
    ],
    "contact.html": [
        "Website design and ongoing SEO + AEO.",
        "",
        "Get More Customers"
    ],
    "careers.html": [
        "Design. Development. SEO + AEO.",
        "",
        "Join the Team"
    ],
    "aeo-ai-search.html": [
        "People ask ChatGPT and Claude which businesses to choose.",
        "",
        "Make My Business Easier to Recommend"
    ],
    "angi-vs-thumbtack-pool-builders.html": [
        "Your own website can attract homeowners directly.",
        "",
        "Get Pool Projects Without Buying Leads"
    ],
    "ccc-one-vs-mitchell-collision-repair.html": [
        "Drivers need to find your shop before you can repair their cars.",
        "",
        "Bring More Cars Into My Shop"
    ],
    "digital-marketing-vs-seo.html": [
        "Different channels. The same need for paying clients.",
        "",
        "Get More Business Online"
    ],
    "google-business-profile-vs-website.html": [
        "Your Google profile and website can work together.",
        "",
        "Get More Local Customers"
    ],
    "google-maps-leads.html": [
        "A Maps view is only the beginning.",
        "",
        "Get More Calls From Google"
    ],
    "how-long-does-it-take-to-get-leads-from-angi-commercial-cleaning.html": [
        "Facility managers can come directly to your company.",
        "",
        "Get Cleaning Contracts Without Angi"
    ],
    "how-to-get-more-monthly-security-contracts.html": [
        "Reach businesses that need ongoing coverage.",
        "",
        "Win More Monthly Contracts"
    ],
    "increase-sales.html": [
        "Make it easier to choose what you offer.",
        "",
        "Get More Sales"
    ],
    "mojo-vs-vulcan7-real-estate-leads.html": [
        "Buyers and sellers can come directly to you.",
        "",
        "Attract Clients Without Cold Calling"
    ],
    "sales-during-slow-season.html": [
        "Stay visible before the calendar gets quiet.",
        "",
        "Keep My Schedule Booked"
    ],
    "seo-vs-paid-ads.html": [
        "Paid clicks stop when the campaign does.",
        "",
        "Attract Customers Beyond Ads"
    ]
};
  var invitation=specificInvitations[pageKey]||specificInvitations['index.html'];
  var display={headline:invitation[0],body:invitation[1],button:invitation[2]};
  var openButton=document.getElementById('openHomeChat');
  var section=document.getElementById('homeContactChat');
  var messages=document.getElementById('homeChatMessages');
  var choices=document.getElementById('homeChatChoices');
  var composer=document.getElementById('homeChatComposer');
  var input=document.getElementById('homeChatInput');
  var reset=document.getElementById('resetHomeChat');
  var close=document.getElementById('closeHomeChat');
  if(!openButton||!section||!messages||!choices||!composer||!input||!reset||!close)return;

  var style=document.createElement('style');
  style.textContent='.sw7-lead-source-cta{display:none!important}.sw7-specific-cta{background:#07101c;color:#fff;padding:88px 6vw;text-align:center;border-top:1px solid #233a50}.sw7-specific-cta-inner{width:min(820px,100%);margin:auto}.sw7-specific-cta h2{margin:0 auto 18px;max-width:820px;font-size:clamp(38px,5vw,68px);line-height:.95;letter-spacing:-.045em}.sw7-specific-cta-copy{max-width:680px;margin:0 auto 30px;color:#c9d5e2;font-size:clamp(16px,1.5vw,20px);line-height:1.55}.sw7-specific-cta button{border:2px solid #0784ff;background:#0784ff;color:#fff;padding:18px 27px;font:900 13px/1.25 inherit;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;max-width:100%}.sw7-specific-cta button:hover,.sw7-specific-cta button:focus-visible{background:#00b887;border-color:#00b887}@media(max-width:700px){.sw7-specific-cta{padding:62px 22px}.sw7-specific-cta h2{font-size:38px}.sw7-specific-cta-copy{font-size:16px}.sw7-specific-cta button{width:100%;padding:17px 14px}}';
  document.head.appendChild(style);

  function addCTA(){
    if(document.querySelector('.sw7-specific-cta'))return;
    var existing=document.querySelector('.resource-cta,.locked-build,.section.build,.content-section.build,.closing-fit,.closing');
    var block=existing||document.createElement('section');
    block.className='sw7-specific-cta';
    block.setAttribute('aria-labelledby','sw7SpecificCtaTitle');
    block.innerHTML='<div class="sw7-specific-cta-inner"><h2 id="sw7SpecificCtaTitle">'+display.headline+'</h2><button type="button" data-open-home-chat>'+display.button+'</button></div>';
    if(!existing){
      var target=document.querySelector('.global-contact-block, .rights-footer, footer');
      if(target&&target.parentNode)target.parentNode.insertBefore(block,target);else document.body.appendChild(block);
    }
  }

  function updateLegacyCTAs(){
    var generic=/^(form fill|book an appointment|start a conversation|talk to startweb7|request|contact us|bring leads to you|build your lead source|get more clients)/i;
    document.querySelectorAll('a[data-open-home-chat]').forEach(function(link){
      if(generic.test(link.textContent.trim()))link.textContent=display.button;
    });
  }

  var answers={page:pageKey,cta:display.button,category:config.category,responses:[]};
  var questionIndex=0;
  var step='questions';
  section.hidden=true;
  section.classList.remove('is-open');
  addCTA();
  updateLegacyCTAs();

  function scrollChat(){messages.scrollTop=messages.scrollHeight;}
  function message(text,who){
    var bubble=document.createElement('div');
    bubble.className='sw7-home-chat-message '+who;
    bubble.textContent=text;
    messages.appendChild(bubble);
    scrollChat();
  }
  function bot(text){message(text,'bot');}
  function ask(question,placeholder,nextStep){
    choices.innerHTML='';
    composer.hidden=false;
    input.value='';
    input.type='text';
    input.autocomplete='off';
    input.placeholder=placeholder||'Type your answer';
    step=nextStep;
    bot(question);
    input.focus();
  }
  function askChoices(){
    choices.innerHTML='';
    composer.hidden=true;
    step='choices';
    bot(config.questions[questionIndex]);
    var hint=document.createElement('p');
    hint.className='sw7-choice-hint';
    hint.textContent='Click all that apply.';
    choices.appendChild(hint);
    var selected=[];
    var next=document.createElement('button');
    next.type='button';
    next.className='sw7-home-chat-continue';
    next.textContent='Continue';
    next.disabled=true;
    config.choices.forEach(function(label){
      var button=document.createElement('button');
      button.type='button';
      button.className='sw7-answer-choice';
      button.textContent='☐ '+label;
      button.setAttribute('aria-label',label);
      button.setAttribute('role','checkbox');
      button.setAttribute('aria-checked','false');
      button.addEventListener('click',function(){
        var index=selected.indexOf(label);
        if(index<0)selected.push(label);else selected.splice(index,1);
        var active=selected.indexOf(label)>=0;
        button.setAttribute('aria-checked',String(active));
        button.textContent=(active?'✓ ':'☐ ')+label;
        next.disabled=!selected.length;
      });
      choices.appendChild(button);
    });
    next.addEventListener('click',function(){
      if(step!=='choices'||!selected.length)return;
      var value=config.choices.filter(function(label){return selected.indexOf(label)>=0;}).join(', ');
      message(value,'user');
      answers.responses.push({question:config.questions[questionIndex],answer:value});
      questionIndex+=1;
      askPageQuestion();
    });
    choices.appendChild(next);
  }
  var contactIndex=0;
  var contactQuestions=[
    {key:'name',question:'What is your name?',placeholder:'Your name',type:'text',autocomplete:'name'},
    {key:'business',question:'What is your company name? If you don’t have one, write N/A.',placeholder:'Company name or N/A',type:'text',autocomplete:'organization'},
    {key:'contact',question:'What is your email address?',placeholder:'Email address',type:'email',autocomplete:'email'},
    {key:'website',question:'What is your website address? If you don’t have one, write N/A.',placeholder:'Website address or N/A',type:'text',autocomplete:'url'},
    {key:'phone',question:'What is your phone number? This is optional.',placeholder:'Phone number or Skip',type:'text',autocomplete:'tel'}
  ];
  function showContact(){
    if(contactIndex>=contactQuestions.length){
      composer.hidden=true;
      choices.innerHTML='';
      step='ready';
      var send=document.createElement('button');
      send.type='button';send.className='sw7-home-chat-continue';send.textContent='Send';
      send.addEventListener('click',function(){if(step!=='ready')return;step='sending';sendRequest();});
      choices.appendChild(send);
      return;
    }
    var item=contactQuestions[contactIndex];
    ask(item.question,item.placeholder,'details');
    input.type=item.type;input.autocomplete=item.autocomplete;
    if(item.key==='phone'){
      var skip=document.createElement('button');skip.type='button';skip.textContent='Skip phone number';
      skip.addEventListener('click',function(){if(step==='details'&&contactQuestions[contactIndex].key==='phone')nextWithText('Skip');});
      choices.appendChild(skip);
    }
  }
  function askPageQuestion(){
    if(questionIndex>=config.questions.length){showContact();return;}
    if(questionIndex===1&&config.choices){askChoices();return;}
    ask(config.questions[questionIndex],'Type your answer','questions');
  }
  function nextWithText(value){
    if(step==='details'&&contactQuestions[contactIndex].key==='contact'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){bot('Enter a valid email address.');return;}
    message(value,'user');
    if(step==='questions'){
      answers.responses.push({question:config.questions[questionIndex],answer:value});
      questionIndex+=1;
      if(questionIndex===1&&config.transition)bot(config.transition);
      askPageQuestion();
    }else if(step==='details'){
      var key=contactQuestions[contactIndex].key;
      answers[key]=key==='phone'&&/^(skip|n\/?a)$/i.test(value)?'':value;
      contactIndex+=1;
      showContact();
    }
  }

  function answerSummary(){
    var lines=['STARTWEB7 PAGE-SPECIFIC CHAT','Page: '+document.title,'URL: '+window.location.href,'CTA: '+display.button,'Category: '+config.category,'Website: '+answers.website];
    answers.responses.forEach(function(item,index){lines.push('Q'+(index+1)+': '+item.question);lines.push('A'+(index+1)+': '+item.answer);});
    return lines.join('\n');
  }
  function submitToHubSpot(){
    var contact=answers.contact||'';
    var isEmail=contact.indexOf('@')>-1;
    var summary=answerSummary();
    var fields=[
      {objectTypeId:'0-1',name:'firstname',value:answers.name||''},
      {objectTypeId:'0-2',name:'name',value:answers.business||''},
      {objectTypeId:'0-2',name:'website',value:answers.website||''},
      {objectTypeId:'0-1',name:'email',value:isEmail?contact:''},
      {objectTypeId:'0-1',name:'phone',value:answers.phone||''},
      {objectTypeId:'0-1',name:'startweb7_service_interest',value:config.interest},
      {objectTypeId:'0-1',name:'message',value:summary}
    ].filter(function(field){return field.value;});
    var context={pageUri:window.location.href,pageName:(document.title+' | '+summary.replace(/\n/g,' | ')).slice(0,1500)};
    function post(fieldList){
      return fetch('https://api.hsforms.com/submissions/v3/integration/submit/247103073/bcf22eda-389c-4b66-a9b9-08988732bfe7',{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:fieldList,context:context})
      });
    }
    return post(fields).then(function(response){
      if(response.ok)return response;
      throw new Error('HubSpot rejected the submission');
    });
  }
  function sendRequest(){
    choices.innerHTML='';
    message('Sending your answers…','bot');
    submitToHubSpot().then(function(){messages.lastElementChild.textContent='Thank you for reaching out! We’ll get back to you shortly.';}).catch(function(){messages.lastElementChild.textContent='Your answers could not be sent. Try again, or call (818) 934-0444.';var retry=document.createElement('button');retry.type='button';retry.textContent='Try again';retry.addEventListener('click',sendRequest);choices.appendChild(retry);});
  }
  function start(){
    answers={page:pageKey,cta:display.button,category:config.category,responses:[]};
    questionIndex=0;
    contactIndex=0;
    messages.innerHTML='';
    choices.innerHTML='';
    composer.hidden=true;

    askPageQuestion();
  }
  function openChat(){section.hidden=false;section.classList.add('is-open');openButton.setAttribute('aria-expanded','true');start();}
  function closeChat(){section.classList.remove('is-open');section.hidden=true;openButton.setAttribute('aria-expanded','false');}

  openButton.addEventListener('click',openChat);
  document.addEventListener('click',function(event){var trigger=event.target.closest&&event.target.closest('[data-open-home-chat]');if(!trigger)return;event.preventDefault();openChat();});
  reset.addEventListener('pointerdown',function(event){event.preventDefault();event.stopPropagation();});
  reset.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();start();});
  close.addEventListener('click',closeChat);
  section.addEventListener('click',function(event){if(event.target===section)closeChat();});
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!section.hidden)closeChat();});
  composer.addEventListener('submit',function(event){event.preventDefault();var value=input.value.trim();if(value)nextWithText(value);});
})();
