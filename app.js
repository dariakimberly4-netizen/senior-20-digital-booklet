const K={
  role:'s20_role',products:'s20_products',profile:'s20_profile',saved:'s20_saved',
  tx:'s20_transactions',settings:'s20_settings',store:'s20_store',lang:'s20_lang',sync:'s20_sync'
};
const cats=['Medicine','Food & Restaurant','Grocery & Basic Necessities','Medical / Health Services','Transport','Hotels & Recreation'];
const icons={'Medicine':'💊','Food & Restaurant':'🍽️','Grocery & Basic Necessities':'🛒','Medical / Health Services':'🩺','Transport':'🚌','Hotels & Recreation':'🏨'};
const seed=[
{id:'p1',name:'Generic Medicine',category:'Medicine',description:'Sample medicine listing for the digital booklet.',price:120,eligible:true,active:true,seller:'Participating Pharmacy',branch:'Bacoor'},
{id:'p2',name:'Senior Meal',category:'Food & Restaurant',description:'Sample eligible meal from a participating seller.',price:250,eligible:true,active:true,seller:'Participating Restaurant',branch:'Bacoor'},
{id:'p3',name:'Basic Grocery Pack',category:'Grocery & Basic Necessities',description:'Sample grocery and basic necessities listing.',price:500,eligible:true,active:true,seller:'Participating Grocery',branch:'Bacoor'},
{id:'p4',name:'Basic Consultation',category:'Medical / Health Services',description:'Sample health service listing.',price:600,eligible:true,active:true,seller:'Participating Clinic',branch:'Bacoor'},
{id:'p5',name:'Local Fare',category:'Transport',description:'Sample transport discount listing.',price:80,eligible:true,active:true,seller:'Participating Transport',branch:'Bacoor'},
{id:'p6',name:'Day Recreation Pass',category:'Hotels & Recreation',description:'Sample recreation listing.',price:750,eligible:true,active:true,seller:'Participating Venue',branch:'Bacoor'}
];
const T={
en:{
seniorPortal:'Senior Digital Booklet',sellerPortal:'Seller Portal',tagline:'Bacoor blue • gold • ivory',
hello:'Hello',ready:'Your 20% digital booklet is ready. Use the large buttons below—no complicated menus.',
seniorId:'Senior Citizen ID',showId:'Show ID',myId:'My Senior ID',myIdSub:'Show your digital ID and QR',
find:'Find 20% Discounts',findSub:'Browse products and services',calc:'Discount Calculator',calcSub:'See regular, discount and senior price',
purchases:'My Purchases',purchasesSub:'Review digital receipts',saved:'Saved Items',help:'Help',helpSub:'Simple step-by-step instructions',
savings:'Recorded savings',listings:'Active listings',choose:'CHOOSE YOUR PORTAL',seniorCitizen:'Senior Citizen',seller:'Seller',
read:'Read',contrast:'Contrast',language:'Tagalog',receipt:'Digital Receipt',viewReceipt:'View Receipt',downloadReceipt:'Print / Save Receipt',
qrTitle:'QR Senior ID',qrHelp:'Let a participating seller scan this QR to verify the Senior ID shown below.',
syncTitle:'Cloud Sync',syncReady:'Ready for cloud sync',syncNeeds:'Cloud database not connected yet',syncExplain:'Your QR, receipts, saved items and profile are ready for a shared database. Until connected, this device stores the records locally.',
back:'Back',regular:'Regular price',discount:'20% discount',seniorPrice:'Estimated Senior price',save:'Save',savedWord:'Saved',
eligible:'Seller marked 20% eligible',askSeller:'Check eligibility with seller',noTx:'No transactions yet.',search:'Search item, service or seller',
historyLead:'Each recorded purchase has a digital receipt with date, seller, receipt number and discount breakdown.'
},
tl:{
seniorPortal:'Digital Booklet ng Senior',sellerPortal:'Portal ng Seller',tagline:'Bacoor blue • gold • ivory',
hello:'Magandang araw',ready:'Handa na ang iyong 20% digital booklet. Gamitin ang malalaking button sa ibaba.',
seniorId:'Senior Citizen ID',showId:'Ipakita ang ID',myId:'Aking Senior ID',myIdSub:'Ipakita ang digital ID at QR',
find:'Maghanap ng 20% Discount',findSub:'Tingnan ang produkto at serbisyo',calc:'Kuwentahin ang Discount',calcSub:'Regular, discount at senior price',
purchases:'Mga Binili Ko',purchasesSub:'Tingnan ang digital receipts',saved:'Mga Naka-save',help:'Tulong',helpSub:'Madaling sunod-sunod na gabay',
savings:'Naitalang natipid',listings:'Aktibong listings',choose:'PILIIN ANG PORTAL',seniorCitizen:'Senior Citizen',seller:'Seller',
read:'Basahin',contrast:'Contrast',language:'English',receipt:'Digital Resibo',viewReceipt:'Tingnan ang Resibo',downloadReceipt:'I-print / I-save ang Resibo',
qrTitle:'QR Senior ID',qrHelp:'Ipa-scan ito sa kalahok na seller para ma-verify ang Senior ID na nakalagay sa ibaba.',
syncTitle:'Cloud Sync',syncReady:'Handa para sa cloud sync',syncNeeds:'Wala pang nakakonektang cloud database',syncExplain:'Handa na ang QR, resibo, saved items at profile para sa shared database. Sa ngayon, sa device na ito muna naka-save ang records.',
back:'Bumalik',regular:'Regular na presyo',discount:'20% discount',seniorPrice:'Tinatayang Senior price',save:'I-save',savedWord:'Naka-save',
eligible:'Minarkahang 20% eligible ng seller',askSeller:'I-check sa seller ang eligibility',noTx:'Wala pang transaksyon.',search:'Maghanap ng item, serbisyo o seller',
historyLead:'Bawat naitalang purchase ay may digital resibo na may petsa, seller, receipt number at discount breakdown.'
}};
let state={view:'home',filter:'All',search:'',receiptId:null};
const $=s=>document.querySelector(s);
const app=()=>$('#app');
const get=(k,f)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}};
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const money=n=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
const escapeHtml=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
const lang=()=>localStorage.getItem(K.lang)||'en';
const tr=k=>T[lang()][k]||T.en[k]||k;
const role=()=>localStorage.getItem(K.role)||'';
function toast(msg){const x=document.createElement('div');x.className='toast';x.textContent=msg;document.body.appendChild(x);setTimeout(()=>x.remove(),2400)}
function settings(){return get(K.settings,{font:'normal',contrast:false})}
function init(){
  if(!localStorage.getItem(K.products))set(K.products,seed);
  if(!localStorage.getItem(K.profile))set(K.profile,{name:'Senior Citizen',id:'BAC-SC-000001',email:'',phone:'',photo:''});
  if(!localStorage.getItem(K.saved))set(K.saved,[]);
  if(!localStorage.getItem(K.tx))set(K.tx,[]);
  if(!localStorage.getItem(K.settings))set(K.settings,{font:'normal',contrast:false});
  if(!localStorage.getItem(K.store))set(K.store,{name:'Participating Seller',branch:'Bacoor',contact:''});
  if(!localStorage.getItem(K.lang))localStorage.setItem(K.lang,'en');
  render();
}
function chooseRole(r){localStorage.setItem(K.role,r);state={view:'home',filter:'All',search:'',receiptId:null};render()}
function changeLang(){localStorage.setItem(K.lang,lang()==='en'?'tl':'en');render()}
function setFont(f){const s=settings();s.font=f;set(K.settings,s);render()}
function toggleContrast(){const s=settings();s.contrast=!s.contrast;set(K.settings,s);render()}
function readPage(){if(!('speechSynthesis'in window))return toast('Read aloud not supported.');speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance((document.querySelector('main')?.innerText||'').slice(0,5000)))}
function shellClass(){const s=settings();return 'shell '+(s.font==='large'?'large ':s.font==='xlarge'?'xlarge ':'')+(s.contrast?'contrast':'')}
function topbar(kind){return `<header class="topbar"><div class="brand"><div class="sealmark">20%</div><div class="brandtext"><strong>${kind==='senior'?tr('seniorPortal'):tr('sellerPortal')}</strong><span>${tr('tagline')}</span></div></div><button class="iconbtn" onclick="changeLang()">${tr('language')}</button></header>`}
function accessBar(){const s=settings();return `<div class="accessbar"><button class="${s.font==='normal'?'active':''}" onclick="setFont('normal')">A</button><button class="${s.font==='large'?'active':''}" onclick="setFont('large')">A+</button><button class="${s.font==='xlarge'?'active':''}" onclick="setFont('xlarge')">A++</button><button class="${s.contrast?'active':''}" onclick="toggleContrast()">◐ ${tr('contrast')}</button><button onclick="readPage()">🔊 ${tr('read')}</button></div>`}
function landing(){app().innerHTML=`<main class="landing"><section class="landinghero"><div class="wrap"><div class="brandbadge"><div class="sealmark">20%</div><span>${tr('seniorPortal')}</span></div><h1>${lang()==='en'?'Your senior discount booklet, made easier to read and use.':'Mas madaling basahin at gamitin na senior discount booklet.'}</h1><p>${lang()==='en'?'QR Senior ID, bilingual controls, digital receipts, accessibility tools and separate Senior/Seller portals.':'May QR Senior ID, English/Tagalog, digital resibo, accessibility tools at hiwalay na Senior/Seller portal.'}</p></div></section><section class="rolewrap"><p class="eyebrow">${tr('choose')}</p><div class="rolegrid"><article class="rolecard"><div class="roleicon">👤</div><h2>${tr('seniorCitizen')}</h2><p>${tr('myIdSub')}, ${tr('findSub').toLowerCase()}, ${tr('purchasesSub').toLowerCase()}.</p><button class="btn primary" onclick="chooseRole('senior')">${tr('seniorPortal')}</button></article><article class="rolecard"><div class="roleicon">🏪</div><h2>${tr('seller')}</h2><p>Add listings, verify a Senior ID and record transactions.</p><button class="btn secondary" onclick="chooseRole('seller')">${tr('sellerPortal')}</button></article></div></section></main>`}
function render(){if(!role())return landing();role()==='senior'?renderSenior():renderSeller()}
function nav(v){state.view=v;state.receiptId=null;state.search='';if(v!=='catalog'&&v!=='saved')state.filter='All';render();window.scrollTo({top:0,behavior:'smooth'})}
function seniorNav(){return `<nav class="bottomnav"><button class="${state.view==='home'?'active':''}" onclick="nav('home')">🏠<br>Home</button><button class="${state.view==='catalog'?'active':''}" onclick="nav('catalog')">📖<br>Booklet</button><button class="${state.view==='purchases'?'active':''}" onclick="nav('purchases')">🧾<br>${lang()==='en'?'Receipts':'Resibo'}</button><button class="${state.view==='profile'?'active':''}" onclick="nav('profile')">🪪<br>ID</button></nav>`}
function renderSenior(){app().innerHTML=`<div class="${shellClass()}">${topbar('senior')}${accessBar()}<main class="container">${seniorView()}</main>${seniorNav()}</div>`;setTimeout(renderQr,50)}
function seniorView(){if(state.view==='receipt')return receiptView();switch(state.view){case'catalog':return catalogView(false);case'saved':return catalogView(true);case'calculator':return calculatorView();case'purchases':return purchasesView();case'profile':return profileView();case'help':return helpView();case'sync':return syncView();default:return seniorHome()}}
function seniorHome(){
  const p=get(K.profile,{}),tx=get(K.tx,[]),saved=get(K.saved,[]),total=tx.reduce((a,t)=>a+Number(t.discount||0),0);
  return `<section class="hero"><p class="eyebrow">${lang()==='en'?'SENIOR CITIZEN PORTAL':'PORTAL NG SENIOR CITIZEN'}</p><h1>${tr('hello')}, ${escapeHtml(p.name||'Senior Citizen')}.</h1><p>${tr('ready')}</p><div class="idstrip"><div class="roundicon">QR</div><div class="grow"><small>${tr('seniorId')}</small><strong>${escapeHtml(p.id||'Not set')}</strong></div><button class="btn outline" onclick="nav('profile')">${tr('showId')}</button></div></section>
  <section class="menu">
  <button class="menucard" onclick="nav('profile')"><span class="mi">🪪</span><span><strong>${tr('myId')}</strong><small>${tr('myIdSub')}</small></span></button>
  <button class="menucard" onclick="nav('catalog')"><span class="mi">🔎</span><span><strong>${tr('find')}</strong><small>${tr('findSub')}</small></span></button>
  <button class="menucard" onclick="nav('calculator')"><span class="mi">%</span><span><strong>${tr('calc')}</strong><small>${tr('calcSub')}</small></span></button>
  <button class="menucard" onclick="nav('purchases')"><span class="mi">🧾</span><span><strong>${tr('purchases')}</strong><small>${tr('purchasesSub')}</small></span></button>
  <button class="menucard" onclick="nav('saved')"><span class="mi">🔖</span><span><strong>${tr('saved')}</strong><small>${saved.length} ${lang()==='en'?'saved':'naka-save'}</small></span></button>
  <button class="menucard" onclick="nav('sync')"><span class="mi">☁️</span><span><strong>${tr('syncTitle')}</strong><small>${tr('syncNeeds')}</small></span></button>
  <button class="menucard" onclick="nav('help')"><span class="mi">?</span><span><strong>${tr('help')}</strong><small>${tr('helpSub')}</small></span></button>
  </section><section class="summary"><div><strong>${money(total)}</strong><span>${tr('savings')}</span></div><div><strong>${get(K.products,[]).filter(x=>x.active).length}</strong><span>${tr('listings')}</span></div></section>`;
}
function catalogView(savedOnly){
  const products=get(K.products,[]).filter(x=>x.active),saved=get(K.saved,[]),q=state.search.toLowerCase();
  const items=products.filter(x=>(state.filter==='All'||x.category===state.filter)&&(!q||`${x.name} ${x.seller} ${x.category} ${x.description}`.toLowerCase().includes(q))&&(!savedOnly||saved.includes(x.id)));
  return `<section class="page"><p class="eyebrow">${savedOnly?tr('saved').toUpperCase():'20% DIGITAL BOOKLET'}</p><h1>${savedOnly?tr('saved'):tr('find')}</h1><input id="catalogSearch" class="search" placeholder="${tr('search')}" value="${escapeHtml(state.search)}" oninput="setSearch(this.value)"><div class="chips"><button class="chip ${state.filter==='All'?'active':''}" onclick="setFilter('All')">All</button>${cats.map(c=>`<button class="chip ${state.filter===c?'active':''}" onclick="setFilter('${c.replace(/'/g,"\\'")}')">${icons[c]} ${c}</button>`).join('')}</div><div class="grid">${items.length?items.map(productCard).join(''):`<div class="empty">${lang()==='en'?'Nothing here yet.':'Wala pang laman dito.'}</div>`}</div></section>`;
}
function setFilter(c){state.filter=c;render()}
function setSearch(v){state.search=v;render();setTimeout(()=>{$('#catalogSearch')?.focus()},0)}
function productCard(x){
  const d=Number(x.price)*.2,final=Number(x.price)-d,saved=get(K.saved,[]).includes(x.id);
  return `<article class="card"><span class="tag">${escapeHtml(x.category)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.description||'')}</p><div class="sellerline">🏪 <strong>${escapeHtml(x.seller)}</strong>${x.branch?' • '+escapeHtml(x.branch):''}</div><div class="pricebox"><span>${tr('regular')}</span><strong>${money(x.price)}</strong><span>${tr('discount')}</span><strong>-${money(d)}</strong><span>${tr('seniorPrice')}</span><strong class="final">${money(final)}</strong></div><div class="eligible">✓ ${x.eligible?tr('eligible'):tr('askSeller')}</div><div class="actions"><button class="btn outline" onclick="toggleSave('${x.id}')">${saved?'★ '+tr('savedWord'):'☆ '+tr('save')}</button><button class="btn primary" onclick="speakProduct('${x.id}')">🔊 ${tr('read')}</button></div></article>`;
}
function toggleSave(id){let s=get(K.saved,[]);s=s.includes(id)?s.filter(x=>x!==id):[...s,id];set(K.saved,s);render()}
function speakProduct(id){const x=get(K.products,[]).find(p=>p.id===id);if(!x||!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(`${x.name}. ${tr('regular')} ${money(x.price)}. ${tr('discount')} ${money(x.price*.2)}. ${tr('seniorPrice')} ${money(x.price*.8)}.`);speechSynthesis.cancel();speechSynthesis.speak(u)}
function calculatorView(){return `<section class="page"><p class="eyebrow">20% DISCOUNT</p><h1>${tr('calc')}</h1><div class="formcard"><label>${tr('regular')}</label><input id="calc" class="field" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0.00" oninput="calcNow()"><div id="calcResult" class="calcresult"><span>${tr('discount')}</span><strong>₱0.00</strong><span>${tr('seniorPrice')}</span><strong>₱0.00</strong></div><button class="btn primary full" onclick="readCalc()">🔊 ${tr('read')}</button><div class="notice">${lang()==='en'?'Simple 20% estimate only. Final lawful pricing may depend on VAT exemption, eligibility, limits and documents.':'Tinatayang 20% lamang ito. Maaaring mag-iba ang final lawful price depende sa VAT exemption, eligibility, limit at dokumento.'}</div></div></section>`}
function calcNow(){const n=Number($('#calc')?.value||0);$('#calcResult').innerHTML=`<span>${tr('discount')}</span><strong>${money(n*.2)}</strong><span>${tr('seniorPrice')}</span><strong>${money(n*.8)}</strong>`}
function readCalc(){const n=Number($('#calc')?.value||0);if('speechSynthesis'in window)speechSynthesis.speak(new SpeechSynthesisUtterance(`${tr('regular')} ${money(n)}. ${tr('discount')} ${money(n*.2)}. ${tr('seniorPrice')} ${money(n*.8)}.`))}
function purchasesView(){
  const tx=get(K.tx,[]);
  return `<section class="page"><p class="eyebrow">${tr('receipt').toUpperCase()}</p><h1>${tr('purchases')}</h1><p class="lead">${tr('historyLead')}</p><div class="history">${tx.length?tx.slice().reverse().map(t=>`<article class="tx"><div class="txhead"><span class="tag">${escapeHtml(t.category||'Purchase')}</span><strong>${money(t.final)}</strong></div><h3>${escapeHtml(t.product||'Purchase')}</h3><p>${escapeHtml(t.seller||'Seller')} • ${formatDate(t.date)} • ${escapeHtml(t.receipt||'No receipt')}</p><div class="pricebox"><span>${tr('regular')}</span><strong>${money(t.original)}</strong><span>${tr('discount')}</span><strong>-${money(t.discount)}</strong></div><button class="btn primary full" onclick="openReceipt('${t.id}')">🧾 ${tr('viewReceipt')}</button></article>`).join(''):`<div class="empty">${tr('noTx')}</div>`}</div></section>`;
}
function openReceipt(id){state.receiptId=id;state.view='receipt';render();window.scrollTo({top:0})}
function formatDate(v){try{return new Date(v||Date.now()).toLocaleString(lang()==='tl'?'fil-PH':'en-PH',{dateStyle:'medium',timeStyle:'short'})}catch{return v||''}}
function receiptView(){
 const t=get(K.tx,[]).find(x=>x.id===state.receiptId);if(!t)return purchasesView();
 return `<section class="page"><button class="btn ghost" onclick="nav('purchases')">← ${tr('back')}</button><div class="receipt"><div class="receiptbrand"><div class="sealmark">20%</div><div><small>${tr('receipt')}</small><h1>${escapeHtml(t.seller||'Seller')}</h1></div></div><div class="receiptmeta"><span>${lang()==='en'?'Receipt no.':'Resibo no.'}</span><strong>${escapeHtml(t.receipt||'—')}</strong><span>${lang()==='en'?'Date':'Petsa'}</span><strong>${formatDate(t.date)}</strong><span>${tr('seniorId')}</span><strong>${escapeHtml(t.seniorId||get(K.profile,{}).id||'—')}</strong></div><div class="receiptitem"><strong>${escapeHtml(t.product||'Purchase')}</strong><small>${escapeHtml(t.category||'')}</small></div><div class="receiptcalc"><span>${tr('regular')}</span><strong>${money(t.original)}</strong><span>${tr('discount')}</span><strong>-${money(t.discount)}</strong><span>${tr('seniorPrice')}</span><strong class="grand">${money(t.final)}</strong></div><p class="receiptfoot">${lang()==='en'?'Digital record generated by the 20% Senior Digital Booklet.':'Digital record mula sa 20% Senior Digital Booklet.'}</p><button class="btn primary full noprint" onclick="window.print()">🖨️ ${tr('downloadReceipt')}</button></div></section>`;
}
function profileView(){
 const p=get(K.profile,{});
 return `<section class="page"><p class="eyebrow">${tr('qrTitle')}</p><h1>${tr('myId')}</h1><p class="lead">${tr('qrHelp')}</p><div class="idcard"><div class="idhead"><div class="sealmark">20%</div><div><small>${tr('seniorId')}</small><strong>${escapeHtml(p.id||'Not set')}</strong></div></div><div class="idbody"><div class="ididentity"><div class="avatar">${p.photo?`<img src="${escapeHtml(p.photo)}" alt="">`:'👤'}</div><div><div class="name">${escapeHtml(p.name||'Senior Citizen')}</div><small>${escapeHtml(p.phone||'')}</small></div></div><div class="qrwrap"><canvas id="seniorQr"></canvas><small>${escapeHtml(p.id||'')}</small></div></div></div><div class="formcard"><label>${lang()==='en'?'Full name':'Buong pangalan'}</label><input id="pname" class="field" value="${escapeHtml(p.name||'')}"><label>${tr('seniorId')}</label><input id="pid" class="field" value="${escapeHtml(p.id||'')}"><label>${lang()==='en'?'Mobile number':'Cellphone number'}</label><input id="pphone" class="field" value="${escapeHtml(p.phone||'')}"><button class="btn primary full" onclick="saveProfile()">${lang()==='en'?'Save Profile':'I-save ang Profile'}</button></div></section>`;
}
function qrPayload(){const p=get(K.profile,{});return JSON.stringify({type:'SENIOR_ID',id:p.id||'',name:p.name||'',issuer:'20% Senior Digital Booklet'})}
function renderQr(){const canvas=$('#seniorQr');if(!canvas)return;if(window.QRCode?.toCanvas){QRCode.toCanvas(canvas,qrPayload(),{width:190,margin:1,color:{dark:'#0b2e5d',light:'#ffffff'}},e=>{if(e)console.error(e)})}else{canvas.replaceWith(Object.assign(document.createElement('div'),{className:'qrFallback',textContent:get(K.profile,{}).id||'Senior ID'}))}}
function saveProfile(){const p=get(K.profile,{});p.name=$('#pname')?.value.trim()||'Senior Citizen';p.id=$('#pid')?.value.trim()||'Not set';p.phone=$('#pphone')?.value.trim()||'';set(K.profile,p);render();toast(lang()==='en'?'Profile saved.':'Nai-save ang profile.')}
function syncView(){return `<section class="page"><p class="eyebrow">${tr('syncTitle').toUpperCase()}</p><h1>${tr('syncTitle')}</h1><div class="syncCard"><div class="syncIcon">☁️</div><h2>${tr('syncReady')}</h2><p>${tr('syncExplain')}</p><div class="syncStatus"><span>QR Senior ID</span><strong>✓</strong><span>${tr('receipt')}</span><strong>✓</strong><span>${tr('saved')}</span><strong>✓</strong><span>${lang()==='en'?'Cross-device database':'Cross-device database'}</span><strong class="pending">○</strong></div></div></section>`}
function helpView(){const steps=lang()==='en'?[
['Show your QR Senior ID','Open My Senior ID and let the seller scan the QR.'],
['Find an item','Open Find 20% Discounts and search by item, category or seller.'],
['Check the price','Review the regular price, 20% discount and estimated Senior price.'],
['Keep the receipt','Open My Purchases to view or print your digital receipt.']
]:[
['Ipakita ang QR Senior ID','Buksan ang Aking Senior ID at ipa-scan ang QR sa seller.'],
['Maghanap ng item','Buksan ang Maghanap ng 20% Discount at mag-search.'],
['Tingnan ang presyo','Makikita ang regular price, 20% discount at tinatayang Senior price.'],
['Itago ang resibo','Buksan ang Mga Binili Ko para tingnan o i-print ang digital resibo.']
];return `<section class="page"><p class="eyebrow">${tr('help').toUpperCase()}</p><h1>${tr('help')}</h1>${steps.map((x,i)=>`<div class="helpstep"><div class="num">${i+1}</div><div><strong>${x[0]}</strong><p>${x[1]}</p></div></div>`).join('')}</section>`}
function renderSeller(){app().innerHTML=`<div class="${shellClass()}">${topbar('seller')}<main class="container">${sellerView()}</main></div>`}
function sellerView(){
 const products=get(K.products,[]),tx=get(K.tx,[]),store=get(K.store,{});
 const gross=tx.reduce((a,t)=>a+Number(t.original||0),0),disc=tx.reduce((a,t)=>a+Number(t.discount||0),0);
 return `<section class="sellerhero"><p class="eyebrow">SELLER PORTAL</p><h1>${escapeHtml(store.name||'Participating Seller')}</h1><p>${escapeHtml(store.branch||'Bacoor')}</p><div class="sellerstats"><div><strong>${products.filter(x=>x.active).length}</strong><span>Active listings</span></div><div><strong>${tx.length}</strong><span>Transactions</span></div><div><strong>${money(gross)}</strong><span>Gross</span></div><div><strong>${money(disc)}</strong><span>Discounts</span></div></div></section>
 <section class="menu"><button class="menucard" onclick="sellerForm()"><span class="mi">＋</span><span><strong>Add Product</strong><small>Create a listing</small></span></button><button class="menucard" onclick="recordForm()"><span class="mi">🧾</span><span><strong>Record Purchase</strong><small>Create digital receipt</small></span></button><button class="menucard" onclick="verifyForm()"><span class="mi">QR</span><span><strong>Verify Senior ID</strong><small>Enter or scan ID value</small></span></button></section>
 <div id="sellerPanel"></div><section class="page"><h1>Catalog</h1><div>${products.map(x=>`<div class="productrow"><div><span class="tag">${escapeHtml(x.category)}</span><h3>${escapeHtml(x.name)}</h3><small>${escapeHtml(x.seller)}</small></div><div class="right"><strong>${money(x.price)}</strong><br><span class="status ${x.active?'live':'off'}">${x.active?'ACTIVE':'OFF'}</span></div></div>`).join('')}</div></section>`;
}
function sellerForm(){$('#sellerPanel').innerHTML=`<div class="formcard"><h2>Add Product / Service</h2><label>Name</label><input id="sname" class="field"><label>Category</label><select id="scat" class="field">${cats.map(c=>`<option>${c}</option>`).join('')}</select><label>Price</label><input id="sprice" class="field" type="number" min="0" step=".01"><label>Description</label><textarea id="sdesc" class="field"></textarea><button class="btn primary full" onclick="saveProduct()">Save Listing</button></div>`}
function saveProduct(){const name=$('#sname')?.value.trim(),price=Number($('#sprice')?.value||0);if(!name||price<=0)return toast('Enter a valid name and price.');const store=get(K.store,{}),products=get(K.products,[]);products.push({id:'p'+Date.now(),name,category:$('#scat').value,description:$('#sdesc').value.trim(),price,eligible:true,active:true,seller:store.name||'Participating Seller',branch:store.branch||'Bacoor'});set(K.products,products);render();toast('Listing saved.')}
function recordForm(){const products=get(K.products,[]).filter(x=>x.active);$('#sellerPanel').innerHTML=`<div class="formcard"><h2>Record Senior Purchase</h2><label>Senior ID</label><input id="rid" class="field" value="${escapeHtml(get(K.profile,{}).id||'')}"><label>Product / Service</label><select id="rproduct" class="field">${products.map(x=>`<option value="${x.id}">${escapeHtml(x.name)} — ${money(x.price)}</option>`).join('')}</select><label>Receipt number</label><input id="rreceipt" class="field" value="R-${Date.now().toString().slice(-8)}"><button class="btn primary full" onclick="saveTransaction()">Save Transaction & Receipt</button></div>`}
function saveTransaction(){const x=get(K.products,[]).find(p=>p.id===$('#rproduct')?.value);if(!x)return;const tx=get(K.tx,[]),original=Number(x.price),discount=original*.2;tx.push({id:'tx'+Date.now(),productId:x.id,product:x.name,category:x.category,seller:x.seller,seniorId:$('#rid')?.value.trim()||'',receipt:$('#rreceipt')?.value.trim()||('R-'+Date.now()),original,discount,final:original-discount,date:new Date().toISOString()});set(K.tx,tx);render();toast('Transaction and digital receipt saved.')}
function verifyForm(){$('#sellerPanel').innerHTML=`<div class="formcard"><h2>Verify Senior ID</h2><label>Senior ID</label><input id="vid" class="field" placeholder="BAC-SC-000001"><button class="btn primary full" onclick="verifySenior()">Verify</button><div id="verifyResult"></div></div>`}
function verifySenior(){const id=$('#vid')?.value.trim(),p=get(K.profile,{}),ok=id&&id===p.id;$('#verifyResult').innerHTML=`<div class="notice">${ok?'✓ Verified: '+escapeHtml(p.name||'Senior Citizen'):'ID not found on this device.'}</div>`}
init();