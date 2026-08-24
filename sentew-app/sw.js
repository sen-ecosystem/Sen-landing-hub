const CACHE = 'sentew-v45-2026-08-24-light-design';
const ASSETS = [
  './','index.html','landing.html','produit.html','panier.html','boutique.html',
  'vendeur.html','profil.html','parametres.html','confidentialite-app.html',
  'favoris.html','fidelite.html','portefeuille.html','parrainage.html',
  'produits.html','css/app.css','js/role-guard.js','js/dark-mode.js','manifest.json'
];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).then(r => {
    if(r && r.status===200 && e.request.method==='GET' && e.request.url.startsWith(self.location.origin)) {
      const clone = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone).catch(()=>{}));
    }
    return r;
  }).catch(() => caches.match(e.request)));
});
self.addEventListener('message', e => { if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting(); });
