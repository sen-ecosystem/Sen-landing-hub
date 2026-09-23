/* ══════════════════════════════════════════════
   SEN TEW — AI.JS v1.3 (SÉCURISÉ + MULTI-MODÈLES)
   - Bascule automatique entre modèles Gemini si saturé
   - Historique de conversation conservé (localStorage)
   - Messages d'erreur élégants en français
   ══════════════════════════════════════════════ */
var ST_AI = {
  MODELS: ['gemini-2.5-flash','gemini-2-flash','gemini-2-flash-lite','gemini-2.5-flash-lite'],
  CTX: '',
  ready: false
};

/* La clé est lue depuis l'appareil, jamais depuis le code */
function stAiKey(){ return localStorage.getItem('st_gemini_key') || ''; }
function stAiSetKey(k){ localStorage.setItem('st_gemini_key', String(k||'').trim()); }
function stAiHasKey(){ var k = stAiKey(); return k.length > 20; }

/* ── HISTORIQUE CONVERSATION (persistant) ── */
function stChatLoad(){
  try{ return JSON.parse(localStorage.getItem('st_niofar_history')||'[]'); }
  catch(e){ return []; }
}
function stChatSave(list){
  try{
    if(list.length > 50) list = list.slice(list.length-50); /* garde les 50 derniers */
    localStorage.setItem('st_niofar_history', JSON.stringify(list));
  }catch(e){}
}
function stChatAdd(who, text){
  var h = stChatLoad();
  h.push({who:who, text:text, t:Date.now()});
  stChatSave(h);
}
function stChatClear(){ localStorage.removeItem('st_niofar_history'); }

/* Petite pause utilitaire pour le retry */
function stSleep(ms){ return new Promise(function(res){ setTimeout(res, ms); }); }

/* ── Réponses locales de secours (fonctionnent même si Google est en panne) ── */
function stLocalFallback(q){
  q = String(q||'').toLowerCase();
  if(/livraison|livrer|délai|delai/.test(q))
    return '🚚 Livraison : 24-48h à Dakar, 2-5 jours en régions. Livraison gratuite dès 20 000 FCFA ! Tu peux suivre ta commande en temps réel dans « Mes commandes ».';
  if(/paiement|payer|wave|orange|free money|carte/.test(q))
    return '💳 Paiements acceptés : Wave, Orange Money, Free Money, carte bancaire et paiement à la livraison. Tout est 100% sécurisé.';
  if(/retour|rembourse|remboursement|échanger|echanger/.test(q))
    return '🔄 Retour possible sous 7 jours si le produit a un défaut. Remboursement sous 48h après validation.';
  if(/promo|code|réduction|reduction|coupon/.test(q))
    return '🏷️ Regarde la bannière promos en haut de l’accueil et la page « Bons promo » — les codes actifs y sont affichés !';
  if(/vendeur|vendre|boutique/.test(q))
    return '🏪 Pour vendre sur SEN TEW : va dans « Devenir vendeur », crée ta boutique en 5 minutes, c’est gratuit !';
  return null;
}

/* ── Appel Gemini avec bascule multi-modèles ── */
async function stAskModel(model, prompt){
  var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+stAiKey(),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      contents:[{parts:[{text:(ST_AI.CTX?('CONTEXTE CATALOGUE SEN TEW :\n'+ST_AI.CTX+'\n\n'):'')+prompt}]}],
      generationConfig:{maxOutputTokens:1500,temperature:0.6}
    })
  });
  var j = await r.json();
  var t = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text;
  var errMsg = (j && j.error && j.error.message) || '';
  var saturated = r.status===503 || r.status===429 || /overload|high demand|unavailable|quota|rate/i.test(errMsg);
  return {text:t, saturated:saturated, error:errMsg};
}

async function stAsk(prompt){
  if(!stAiHasKey()){
    return '⚙️ Assistant en cours d’activation. Réessaie dans un instant.';
  }
  /* Réponse locale instantanée si la question est fréquente (économise le quota) */
  var local = stLocalFallback(prompt);
  if(local) return local;
  /* Essaie chaque modèle jusqu'à trouver un disponible */
  for(var i=0;i<ST_AI.MODELS.length;i++){
    try{
      var res = await stAskModel(ST_AI.MODELS[i], prompt);
      if(res.text) return res.text;
      if(res.saturated){ await stSleep(1200); continue; } /* modèle saturé → suivant */
      if(res.error){ continue; } /* autre erreur → suivant */
    }catch(e){ await stSleep(800); }
  }
  return '⏳ Nio Far est très demandé en ce moment. Réessaie dans une minute 🙏';
}

/* ── Charge le catalogue une fois (+ stats de prix par catégorie) ── */
async function stAiInit(){
  if(ST_AI.ready) return;
  try{
    var rows = (typeof supa==='function') ? await supa('products?is_active=eq.true&limit=80&select=name,price,category,description') : [];
    rows = rows || [];
    ST_AI.CTX = rows.map(function(p){
      return '- '+(p.name||'')+' | '+(p.price||0)+' FCFA | '+(p.category||'')+' | '+String(p.description||'').slice(0,80);
    }).join('\n');
    var byCat = {};
    rows.forEach(function(p){
      var cat = (p.category||'Autre').trim() || 'Autre';
      var price = Number(p.price)||0;
      if(price<=0) return;
      if(!byCat[cat]) byCat[cat] = [];
      byCat[cat].push(price);
    });
    var stats = [];
    Object.keys(byCat).forEach(function(cat){
      var arr = byCat[cat];
      var min = Math.min.apply(null, arr);
      var max = Math.max.apply(null, arr);
      var avg = Math.round(arr.reduce(function(a,b){return a+b;},0) / arr.length);
      stats.push(cat+' : '+min+'–'+max+' FCFA (moyenne '+avg+' FCFA, sur '+arr.length+' produit(s))');
    });
    ST_AI.PRICE_STATS = stats.join('\n');
    ST_AI.ready = true;
  }catch(e){ ST_AI.ready = true; }
}

/* ═══ 1. RECHERCHE INTELLIGENTE ═══ */
async function stAiSearch(userQuery){
  var raw = await stAsk(
    'Tu es le moteur de recherche de SEN TEW, marketplace sénégalaise. '+
    'Analyse cette recherche client et réponds UNIQUEMENT en JSON strict : '+
    '{"keywords":["mot1","mot2"],"category":"categorie ou vide","maxPrice":nombre_ou_null}. '+
    'Recherche : "'+userQuery+'"'
  );
  try{
    var m = raw.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : {keywords:[userQuery],category:'',maxPrice:null};
  }catch(e){ return {keywords:[userQuery],category:'',maxPrice:null}; }
}

/* ═══ 2. ASSISTANT SHOPPING « Nio Far » (avec mémoire) ═══ */
async function stAiChat(question){
  stChatAdd('client', question);
  var rep = await stAsk(
    'Tu es « Nio Far », l’assistant shopping de SEN TEW (marketplace sénégalaise). '+
    'Réponds en français, chaleureux et concis (max 80 mots), avec des prix en FCFA tirés du catalogue. '+
    'Ne vends que des produits du catalogue ci-dessus. Question client : '+question
  );
  stChatAdd('niofar', rep);
  return rep;
}

/* ═══ 3. SUPPORT CLIENT ═══ */
async function stAiSupport(probleme){
  return stAsk(
    'Tu es le support SEN TEW. Règles : livraison 24-48h (ville) / 2-5j (régions), '+
    'retour 7 jours si défaut, paiement Wave/Orange/Free/carte/à la livraison, remboursement sous 48h. '+
    'Réponds avec empathie, en français, max 60 mots, et propose une solution concrète. Problème : '+probleme
  );
}

/* ═══ 4. PHOTO IA VENDEUR ═══ */
async function stAiPhoto(file){
  if(!stAiHasKey()) return null;
  await stAiInit();
  var b64 = await new Promise(function(res){
    var fr = new FileReader();
    fr.onload = function(){ res(String(fr.result).split(',')[1]); };
    fr.readAsDataURL(file);
  });
  var priceCtx = ST_AI.PRICE_STATS
    ? ('\n\nFOURCHETTES DE PRIX RÉELLES SUR SEN TEW PAR CATÉGORIE (utilise-les pour un prix réaliste) :\n'+ST_AI.PRICE_STATS+'\n')
    : '';
  for(var i=0;i<ST_AI.MODELS.length;i++){
    try{
      var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODELS[i]+':generateContent?key='+stAiKey(),{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          contents:[{parts:[
            {text:'Tu es l’assistant vendeur de SEN TEW. Analyse cette photo et réponds UNIQUEMENT en JSON strict : {"name":"nom commercial court","category":"une de : Mode, Électronique, Beauté, Maison, Alimentation, Artisanat, Autre","description":"description vendeuse de 2 phrases en français","price":prix_en_FCFA_nombre}.'+priceCtx},
            {inline_data:{mime_type:file.type||'image/jpeg',data:b64}}
          ]}],
          generationConfig:{maxOutputTokens:1200,temperature:0.4}
        })
      });
      var j = await r.json();
      var t = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text;
      if(t){ var m = t.match(/\{[\s\S]*\}/); return m ? JSON.parse(m[0]) : null; }
    }catch(e){}
  }
  return null;
}

/* ═══ 5. TRADUCTION (MyMemory gratuit, sans clé) ═══ */
async function stTranslate(text, targetLang){
  targetLang = targetLang || 'fr';
  try{
    var r = await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=autodetect|'+targetLang);
    var j = await r.json();
    var t = j && j.responseData && j.responseData.translatedText;
    return (t && t.toUpperCase().indexOf('MYMEMORY')<0) ? t : text;
  }catch(e){ return text; }
}

stAiInit();
