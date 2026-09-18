/* ═══════════════ SEN TEW — Traduction live (avis + messages) ═══════════════ */
/* Dépend de stTranslate() défini dans js/ai.js (doit être chargé avant ce fichier) */

var ST_TR = { cache: {} };

function stTrDetectLang(){
  try{
    var saved = localStorage.getItem('sentew_lang');
    if(saved) return saved;
    var nav = (navigator.language || 'fr').slice(0,2).toLowerCase();
    return nav || 'fr';
  }catch(e){ return 'fr'; }
}
function stTrSetLang(lang){ try{ localStorage.setItem('sentew_lang', lang); }catch(e){} }

var ST_TR_LANGS = [
  {c:'fr', n:'Français'}, {c:'en', n:'English'}, {c:'es', n:'Español'},
  {c:'pt', n:'Português'}, {c:'ar', n:'العربية'}, {c:'wo', n:'Wolof'},
  {c:'sw', n:'Kiswahili'}, {c:'ha', n:'Hausa'}, {c:'de', n:'Deutsch'}, {c:'zh', n:'中文'}
];

async function stTrText(text, targetLang){
  if(!text || !text.trim()) return text;
  var key = targetLang + '|' + text;
  if(ST_TR.cache[key]) return ST_TR.cache[key];
  var out = text;
  try{
    if(typeof stTranslate === 'function'){
      out = await stTranslate(text, targetLang);
    } else {
      var r = await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=autodetect|'+targetLang);
      var j = await r.json();
      var t = j && j.responseData && j.responseData.translatedText;
      out = (t && t.toUpperCase().indexOf('MYMEMORY')<0) ? t : text;
    }
  }catch(e){ out = text; }
  ST_TR.cache[key] = out;
  return out;
}

/* Injecte un bouton "🌐 Traduire" sous un élément de texte donné.
   el = élément DOM contenant le texte original.
   Le texte original est conservé dans data-original (créé si absent). */
function stTrAttachButton(el, opts){
  opts = opts || {};
  if(!el || el.dataset.stTrAttached) return;
  el.dataset.stTrAttached = '1';
  if(!el.dataset.original) el.dataset.original = el.textContent;

  var btn = document.createElement('button');
  btn.className = 'st-tr-btn';
  btn.type = 'button';
  btn.style.cssText = 'margin-top:6px;background:none;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:#0f6b4e;padding:3px 6px;border-radius:8px';
  btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></svg><span>Traduire</span>';
  btn.dataset.state = 'orig';

  btn.onclick = async function(){
    var span = btn.querySelector('span');
    if(btn.dataset.state === 'orig'){
      span.textContent = '…';
      var lang = opts.targetLang || stTrDetectLang();
      var translated = await stTrText(el.dataset.original, lang);
      el.textContent = translated;
      span.textContent = 'Voir l\u2019original';
      btn.dataset.state = 'trans';
    } else {
      el.textContent = el.dataset.original;
      span.textContent = 'Traduire';
      btn.dataset.state = 'orig';
    }
  };

  if(opts.container){
    opts.container.appendChild(btn);
  } else if(el.parentNode){
    el.parentNode.insertBefore(btn, el.nextSibling);
  }
  return btn;
}

/* Traduit en masse tous les éléments correspondant à un sélecteur CSS,
   en ajoutant un bouton individuel sous chacun. Utile pour avis/messages générés dynamiquement. */
function stTrEnhanceAll(selector, opts){
  var nodes = document.querySelectorAll(selector);
  nodes.forEach(function(n){ stTrAttachButton(n, opts); });
}
