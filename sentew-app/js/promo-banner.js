// ================================================================
// SEN TEW — Promo Banner v46
// 26 août 2026 — Publicité flash animée après acceptation cookies
// Style Temu / Alibaba : coupons, offres, ventes flash
// ================================================================

(function() {
  'use strict';

  const STORAGE_KEY = 'sentew-promo-dismissed';
  const DISMISS_HOURS = 6; // Re-afficher après 6h si fermé

  const OFFERS = [
    {
      icon: '🎁',
      title: 'BIENVENUE !',
      subtitle: '500 FCFA offerts sur votre 1ère commande',
      code: 'WELCOME500',
      color: '#0f6b4e',
      gradient: 'linear-gradient(135deg,#0f6b4e,#0a4d38)'
    },
    {
      icon: '⚡',
      title: 'FLASH -30%',
      subtitle: 'Sur toute la Mode africaine pendant 3h',
      code: 'FLASH30',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg,#ef4444,#b91c1c)'
    },
    {
      icon: '🚚',
      title: 'LIVRAISON GRATUITE',
      subtitle: 'Dès 15 000 FCFA — Aujourd\'hui seulement',
      code: 'FREESHIP',
      color: '#d4a574',
      gradient: 'linear-gradient(135deg,#d4a574,#a67c3a)'
    },
    {
      icon: '💎',
      title: 'MEMBRE GOLD',
      subtitle: 'Cashback 10% permanent sur tous vos achats',
      code: 'GOLD10',
      color: '#0f6b4e',
      gradient: 'linear-gradient(135deg,#d4a574,#0f6b4e)'
    }
  ];

  function isDismissed() {
    const ts = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
    return ts && (Date.now() - ts < DISMISS_HOURS * 3600 * 1000);
  }

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    const banner = document.getElementById('sentew-promo-banner');
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    }
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      showToast('Code copié : ' + code + ' 🎉');
    });
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:130px;left:50%;transform:translateX(-50%);background:#0a1f17;color:#fff;padding:12px 20px;border-radius:24px;font-size:14px;font-weight:700;z-index:10000;box-shadow:0 8px 24px rgba(0,0,0,0.3);animation:toastIn .3s';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }

  let currentIdx = 0;
  let rotateInterval = null;

  function rotateOffer() {
    currentIdx = (currentIdx + 1) % OFFERS.length;
    renderOffer(OFFERS[currentIdx]);
  }

  function renderOffer(offer) {
    const banner = document.getElementById('sentew-promo-banner');
    if (!banner) return;
    banner.style.background = offer.gradient;
    banner.querySelector('.pb-icon').textContent = offer.icon;
    banner.querySelector('.pb-title').textContent = offer.title;
    banner.querySelector('.pb-subtitle').textContent = offer.subtitle;
    banner.querySelector('.pb-code').textContent = offer.code;
    banner.querySelector('.pb-code').onclick = () => copyCode(offer.code);
    // Petit effet pulse
    banner.style.animation = 'none';
    setTimeout(() => banner.style.animation = 'pbPulse .5s', 10);
  }

  function buildBanner() {
    if (document.getElementById('sentew-promo-banner')) return;
    if (isDismissed()) return;

    const offer = OFFERS[0];
    const banner = document.createElement('div');
    banner.id = 'sentew-promo-banner';
    banner.style.background = offer.gradient;
    banner.innerHTML = `
      <div class="pb-icon">${offer.icon}</div>
      <div class="pb-body">
        <div class="pb-title">${offer.title}</div>
        <div class="pb-subtitle">${offer.subtitle}</div>
      </div>
      <button class="pb-code" onclick="window.SentewPromo.copy('${offer.code}')">${offer.code}</button>
      <button class="pb-close" onclick="window.SentewPromo.dismiss()">✕</button>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #sentew-promo-banner{position:fixed;left:12px;right:12px;bottom:76px;z-index:90;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;color:#fff;box-shadow:0 12px 32px rgba(0,0,0,0.25);transition:all .4s;animation:pbSlideIn .5s}
      @keyframes pbSlideIn{from{transform:translateY(120%);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes pbPulse{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
      @keyframes toastIn{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
      #sentew-promo-banner .pb-icon{font-size:32px;flex-shrink:0;animation:pbBounce 2s infinite}
      @keyframes pbBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      #sentew-promo-banner .pb-body{flex:1;min-width:0}
      #sentew-promo-banner .pb-title{font-size:14px;font-weight:900;letter-spacing:.5px;line-height:1.2}
      #sentew-promo-banner .pb-subtitle{font-size:12px;opacity:.95;margin-top:2px;line-height:1.3}
      #sentew-promo-banner .pb-code{background:rgba(255,255,255,0.25);color:#fff;padding:8px 12px;border:1.5px dashed rgba(255,255,255,0.6);border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;letter-spacing:.5px;backdrop-filter:blur(4px);flex-shrink:0}
      #sentew-promo-banner .pb-code:active{transform:scale(0.95)}
      #sentew-promo-banner .pb-close{background:rgba(0,0,0,0.2);color:#fff;border:none;width:24px;height:24px;border-radius:50%;font-size:14px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}
    `;
    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Rotation automatique toutes les 8 secondes
    rotateInterval = setInterval(rotateOffer, 8000);
  }

  window.SentewPromo = {
    show: buildBanner,
    dismiss,
    copy: copyCode,
    reset: () => localStorage.removeItem(STORAGE_KEY)
  };

  // Écouter l'événement d'acceptation cookies
  window.addEventListener('sentew-cookies-accepted', () => {
    setTimeout(buildBanner, 1200);
  });

  // Ou afficher directement si cookies déjà acceptés
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const consent = window.SentewCookies?.getConsent();
      if (consent && consent.marketing !== false) {
        buildBanner();
      }
    }, 2500);
  });

  console.log('[SEN TEW] Promo banner v46 loaded');
})();
