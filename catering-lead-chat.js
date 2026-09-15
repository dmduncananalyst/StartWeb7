(function(){
  'use strict';
  var openButton=document.getElementById('openCateringChat');
  var section=document.getElementById('cateringChatDemo');
  var messages=document.getElementById('cateringChatMessages');
  var choices=document.getElementById('cateringChatChoices');
  var composer=document.getElementById('cateringChatComposer');
  var input=document.getElementById('cateringChatInput');
  var reset=document.getElementById('resetCateringChat');
  if(!openButton||!section||!messages||!choices||!composer||!input||!reset)return;

  var steps=[
    {question:'What are you planning?',choices:['Wedding','Corporate event','Baby shower','Private event','Public event']},
    {question:'About how many guests are you expecting?',choices:['Under 50','50–100','101–200','More than 200']},
    {question:'What city or venue are you considering?',placeholder:'Type the city or venue…'},
    {question:'What service style feels right for the event?',choices:['Buffet','Plated meal','Cocktail reception','Drop-off catering','Not sure yet']},
    {question:'What matters most to you about the food or experience?',placeholder:'Tell us what you have in mind…'},
    {question:'What is your email address or phone number so we can follow up with you?',placeholder:'Enter your email address or phone number…'}
  ];
  var step=0;
  var answers=[];

  function bubble(text,type){
    var item=document.createElement('div');
    item.className='chat-message '+type;
    item.textContent=text;
    messages.appendChild(item);
    messages.scrollTop=messages.scrollHeight;
  }
  function showQuestion(){
    choices.replaceChildren();
    if(step>=steps.length){
      bubble('Thank you. We will follow up with you shortly.','bot');
      input.disabled=true;
      input.placeholder='Demonstration complete';
      composer.querySelector('button').disabled=true;
      return;
    }
    var current=steps[step];
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
    answers.push(clean);
    step+=1;
    input.value='';
    choices.replaceChildren();
    showQuestion();
  }
  function start(){
    step=0;
    answers=[];
    messages.replaceChildren();
    choices.replaceChildren();
    input.disabled=false;
    input.value='';
    composer.querySelector('button').disabled=false;
    showQuestion();
  }
  openButton.addEventListener('click',function(){
    section.hidden=false;
    openButton.setAttribute('aria-expanded','true');
    start();
    window.setTimeout(function(){section.scrollIntoView({behavior:'smooth',block:'start'});},50);
  });
  composer.addEventListener('submit',function(event){event.preventDefault();answer(input.value);});
  reset.addEventListener('click',start);
})();
