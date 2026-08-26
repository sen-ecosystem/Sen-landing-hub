// ================================================================
// SEN TEW — Cookies Modal v46
// 26 août 2026 — Modal d'entrée style Amazon / Alibaba / Temu
// Conforme RGPD + Loi sénégalaise 2008-12
// ================================================================

(function() {
  'use strict';

  const STORAGE_KEY = 'sentew-cookies-consent';
  const VERSION = '1.0';

  // Vérifier si consentement déjà donné
  function hasConsent() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return data && data.version === VERSION && data.timestamp;
    } catch(e) { return false; }
  }

  function saveConsent(prefs) {
    const data = {
      version: VERSION,
      timestamp: Date.now(),
      essentials: true,
      analytics: prefs.analytics || false,
      marketing: prefs.marketing || false,
      personalization: prefs.personalization || false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    hideModal();
    // Déclencher event pour promo-banner
    window.dispatchEvent(new CustomEvent('sentew-cookies-accepted', { detail: data }));
  }

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true, personalization: true });
  }

  function refuseAll() {
    saveConsent({ analytics: false, marketing: false, personalization: false });
  }

  function savePreferences() {
    const prefs = {
      analytics: document.getElementById('ck-analytics')?.checked || false,
      marketing: document.getElementById('ck-marketing')?.checked || false,
      personalization: document.getElementById('ck-perso')?.checked || false
    };
    saveConsent(prefs);
  }

  function showPreferences() {
    document.getElementById('ck-simple').style.display = 'none';
    document.getElementById('ck-detailed').style.display = 'block';
  }

  function hideModal() {
    const modal = document.getElementById('sentew-cookies-modal');
    if (modal) {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    }
  }

  function buildModal() {
    if (document.getElementById('sentew-cookies-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'sentew-cookies-modal';
    modal.innerHTML = `
      <div class="ck-overlay"></div>
      <div class="ck-panel">
        <!-- VUE SIMPLE -->
        <div id="ck-simple">
          <div class="ck-icon">🍪</div>
          <h2>Cookies & Confidentialité</h2>
          <p>SEN TEW utilise des cookies pour améliorer votre expérience, personnaliser le contenu et analyser notre trafic. Vos données sont protégées selon la <strong>Loi sénégalaise 2008-12</strong> et le <strong>RGPD</strong>.</p>
          <div class="ck-actions">
            <button class="ck-btn ck-accept" onclick="window.SentewCookies.acceptAll()">
              <i data-lucide="check-circle"></i> Tout accepter
            </button>
            <button class="ck-btn ck-refuse" onclick="window.SentewCookies.refuseAll()">
              <i data-lucide="x-circle"></i> Tout refuser
            </button>
            <button class="ck-btn ck-prefs" onclick="window.SentewCookies.showPreferences()">
              <i data-lucide="settings"></i> Préférences
            </button>
          </div>
          <p class="ck-footer">
            <a href="cookies.html">Politique cookies</a> ·
            <a href="confidentialite-app.html">Confidentialité</a> ·
            <a href="cgu.html">CGU</a>
          </p>
        </div>

        <!-- VUE DÉTAILLÉE -->
        <div id="ck-detailed" style="display:none">
          <h2><i data-lucide="settings"></i> Préférences de cookies</h2>
          <p class="ck-sub">Personnalisez vos choix. Les cookies essentiels sont obligatoires pour le fonctionnement du site.</p>

          <div class="ck-category">
            <div class="ck-cat-head">
              <label class="ck-switch">
                <input type="checkbox" checked disabled>
                <span class="slider"></span>
              </label>
              <div>
                <strong>Cookies essentiels</strong>
                <small>Obligatoires — Panier, session, sécurité</small>
              </div>
            </div>
          </div>

          <div class="ck-category">
            <div class="ck-cat-head">
              <label class="ck-switch">
                <input type="checkbox" id="ck-analytics" checked>
                <span class="slider"></span>
              </label>
              <div>
                <strong>Analytics</strong>
                <small>Comprendre l'usage du site (Google Analytics)</small>
              </div>
            </div>
          </div>

          <div class="ck-category">
            <div class="ck-cat-head">
              <label class="ck-switch">
                <input type="checkbox" id="ck-marketing">
                <span class="slider"></span>
              </label>
              <div>
                <strong>Marketing</strong>
                <small>Publicités personnalisées et promotions</small>
              </div>
            </div>
          </div>

          <div class="ck-category">
            <div class="ck-cat-head">
              <label class="ck-switch">
                <input type="checkbox" id="ck-perso" checked>
                <span class="slider"></span>
              </label>
              <div>
                <strong>Personnalisation</strong>
                <small>Recommandations produits basées sur votre profil</small>
              </div>
            </div>
          </div>

          <div class="ck-actions">
            <button class="ck-btn ck-accept" onclick="window.SentewCookies.savePreferences()">
              <i data-lucide="check"></i> Enregistrer mes choix
            </button>
            <button class="ck-btn ck-refuse" onclick="window.SentewCookies.acceptAll()">
              <i data-lucide="check-check"></i> Tout accepter
            </button>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #sentew-cookies-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-end;justify-content:center;transition:opacity .3s;animation:ckFadeIn .4s}
      @keyframes ckFadeIn{from{opacity:0}to{opacity:1}}
      #sentew-cookies-modal .ck-overlay{position:absolute;inset:0;background:rgba(10,31,23,0.6);backdrop-filter:blur(4px)}
      #sentew-cookies-modal .ck-panel{position:relative;background:#ffffff;border-radius:24px 24px 0 0;max-width:520px;width:100%;padding:24px 20px;box-shadow:0 -20px 60px rgba(0,0,0,0.25);animation:ckSlideUp .4s;max-height:90vh;overflow-y:auto}
      @keyframes ckSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      #sentew-cookies-modal .ck-icon{font-size:40px;text-align:center;margin-bottom:10px}
      #sentew-cookies-modal h2{color:#0f6b4e;font-size:20px;font-weight:800;margin:0 0 10px;text-align:center;display:flex;align-items:center;justify-content:center;gap:8px}
      #sentew-cookies-modal p{color:#4a5a52;font-size:14px;line-height:1.5;margin:0 0 20px;text-align:center}
      #sentew-cookies-modal .ck-sub{margin-bottom:16px}
      #sentew-cookies-modal .ck-actions{display:flex;flex-direction:column;gap:8px;margin:16px 0 12px}
      #sentew-cookies-modal .ck-btn{padding:13px;border:none;border-radius:12px;font-weight:800;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
      #sentew-cookies-modal .ck-accept{background:linear-gradient(135deg,#0f6b4e,#0a4d38);color:#fff;box-shadow:0 4px 12px rgba(15,107,78,.3)}
      #sentew-cookies-modal .ck-refuse{background:#f5f5f0;color:#4a5a52;border:1px solid #e5e5e0}
      #sentew-cookies-modal .ck-prefs{background:transparent;color:#0f6b4e;border:1.5px solid #0f6b4e}
      #sentew-cookies-modal .ck-footer{font-size:11px;color:#4a5a52;text-align:center;margin-top:8px}
      #sentew-cookies-modal .ck-footer a{color:#0f6b4e;font-weight:700;text-decoration:none}
      #sentew-cookies-modal .ck-category{padding:12px;background:#f5f5f0;border-radius:12px;margin-bottom:8px;border:1px solid #e5e5e0}
      #sentew-cookies-modal .ck-cat-head{display:flex;align-items:center;gap:12px}
      #sentew-cookies-modal .ck-cat-head strong{display:block;color:#0a1f17;font-size:14px}
      #sentew-cookies-modal .ck-cat-head small{display:block;color:#4a5a52;font-size:12px;margin-top:2px}
      #sentew-cookies-modal .ck-switch{position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0}
      #sentew-cookies-modal .ck-switch input{opacity:0;width:0;height:0}
      #sentew-cookies-modal .ck-switch .slider{position:absolute;cursor:pointer;inset:0;background:#a3b8ac;border-radius:24px;transition:.3s}
      #sentew-cookies-modal .ck-switch .slider:before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}
      #sentew-cookies-modal .ck-switch input:checked + .slider{background:#0f6b4e}
      #sentew-cookies-modal .ck-switch input:checked + .slider:before{transform:translateX(20px)}
      #sentew-cookies-modal .ck-switch input:disabled + .slider{background:#c8f0d8;cursor:not-allowed}
      @media (min-width:520px){
        #sentew-cookies-modal{align-items:center}
        #sentew-cookies-modal .ck-panel{border-radius:24px;max-width:480px}
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
  }

  // API publique
  window.SentewCookies = {
    show: buildModal,
    hide: hideModal,
    acceptAll,
    refuseAll,
    savePreferences,
    showPreferences,
    hasConsent,
    getConsent: () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
      catch(e) { return null; }
    },
    reset: () => localStorage.removeItem(STORAGE_KEY)
  };

  // Auto-show au chargement si pas de consentement
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!hasConsent()) buildModal();
    }, 800);
  });

  console.log('[SEN TEW] Cookies modal v46 loaded');
})();
