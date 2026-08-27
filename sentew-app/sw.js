// ================================================================
// SEN TEW — Service Worker v46
// 26 août 2026 — Force invalidation cache refonte contrastes
// Nettoie tous les anciens caches (v42, v43, v44, v45)
// ================================================================
const CACHE_VERSION = 'sentew-v49-2026-08-26-no-green-bg';
const RUNTIME_CACHE = 'sentew-runtime-v49';
// ================================================================
// INSTALL — Pré-cache des assets critiques
// ================================================================
self.addEventListener('install', (event) => {
  console.log('[SW v46] Installation en cours...');
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('[SW v46] Pré-cache des assets critiques');
        return cache.addAll(CORE_ASSETS).catch(err => {
          console.warn('[SW v46] Certains assets non pré-cachés:', err);
        });
      })
      .then(() => {
        console.log('[SW v46] Skip waiting — activation immédiate');
        return self.skipWaiting();
      })
  );
});

// ================================================================
// ACTIVATE — Nettoyage FORCÉ de tous les anciens caches
// ================================================================
self.addEventListener('activate', (event) => {
  console.log('[SW v46] Activation — nettoyage anciens caches...');
  event.waitUntil(
    Promise.all([
      // 1. Supprimer TOUS les anciens caches (v42, v43, v44, v45, etc.)
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_VERSION && cacheName !== RUNTIME_CACHE) {
              console.log('[SW v46] 🗑️ Suppression cache obsolète:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 2. Prise de contrôle immédiate de tous les onglets ouverts
      self.clients.claim()
    ]).then(() => {
      console.log('[SW v46] ✅ Activation terminée — cache v46 actif');
      // 3. Notifier tous les clients pour recharger
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'CACHE_UPDATED',
            version: 'v46',
            action: 'reload_recommended'
          });
        });
      });
    })
  );
});

// ================================================================
// FETCH — Stratégie network-first pour HTML, cache-first pour assets
// ================================================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET et cross-origin non essentielles
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin && !url.hostname.includes('unpkg.com')) {
    return;
  }

  // Stratégie NETWORK-FIRST pour HTML (force refresh du contenu)
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/sentew-app/index.html');
          });
        })
    );
    return;
  }

  // Stratégie CACHE-FIRST pour CSS / JS / images (avec revalidation en fond)
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cloned = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, cloned));
        }
        return networkResponse;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});

// ================================================================
// MESSAGE — Réponse aux commandes des pages
// ================================================================
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    console.log('[SW v46] SKIP_WAITING reçu');
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_CACHE') {
    console.log('[SW v46] CLEAR_CACHE reçu — vidage total');
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => caches.delete(name)));
    }).then(() => {
      event.ports[0]?.postMessage({ success: true, version: 'v46' });
    });
  }

  if (event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
});

// ================================================================
// PUSH — Notifications push (futur)
// ================================================================
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || '',
    icon: '/sentew-app/icons/icon-192.png',
    badge: '/sentew-app/icons/badge-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/sentew-app/' }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'SEN TEW', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data.url || '/sentew-app/')
  );
});

console.log('[SW v46] Service Worker v46 chargé — cache:', CACHE_VERSION);
