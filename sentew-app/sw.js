// SEN TEW - Service Worker v10 (network-first)
const CACHE = 'sentew-v23-2026-08-profil';
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // NETWORK-FIRST : toujours essayer le réseau d'abord
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
