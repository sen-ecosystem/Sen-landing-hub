/* ══════════════════════════════════════════════
   SEN TEW — AI.JS v1.0
   Cerveau IA gratuit (Gemini) : recherche intelligente,
   assistant shopping, support, photo IA vendeur.
   ⚠️ Colle ta clé Gemini (aistudio.google.com) ci-dessous.
   ══════════════════════════════════════════════ */
var ST_AI = {
  KEY: 'COLLE_TA_CLE_GEMINI_ICI',
  MODEL: 'gemini-2.0-flash',
  CTX: '',                 // catalogue produits (chargé une fois)
  ready: false
};

/* ── Appel Gemini (gratuit, navigateur) ── */
async function stAsk(prompt){
  if(!ST_AI.KEY || ST_AI.KEY.indexOf('AIza')!==0){
    return '⚙️ IA en cours d\u2019activation — l\u2019administrateur doit ajouter la clé Gemini dans js/ai.js.';
  }
  try{
    var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODEL+':generateContent?key='+ST_AI.KEY,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{parts:[{text:(ST_AI.CTX?('CONTEXTE CATALOGUE SEN TEW :\n'+ST_AI.CTX+'\n\n'):'')+prompt}]}],
        generationConfig:{maxOutputTokens:400,temperature:0.6}
      })
    });
    var j = await r.json();
    var t = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text;
    return t || 'Je n\u2019ai pas trouvé de réponse, réessaie autrement.';
  }catch(e){
    return '❌ IA indisponible pour le moment. Vérifie ta connexion.';
  }
}

/* ── Charge le catalogue une fois (pour que l'IA connaisse les produits) ── */
async function stAiInit(){
  if(ST_AI.ready) return;
  try{
    var rows = (typeof supa==='function') ? await supa('products?is_active=eq.true&limit=80&select=name,price,category,description') : [];
    ST_AI.CTX = (rows||[]).map(function(p){
      return '- '+(p.name||'')+' | '+(p.price||0)+' FCFA | '+(p.category||'')+' | '+String(p.description||'').slice(0,80);
    }).join('\n');
    ST_AI.ready = true;
  }catch(e){ ST_AI.ready = true; }
}

/* ═══ 1. RECHERCHE INTELLIGENTE — comprend le langage naturel ═══
   stAiSearch("un boubou élégant pas cher pour un mariage")
   → renvoie {category, maxPrice, keywords[]} à appliquer aux résultats */
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

/* ═══ 2. ASSISTANT SHOPPING — conseille et guide ═══ */
async function stAiChat(question){
  return stAsk(
    'Tu es « Nio Far », l\u2019assistant shopping de SEN TEW (marketplace sénégalaise). '+
    'Réponds en français, chaleureux et concis (max 80 mots), avec des prix en FCFA tirés du catalogue. '+
    'Ne vends que des produits du catalogue ci-dessus. Question client : '+question
  );
}

/* ═══ 3. SUPPORT CLIENT — réponses automatiques ═══ */
async function stAiSupport(probleme){
  return stAsk(
    'Tu es le support SEN TEW. Règles : livraison 24-48h (ville) / 2-5j (régions), '+
    'retour 7 jours si défaut, paiement Wave/Orange/Free/carte/à la livraison, remboursement sous 48h. '+
    'Réponds avec empathie, en français, max 60 mots, et propose une solution concrète. Problème : '+probleme
  );
}

/* ═══ 4. PHOTO IA VENDEUR — analyse la photo → fiche produit ═══
   stAiPhoto(fichierImage) → {name, category, description, price} */
async function stAiPhoto(file){
  if(!ST_AI.KEY || ST_AI.KEY.indexOf('AIza')!==0) return null;
  var b64 = await new Promise(function(res){
    var fr = new FileReader();
    fr.onload = function(){ res(String(fr.result).split(',')[1]); };
    fr.readAsDataURL(file);
  });
  try{
    var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODEL+':generateContent?key='+ST_AI.KEY,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{parts:[
          {text:'Tu es l\u2019assistant vendeur de SEN TEW (marketplace sénégalaise). Analyse cette photo de produit et réponds UNIQUEMENT en JSON strict : {"name":"nom commercial court","category":"une de : Mode, Électronique, Beauté, Maison, Alimentation, Artisanat, Autre","description":"description vendeuse de 2 phrases en français","price":prix_suggéré_en_FCFA_nombre}.'},
          {inline_data:{mime_type:file.type||'image/jpeg',data:b64}}
        ]}],
        generationConfig:{maxOutputTokens:300,temperature:0.4}
      })
    });
    var j = await r.json();
    var t = j.candidates[0].content.parts[0].text;
    var m = t.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : null;
  }catch(e){ return null; }
}

/* ═══ 5. TRADUCTION COMMENTAIRES (MyMemory gratuit, sans clé) ═══
   stTranslate("Jërëjëf, bu baax la", "fr") → texte traduit */
async function stTranslate(text, targetLang){
  targetLang = targetLang || 'fr';
  try{
    var r = await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=autodetect|'+targetLang);
    var j = await r.json();
    var t = j && j.responseData && j.responseData.translatedText;
    return (t && t.toUpperCase().indexOf('MYMEMORY')<0) ? t : text;
  }catch(e){ return text; }
}

/* démarrage silencieux */
stAiInit();
