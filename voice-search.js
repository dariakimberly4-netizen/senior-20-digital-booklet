(function(){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function lang(){
    try{
      const s = typeof settings === 'function' ? settings() : {};
      return s.lang === 'tl' ? 'fil-PH' : 'en-PH';
    }catch{return 'en-PH';}
  }

  function applyVoiceQuery(raw){
    const text=(raw||'').trim();
    const q=text.toLowerCase();
    const map=[
      {keys:['gamot','medicine','pharmacy'],cat:'Medicine'},
      {keys:['pagkain','restaurant','food','meal'],cat:'Food & Restaurant'},
      {keys:['grocery','groceries','basic necessities','pangunahing bilihin'],cat:'Grocery & Basic Necessities'},
      {keys:['clinic','doctor','health','medical','serbisyong medikal','kalusugan'],cat:'Medical / Health Services'},
      {keys:['transport','pamasahe','bus','jeep','taxi'],cat:'Transport'},
      {keys:['hotel','recreation','libangan'],cat:'Hotels & Recreation'}
    ];
    const match=map.find(m=>m.keys.some(k=>q.includes(k)));
    if(typeof state!=='undefined'){
      state.view='catalog';
      state.filter=match?match.cat:'All';
      state.search=match?'':text;
    }
    if(typeof render==='function') render();
    if(typeof toast==='function') toast(match?`Showing ${match.cat}`:`Searching for “${text}”`);
  }

  window.startVoiceSearch=function(){
    if(!SpeechRecognition){
      if(typeof toast==='function') toast('Voice search is not supported on this browser.');
      return;
    }
    const r=new SpeechRecognition();
    r.lang=lang();
    r.interimResults=false;
    r.maxAlternatives=1;
    const btn=document.getElementById('voiceSearchBtn');
    if(btn){btn.classList.add('listening');btn.innerHTML='● Listening…';}
    r.onresult=e=>applyVoiceQuery(e.results[0][0].transcript);
    r.onerror=()=>{ if(typeof toast==='function') toast('I could not hear that. Please try again.'); };
    r.onend=()=>{const b=document.getElementById('voiceSearchBtn');if(b){b.classList.remove('listening');b.innerHTML='🎤 Voice Search';}};
    r.start();
  };

  function mount(){
    if(typeof role!=='function' || role()!=='senior') return;
    if(document.getElementById('voiceSearchBtn')) return;
    const button=document.createElement('button');
    button.id='voiceSearchBtn';
    button.className='voice-search-fab';
    button.type='button';
    button.innerHTML='🎤 Voice Search';
    button.setAttribute('aria-label','Voice Search');
    button.onclick=window.startVoiceSearch;
    document.body.appendChild(button);
  }

  if(typeof render==='function'){
    const originalRender=render;
    render=function(){originalRender();setTimeout(mount,0);};
  }
  setTimeout(mount,0);
})();
