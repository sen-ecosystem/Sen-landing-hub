// SEN TEW Service Worker v50 - 01/09/2026
const CACHE_VERSION = 'sentew-v50-2026-09-01-batch-refonte';
const RUNTIME_CACHE = 'sentew-runtime-v50';

const CORE_ASSETS = [
  '/sentew-app/',
  '/sentew-app/index.html',
  '/sentew-app/css/app.css?v=50',
  '/sentew-app/js/dark-mode.js?v=50',
  '/sentew-app/manifest.json',
  '/sentew-app/recherche-ia.html',
  '/sentew-app/messages.html',
  '/sentew-app/notifications.html',
  '/sentew-app/statistiques.html',
  '/sentew-app/panier.html',
  '/sentew-app/profil.html',
  '/sentew-app/adresses.html',
  '/sentew-app/boutique.html',
  '/sentew-app/parrainage.html',
  '/sentew-app/portefeuille.html'
];

// Install : précache
self.addEventListener('install', event => {
  console.log('[SW v50] Installing...');
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      console.log('[SW v50] Precaching core assets');
      return cache.addAll(CORE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

// Activate : nettoyage caches anciens
self.addEventListener('activate', event => {
  console.log('[SW v50] Activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_VERSION && key !== RUNTIME_CACHE)
          .map(key => {
            console.log('[SW v50] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => {
      console.log('[SW v50] Claiming clients');
      return self.clients.claim();
    }).then(() => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION }));
      });
    })
  );
});

// Fetch : network-first HTML, cache-first assets
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  // HTML : network-first
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).then(response => {
        const clone = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => caches.match(request).then(r => r || caches.match('/sentew-app/index.html')))
    );
    return;
  }

  // Assets : cache-first + background revalidate
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        const clone = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
        return response;
      });
      return cached || fetchPromise;
    })
  );
});

// Messages
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'GET_VERSION') event.ports[0]?.postMessage({ version: CACHE_VERSION });
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => event.ports[0]?.postMessage({ cleared: true }));
  }
});

// Push (placeholder futur)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'SEN TEW', body: 'Nouvelle notification' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/sentew-app/icons/icon-192.png',
      badge: '/sentew-app/icons/badge.png'
    })
  );
});
