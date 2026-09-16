/* ══════════════════════════════════════════════════════════
   SEN TEW — BOUCLIER DE SÉCURITÉ GLOBAL v1
   Protection active de TOUTES les pages de l'application.
   EXEMPTION : login-admin.html et admin.html ont leur propre
   sécurité (2FA + verrouillage) — le bouclier ne s'y applique pas.
   ══════════════════════════════════════════════════════════ */
if(/login-admin|admin\.html/i.test(location.pathname)){
  console.log('%c🛡️ SEN TEW Shield — page admin exemptée (2FA propre)','color:#10b981;font-weight:bold');
}else{
(function(){
'use strict';

/* ---------- CONFIG ---------- */
var CFG={
  maxActionsPerMin:60,
  maxFailedApi:8,
  lockMinutes:10,
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
}

/* ---------- 1. VERROUILLAGE LOCAL ---------- */
function isLocked(){
  var l=getLock();
  return l.until&&Date.now()<l.until;
}
function lockDevice(reason){
  var l=getLock();
  l.level=(l.level||0)+1;
  l.until=Date.now()+CFG.lockMinutes*60*1000*l.level;
  setLock(l);
  logEvent('DEVICE_LOCKED','Niveau '+l.level+' — '+reason);
  showLockScreen(l.until);
}
function showLockScreen(until){
  if(document.getElementById('st-shield-lock'))return;
  var d=document.createElement('div');
  d.id='st-shield-lock';
  d.style.cssText='position:fixed;inset:0;background:#0a1f17;z-index:999999;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui';
  d.innerHTML='<div style="background:#fff;border-radius:22px;padding:30px 24px;max-width:360px;text-align:center;color:#0a1f17">'
    +'<div style="font-size:44px">🛡️</div>'
    +'<h2 style="margin:12px 0 8px;font-size:19px">Accès temporairement suspendu</h2>'
    +'<p style="font-size:13px;color:#5b7a70;line-height:1.6">Une activité inhabituelle a été détectée sur cet appareil. Réessaie dans quelques minutes.</p>'
    +'</div>';
  document.body.appendChild(d);
}

/* ---------- 2. RATE LIMITING ---------- */
function countAction(){
  var c=getCount();
  if(Date.now()-c.t>60000){c={n:0,t:Date.now(),apiFail:0};}
  c.n++;
  setCount(c);
  if(c.n>CFG.maxActionsPerMin){lockDevice('Trop d\'actions par minute ('+c.n+')');}
}
['click','touchstart','submit'].forEach(function(ev){
  document.addEventListener(ev,countAction,{passive:true});
});

/* ---------- 3. SURVEILLANCE DES ÉCHECS API ---------- */
var _fetch=window.fetch;
window.fetch=function(){
  return _fetch.apply(this,arguments).then(function(r){
    if(r.status===401||r.status===403||r.status===429){
      var c=getCount();c.apiFail++;setCount(c);
      if(c.apiFail>=CFG.maxFailedApi){lockDevice('Trop de requêtes rejetées ('+c.apiFail+')');}
    }
    return r;
  }).catch(function(e){throw e;});
};

/* ---------- 4. ANTI-ESPIONNAGE ---------- */
document.addEventListener('contextmenu',function(e){e.preventDefault();});
document.addEventListener('keydown',function(e){
  if(e.key==='F12'||((e.ctrlKey||e.metaKey)&&e.shiftKey&&['I','J','C'].indexOf(e.key.toUpperCase())>-1)||((e.ctrlKey||e.metaKey)&&e.key.toUpperCase()==='U')){
    e.preventDefault();
  }
});

/* ---------- 5. ANTI-INJECTION (nettoyage basique) ---------- */
window.stClean=function(s){
  return String(s==null?'':s).replace(/[<>"'`]/g,'');
};

/* ---------- 6. PÉRIODE DE GRÂCE AU CHARGEMENT ---------- */
var bootTime=Date.now();

/* ---------- DÉMARRAGE ---------- */
if(isLocked()){showLockScreen(getLock().until)}
logEvent('SHIELD_ON','Bouclier actif sur '+location.pathname);
console.log('%c🛡️ SEN TEW Shield actif','color:#10b981;font-weight:bold');
})();
}
/* fin exemption admin */
