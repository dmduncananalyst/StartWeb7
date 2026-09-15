(function(){
  var openButton=document.getElementById('openHomeChat');
  var section=document.getElementById('homeContactChat');
  var messages=document.getElementById('homeChatMessages');
  var choices=document.getElementById('homeChatChoices');
  var composer=document.getElementById('homeChatComposer');
  var input=document.getElementById('homeChatInput');
  var reset=document.getElementById('resetHomeChat');
  var close=document.getElementById('closeHomeChat');
  if(!openButton||!section||!messages||!choices||!composer||!input||!reset||!close)return;

  var answers={};
  var step='interest';
  section.hidden=true;
  section.classList.remove('is-open');

  function scrollChat(){messages.scrollTop=messages.scrollHeight}
  function message(text,who,extra){
    var bubble=document.createElement('div');
    bubble.className='sw7-home-chat-message '+who+(extra?' '+extra:'');
    bubble.textContent=text;
    messages.appendChild(bubble);
    scrollChat();
  }
  function bot(text){window.setTimeout(function(){message(text,'bot')},180)}
  function showChoices(items){
    choices.innerHTML='';
    items.forEach(function(item){
      var button=document.createElement('button');
      button.type='button';button.textContent=item;
      button.addEventListener('click',function(){choose(item)});
      choices.appendChild(button);
    });
    composer.hidden=true;
  }
  function askInput(question,placeholder,nextStep){
    choices.innerHTML='';
    composer.hidden=false;
    input.value='';input.placeholder=placeholder;step=nextStep;
    bot(question);
    window.setTimeout(function(){input.focus()},260);
  }
  function choose(value){
    message(value,'user');choices.innerHTML='';
    if(step==='interest'){
      answers.interest=value;
      askInput('What is your business name?','Business name','business');
    }
  }
  function nextWithText(value){
    message(value,'user');
    if(step==='business'){
      answers.business=value;
      askInput('What’s your name?','Your name','name');
    }else if(step==='name'){
      answers.name=value;
      askInput('What’s the best email or phone number to reach you?','Email or phone number','contact');
    }else if(step==='contact'){
      answers.contact=value;
      composer.hidden=true;
      sendRequest();
    }
  }
  function sendRequest(){
    choices.innerHTML='';
    submitToHubSpot();
    bot('Thank you. StartWeb7 will follow up with you shortly.');
  }
  function submitToHubSpot(){
    var contact=answers.contact||'';
    var isEmail=contact.indexOf('@')>-1;
    var hubSpotService={
      'A. Business Website':'Business Website',
      'B. SEO-Optimized Website':'SEO-Optimized Website',
      'C. SEO + AEO Essentials':'SEO + AEO Esstentials',
      'D. SEO + AEO Competitive':'SEO + AEO Competitve'
    }[answers.interest]||answers.interest.replace(/^[A-F]\.\s*/, '');
    var payload={
      fields:[
        {name:'firstname',value:answers.name||''},
        {name:'company',value:answers.business||''},
        {name:'email',value:isEmail?contact:''},
        {name:'phone',value:isEmail?'':contact},
        {name:'what_service_are_you_interested_in',value:hubSpotService||''}
      ].filter(function(field){return field.value;}),
      context:{pageUri:window.location.href,pageName:document.title}
    };
    fetch('https://api.hsforms.com/submissions/v3/integration/submit/247103073/47546dcb-3db5-4d2a-a0a9-b76952b44c90',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
    }).catch(function(){
      /* The visitor can still finish the chat if their browser blocks a third-party request. */
    });
  }
  function start(){
    answers={};step='interest';messages.innerHTML='';choices.innerHTML='';composer.hidden=true;
    message('What are you interested in?','bot');
    window.setTimeout(function(){showChoices(['A. Business Website','B. SEO-Optimized Website','C. SEO + AEO Essentials','D. SEO + AEO Competitive'])},220);
  }
  function openChat(){
    section.hidden=false;section.classList.add('is-open');openButton.setAttribute('aria-expanded','true');start();
  }
  function closeChat(){
    section.classList.remove('is-open');section.hidden=true;openButton.setAttribute('aria-expanded','false');
  }
  openButton.addEventListener('click',openChat);
  document.addEventListener('click',function(event){
    var trigger=event.target.closest&&event.target.closest('[data-open-home-chat]');
    if(!trigger)return;
    event.preventDefault();
    openChat();
  });
  reset.addEventListener('pointerdown',function(event){event.preventDefault();event.stopPropagation();});
  reset.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();start();});
  close.addEventListener('click',closeChat);
  section.addEventListener('click',function(event){if(event.target===section)closeChat()});
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!section.hidden)closeChat()});
  composer.addEventListener('submit',function(event){
    event.preventDefault();var value=input.value.trim();if(!value)return;nextWithText(value);
  });
})();
