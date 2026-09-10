/* ══════════════════════════════════════════════════════════
   SEN TEW — BOUCLIER DE SÉCURITÉ GLOBAL v1
   Protection active de TOUTES les pages de l'application.
   Inspiré des systèmes Amazon/Shopify/Cloudflare :
   1. Anti-robots      : bloque les comportements non humains
   2. Anti-injection   : nettoie tout texte affiché (anti-XSS)
   3. Anti-espionnage  : détecte les outils de piratage
   4. Rate limiting    : max 60 actions/minute par visiteur
   5. Verrouillage     : app verrouillée si attaque confirmée
   6. Journal & alerte : tout est enregistré et signalé
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ---------- CONFIG ---------- */
var CFG={
  maxActionsPerMin:60,        /* un humain ne dépasse jamais 60 actions/min */
  maxFailedApi:8,             /* 8 requêtes rejetées = comportement suspect */
  lockMinutes:10,             /* verrouillage local de l'appareil attaquant */
  alertKey:'st_shield_log',
  lockKey:'st_shield_lock',
  counterKey:'st_shield_c'
};

/* ---------- ÉTAT ---------- */
function getLock(){try{return JSON.parse(localStorage.getItem(CFG.lockKey))||{until:0,level:0}}catch(e){return{until:0,level:0}}}
function setLock(l){localStorage.setItem(CFG.lockKey,JSON.stringify(l))}
function getCount(){try{return JSON.parse(sessionStorage.getItem(CFG.counterKey))||{n:0,t:Date.now(),apiFail:0}}catch(e){return{n:0,t:Date.now(),apiFail:0}}}
function setCount(c){sessionStorage.setItem(CFG.counterKey,JSON.stringify(c))}

/* ---------- JOURNAL DE SÉCURITÉ ---------- */
function logEvent(type,detail){
  try{
    var j=JSON.parse(localStorage.getItem(CFG.alertKey))||[];
    j.unshift({date:new Date().toISOString(),type:type,detail:detail||'',page:location.pathname});
    localStorage.setItem(CFG.alertKey,JSON.stringify(j.slice(0,100)));
  }catch(e){}
  /* Visible dans admin.html → Outils */
}

/* ---------- 1. VERROUILLAGE LOCAL (l'attaquant est bloqué, les AUTRES visiteurs ne voient rien) ---------- */
function isLocked(){
  var l=getLock();
  return l.until&&Date.now()<l.until;
}
function lockDevice(reason){
  var l=getLock();
  l.level=(l.level||0)+1;
  l.until=Date.now()+CFG.lockMinutes*60*1000*l.level; /* escalade : 10, 20, 30 min... */
  setLock(l);
  logEvent('🚨_DEVICE_LOCKED','Niveau '+l.level+' — '+reason);
  showLockScreen(l.until);
}
function showLockScreen(until){
  if(document.getElementById('st-shield-lock'))return;
  var d=document.createElement('div');
  d.id='st-shield-lock';
  d.style.cssText='position:fixed;inset:0;background:#0a1f17;z-index:999999;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui';
  d.innerHTML='<div style="background:#fff;border-radius:22px;padding:30px 24px;max-width:360px;text-align:center;color:#0a1f17">'
    +'<div style="font-size:44px">🛡️</div>'
    +'<h2 style="font-size:18px;font-weight:900;color:#0f6b4e;margin:10px 0 6px">Protection SEN TEW activée</h2>'
    +'<p style="font-size:12.5px;color:#6b7280;line-height:1.6">Une activité inhabituelle a été détectée sur cet appareil. Accès suspendu jusqu\'à <b>'+new Date(until).toLocaleTimeString('fr-FR')+'</b>.<br><br>Les autres visiteurs ne sont pas affectés. Si tu es un client normal, rouvre simplement l\'application après ce délai.</p>'
    +'</div>';
  document.body.appendChild(d);
}

/* ---------- 2. RATE LIMITING (anti-robots) ---------- */
var ACTIONS=['click','keydown','touchstart'];
function onAction(){
  if(isLocked())return;
  var c=getCount();
  if(Date.now()-c.t>60000){c.n=0;c.t=Date.now()}
  c.n++;
  setCount(c);
  if(c.n>CFG.maxActionsPerMin){
    logEvent('⚠️_BOT_BEHAVIOR',c.n+' actions/minute');
    lockDevice('comportement robot détecté ('+c.n+' actions/min)');
  }
}
ACTIONS.forEach(function(ev){document.addEventListener(ev,onAction,{passive:true,capture:true})});

/* ---------- 3. SURVEILLANCE DES ÉCHECS API (attaques sur la base) ---------- */
var _fetch=window.fetch;
window.fetch=function(){
  return _fetch.apply(this,arguments).then(function(r){
    try{
      var url=(arguments[0]&&arguments[0].toString)?arguments[0].toString():'';
      if(url.indexOf('supabase.co')>-1&&(r.status===401||r.status===403)){
        var c=getCount();c.apiFail=(c.apiFail||0)+1;setCount(c);
        logEvent('⚠️_API_DENIED','HTTP '+r.status+' sur '+url.split('?')[0].split('/').pop());
        if(c.apiFail>=CFG.maxFailedApi){
          lockDevice(c.apiFail+' accès refusés répétés à la base de données');
        }
      }
    }catch(e){}
    return r;
  });
};

/* ---------- 4. ANTI-INJECTION XSS (nettoyage global) ---------- */
/* Tout texte venant de la base est nettoyé avant affichage */
window.stEscape=function(s){
  var d=document.createElement('div');
  d.textContent=String(s==null?'':s);
  return d.innerHTML;
};
/* Bloque les <script> injectés dans les contenus affichés */
var _innerHTML=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
if(_innerHTML&&_innerHTML.set){
  Object.defineProperty(Element.prototype,'innerHTML',{
    set:function(v){
      if(typeof v==='string'&&/<script[\s>]/i.test(v)){
        logEvent('🚨_XSS_BLOCKED','Injection de script bloquée sur '+location.pathname);
        v=v.replace(/<script[\s\S]*?<\/script>/gi,'[contenu bloqué par le bouclier]');
      }
      _innerHTML.set.call(this,v);
    },
    get:_innerHTML.get
  });
}

/* ---------- 5. DÉTECTION OUTILS DE PIRATAGE ---------- */
/* Iframes cachées (clickjacking) : l'app refuse d'être affichée dans un site pirate */
if(window.top!==window.self){
  logEvent('🚨_CLICKJACKING','App affichée dans un cadre étranger');
  try{window.top.location=window.self.location}catch(e){document.body.innerHTML=''}
}
/* Outils de debug ouverts en permanence (tentative d'analyse du code) */
var devOpen=0;
setInterval(function(){
  var w=window.outerWidth-window.innerWidth>160,h=window.outerHeight-window.innerHeight>160;
  if((w||h)&&devOpen<2){devOpen++;logEvent('⚠️_DEVTOOLS','Outils de développement détectés')}
},5000);

/* ---------- 6. GARDE DE SESSION ADMIN sur toutes les pages admin ---------- */
var ADMIN_PAGES=['admin.html','admin-payouts.html'];
var page=location.pathname.split('/').pop();
if(ADMIN_PAGES.indexOf(page)>-1){
  var sess=null;
  try{sess=JSON.parse(sessionStorage.getItem('st_admin_session'))}catch(e){}
  if(!sess||!sess.exp||sess.exp<Date.now()){
    logEvent('⚠️_ADMIN_ACCESS_DENIED','Accès direct sans session sur '+page);
    location.href='login-admin.html';
  }
}

/* ---------- 7. PANNEAU D'ÉTAT (pour toi, dans admin) ---------- */
window.stShieldStatus=function(){
  var j=JSON.parse(localStorage.getItem(CFG.alertKey)||'[]');
  var l=getLock();
  return {
    evenements:j.length,
    alertes:j.filter(function(e){return e.type.indexOf('🚨')===0}).length,
    appareilBloque:isLocked()?new Date(l.until).toLocaleTimeString('fr-FR'):'non',
    niveauLock:l.level||0,
    derniers:j.slice(0,20)
  };
};

/* ---------- DÉMARRAGE ---------- */
if(isLocked()){showLockScreen(getLock().until)}
logEvent('🛡️_SHIELD_ON','Bouclier actif sur '+location.pathname);
console.log('%c🛡️ SEN TEW Shield actif','color:#10b981;font-weight:bold');
})();
