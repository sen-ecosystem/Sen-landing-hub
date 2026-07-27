// SEN TEW - Traduction multilingue
const translations = {
  fr: {
    home:'Accueil', categories:'Catégories', cart:'Panier', messages:'Messages', profile:'Profil',
    search:'Rechercher un produit...', hello:'Bonjour', looking:'Que cherchez-vous aujourd\'hui ?',
    all:'Tous', promo:'En promo', new:'Neuf', used:'Occasion', top:'Top', local:'Local',
    popular:'Populaires', seeAll:'Voir tout', addCart:'Ajouter au panier', buyNow:'Acheter maintenant',
    similar:'Produits similaires', stock:'En stock', limited:'Stock limité', reviews:'avis',
    notifications:'Notifications', orders:'Mes commandes', favorites:'Mes favoris',
    wallet:'Portefeuille', loyalty:'Fidélité', settings:'Paramètres', security:'Sécurité',
    logout:'Se déconnecter', language:'Langue', country:'Pays', currency:'Devise',
    total:'Total', subtotal:'Sous-total', delivery:'Livraison', discount:'Réduction',
    payNow:'Payer maintenant', track:'Suivre', contact:'Contact', review:'Avis'
  },
  wo: {
    home:'Kër', categories:'Kategori yi', cart:'Panier', messages:'Mbind yi', profile:'Sama profil',
    search:'Wut ci marsandiis...', hello:'Asalaa malekum', looking:'Loo di wut tay ?',
    all:'Ñépp', promo:'Bees', new:'Bees bees', used:'Bu jekk', top:'Ci kaw', local:'Fii',
    popular:'Yi ëpp bax', seeAll:'Xoolal ñépp', addCart:'Yóbbal ci panier', buyNow:'Jënd léegi',
    similar:'Ni mel', stock:'Am na', limited:'Néew na', reviews:'ay wax',
    notifications:'Yónnal yi', orders:'Ay commande yu ma', favorites:'Yi ma bax',
    wallet:'Xaalis', loyalty:'Fidelite', settings:'Paramètres', security:'Sûreté',
    logout:'Génnal', language:'Làkk', country:'Réew', currency:'Xaalis',
    total:'Yépp', subtotal:'Ay yépp', delivery:'Yebbi', discount:'Wàñi',
    payNow:'Fay léegi', track:'Toppatoo', contact:'Contact', review:'Wax'
  },
  en: {
    home:'Home', categories:'Categories', cart:'Cart', messages:'Messages', profile:'Profile',
    search:'Search product...', hello:'Hello', looking:'What are you looking for today?',
    all:'All', promo:'On sale', new:'New', used:'Used', top:'Top', local:'Local',
    popular:'Popular', seeAll:'See all', addCart:'Add to cart', buyNow:'Buy now',
    similar:'Similar products', stock:'In stock', limited:'Low stock', reviews:'reviews',
    notifications:'Notifications', orders:'My orders', favorites:'Favorites',
    wallet:'Wallet', loyalty:'Loyalty', settings:'Settings', security:'Security',
    logout:'Log out', language:'Language', country:'Country', currency:'Currency',
    total:'Total', subtotal:'Subtotal', delivery:'Delivery', discount:'Discount',
    payNow:'Pay now', track:'Track', contact:'Contact', review:'Review'
  },
  ar: {
    home:'الرئيسية', categories:'الفئات', cart:'السلة', messages:'الرسائل', profile:'الملف',
    search:'بحث عن منتج...', hello:'مرحبا', looking:'ماذا تبحث عنه اليوم؟',
    all:'الكل', promo:'تخفيضات', new:'جديد', used:'مستعمل', top:'الأفضل', local:'محلي',
    popular:'الأكثر شعبية', seeAll:'عرض الكل', addCart:'أضف للسلة', buyNow:'اشتري الآن',
    similar:'منتجات مشابهة', stock:'متوفر', limited:'مخزون محدود', reviews:'تقييم',
    notifications:'الإشعارات', orders:'طلباتي', favorites:'المفضلة',
    wallet:'المحفظة', loyalty:'الولاء', settings:'الإعدادات', security:'الأمان',
    logout:'تسجيل الخروج', language:'اللغة', country:'البلد', currency:'العملة',
    total:'الإجمالي', subtotal:'المجموع الفرعي', delivery:'التوصيل', discount:'خصم',
    payNow:'ادفع الآن', track:'تتبع', contact:'اتصال', review:'تقييم'
  }
};

function getLang(){ return localStorage.getItem('sentew_lang') || 'fr'; }
function setLang(l){ localStorage.setItem('sentew_lang', l); applyTranslations(); }
function t(key){ return (translations[getLang()] || translations.fr)[key] || key; }

function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    el.textContent = t(k);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(k);
  });
  // RTL for Arabic
  document.documentElement.dir = getLang()==='ar' ? 'rtl' : 'ltr';
}

document.addEventListener('DOMContentLoaded', applyTranslations);
