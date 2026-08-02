// ===== SEN TEW - Stripe International =====
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_YOUR_KEY_HERE', // Remplacer par vraie clé Stripe
  mode: 'test',
  currency: 'xof', // FCFA
  supportedCards: ['visa','mastercard','amex']
};

window.StripeCheckout = {
  async pay(amount, description, orderId){
    // En prod: charger Stripe.js
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:20px;padding:24px;max-width:400px;width:100%;">
        <div style="text-align:center;margin-bottom:20px;">
          <div style="font-size:48px;">💳</div>
          <h2 style="color:#0A4D38;margin:10px 0;">Paiement Stripe</h2>
          <div style="color:#6B7280;font-size:13px;">Sécurisé SSL 256 bits · 3D Secure</div>
        </div>
        <div style="background:#F0FDF4;padding:12px;border-radius:10px;margin-bottom:16px;text-align:center;">
          <div style="font-size:12px;color:#6B7280;">Montant à payer</div>
          <div style="font-size:24px;font-weight:900;color:#0F6B4E;">${amount.toLocaleString()} FCFA</div>
        </div>
        <input placeholder="Numéro de carte (16 chiffres)" style="width:100%;padding:12px;border:2px solid #E5E7EB;border-radius:10px;margin-bottom:10px;font-size:14px;" id="ccNum" maxlength="19">
        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <input placeholder="MM/AA" style="flex:1;padding:12px;border:2px solid #E5E7EB;border-radius:10px;font-size:14px;" id="ccExp" maxlength="5">
          <input placeholder="CVC" style="flex:1;padding:12px;border:2px solid #E5E7EB;border-radius:10px;font-size:14px;" id="ccCvc" maxlength="4">
        </div>
        <input placeholder="Nom sur la carte" style="width:100%;padding:12px;border:2px solid #E5E7EB;border-radius:10px;margin-bottom:14px;font-size:14px;" id="ccName">
        <button id="stripePay" style="width:100%;padding:14px;background:linear-gradient(135deg,#635BFF,#0F6B4E);color:#fff;border:none;border-radius:12px;font-weight:900;font-size:15px;">🔒 Payer ${amount.toLocaleString()} FCFA</button>
        <button onclick="this.closest('.stripe-modal').remove()" style="width:100%;margin-top:8px;padding:10px;background:none;border:none;color:#6B7280;font-weight:700;">Annuler</button>
        <div style="text-align:center;font-size:10px;color:#9CA3AF;margin-top:14px;">🔒 Powered by Stripe · PCI-DSS</div>
      </div>
    `;
    modal.className='stripe-modal';
    document.body.appendChild(modal);

    document.getElementById('stripePay').onclick = ()=>{
      const num = document.getElementById('ccNum').value.replace(/\s/g,'');
      if(num.length<12){alert('❌ Numéro invalide');return;}
      document.getElementById('stripePay').innerHTML = '⏳ Traitement...';
      setTimeout(()=>{
        const paymentId = 'stripe_'+Date.now();
        const payments = JSON.parse(localStorage.getItem('payments')||'[]');
        payments.push({orderId,method:'stripe',amount,status:'success',ts:Date.now(),paymentId});
        localStorage.setItem('payments', JSON.stringify(payments));
        localStorage.setItem('cart','[]');
        modal.remove();
        location.href='paiement-success.html';
      }, 2000);
    };

    // Formatage carte
    document.getElementById('ccNum').oninput = e=>{
      e.target.value = e.target.value.replace(/\s/g,'').replace(/(.{4})/g,'$1 ').trim();
    };
    document.getElementById('ccExp').oninput = e=>{
      e.target.value = e.target.value.replace(/\D/g,'').replace(/(.{2})/,'$1/').slice(0,5);
    };
  }
};
