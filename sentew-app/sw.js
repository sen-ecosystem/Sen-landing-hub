const CACHE = 'sentew-v1-2026';
const urls = [
  '/sentew-app/',
  '/sentew-app/index.html',
  '/sentew-app/css/app.css',
  '/sentew-app/js/data.js',
  '/sentew-app/js/i18n.js',
  '/sentew-app/manifest.json',
  '/sentew-app/categories.html',
  '/sentew-app/panier.html',
  '/sentew-app/messages.html',
'/sentew-app/profil.html',
'/sentew-app/produit.html',
'/sentew-app/boutique.html',
'/sentew-app/live.html',
'/sentew-app/vendeur.html'

];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(urls).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
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
    vibrate: [200,100,200]
  });
});
