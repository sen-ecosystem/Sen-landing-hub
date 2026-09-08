// ============================================
// SEN TEW — FONDATION (connexion + données partagées)
// Utilisé par TOUTES les pages de l'application
// ============================================

var SUPA_URL = 'https://tjqkruhwmjzgfvtouqza.supabase.co';
var SUPA_KEY = 'sb_publishable_XCdjFFvg7Wys68uFf4Bs5A_5XHpDz9j';

// --- Lecture base de données (fetch natif, sans librairie) ---
function supa(table, query) {
  return fetch(SUPA_URL + '/rest/v1/' + table + '?' + (query || ''), {
    headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY }
  }).then(function (r) { return r.json(); })
    .catch(function () { return []; });
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
  var q = 'select=*,vendors(shop_name,slug,logo_url)&is_active=eq.true&order=created_at.desc';
  if (vendorId) q += '&vendor_id=eq.' + vendorId;
  return supa('products', q);
}
function getProduct(pidOrLegacy) {
  var q = /-/.test(pidOrLegacy)
    ? 'select=*,vendors(shop_name,slug,logo_url,rating,followers)&id=eq.' + pidOrLegacy
    : 'select=*,vendors(shop_name,slug,logo_url,rating,followers)&legacy_id=eq.' + pidOrLegacy;
  return supa('products', q).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
}

// --- Liens standardisés (TOUTE l'app utilise ces 2 fonctions) ---
function lienProduit(p) { return 'produit.html?pid=' + p.id; }
function lienBoutique(v) { return 'boutique.html?slug=' + (v.slug || v); }

// --- Format prix ---
function fmtPrix(n) { return Number(n || 0).toLocaleString('fr-FR'); }

// ============================================
// PANIER PARTAGÉ (localStorage) — même panier partout
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
// Badge rouge sur l'icône panier (automatique sur toutes les pages)
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
// FAVORIS PARTAGÉS (localStorage)
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
  return i < 0; // true = maintenant en favori
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
  else { f.push(vendor.slug); toast('✓ Tu suis ' + vendor.shop_name); }
  localStorage.setItem('sentew_follows', JSON.stringify(f));
  return i < 0;
}

// ============================================
// TOAST (notification discrète en haut)
// ============================================
function toast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;top:70px;left:50%;transform:translateX(-50%);background:#0a1f17;color:#fff;padding:11px 20px;border-radius:24px;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 4px 14px rgba(0,0,0,.3);max-width:90%;text-align:center';
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 2200);
}

// Badge panier au chargement de chaque page
document.addEventListener('DOMContentLoaded', cartBadge);
