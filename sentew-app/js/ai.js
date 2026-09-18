/* ══════════════════════════════════════════════
   SEN TEW — AI.JS v1.2 (SÉCURISÉ)
   La clé Gemini N'EST PAS dans ce fichier.
   Elle est stockée sur l'appareil (localStorage),
   saisie une seule fois par l'admin.
   ══════════════════════════════════════════════ */
var ST_AI = {
  MODEL: 'gemini-3.6-flash',
  CTX: '',
  ready: false
};

function stAiKey(){
  return localStorage.getItem('st_gemini_key') || '';
}
function stAiSetKey(k){
  localStorage.setItem('st_gemini_key', String(k||'').trim());
}
function stAiHasKey(){
  var k = stAiKey();
  return k.length > 20;
}

function stSleep(ms){ return new Promise(function(res){ setTimeout(res, ms); }); }

async function stAsk(prompt, _attempt){
  _attempt = _attempt || 1;
  if(!stAiHasKey()) return "⚠️ Clé IA non configurée. Va sur config-ia.html.";
  try{
    var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODEL+':generateContent?key='+stAiKey(),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{parts:[{text:prompt}]}],
        generationConfig:{maxOutputTokens:1500,temperature:0.6,thinkingConfig:{thinkingLevel:'LOW'}}
      })
    });
    var j = await r.json();
    if(j && j.error){
      var msg = String(j.error.message||'');
      if(/overload|unavailable|503/i.test(msg) && _attempt < 3){
        await stSleep(1200*_attempt);
        return stAsk(prompt, _attempt+1);
      }
      return '❌ Erreur Google : '+msg;
    }
    var cand = j && j.candidates && j.candidates[0];
    if(cand && cand.finishReason === 'MAX_TOKENS'){
      return (cand.content && cand.content.parts && cand.content.parts[0] && cand.content.parts[0].text) || '⚠️ Réponse tronquée (quota de tokens atteint).';
    }
    var t = cand && cand.content && cand.content.parts && cand.content.parts[0] && cand.content.parts[0].text;
    return t || '🤖 Je n\'ai pas trouvé de réponse claire, reformule ta question.';
  }catch(e){
    return '❌ Erreur technique : '+(e && e.message ? e.message : 'inconnue')+'. Réessaie dans quelques secondes.';
  }
}

async function stAiInit(){
  try{
    var r = await fetch(SUPA_URL+'/rest/v1/products?is_active=eq.true&select=name,price,category,description&limit=80',{
      headers:{apikey:SUPA_KEY, Authorization:'Bearer '+SUPA_KEY}
    });
    var rows = await r.json();
    ST_AI.CTX = (rows||[]).map(function(p){
      return (p.name||'')+' | '+(p.price||0)+' FCFA | '+(p.category||'')+' | '+(p.description||'').slice(0,80);
    }).join('\n');
  }catch(e){ ST_AI.CTX = ''; }
  ST_AI.ready = true;
}

async function stAiSearch(userQuery){
  var prompt = 'Tu es un moteur de recherche produit pour SEN TEW. Voici le catalogue :\n'+ST_AI.CTX+
    '\n\nRequête client : "'+userQuery+'"\nRéponds UNIQUEMENT en JSON strict : {"keywords":["mot1","mot2"],"category":"categorie_ou_null","maxPrice":nombre_ou_null}';
  var t = await stAsk(prompt);
  try{
    var m = t.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : {keywords:[userQuery],category:null,maxPrice:null};
  }catch(e){ return {keywords:[userQuery],category:null,maxPrice:null}; }
}

async function stAiChat(question){
  var prompt = 'Tu es Nio Far, l\'assistant shopping sympathique de SEN TEW (marketplace panafricaine). Voici le catalogue disponible :\n'+ST_AI.CTX+
    '\n\nClient : "'+question+'"\nRéponds en français, chaleureusement, en citant 2-3 produits réels du catalogue avec leur prix exact en FCFA si pertinent.';
  return stAsk(prompt);
}

async function stAiSupport(probleme){
  var prompt = 'Tu es le support client SEN TEW. Politique : livraison 24-72h selon la ville, retours acceptés sous 7 jours si produit non conforme, paiement Orange Money/Wave/à la livraison. Réponds de façon concise et rassurante en français au problème suivant : "'+probleme+'"';
  return stAsk(prompt);
}

async function stAiPhoto(file){
  if(!stAiHasKey()) return null;
  var b64 = await new Promise(function(res){
    var fr = new FileReader();
    fr.onload = function(){ res(String(fr.result).split(',')[1]); };
    fr.readAsDataURL(file);
  });

  if(!ST_AI.ready){ try{ await stAiInit(); }catch(e){} }

  var priceContext = '';
  try{
    if(ST_AI.CTX){
      var byCat = {};
      ST_AI.CTX.split('\n').forEach(function(line){
        var parts = line.split('|');
        if(parts.length>=3){
          var price = parseInt((parts[1]||'').replace(/[^0-9]/g,''),10);
          var cat = (parts[2]||'').trim();
          if(cat && price>0){
            if(!byCat[cat]) byCat[cat]=[];
            byCat[cat].push(price);
          }
        }
      });
      var lines = [];
      Object.keys(byCat).forEach(function(cat){
        var arr = byCat[cat];
        var min = Math.min.apply(null, arr), max = Math.max.apply(null, arr);
        var avg = Math.round(arr.reduce(function(a,b){return a+b;},0)/arr.length);
        lines.push('- '+cat+' : entre '+min+' et '+max+' FCFA (moyenne '+avg+' FCFA, sur '+arr.length+' produit(s))');
      });
      if(lines.length){
        priceContext = 'VOICI LES PRIX RÉELLEMENT PRATIQUÉS SUR SEN TEW PAR CATÉGORIE (utilise-les comme référence pour ta suggestion de prix, reste cohérent avec ce marché) :\n'+lines.join('\n')+'\n\n';
      }
    }
  }catch(e){}

  try{
    var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODEL+':generateContent?key='+stAiKey(),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{parts:[
          {text:priceContext+'Tu es l\'assistant vendeur de SEN TEW (marketplace panafricaine). Analyse cette photo de produit et réponds UNIQUEMENT en JSON strict : {"name":"nom commercial court","category":"une de : Mode, Électronique, Beauté, Maison, Alimentation, Artisanat, Autre","description":"description vendeuse de 2 phrases en français","price":prix_suggéré_en_FCFA_nombre}. Le prix suggéré doit être cohérent avec les prix déjà pratiqués sur SEN TEW dans la même catégorie (voir ci-dessus), sauf si le produit semble visiblement haut de gamme ou premium.'},
          {inline_data:{mime_type:file.type||'image/jpeg',data:b64}}
        ]}],
        generationConfig:{maxOutputTokens:1200,temperature:0.4,thinkingConfig:{thinkingLevel:'LOW'}}
      })
    });
    var j = await r.json();
    var t = j.candidates[0].content.parts[0].text;
    var m = t.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : null;
  }catch(e){ return null; }
}

/* ═══ 6. PHOTO IA STUDIO — transforme la photo brute en photo studio pro (AVANT/APRÈS) ═══ */
var ST_AI_IMAGE_MODEL = 'gemini-3-pro-image-preview';

async function stAiPhotoStudio(file){
  if(!stAiHasKey()) return {ok:false, error:'no_key'};
  var b64 = await new Promise(function(res){
    var fr = new FileReader();
    fr.onload = function(){ res(String(fr.result).split(',')[1]); };
    fr.readAsDataURL(file);
  });
  var attempt = 0, maxAttempts = 3;
  while(attempt < maxAttempts){
    attempt++;
    try{
      var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI_IMAGE_MODEL+':generateContent?key='+stAiKey(),{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          contents:[{parts:[
            {text:'Transforme cette photo de produit e-commerce en photo studio professionnelle : fond blanc uni et propre, éclairage doux et uniforme, produit bien centré et net, sans changer la forme, la couleur ni les détails réels du produit. Ne rajoute aucun texte, logo ou filigrane. Style catalogue premium.'},
            {inline_data:{mime_type:file.type||'image/jpeg', data:b64}}
          ]}],
          generationConfig:{responseModalities:['IMAGE'], temperature:0.3}
        })
      });
      var j = await r.json();
      if(j && j.error){
        var msg = String(j.error.message||'');
        if(/overload|unavailable|503/i.test(msg) && attempt < maxAttempts){ await stSleep(1200*attempt); continue; }
        return {ok:false, error:msg};
      }
      var parts = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
      if(!parts) return {ok:false, error:'reponse_vide'};
      var imgPart = parts.find(function(p){ return p.inline_data || p.inlineData; });
      if(!imgPart) return {ok:false, error:'pas_image_generee'};
      var data = (imgPart.inline_data || imgPart.inlineData);
      var mime = data.mime_type || data.mimeType || 'image/png';
      var dataUrl = 'data:'+mime+';base64,'+(data.data);
      return {ok:true, dataUrl:dataUrl, original_b64:'data:'+(file.type||'image/jpeg')+';base64,'+b64};
    }catch(e){
      if(attempt >= maxAttempts) return {ok:false, error:e.message||'erreur_reseau'};
      await stSleep(1000*attempt);
    }
  }
  return {ok:false, error:'echec_apres_tentatives'};
}

/* Enregistre l'usage IA d'un vendeur (compteur mensuel) pour le tableau de bord admin */
async function stAiLogPhotoUsage(vendorId){
  if(!vendorId) return;
  var month = new Date().toISOString().slice(0,7);
  try{
    await fetch(SUPA_URL+'/rest/v1/ai_photo_usage', {
      method:'POST',
      headers:{apikey:SUPA_KEY, Authorization:'Bearer '+SUPA_KEY, 'Content-Type':'application/json', 'Prefer':'resolution=merge-duplicates,return=minimal'},
      body: JSON.stringify({vendor_id:vendorId, month:month, count:1, last_used_at:new Date().toISOString()})
    });
  }catch(e){}
}

/* ═══ TRADUCTION COMMENTAIRES (MyMemory gratuit, sans clé) ═══ */
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
