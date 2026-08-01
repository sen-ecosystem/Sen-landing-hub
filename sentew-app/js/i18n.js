// ===== SEN TEW - Traductions complètes 4 langues =====

const I18N = {
  FR: {
    // Navigation
    home:'Accueil', categories:'Catégories', cart:'Panier',
    messages:'Messages', profile:'Profil', notifications:'Notifications',
    // Actions
    search:'Rechercher un produit...', buy:'Acheter', buy_now:'Acheter maintenant',
    add_cart:'Ajouter au panier', follow:'Suivre', following:'Suivi',
    message:'Message', call:'Appeler', share:'Partager', edit:'Éditer',
    delete:'Supprimer', save:'Enregistrer', cancel:'Annuler', confirm:'Confirmer',
    // Product
    live:'LIVE', products:'Produits', reviews:'Avis', trending:'Tendances',
    new:'Nouveau', promo:'Promo', similar:'Produits similaires',
    description:'Description', delivery:'Livraison', stock:'Stock',
    price:'Prix', total:'Total', quantity:'Quantité', size:'Taille',
    color:'Couleur', bundle:'Souvent achetés ensemble',
    // Seller
    seller:'Vendeur', shop:'Boutique', followers:'Abonnés', sales:'Ventes',
    rating:'Note', verified:'SEN Verified',
    // Payment
    payment:'Paiement', pay_method:'Méthode de paiement',
    wave:'Wave', orange:'Orange Money', free:'Free Money', wizall:'Wizall Money',
    card:'Carte bancaire', cash:'À la livraison',
    // Status
    pending:'En attente', shipping:'En route', delivered:'Livré',
    cancelled:'Annulé', refunded:'Remboursé',
    // Messages
    welcome:'Bienvenue sur SEN TEW', empty_cart:'Panier vide',
    success:'Succès !', error:'Erreur', loading:'Chargement...'
  },
  WO: {
    home:'Kër', categories:'Xéet yi', cart:'Panier',
    messages:'Bataaxal', profile:'Sama Kër', notifications:'Xibaar yi',
    search:'Wutu mbir...', buy:'Jënd', buy_now:'Jënd léegi',
    add_cart:'Yokk ci panier', follow:'Toppatoo', following:'Toppatoo naa',
    message:'Bind bataaxal', call:'Woote', share:'Séddoo', edit:'Soppi',
    delete:'Farr', save:'Denc', cancel:'Bàyyi', confirm:'Dëggal',
    live:'CI LOOL', products:'Mbir yi', reviews:'Xam-xam yi', trending:'Yëngu-yëngu',
    new:'Bees', promo:'Wàññi', similar:'Yu dañuy mel',
    description:'Kàddu wu bir', delivery:'Yóbbal', stock:'Denc',
    price:'Njëg', total:'Lu tolluwaay', quantity:'Ñaata', size:'Rey',
    color:'Melo', bundle:'Añs jënd',
    seller:'Kilifa gu jaay', shop:'Bitiik', followers:'Ñi topp', sales:'Njënd',
    rating:'Xayma', verified:'SEN Kalaame',
    payment:'Fay', pay_method:'Ni ngay fay',
    wave:'Wave', orange:'Orange Money', free:'Free Money', wizall:'Wizall',
    card:'Kartu bank', cash:'Fay ci yóbbal',
    pending:'Xool na', shipping:'Ci yoon', delivered:'Yóbbal na',
    cancelled:'Farr na', refunded:'Delloo na',
    welcome:'Dalal ak jamm ci SEN TEW', empty_cart:'Panier bi dafa neex',
    success:'Baax na !', error:'Njuum', loading:'Xool na...'
  },
  EN: {
    home:'Home', categories:'Categories', cart:'Cart',
    messages:'Messages', profile:'Profile', notifications:'Notifications',
    search:'Search products...', buy:'Buy', buy_now:'Buy Now',
    add_cart:'Add to cart', follow:'Follow', following:'Following',
    message:'Message', call:'Call', share:'Share', edit:'Edit',
    delete:'Delete', save:'Save', cancel:'Cancel', confirm:'Confirm',
    live:'LIVE', products:'Products', reviews:'Reviews', trending:'Trending',
    new:'New', promo:'Sale', similar:'Similar products',
    description:'Description', delivery:'Delivery', stock:'Stock',
    price:'Price', total:'Total', quantity:'Quantity', size:'Size',
    color:'Color', bundle:'Frequently bought together',
    seller:'Seller', shop:'Shop', followers:'Followers', sales:'Sales',
    rating:'Rating', verified:'SEN Verified',
    payment:'Payment', pay_method:'Payment method',
    wave:'Wave', orange:'Orange Money', free:'Free Money', wizall:'Wizall Money',
    card:'Credit card', cash:'Cash on delivery',
    pending:'Pending', shipping:'Shipping', delivered:'Delivered',
    cancelled:'Cancelled', refunded:'Refunded',
    welcome:'Welcome to SEN TEW', empty_cart:'Cart is empty',
    success:'Success!', error:'Error', loading:'Loading...'
  },
  AR: {
    home:'الرئيسية', categories:'الفئات', cart:'السلة',
    messages:'الرسائل', profile:'الملف الشخصي', notifications:'الإشعارات',
    search:'ابحث عن منتج...', buy:'شراء', buy_now:'اشتري الآن',
    add_cart:'أضف للسلة', follow:'متابعة', following:'متابع',
    message:'رسالة', call:'اتصال', share:'مشاركة', edit:'تعديل',
    delete:'حذف', save:'حفظ', cancel:'إلغاء', confirm:'تأكيد',
    live:'مباشر', products:'المنتجات', reviews:'التقييمات', trending:'الرائج',
    new:'جديد', promo:'تخفيض', similar:'منتجات مماثلة',
    description:'الوصف', delivery:'التوصيل', stock:'المخزون',
    price:'السعر', total:'المجموع', quantity:'الكمية', size:'المقاس',
    color:'اللون', bundle:'يشترى معًا في الغالب',
    seller:'البائع', shop:'المتجر', followers:'المتابعون', sales:'المبيعات',
    rating:'التقييم', verified:'موثق SEN',
    payment:'الدفع', pay_method:'طريقة الدفع',
    wave:'Wave', orange:'Orange Money', free:'Free Money', wizall:'Wizall',
    card:'بطاقة ائتمانية', cash:'الدفع عند الاستلام',
    pending:'قيد الانتظار', shipping:'قيد الشحن', delivered:'تم التوصيل',
    cancelled:'ملغى', refunded:'مسترد',
    welcome:'مرحبًا بك في SEN TEW', empty_cart:'السلة فارغة',
    success:'نجح!', error:'خطأ', loading:'جار التحميل...'
  }
};

// API globale
window.T = function(key){
  const idx = parseInt(localStorage.getItem('lang_idx')||'0');
  const codes = ['FR','WO','EN','AR'];
  return (I18N[codes[idx]]||I18N.FR)[key] || key;
};

window.applyI18n = function(){
  document.querySelectorAll('[data-t]').forEach(el=>{
    const key = el.getAttribute('data-t');
    el.textContent = window.T(key);
  });
  const idx = parseInt(localStorage.getItem('lang_idx')||'0');
  document.documentElement.dir = idx===3 ? 'rtl' : 'ltr';
};

document.addEventListener('DOMContentLoaded', ()=>{
  if(window.applyI18n) window.applyI18n();
});
