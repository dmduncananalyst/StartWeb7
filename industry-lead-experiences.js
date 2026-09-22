(function(){
  'use strict';
  var section=document.querySelector('.customer-tool');
  if(!section)return;
  var type=section.classList.contains('real-estate-tool')?'realestate':section.classList.contains('collision-tool')?'collision':section.classList.contains('pool-tool')?'pool':section.classList.contains('contractor-tool')?'contractor':section.classList.contains('cleaning-tool')?'cleaning':section.classList.contains('security-tool')?'security':'';
  if(!type)return;

  var experiences={
    realestate:{
      title:'Real Estate Lead Assistant',
      steps:[
        {question:'What are you planning?',choices:['Buy a home','Sell a home','Buy and sell']},
        {question:'What city or neighborhood are you interested in?',placeholder:'Type the city or neighborhood…'},
        {question:'What type of property is involved?',choices:['Single-family home','Condo or townhome','Multifamily property','Land','Not sure yet']},
        {question:'When are you hoping to move?',choices:['As soon as possible','Within 3 months','3–6 months','Just researching']},
        {question:'What is your email address or phone number so an agent can follow up with you?',placeholder:'Enter your email address or phone number…'}
      ]
    },
    collision:{
      title:'Collision Repair Lead Assistant',
      steps:[
        {question:'What part of the vehicle is damaged?',choices:['Front bumper','Rear bumper','Door or side panel','Fender','Multiple areas','Not sure']},
        {question:'Can the vehicle be driven safely?',choices:['Yes','No','Not sure']},
        {question:'Has an insurance claim been started?',choices:['Yes','Not yet','I’m paying myself','Not sure']},
        {question:'What city is the vehicle in?',placeholder:'Type the city…'},
        {question:'Is there anything else the repair shop should know?',placeholder:'Describe the damage or what happened…'},
        {question:'What is your email address or phone number so the shop can follow up with you?',placeholder:'Enter your email address or phone number…'}
      ]
    },
    pool:{
      title:'Pool Project Lead Assistant',
      steps:[
        {question:'What are you planning for your backyard?',choices:['New custom pool','Pool remodel','Pool and backyard redesign','Not sure yet']},
        {question:'How would you describe the available space?',choices:['Small backyard','Medium backyard','Large backyard','Not sure']},
        {question:'Which features are you considering?',choices:['Attached spa','Baja shelf','Waterfall','Pool lighting','Outdoor kitchen','I need recommendations']},
        {question:'When would you like the project to begin?',choices:['As soon as possible','Within 3 months','3–6 months','Just researching']},
        {question:'What city is the property in?',placeholder:'Type the city…'},
        {question:'What is your email address or phone number so the pool company can follow up with you?',placeholder:'Enter your email address or phone number…'}
      ]
    },
    contractor:{
      title:'Contractor Project Lead Assistant',
      steps:[
        {question:'What are you planning to build or remodel?',choices:['ADU','Home addition','Kitchen remodel','Bathroom remodel','Full renovation','Other project']},
        {question:'What type of property is this for?',choices:['Single-family home','Multifamily property','Commercial property','Other']},
        {question:'How far along is the project?',choices:['I have an idea','I have plans','I have permits','Ready to build']},
        {question:'What city is the property in?',placeholder:'Type the city…'},
        {question:'When would you like the project to begin?',choices:['As soon as possible','Within 3 months','3–6 months','Still planning']},
        {question:'What is your email address or phone number so the contractor can follow up with you?',placeholder:'Enter your email address or phone number…'}
      ]
    },
    cleaning:{
      title:'Commercial Cleaning Lead Assistant',
      steps:[
        {question:'What type of facility needs cleaning?',choices:['Office','Medical facility','Retail space','School or daycare','Multi-tenant building','Other facility']},
        {question:'What service are you looking for?',choices:['Recurring janitorial service','Day porter service','Deep cleaning','Floor care','Other service']},
        {question:'How often will you need service?',choices:['Daily','3 to 5 times a week','Weekly','One time','Not sure yet']},
        {question:'What city or ZIP code is the facility in?',placeholder:'Enter the city or ZIP code…'},
        {question:'About how large is the facility?',choices:['Under 5,000 square feet','5,000 to 20,000 square feet','Over 20,000 square feet','Not sure yet']},
        {question:'When would you like service to start?',choices:['Right away','This month','Planning ahead','Just comparing options']},
        {question:'What is your email address or phone number so the cleaning company can follow up?',placeholder:'Enter your email address or phone number…'}
      ]
    },
    security:{
      title:'Security Coverage Lead Assistant',
      steps:[
        {question:'What needs security coverage?',choices:['Commercial property','Residential community','Construction site','Retail location','Event','Other property']},
        {question:'What type of coverage are you looking for?',choices:['Armed guard coverage','Unarmed guard coverage','Mobile patrol','Event security','Not sure yet']},
        {question:'What city or ZIP code needs coverage?',placeholder:'Enter the city or ZIP code…'},
        {question:'What schedule do you need?',choices:['Business hours','Overnight','24/7 coverage','Specific event date','Not sure yet']},
        {question:'When would you like coverage to begin?',choices:['Right away','Within 30 days','1 to 3 months','Just comparing options']},
        {question:'What is your email address or phone number so the security company can follow up?',placeholder:'Enter your email address or phone number…'}
      ]
    }
  };

  var experience=experiences[type];
  var shell=section.querySelector('.tool-shell');
  shell.innerHTML='<div class="industry-chat-wrap '+type+'-chat"><div class="industry-chat-window"><div class="industry-chat-header"><div class="industry-chat-agent"><span class="industry-chat-avatar"><img src="startweb7-logo.png" alt="StartWeb7"></span><span><strong>'+experience.title+'</strong><small>Interactive website example</small></span></div><button class="industry-chat-reset" type="button">START OVER</button></div><div class="industry-chat-messages" role="log" aria-live="polite"></div><div class="industry-chat-choices" aria-label="Suggested replies"></div><form class="industry-chat-composer"><input type="text" autocomplete="off" aria-label="Type your reply" placeholder="Type your reply…"><button type="submit">SEND</button></form></div></div>';

  var messages=shell.querySelector('.industry-chat-messages');
  var choices=shell.querySelector('.industry-chat-choices');
  var composer=shell.querySelector('.industry-chat-composer');
  var input=composer.querySelector('input');
  var send=composer.querySelector('button');
  var reset=shell.querySelector('.industry-chat-reset');
  var step=0;

  function bubble(text,who){
    var item=document.createElement('div');
    item.className='industry-chat-message '+who;
    item.textContent=text;
    messages.appendChild(item);
    messages.scrollTop=messages.scrollHeight;
  }
  function showQuestion(){
    choices.replaceChildren();
    if(step>=experience.steps.length){
      window.setTimeout(function(){bubble('Thank you. We will follow up with you shortly.','bot');},220);
      input.disabled=true;
      input.placeholder='Demonstration complete';
      send.disabled=true;
      return;
    }
    var current=experience.steps[step];
    window.setTimeout(function(){
      bubble(current.question,'bot');
      input.placeholder=current.placeholder||'Type your reply…';
      if(current.choices){
        current.choices.forEach(function(label){
          var button=document.createElement('button');
          button.type='button';
          button.textContent=label;
          button.addEventListener('click',function(){answer(label);});
          choices.appendChild(button);
        });
      }
      input.focus();
    },220);
  }
  function answer(value){
    var clean=String(value||'').trim();
    if(!clean)return;
    bubble(clean,'user');
    step+=1;
    input.value='';
    choices.replaceChildren();
    showQuestion();
  }
  function start(){
    step=0;
    messages.replaceChildren();
    choices.replaceChildren();
    input.disabled=false;
    input.value='';
    send.disabled=false;
    showQuestion();
  }
  composer.addEventListener('submit',function(event){event.preventDefault();answer(input.value);});
  reset.addEventListener('click',start);
  start();
})();
