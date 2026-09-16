/* ══════════════════════════════════════════════════════════
   SEN TEW — DEVISES PANAFRICAINES + DÉTECTION PAYS
   1. Détecte le pays (indicatif tél > profil > choix manuel)
   2. Convertit les prix XOF → devise locale
   3. Mémorisé sur l'appareil
   ══════════════════════════════════════════════════════════ */
var ST_FX={
  rates:{XOF:{rate:1,symbol:'F',name:'Franc CFA'}},   /* chargé depuis Supabase */
  ready:false
};

/* Indicatifs téléphoniques → pays + devise */
var ST_PHONE_MAP={
 '221':{country:'Sénégal',cur:'XOF',flag:'🇸🇳'},
 '223':{country:'Mali',cur:'XOF',flag:'🇲🇱'},
 '226':{country:'Burkina Faso',cur:'XOF',flag:'🇧🇫'},
 '225':{country:'Côte d\u2019Ivoire',cur:'XOF',flag:'🇨🇮'},
 '228':{country:'Togo',cur:'XOF',flag:'🇹🇬'},
 '229':{country:'Bénin',cur:'XOF',flag:'🇧🇯'},
 '227':{country:'Niger',cur:'XOF',flag:'🇳🇪'},
 '245':{country:'Guinée-Bissau',cur:'XOF',flag:'🇬🇼'},
 '220':{country:'Gambie',cur:'GMD',flag:'🇬🇲'},
 '238':{country:'Cap-Vert',cur:'CVE',flag:'🇨🇻'},
 '222':{country:'Mauritanie',cur:'MRU',flag:'🇲🇷'},
 '224':{country:'Guinée',cur:'GNF',flag:'🇬🇳'},
 '233':{country:'Ghana',cur:'GHS',flag:'🇬🇭'},
 '234':{country:'Nigeria',cur:'NGN',flag:'🇳🇬'},
 '212':{country:'Maroc',cur:'MAD',flag:'🇲🇦'},
 '213':{country:'Algérie',cur:'DZD',flag:'🇩🇿'},
 '216':{country:'Tunisie',cur:'TND',flag:'🇹🇳'},
 '254':{country:'Kenya',cur:'KES',flag:'🇰🇪'},
 '27':{country:'Afrique du Sud',cur:'ZAR',flag:'🇿🇦'},
 '33':{country:'France',cur:'EUR',flag:'🇫🇷'},
 '1':{country:'USA/Canada',cur:'USD',flag:'🇺🇸'}
};

/* Charge les taux depuis Supabase (1 fois, puis cache local 24h) */
async function stFxInit(){
  try{
    var cached=null;
    try{cached=JSON.parse(localStorage.getItem('st_fx_cache')||'null');}catch(e){}
    if(cached&&cached.ts&&Date.now()-cached.ts<86400000){ST_FX.rates=cached.rates;ST_FX.ready=true;return;}
    var r=await fetch('https://tjqkruhwmjzgfvtouqza.supabase.co/rest/v1/exchange_rates?is_active=eq.true&select=*',{headers:{apikey:'sb_publishable_XCdjFFvg7Wys68uFf4Bs5A_5XHpDz9j'}});
    var rows=await r.json();
    if(Array.isArray(rows)&&rows.length){
      rows.forEach(function(x){ST_FX.rates[x.code]={rate:x.rate,symbol:x.symbol,name:x.name,flag:x.flag};});
      localStorage.setItem('st_fx_cache',JSON.stringify({ts:Date.now(),rates:ST_FX.rates}));
    }
    ST_FX.ready=true;
  }catch(e){ST_FX.ready=true;}
}

/* Devise active : choix manuel > profil > indicatif tél > défaut XOF */
function stCurrency(){
  var manual=localStorage.getItem('st_currency');
  if(manual&&ST_FX.rates[manual])return manual;
  try{
    var u=JSON.parse(sessionStorage.getItem('sentew_user')||localStorage.getItem('sentew_user')||'{}');
    var tel=String(u.phone||u.phone_number||'').replace(/[^0-9]/g,'');
    for(var len=3;len>=1;len--){
      var p=tel.substring(0,len);
      if(ST_PHONE_MAP[p])return ST_PHONE_MAP[p].cur;
    }
  }catch(e){}
  return 'XOF';
}

/* Convertit un prix XOF → texte formaté dans la devise active */
function stPrice(xof){
  var cur=stCurrency();
  var info=ST_FX.rates[cur]||{rate:1,symbol:'F'};
  var val=xof*info.rate;
  var txt;
  if(cur==='EUR'||cur==='USD')txt=val.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2});
  else txt=Math.round(val).toLocaleString('fr-FR');
  return txt+' '+info.symbol;
}

/* Change la devise manuellement (à appeler depuis parametres.html) */
function stSetCurrency(code){localStorage.setItem('st_currency',code);location.reload();}

/* Liste pour un <select> de devises */
function stCurrencyOptions(){
  var cur=stCurrency();
  return Object.keys(ST_FX.rates).map(function(c){
    var r=ST_FX.rates[c];
    return '<option value="'+c+'"'+(c===cur?' selected':'')+'>'+(r.flag||'')+' '+c+' — '+r.name+'</option>';
  }).join('');
}

stFxInit();
