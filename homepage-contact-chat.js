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
  function showInterestChoices(){
    var selected=[];
    choices.innerHTML='';
    ['Website','SEO + AEO Management'].forEach(function(item){
      var button=document.createElement('button');
      button.type='button';
      button.textContent=item;
      button.setAttribute('aria-pressed','false');
      button.addEventListener('click',function(){
        var index=selected.indexOf(item);
        if(index===-1)selected.push(item);else selected.splice(index,1);
        button.classList.toggle('is-selected',index===-1);
        button.setAttribute('aria-pressed',index===-1?'true':'false');
        continueButton.disabled=!selected.length;
      });
      choices.appendChild(button);
    });
    var continueButton=document.createElement('button');
    continueButton.type='button';
    continueButton.className='sw7-home-chat-continue';
    continueButton.textContent='CONTINUE';
    continueButton.disabled=true;
    continueButton.addEventListener('click',function(){
      answers.interest=selected.slice();
      message(selected.join(' + '),'user');
      askInput('What is your business name?','Business name','business');
    });
    choices.appendChild(continueButton);
    composer.hidden=true;
  }
  function askInput(question,placeholder,nextStep){
    choices.innerHTML='';
    composer.hidden=false;
    input.value='';input.placeholder=placeholder;step=nextStep;
    bot(question);
    window.setTimeout(function(){input.focus()},260);
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
    message('Sending your information…','bot');
    submitToHubSpot().then(function(){
      messages.lastElementChild.textContent='Thank you. StartWeb7 will follow up with you shortly.';
    }).catch(function(){
      messages.lastElementChild.textContent='Your information could not be sent. Please call (818) 934-0444 or email desirae@startweb7.com.';
    });
  }
  function submitToHubSpot(){
    var contact=answers.contact||'';
    var isEmail=contact.indexOf('@')>-1;
    var hubSpotService=(answers.interest||[]).join(';');
    var payload={
      fields:[
        {objectTypeId:'0-1',name:'firstname',value:answers.name||''},
        {objectTypeId:'0-2',name:'name',value:answers.business||''},
        {objectTypeId:'0-1',name:'email',value:isEmail?contact:''},
        {objectTypeId:'0-1',name:'phone',value:isEmail?'':contact},
        {objectTypeId:'0-1',name:'startweb7_service_interest',value:hubSpotService||''}
      ].filter(function(field){return field.value;}),
      context:{pageUri:window.location.href,pageName:document.title}
    };
    return fetch('https://api.hsforms.com/submissions/v3/integration/submit/247103073/47546dcb-3db5-4d2a-a0a9-b76952b44c90',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
    }).then(function(response){
      if(!response.ok)throw new Error('HubSpot rejected the submission');
      return response;
    });
  }
  function start(){
    answers={};step='interest';messages.innerHTML='';choices.innerHTML='';composer.hidden=true;
    message('What are you interested in? Select all that apply.','bot');
    window.setTimeout(showInterestChoices,220);
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
