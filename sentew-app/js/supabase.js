// ============================================
// SEN TEW — FONDATION COMPLÈTE
// connexion + données + panier + favoris + follows
// + SEN TEW Ads + calculateur de livraison
// ============================================

var SUPA_URL = 'https://tjqkruhwmjzgfvtouqza.supabase.co';
var SUPA_KEY = 'sb_publishable_XCdjFFvg7Wys68uFf4Bs5A_5XHpDz9j';

// --- Lecture base de données ---
function supa(table, query) {
  return fetch(SUPA_URL + '/rest/v1/' + table + '?' + (query || ''), {
    headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY }
  }).then(function (r) { return r.json(); })
    .catch(function () { return []; });
}

// --- Écriture base de données ---
function supaWrite(table, method, body, query) {
  return fetch(SUPA_URL + '/rest/v1/' + table + (query ? '?' + query : ''), {
    method: method,
    headers: {
      'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY,
      'Content-Type': 'application/json', 'Prefer': 'return=representation'
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(function (r) { return r.json().catch(function () { return {}; }); });
}

// --- Vendeurs ---
function getVendors() {
  return supa('vendors', 'select=*&is_verified=eq.true&order=rating.desc');
}
function getVendorBySlug(slug) {
  return supa('vendors', 'select=*&slug=eq.' + encodeURIComponent(slug))
    .then(function (rows) { return rows && rows[0] ? rows[0] : null; });
}

// --- Produits ---
function getProducts(vendorId) {
  var q = 'select=*,vendors(shop_name,slug,logo_url,plan)&is_active=eq.true&order=is_sponsored.desc,created_at.desc';
  if (vendorId) q += '&vendor_id=eq.' + vendorId;
  return supa('products', q);
}
function getProductsSorted(vendorId) { return getProducts(vendorId); }
function getProduct(pidOrLegacy) {
  var q = /-/.test(pidOrLegacy)
    ? 'select=*,vendors(shop_name,slug,logo_url,rating,followers)&id=eq.' + pidOrLegacy
    : 'select=*,vendors(shop_name,slug,logo_url,rating,followers)&legacy_id=eq.' + pidOrLegacy;
  return supa('products', q).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
}

// --- Liens standardisés ---
function lienProduit(p) { return 'produit.html?pid=' + p.id; }
function lienBoutique(v) { return 'boutique.html?slug=' + (v.slug || v); }
function fmtPrix(n) { return Number(n || 0).toLocaleString('fr-FR'); }

// ============================================
// PANIER PARTAGÉ
// ============================================
function cartGet() {
  try { return JSON.parse(localStorage.getItem('sentew_cart') || '[]'); }
  catch (e) { return []; }
}
function cartSave(items) {
  localStorage.setItem('sentew_cart', JSON.stringify(items));
  cartBadge();
}
function cartAdd(p, qty) {
  var items = cartGet();
  var found = items.find(function (i) { return i.id === p.id; });
  if (found) found.qty += (qty || 1);
  else items.push({
    id: p.id, name: p.name, price: p.price,
    img: (p.images && p.images[0]) || '',
    vendor: p.vendors ? p.vendors.shop_name : (p.vendor || ''),
    slug: p.vendors ? p.vendors.slug : '',
    free_shipping: p.free_shipping || false,
    qty: qty || 1
  });
  cartSave(items);
  toast('✅ ' + p.name + ' ajouté au panier');
}
function cartRemove(id) {
  cartSave(cartGet().filter(function (i) { return i.id !== id; }));
}
function cartQty(id, delta) {
  var items = cartGet();
  var it = items.find(function (i) { return i.id === id; });
  if (it) { it.qty = Math.max(1, it.qty + delta); cartSave(items); }
}
function cartCount() {
  return cartGet().reduce(function (s, i) { return s + i.qty; }, 0);
}
function cartTotal() {
  return cartGet().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
}
function cartBadge() {
  var n = cartCount();
  document.querySelectorAll('a[href="panier.html"]').forEach(function (a) {
    var b = a.querySelector('.cart-badge');
    if (!b) {
      b = document.createElement('span');
      b.className = 'cart-badge';
      b.style.cssText = 'position:absolute;top:0;right:8px;background:#e63946;color:#fff;font-size:9px;font-weight:800;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 4px';
      a.style.position = 'relative';
      a.appendChild(b);
    }
    b.textContent = n;
    b.style.display = n > 0 ? 'flex' : 'none';
  });
}

// ============================================
// FAVORIS PARTAGÉS
// ============================================
function favGet() {
  try { return JSON.parse(localStorage.getItem('sentew_favs') || '[]'); }
  catch (e) { return []; }
}
function favHas(id) { return favGet().some(function (f) { return f.id === id; }); }
function favToggle(p) {
  var favs = favGet();
  var i = favs.findIndex(function (f) { return f.id === p.id; });
  if (i >= 0) { favs.splice(i, 1); toast('💔 Retiré des favoris'); }
  else {
    favs.push({
      id: p.id, name: p.name, price: p.price, old_price: p.old_price || null,
      img: (p.images && p.images[0]) || '', rating: p.rating || 0,
      review_count: p.review_count || 0, sold_count: p.sold_count || 0,
      vendor: p.vendors ? p.vendors.shop_name : (p.vendor || ''),
      slug: p.vendors ? p.vendors.slug : ''
    });
    toast('❤️ Ajouté aux favoris');
  }
  localStorage.setItem('sentew_favs', JSON.stringify(favs));
  return i < 0;
}

// ============================================
// BOUTIQUES SUIVIES
// ============================================
function followGet() {
  try { return JSON.parse(localStorage.getItem('sentew_follows') || '[]'); }
  catch (e) { return []; }
}
function followHas(slug) { return followGet().indexOf(slug) >= 0; }
function followToggle(vendor) {
  var f = followGet();
  var i = f.indexOf(vendor.slug);
  if (i >= 0) { f.splice(i, 1); toast('Boutique non suivie'); }
  else { f.push(vendor.slug); toast('✓ Tu suis ' + (vendor.shop_name || 'cette boutique')); }
  localStorage.setItem('sentew_follows', JSON.stringify(f));
  return i < 0;
}

// ============================================
// TOAST
// ============================================
function toast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;top:70px;left:50%;transform:translateX(-50%);background:#0a1f17;color:#fff;padding:11px 20px;border-radius:24px;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 4px 14px rgba(0,0,0,.3);max-width:90%;text-align:center';
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 2200);
}

// ============================================
// LIVRAISON SEN TEW (modèle Jumia adapté Afrique)
// ============================================
var SHIP = {
  free_threshold: 20000,
  dakar_fee: 1500, suburb_fee: 2000,
  regions_fee_min: 2500, regions_fee_max: 5000,
  cash_fee: 1500,
  free_zones: ['Dakar','Plateau','Almadies','Ouakam','Mermoz','Sacré-Cœur','Yoff','Ngor','HLM','Médina','Grand Dakar','Parcelles Assainies'],
  suburbs: ['Pikine','Guédiawaye','Rufisque','Thiaroye','Keur Massar']
};
function loadShippingRules() {
  return supa('shipping_rules', 'id=eq.1').then(function (r) {
    if (r && r[0] && !r[0].code) {
      SHIP.free_threshold  = r[0].free_threshold;
      SHIP.dakar_fee       = r[0].dakar_fee;
      SHIP.suburb_fee      = r[0].suburb_fee;
      SHIP.regions_fee_min = r[0].regions_fee_min;
      SHIP.regions_fee_max = r[0].regions_fee_max;
      SHIP.cash_fee        = r[0].cash_fee;
      if (r[0].free_zones) SHIP.free_zones = r[0].free_zones;
    }
    return SHIP;
  }).catch(function () { return SHIP; });
}
function calcShipping(cartItems, zone, payMethod) {
  var subtotal = cartItems.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var allVendorFree = cartItems.length > 0 && cartItems.every(function (i) { return i.free_shipping; });
  var inDakar  = SHIP.free_zones.indexOf(zone) >= 0;
  var inSuburb = SHIP.suburbs.indexOf(zone) >= 0;
  var baseFee  = inDakar ? SHIP.dakar_fee : inSuburb ? SHIP.suburb_fee : SHIP.regions_fee_min;
  var res = { fee: baseFee, free: false, reason: '', cashFee: 0, progress: null };

  if (allVendorFree) {
    res.free = true; res.fee = 0;
    res.reason = '🚚 Livraison gratuite offerte par le vendeur';
  } else if (inDakar && subtotal >= SHIP.free_threshold) {
    res.free = true; res.fee = 0;
    res.reason = '🎉 Livraison gratuite : commande ≥ ' + fmtPrix(SHIP.free_threshold) + ' F';
  } else if (inDakar && payMethod === 'online') {
    res.free = true; res.fee = 0;
    res.reason = '💳 Livraison gratuite : paiement en ligne';
  } else {
    if (inDakar && subtotal < SHIP.free_threshold) {
      var rest = SHIP.free_threshold - subtotal;
      res.progress = { rest: rest, pct: Math.round(subtotal / SHIP.free_threshold * 100) };
      res.reason = 'Plus que ' + fmtPrix(rest) + ' F pour la livraison gratuite !';
    } else if (!inDakar) {
      res.reason = inSuburb ? 'Livraison banlieue' : 'Livraison régions (2-5 jours)';
    }
  }
  if (payMethod === 'cash') res.cashFee = SHIP.cash_fee;
  return res;
}

// ============================================
// SEN TEW ADS — Boosts produits
// ============================================
function boosterProduit(vendor, product) {
  var now = new Date();
  var plan = vendor.plan || 'gratuit';
  if (vendor.plan_expires_at && new Date(vendor.plan_expires_at) < now) plan = 'gratuit';

  return supa('ads_plans', 'plan=eq.' + plan).then(function (plans) {
    var p = plans && plans[0];
    if (!p || p.code) return { ok: false, msg: 'Plan introuvable' };
    var since = new Date(now);
    if (p.quota_semaine > 0) since.setDate(since.getDate() - 7);
    else since.setHours(0, 0, 0, 0);

    return supa('ads_boosts',
      'vendor_id=eq.' + vendor.id + '&started_at=gte.' + since.toISOString() + '&select=id'
    ).then(function (boosts) {
      var used = boosts ? boosts.length : 0;
      var quota = p.quota_semaine > 0 ? p.quota_semaine : p.quota_jour;
      var periode = p.quota_semaine > 0 ? 'cette semaine' : "aujourd'hui";
      if (used >= quota) {
        return { ok: false, msg: '❌ Quota épuisé : ' + quota + ' boost(s) ' + periode + ' avec le plan ' + plan.toUpperCase() };
      }
      var exp = new Date(now.getTime() + p.duree_heures * 3600 * 1000);
      return supaWrite('products', 'PATCH',
        { is_sponsored: true, sponsored_until: exp.toISOString() },
        'id=eq.' + product.id
      ).then(function () {
        return supaWrite('ads_boosts', 'POST', {
          vendor_id: vendor.id, product_id: product.id, expires_at: exp.toISOString()
        }).then(function () {
          return { ok: true, msg: '🚀 "' + product.name + '" boosté pour ' + p.duree_heures + 'h ! (' + (used + 1) + '/' + quota + ' ' + periode + ')' };
        });
      });
    });
  });
}

// Badge panier au chargement
document.addEventListener('DOMContentLoaded', cartBadge);
