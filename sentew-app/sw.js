/* ==========================================
   SEN TEW - Service Worker v43 FINAL
   23 août 2026 - RESET COMPLET
   ========================================== */

const CACHE = 'sentew-v43-2026-08-23-reset-final';
const ASSETS = [
  './',
  'index.html',
  'landing.html',
  'produit.html',
  'panier.html',
  'boutique.html',
  'vendeur.html',
  'profil.html',
  'mentions-legales.html',
  'cgu.html',
  'cgv.html',
  'cookies.html',
  'confidentialite-app.html',
  'css/app.css',
  'js/role-guard.js',
  'js/dark-mode.js',
  'manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && event.request.method === 'GET' && event.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone).catch(() => {}));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
