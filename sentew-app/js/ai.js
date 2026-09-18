/* ══════════════════════════════════════════════
   SEN TEW — AI.JS v1.1 (SÉCURISÉ)
   La clé Gemini N'EST PAS dans ce fichier.
   Elle est stockée sur l'appareil (localStorage),
   saisie une seule fois par l'admin.
   ══════════════════════════════════════════════ */
var ST_AI = {
  MODEL: 'gemini-3.6-flash',
  CTX: '',
  ready: false
};

/* La clé est lue depuis l'appareil, jamais depuis le code */
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

/* ── Appel Gemini ── */
async function stAsk(prompt){
  if(!stAiHasKey()){
    return '⚙️ IA non activée sur cet appareil. L\u2019administrateur doit saisir la clé Gemini (une seule fois) via stAiSetKey().';
  }
  try{
    var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODEL+':generateContent?key='+stAiKey(),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{parts:[{text:(ST_AI.CTX?('CONTEXTE CATALOGUE SEN TEW :\n'+ST_AI.CTX+'\n\n'):'')+prompt}]}],
        generationConfig:{maxOutputTokens:1500,temperature:0.6,thinkingConfig:{thinkingLevel:'LOW'}}
      })
    });
    var t = j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text;
if(!t && j && j.candidates && j.candidates[0] && j.candidates[0].finishReason==='MAX_TOKENS'){
  return '⚠️ Réponse coupée (quota tokens). Réessaie avec une question plus courte.';
}
if(!t && j && j.error){
  return '❌ Erreur Google : '+(j.error.message||'inconnue');
}
return t || 'Je n\u2019ai pas trouvé de réponse, réessaie autrement.';
  }catch(e){
    return '❌ Erreur technique : '+(e && e.message ? e.message : 'inconnue')+'. Réessaie dans quelques secondes.';
}
}

/* ── Charge le catalogue une fois ── */
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

/* ═══ 2. ASSISTANT SHOPPING « Nio Far » ═══ */
async function stAiChat(question){
  return stAsk(
    'Tu es « Nio Far », l\u2019assistant shopping de SEN TEW (marketplace sénégalaise). '+
    'Réponds en français, chaleureux et concis (max 80 mots), avec des prix en FCFA tirés du catalogue. '+
    'Ne vends que des produits du catalogue ci-dessus. Question client : '+question
  );
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
  var b64 = await new Promise(function(res){
    var fr = new FileReader();
    fr.onload = function(){ res(String(fr.result).split(',')[1]); };
    fr.readAsDataURL(file);
  });
  try{
    var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+ST_AI.MODEL+':generateContent?key='+stAiKey(),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{parts:[
          {text:'Tu es l\u2019assistant vendeur de SEN TEW (marketplace sénégalaise). Analyse cette photo de produit et réponds UNIQUEMENT en JSON strict : {"name":"nom commercial court","category":"une de : Mode, Électronique, Beauté, Maison, Alimentation, Artisanat, Autre","description":"description vendeuse de 2 phrases en français","price":prix_suggéré_en_FCFA_nombre}.'},
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

/* ═══ 5. TRADUCTION COMMENTAIRES (MyMemory gratuit, sans clé) ═══ */
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
