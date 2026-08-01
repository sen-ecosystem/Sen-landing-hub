const CACHE = 'sentew-v4-2026-08-fix';
const urls = [
  '/sentew-app/',
  '/sentew-app/index.html',
  '/sentew-app/css/app.css',
  '/sentew-app/js/data.js',
  '/sentew-app/js/i18n.js',
  '/sentew-app/js/theme.js',
  '/sentew-app/js/nav.js',
  '/sentew-app/manifest.json',
  '/sentew-app/admin.html',
  '/sentew-app/adresses.html',
  '/sentew-app/assistant-ia.html',
  '/sentew-app/audit.html',
  '/sentew-app/avis.html',
  '/sentew-app/bons-promo.html',
  '/sentew-app/boutique.html',
  '/sentew-app/categories.html',
  '/sentew-app/commandes.html',
  '/sentew-app/confidentialite-app.html',
  '/sentew-app/favoris.html',
  '/sentew-app/fidelite.html',
  '/sentew-app/live.html',
  '/sentew-app/livreur.html',
  '/sentew-app/login.html',
  '/sentew-app/login-guest.html',
  '/sentew-app/logistique.html',
  '/sentew-app/messages.html',
  '/sentew-app/notifications.html',
  '/sentew-app/panier.html',
  '/sentew-app/panoramique.html',
  '/sentew-app/parametres.html',
  '/sentew-app/portefeuille.html',
  '/sentew-app/produit.html',
  '/sentew-app/produits.html',
  '/sentew-app/profil.html',
  '/sentew-app/recherche-ia.html',
  '/sentew-app/remboursement.html',
  '/sentew-app/retouche-ia.html',
  '/sentew-app/stories.html',
  '/sentew-app/vendeur.html',
  '/sentew-app/verified.html'
    '/sentew-app/landing.html',
  '/sentew-app/onboarding.html',
  '/sentew-app/js/currency.js',
  '/sentew-app/js/paydunya.js',
  '/sentew-app/js/push.js',

];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(urls).catch(err => console.log('Cache add error:', err))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Network-first pour HTML (toujours dernière version)
  if (e.request.destination === 'document' || e.request.url.endsWith('.html')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('/sentew-app/index.html')))
    );
    return;
  }
  // Cache-first pour assets
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && e.request.url.startsWith(self.location.origin)) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match('/sentew-app/index.html')))
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {title:'SEN TEW', body:'Nouvelle notification'};
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://images.unsplash.com/photo-1601925243085-9c9e4c86b0e2?w=192',
    badge: 'https://images.unsplash.com/photo-1601925243085-9c9e4c86b0e2?w=96',
    vibrate: [200,100,200],
    data: { url: data.url || '/sentew-app/' }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || '/sentew-app/'));
});
