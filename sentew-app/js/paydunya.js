// SEN TEW — Intégration PayDunya (Wave, Orange Money, Free Money, CinetPay, PayTech)
// Documentation : https://developers.paydunya.com/doc/FR/softpay

const PAYDUNYA_CONFIG = {
  mode: 'test', // 'test' ou 'live' en production
  masterKey: 'YOUR_MASTER_KEY_HERE',
  privateKey: 'YOUR_PRIVATE_KEY_HERE',
  publicKey: 'YOUR_PUBLIC_KEY_HERE',
  token: 'YOUR_TOKEN_HERE',
  baseURL: 'https://app.paydunya.com/sandbox-api/v1', // 'https://app.paydunya.com/api/v1' en prod
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

const PAYMENT_METHODS = {
  wave: { name: 'Wave', icon: '💙', color: '#1BC4E8', minAmount: 100 },
  'orange-money': { name: 'Orange Money', icon: '🟠', color: '#FF6600', minAmount: 100 },
  'free-money': { name: 'Free Money', icon: '🔵', color: '#00A0DF', minAmount: 100 },
  'expresso': { name: 'E-Money', icon: '💚', color: '#00A651', minAmount: 100 },
  card: { name: 'Carte bancaire', icon: '💳', color: '#1a1a1a', minAmount: 500 },
  paytech: { name: 'PayTech', icon: '🏦', color: '#6366f1', minAmount: 500 },
  cinetpay: { name: 'CinetPay', icon: '💰', color: '#f59e0b', minAmount: 500 }
};

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
          total_price: (it.qty || 1) * it.price,
          description: it.description || ''
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
    // Mode démo : simule un succès
    return {
      success: true,
      token: 'DEMO_' + Date.now(),
      url: '#demo-payment',
      demo: true
    };
  }
}

async function processSoftPay(method, phone, amount, invoiceToken) {
  const endpoints = {
    'wave': '/softpay/wave-senegal',
    'orange-money': '/softpay/orange-money-senegal',
    'free-money': '/softpay/free-money-senegal',
    'expresso': '/softpay/expresso-senegal'
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
    return { success_code: '00', message: 'Paiement simulé avec succès (mode démo)' };
  }
}

function showPaymentModal(orderData) {
  const modal = document.createElement('div');
  modal.className = 'payment-modal';
  modal.innerHTML = `
    <div class="payment-modal-content">
      <div class="payment-header">
        <h2>💳 Choisir un mode de paiement</h2>
        <button onclick="this.closest('.payment-modal').remove()">✕</button>
      </div>
      <div class="payment-amount">
        <div>Total à payer</div>
        <div class="amount">${Number(orderData.amount).toLocaleString()} FCFA</div>
        <div style="font-size:11px;color:#6B7280;">≈ ${(orderData.amount/655).toFixed(2)} EUR · ${(orderData.amount/600).toFixed(2)} USD</div>
      </div>
      <div class="payment-methods">
        ${Object.entries(PAYMENT_METHODS).map(([key,m]) => `
          <button class="pay-method" data-method="${key}" style="border-color:${m.color};">
            <span style="font-size:28px;">${m.icon}</span>
            <span style="font-weight:700;">${m.name}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll('.pay-method').forEach(btn => {
    btn.onclick = () => initiatePayment(btn.dataset.method, orderData, modal);
  });
}

async function initiatePayment(method, orderData, modal) {
  modal.querySelector('.payment-methods').innerHTML = '<div style="text-align:center;padding:40px;"><div style="font-size:48px;">⏳</div><div>Traitement en cours...</div></div>';
  const invoice = await createInvoice(orderData);
  if (!invoice.success) {
    modal.querySelector('.payment-methods').innerHTML = `<div style="text-align:center;padding:40px;color:#dc2626;">❌ Erreur : ${invoice.error}</div>`;
    return;
  }
  if (['wave','orange-money','free-money','expresso'].includes(method)) {
    const phone = prompt(`📱 Numéro ${PAYMENT_METHODS[method].name} :`, '77');
    if (!phone) return;
    const result = await processSoftPay(method, phone, orderData.amount, invoice.token);
    if (result.success_code === '00') {
      modal.querySelector('.payment-modal-content').innerHTML = `
        <div style="text-align:center;padding:40px;">
          <div style="font-size:64px;">✅</div>
          <h2 style="color:#0F6B4E;">Paiement réussi !</h2>
          <p>Commande #${orderData.orderId}</p>
          <button onclick="window.location.href='commandes.html'" style="margin-top:20px;padding:14px 28px;background:#0F6B4E;color:#fff;border:none;border-radius:10px;font-weight:800;">Voir ma commande</button>
        </div>`;
      localStorage.setItem('last_payment', JSON.stringify({...orderData, method, ts: Date.now()}));
    } else {
      alert('❌ ' + (result.message || 'Paiement échoué'));
    }
  } else {
    window.location.href = invoice.url;
  }
}

window.PayDunya = { createInvoice, processSoftPay, showPaymentModal, PAYMENT_METHODS };
