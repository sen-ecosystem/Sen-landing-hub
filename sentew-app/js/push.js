// SEN TEW — Système de notifications push
const VAPID_PUBLIC_KEY = 'BJyourVAPIDpublicKeyHere-replace-in-production';

class SenTewPush {
  constructor() {
    this.subscription = null;
    this.init();
  }

  async init() {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      console.warn('Push non supporté');
      return;
    }
    const reg = await navigator.serviceWorker.ready;
    this.subscription = await reg.pushManager.getSubscription();
  }

  async askPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await this.subscribe();
      return true;
    }
    return false;
  }

  async subscribe() {
    try {
      const reg = await navigator.serviceWorker.ready;
      this.subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlB64ToUint8Array(VAPID_PUBLIC_KEY)
      });
      // Envoyer au backend
      localStorage.setItem('push_subscription', JSON.stringify(this.subscription));
      return this.subscription;
    } catch (e) {
      console.error('Subscribe error:', e);
    }
  }

  urlB64ToUint8Array(b64) {
    const padding = '='.repeat((4 - b64.length % 4) % 4);
    const base64 = (b64 + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = window.atob(base64);
    return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
  }

  // Simulation notifications locales (production = via backend)
  notify(title, body, opts={}) {
    if (Notification.permission !== 'granted') return;
    new Notification(title, {
      body,
      icon: opts.icon || 'https://sen-ecosystem.com/sentew-app/icon-192.png',
      badge: 'https://sen-ecosystem.com/sentew-app/icon-96.png',
      vibrate: [200,100,200],
      tag: opts.tag || 'sentew',
      data: { url: opts.url || '/sentew-app/' },
      requireInteraction: opts.requireInteraction || false
    });
  }

  notifyOrderStatus(order, status) {
    const messages = {
      confirmed: { title: '✅ Commande confirmée', body: `Votre commande #${order.id} est en préparation` },
      shipped: { title: '📦 Colis expédié', body: `Votre commande #${order.id} est en route` },
      out_for_delivery: { title: '🚚 Livraison imminente', body: `Votre livreur arrive dans ~15min` },
      delivered: { title: '🎉 Livré', body: `Commande #${order.id} livrée. Laissez un avis !` }
    };
    const m = messages[status];
    if (m) this.notify(m.title, m.body, { tag: 'order-'+order.id, url: `/sentew-app/commandes.html?id=${order.id}` });
  }

  notifyLiveStart(seller) {
    this.notify(`🔴 ${seller.name} est en LIVE`, `Rejoignez maintenant, offres flash exclusives`, {
      tag: 'live-'+seller.id,
      url: `/sentew-app/live.html?seller=${seller.id}`,
      requireInteraction: true
    });
  }

  notifyPromotion(promo) {
    this.notify(`🎁 ${promo.title}`, promo.body, { tag: 'promo', url: '/sentew-app/bons-promo.html' });
  }
}

window.SenTewPush = new SenTewPush();

// UI de demande
window.askForPushPermission = async function() {
  const ok = await window.SenTewPush.askPermission();
  if (ok) alert('✅ Notifications activées ! Vous serez averti des livraisons et LIVE.');
  else alert('❌ Notifications refusées. Vous pouvez les activer dans les paramètres du navigateur.');
};
