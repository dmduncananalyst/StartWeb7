(function(){
  'use strict';
  var section=document.querySelector('.customer-tool');
  if(!section)return;
  var type=section.classList.contains('real-estate-tool')?'realestate':section.classList.contains('collision-tool')?'collision':section.classList.contains('pool-tool')?'pool':section.classList.contains('contractor-tool')?'contractor':'';
  if(!type)return;

  var experiences={
    realestate:{
      title:'Real Estate Lead Assistant',
      note:'On a client website, the completed buyer or seller lead can be sent to the real estate company’s CRM or email.',
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
      note:'On a client website, the completed repair lead can be sent to the collision repair shop’s CRM or email.',
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
      note:'On a client website, the completed pool project lead can be sent to the pool company’s CRM or email.',
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
      note:'On a client website, the completed construction lead can be sent to the contractor’s CRM or email.',
      steps:[
        {question:'What are you planning to build or remodel?',choices:['ADU','Home addition','Kitchen remodel','Bathroom remodel','Full renovation','Other project']},
        {question:'What type of property is this for?',choices:['Single-family home','Multifamily property','Commercial property','Other']},
        {question:'How far along is the project?',choices:['I have an idea','I have plans','I have permits','Ready to build']},
        {question:'What city is the property in?',placeholder:'Type the city…'},
        {question:'When would you like the project to begin?',choices:['As soon as possible','Within 3 months','3–6 months','Still planning']},
        {question:'What is your email address or phone number so the contractor can follow up with you?',placeholder:'Enter your email address or phone number…'}
      ]
    }
  };

  var experience=experiences[type];
  var shell=section.querySelector('.tool-shell');
  shell.innerHTML='<div class="industry-chat-wrap '+type+'-chat"><div class="industry-chat-window"><div class="industry-chat-header"><div class="industry-chat-agent"><span class="industry-chat-avatar">CHAT</span><span><strong>'+experience.title+'</strong><small>Interactive website example</small></span></div><button class="industry-chat-reset" type="button">START OVER</button></div><div class="industry-chat-messages" role="log" aria-live="polite"></div><div class="industry-chat-choices" aria-label="Suggested replies"></div><form class="industry-chat-composer"><input type="text" autocomplete="off" aria-label="Type your reply" placeholder="Type your reply…"><button type="submit">SEND</button></form></div><p class="industry-chat-note">Live demonstration only. Answers stay in this browser and are not submitted. '+experience.note+'</p></div>';

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
