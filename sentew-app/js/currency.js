// ===== SEN TEW - Système multi-devise + multi-langue global =====

const CURRENCIES = [
  {code:'FCFA', flag:'💰', rate:1, symbol:'FCFA', decimals:0},
  {code:'EUR', flag:'💶', rate:1/655, symbol:'€', decimals:2},
  {code:'USD', flag:'💵', rate:1/600, symbol:'$', decimals:2},
  {code:'MAD', flag:'🇲🇦', rate:1/60, symbol:'DH', decimals:2}
];

const LANGS = [
  {code:'FR', flag:'🇫🇷', name:'Français', dir:'ltr'},
  {code:'WO', flag:'🇸🇳', name:'Wolof', dir:'ltr'},
  {code:'EN', flag:'🇬🇧', name:'English', dir:'ltr'},
  {code:'AR', flag:'🇸🇦', name:'العربية', dir:'rtl'}
];

// Traductions basiques
const TRANSLATIONS = {
  FR: {
    home:'Accueil', categories:'Catégories', cart:'Panier', messages:'Messages', profile:'Profil',
    search:'Rechercher', buy:'Acheter', add_cart:'Ajouter au panier', follow:'Suivre',
    live:'LIVE', products:'Produits', reviews:'Avis', trending:'Tendances', new:'Nouveau'
  },
  WO: {
    home:'Kër', categories:'Xéet', cart:'Panier', messages:'Bataaxal', profile:'Sama Kër',
    search:'Wutu', buy:'Jënd', add_cart:'Yokk ci panier', follow:'Toppatoo',
    live:'LIVE', products:'Mbir yi', reviews:'Xam-xam yi', trending:'Yëngu-yëngu', new:'Bees'
  },
  EN: {
    home:'Home', categories:'Categories', cart:'Cart', messages:'Messages', profile:'Profile',
    search:'Search', buy:'Buy Now', add_cart:'Add to cart', follow:'Follow',
    live:'LIVE', products:'Products', reviews:'Reviews', trending:'Trending', new:'New'
  },
  AR: {
    home:'الرئيسية', categories:'الفئات', cart:'السلة', messages:'الرسائل', profile:'الملف',
    search:'بحث', buy:'شراء', add_cart:'أضف للسلة', follow:'متابعة',
    live:'مباشر', products:'المنتجات', reviews:'التقييمات', trending:'الرائج', new:'جديد'
  }
};

// ===== API globale =====
window.SEN = {
  getCurrency(){
    const idx = parseInt(localStorage.getItem('curr_idx')||'0');
    return CURRENCIES[idx];
  },
  getLang(){
    const idx = parseInt(localStorage.getItem('lang_idx')||'0');
    return LANGS[idx];
  },
  t(key){
    const lang = this.getLang().code;
    return (TRANSLATIONS[lang]||TRANSLATIONS.FR)[key] || key;
  },
  formatPrice(fcfa){
    const c = this.getCurrency();
    const val = fcfa * c.rate;
    if (c.code==='FCFA') return Math.round(val).toLocaleString('fr-FR') + ' FCFA';
    return val.toFixed(c.decimals) + ' ' + c.symbol;
  },
  cycleCurrency(){
    let idx = parseInt(localStorage.getItem('curr_idx')||'0');
    idx = (idx+1) % CURRENCIES.length;
    localStorage.setItem('curr_idx', idx);
    location.reload();
  },
  cycleLang(){
    let idx = parseInt(localStorage.getItem('lang_idx')||'0');
    idx = (idx+1) % LANGS.length;
    localStorage.setItem('lang_idx', idx);
    document.documentElement.dir = LANGS[idx].dir;
    location.reload();
  },
  applyTranslations(){
    const lang = this.getLang().code;
    const dict = TRANSLATIONS[lang]||TRANSLATIONS.FR;
    document.querySelectorAll('[data-t]').forEach(el=>{
      const key = el.getAttribute('data-t');
      if (dict[key]) el.textContent = dict[key];
    });
    document.documentElement.dir = this.getLang().dir;
  },
  // Applique automatiquement aux prix affichés en FCFA
  convertPricesOnPage(){
    document.querySelectorAll('[data-fcfa]').forEach(el=>{
      const fcfa = parseFloat(el.getAttribute('data-fcfa'));
      if(!isNaN(fcfa)) el.textContent = this.formatPrice(fcfa);
    });
  }
};

// Auto-init au chargement
document.addEventListener('DOMContentLoaded', ()=>{
  window.SEN.applyTranslations();
  window.SEN.convertPricesOnPage();
});
