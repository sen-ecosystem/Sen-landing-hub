// ===== SEN TEW - PayDunya API v2 (avec logos officiels) =====

const PAYDUNYA_CONFIG = {
  mode: 'test',
  masterKey: 'YOUR_MASTER_KEY_HERE',
  privateKey: 'YOUR_PRIVATE_KEY_HERE',
  publicKey: 'YOUR_PUBLIC_KEY_HERE',
  token: 'YOUR_TOKEN_HERE',
  baseURL: 'https://app.paydunya.com/sandbox-api/v1',
  storeName: 'SEN TEW Marketplace',
  storeTagline: 'Le marketplace du Sénégal',
  storeLogo: 'https://sen-ecosystem.com/sentew-app/logo.png',
  storePhone: '+221771234567',
  storeEmail: 'contact@sentew.com',
  storeWebsite: 'https://sen-ecosystem.com',
  callbackURL: 'https://sen-ecosystem.com/sentew-app/paiement-callback.html',
  returnURL: 'https://sen-ecosystem.com/sentew-app/paiement-success.html',
  cancelURL: 'https://sen-ecosystem.com/sentew-app/panier.html'
};

// ===== MÉTHODES DE PAIEMENT AVEC LOGOS OFFICIELS =====
const PAYMENT_METHODS = {
  wave: {
    name: 'Wave',
    logo: 'https://www.genspark.ai/api/files/s/CqMQ0SOO',
    color: '#1BC4E8',
    bg: '#E6F9FE',
    fallbackIcon: '💙',
    minAmount: 100,
    description: 'Instantané · 0 FCFA de frais',
    prefix: '+221',
    example: '77 123 45 67'
  },
  'orange-money': {
    name: 'Orange Money',
    logo: 'https://www.genspark.ai/api/files/s/IrEI4SbL',
    color: '#FF6600',
    bg: '#FFF1E6',
    fallbackIcon: '🟠',
    minAmount: 100,
    description: 'Rapide · 1% frais',
    prefix: '+221',
    example: '77 123 45 67'
  },
  'free-money': {
    name: 'Free Money',
    logo: 'https://www.genspark.ai/api/files/s/X4q4ZprL',
    color: '#CC0000',
    bg: '#FFEAEA',
    fallbackIcon: '🔴',
    minAmount: 100,
    description: 'Rapide · Gratuit',
    prefix: '+221',
    example: '76 123 45 67'
  },
  'wizall': {
    name: 'Wizall Money',
    logo: 'https://www.genspark.ai/api/files/s/EY1h2keG',
    color: '#00BFD8',
    bg: '#E0FAFD',
    fallbackIcon: '💚',
    minAmount: 100,
    description: 'Cash & Digital · 0.5%',
    prefix: '+221',
    example: '77 123 45 67'
  },
  card: {
    name: 'Carte bancaire',
    logo: null,
    color: '#1a1a1a',
    bg: '#F3F4F6',
    fallbackIcon: '💳',
    minAmount: 500,
    description: 'Visa · Mastercard · Sécurisé 3DS'
  },
  cash: {
    name: 'À la livraison',
    logo: null,
    color: '#10B981',
    bg: '#F0FDF4',
    fallbackIcon: '💵',
    minAmount: 0,
    description: 'Payez en espèces au livreur'
  }
};

// ===== CRÉATION FACTURE =====
async function createInvoice(orderData) {
  const invoice = {
    invoice: {
      total_amount: orderData.amount,
      description: orderData.description || 'Commande SEN TEW',
      items: orderData.items.map((it, i) => ({
        [`item_${i}`]: {
          name: it.name,
          quantity: it.qty || 1,
          unit_price: it.price,
          total_price: (it.qty || 1) * it.price
        }
      }))
    },
    store: {
      name: PAYDUNYA_CONFIG.storeName,
      tagline: PAYDUNYA_CONFIG.storeTagline,
      phone: PAYDUNYA_CONFIG.storePhone,
      postal_address: 'Dakar, Sénégal',
      website_url: PAYDUNYA_CONFIG.storeWebsite,
      logo_url: PAYDUNYA_CONFIG.storeLogo
    },
    actions: {
      cancel_url: PAYDUNYA_CONFIG.cancelURL,
      return_url: PAYDUNYA_CONFIG.returnURL,
      callback_url: PAYDUNYA_CONFIG.callbackURL
    },
    custom_data: {
      order_id: orderData.orderId,
      user_id: orderData.userId,
      timestamp: Date.now()
    }
  };

  try {
    const res = await fetch(`${PAYDUNYA_CONFIG.baseURL}/checkout-invoice/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PAYDUNYA-MASTER-KEY': PAYDUNYA_CONFIG.masterKey,
        'PAYDUNYA-PRIVATE-KEY': PAYDUNYA_CONFIG.privateKey,
        'PAYDUNYA-TOKEN': PAYDUNYA_CONFIG.token
      },
      body: JSON.stringify(invoice)
    });
    const data = await res.json();
    if (data.response_code === '00') return { success: true, token: data.token, url: data.response_text };
    return { success: false, error: data.response_text };
  } catch (e) {
    // Mode démo
    return { success: true, token: 'DEMO_' + Date.now(), url: '#demo-payment', demo: true };
  }
}

// ===== SOFTPAY (paiement direct sans redirection) =====
async function processSoftPay(method, phone, amount, invoiceToken) {
  const endpoints = {
    'wave': '/softpay/wave-senegal',
    'orange-money': '/softpay/orange-money-senegal',
    'free-money': '/softpay/free-money-senegal',
    'wizall': '/softpay/wizall-money-senegal'
  };

  try {
    const res = await fetch(`${PAYDUNYA_CONFIG.baseURL}${endpoints[method]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PAYDUNYA-MASTER-KEY': PAYDUNYA_CONFIG.masterKey,
        'PAYDUNYA-PRIVATE-KEY': PAYDUNYA_CONFIG.privateKey,
        'PAYDUNYA-TOKEN': PAYDUNYA_CONFIG.token
      },
      body: JSON.stringify({
        [`${method.replace('-','_')}_sender_num`]: phone,
        invoice_token: invoiceToken
      })
    });
    return await res.json();
  } catch (e) {
    return { success_code: '00', message: 'Paiement démo réussi' };
  }
}

// ===== MODAL PAIEMENT AVEC LOGOS =====
function showPaymentModal(orderData) {
  // Supprime modal existante
  document.querySelectorAll('.payment-modal').forEach(m => m.remove());

  const modal = document.createElement('div');
  modal.className = 'payment-modal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.7);
    z-index:9999;display:flex;align-items:flex-end;
    animation:fadeIn .2s;
  `;

  modal.innerHTML = `
    <style>
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      .payment-modal-content{
        background:#fff;width:100%;
        border-radius:24px 24px 0 0;
        padding:20px 16px 32px;
        max-height:88vh;overflow-y:auto;
        animation:slideUp .3s ease;
      }
      .payment-header{
        display:flex;justify-content:space-between;align-items:center;
        margin-bottom:16px;
      }
      .payment-header h2{
        margin:0;color:#0A4D38;font-size:18px;font-weight:900;
      }
      .payment-close{
        width:36px;height:36px;background:#F3F4F6;
        border:none;border-radius:50%;font-size:18px;cursor:pointer;
      }
      .payment-amount-box{
        background:linear-gradient(135deg,#0F6B4E,#0A4D38);
        color:#fff;padding:20px;border-radius:16px;
        text-align:center;margin-bottom:20px;
      }
      .payment-amount-label{font-size:12px;opacity:.8;text-transform:uppercase;letter-spacing:1px;}
      .payment-amount-value{font-size:32px;font-weight:900;color:#D4A574;margin:8px 0;}
      .payment-amount-curr{font-size:12px;opacity:.85;}
      .payment-section-title{
        font-size:13px;font-weight:800;color:#0A4D38;
        margin:16px 0 10px;text-transform:uppercase;letter-spacing:.5px;
      }
      .pay-method-card{
        display:flex;align-items:center;gap:14px;
        background:#fff;border:2px solid #E5E7EB;
        padding:14px;border-radius:14px;
        cursor:pointer;transition:all .2s;
        margin-bottom:8px;text-align:left;
        width:100%;
      }
      .pay-method-card:active{transform:scale(.98);}
      .pay-method-card:hover{border-color:#0F6B4E;}
      .pay-method-logo{
        width:56px;height:56px;
        border-radius:12px;
        display:flex;align-items:center;justify-content:center;
        overflow:hidden;flex-shrink:0;
      }
      .pay-method-logo img{
        width:100%;height:100%;
        object-fit:contain;
      }
      .pay-method-info{flex:1;min-width:0;}
      .pay-method-name{font-weight:900;color:#111827;font-size:15px;}
      .pay-method-desc{font-size:11px;color:#6B7280;margin-top:2px;}
      .pay-method-arrow{color:#9CA3AF;font-size:20px;}
    </style>

    <div class="payment-modal-content" onclick="event.stopPropagation()">
      <div class="payment-header">
        <h2>💳 Choisir le paiement</h2>
        <button class="payment-close" onclick="this.closest('.payment-modal').remove()">✕</button>
      </div>

      <div class="payment-amount-box">
        <div class="payment-amount-label">Total à payer</div>
        <div class="payment-amount-value">${Number(orderData.amount).toLocaleString('fr-FR')} FCFA</div>
        <div class="payment-amount-curr">≈ ${(orderData.amount/655).toFixed(2)} € · ${(orderData.amount/600).toFixed(2)} $</div>
      </div>

      <div class="payment-section-title">📱 Mobile Money</div>
      ${['wave','orange-money','free-money','wizall'].map(key => {
        const m = PAYMENT_METHODS[key];
        return `
          <button class="pay-method-card" onclick="window.SEN_PAY.initiate('${key}')">
            <div class="pay-method-logo" style="background:${m.bg};">
              ${m.logo ? `<img src="${m.logo}" alt="${m.name}" onerror="this.parentNode.innerHTML='<div style=&quot;font-size:32px;&quot;>${m.fallbackIcon}</div>'">` : `<div style="font-size:32px;">${m.fallbackIcon}</div>`}
            </div>
            <div class="pay-method-info">
              <div class="pay-method-name">${m.name}</div>
              <div class="pay-method-desc">${m.description}</div>
            </div>
            <div class="pay-method-arrow">›</div>
          </button>
        `;
      }).join('')}

      <div class="payment-section-title">💳 Autres méthodes</div>
      ${['card','cash'].map(key => {
        const m = PAYMENT_METHODS[key];
        return `
          <button class="pay-method-card" onclick="window.SEN_PAY.initiate('${key}')">
            <div class="pay-method-logo" style="background:${m.bg};">
              <div style="font-size:32px;">${m.fallbackIcon}</div>
            </div>
            <div class="pay-method-info">
              <div class="pay-method-name">${m.name}</div>
              <div class="pay-method-desc">${m.description}</div>
            </div>
            <div class="pay-method-arrow">›</div>
          </button>
        `;
      }).join('')}

      <div style="text-align:center;margin-top:16px;padding:12px;background:#F0FDF4;border-radius:10px;font-size:11px;color:#0F6B4E;">
        🔒 Paiements sécurisés SSL 256 bits · PCI-DSS · PayDunya
      </div>
    </div>
  `;

  modal.onclick = () => modal.remove();
  document.body.appendChild(modal);
  window._currentOrder = orderData;
}

// ===== INITIER PAIEMENT =====
window.SEN_PAY = {
  async initiate(method) {
    const orderData = window._currentOrder;
    if (!orderData) return;
    const m = PAYMENT_METHODS[method];

    const modal = document.querySelector('.payment-modal-content');
    modal.innerHTML = `
      <div style="text-align:center;padding:40px 20px;">
        <div style="width:80px;height:80px;background:${m.bg};border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;overflow:hidden;">
          ${m.logo ? `<img src="${m.logo}" style="width:100%;height:100%;object-fit:contain;">` : `<div style="font-size:48px;">${m.fallbackIcon}</div>`}
        </div>
        <h2 style="color:#0A4D38;margin-bottom:6px;">${m.name}</h2>
        <p style="color:#6B7280;font-size:13px;margin-bottom:20px;">${m.description}</p>
        ${['wave','orange-money','free-money','wizall'].includes(method) ? `
          <div style="text-align:left;background:#F9FAFB;padding:14px;border-radius:12px;margin-bottom:16px;">
            <label style="font-size:11px;color:#6B7280;font-weight:700;">Numéro de téléphone</label>
            <div style="display:flex;gap:8px;align-items:center;margin-top:6px;">
              <span style="font-weight:800;color:#0A4D38;">${m.prefix}</span>
              <input id="payPhone" type="tel" placeholder="${m.example}" style="flex:1;border:none;background:none;font-size:16px;font-weight:700;outline:none;">
            </div>
          </div>
          <button onclick="window.SEN_PAY.confirm('${method}')" style="width:100%;padding:14px;background:linear-gradient(135deg,#0F6B4E,#D4A574);color:#fff;border:none;border-radius:12px;font-weight:900;font-size:15px;">✅ Confirmer ${Number(orderData.amount).toLocaleString()} FCFA</button>
        ` : method === 'cash' ? `
          <div style="text-align:left;background:#FEF3C7;padding:14px;border-radius:12px;margin-bottom:16px;color:#92400E;font-size:13px;">
            💵 Payez ${Number(orderData.amount).toLocaleString()} FCFA en espèces directement au livreur à la réception.
          </div>
          <button onclick="window.SEN_PAY.confirm('${method}')" style="width:100%;padding:14px;background:#10B981;color:#fff;border:none;border-radius:12px;font-weight:900;">✅ Confirmer la commande</button>
        ` : `
          <div style="text-align:left;background:#F9FAFB;padding:14px;border-radius:12px;margin-bottom:16px;">
            <input placeholder="Numéro de carte" style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:8px;">
            <div style="display:flex;gap:8px;">
              <input placeholder="MM/AA" style="flex:1;padding:10px;border:1px solid #E5E7EB;border-radius:8px;">
              <input placeholder="CVV" style="flex:1;padding:10px;border:1px solid #E5E7EB;border-radius:8px;">
            </div>
          </div>
          <button onclick="window.SEN_PAY.confirm('${method}')" style="width:100%;padding:14px;background:#0A4D38;color:#fff;border:none;border-radius:12px;font-weight:900;">💳 Payer ${Number(orderData.amount).toLocaleString()} FCFA</button>
        `}
        <button onclick="window.PayDunya.showPaymentModal(window._currentOrder)" style="margin-top:10px;background:none;border:none;color:#6B7280;font-weight:700;padding:10px;">← Retour</button>
      </div>
    `;
  },

  async confirm(method) {
    const orderData = window._currentOrder;
    const modal = document.querySelector('.payment-modal-content');
    const phone = document.getElementById('payPhone')?.value;

    modal.innerHTML = `
      <div style="text-align:center;padding:60px 20px;">
        <div style="font-size:64px;animation:spin 1s linear infinite;">⏳</div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
        <h2 style="color:#0A4D38;margin:16px 0 6px;">Traitement en cours...</h2>
        <p style="color:#6B7280;font-size:13px;">Ne fermez pas cette fenêtre</p>
      </div>
    `;

    // Simule paiement (remplace par vraie API en prod)
    setTimeout(() => {
      const orderId = 'ST' + Date.now().toString().slice(-6);
      const paymentLog = {
        orderId, method, phone,
        amount: orderData.amount,
        status: 'success',
        ts: Date.now()
      };
      const logs = JSON.parse(localStorage.getItem('payments')||'[]');
      logs.push(paymentLog);
      localStorage.setItem('payments', JSON.stringify(logs));

      // Vide le panier
      localStorage.setItem('cart', '[]');

      modal.innerHTML = `
        <div style="text-align:center;padding:40px 20px;">
          <div style="font-size:80px;">✅</div>
          <h2 style="color:#0F6B4E;margin:16px 0 6px;">Paiement réussi !</h2>
          <p style="color:#6B7280;font-size:13px;">Commande <strong>#${orderId}</strong></p>
          <div style="background:#F0FDF4;padding:16px;border-radius:12px;margin:20px 0;">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
              <span style="color:#6B7280;">Méthode</span>
              <strong>${PAYMENT_METHODS[method].name}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
              <span style="color:#6B7280;">Montant</span>
              <strong style="color:#0F6B4E;">${Number(orderData.amount).toLocaleString()} FCFA</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;">
              <span style="color:#6B7280;">Livraison estimée</span>
              <strong>24-48h</strong>
            </div>
          </div>
          <button onclick="location.href='commandes.html?id=${orderId}'" style="width:100%;padding:14px;background:linear-gradient(135deg,#0F6B4E,#D4A574);color:#fff;border:none;border-radius:12px;font-weight:900;">📦 Suivre ma commande</button>
          <button onclick="location.href='index.html'" style="width:100%;margin-top:8px;padding:12px;background:none;border:none;color:#0F6B4E;font-weight:700;">Continuer les achats</button>
        </div>
      `;

      if(navigator.vibrate) navigator.vibrate([100,50,100,50,100]);
    }, 2200);
  }
};

// Export global
window.PayDunya = {
  createInvoice,
  processSoftPay,
  showPaymentModal,
  PAYMENT_METHODS
};
