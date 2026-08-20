const CACHE = 'sentew-v40-2026-08-20-legal-bugs';
const ASSETS = [
  './',
  'index.html','landing.html','produit.html','panier.html',
  'boutique.html','profil.html','vendeur.html','admin.html',
  'mentions-legales.html','cgu.html','cgv.html','cookies.html',
  'confidentialite-app.html','remboursement.html',
  'css/app.css','js/dark-mode.js','role-guard.js','manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
