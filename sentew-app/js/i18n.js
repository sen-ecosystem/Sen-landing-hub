/* ══════════════════════════════════════════════════════════
   SEN TEW — I18N.JS v1.0 — Traduction instantanée du site
   FR (défaut) · EN · WO · AR · PT · ES
   Bouton 🌐 flottant — instantané, gratuit, choix conservé
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';

var LANGS = [
  {code:'fr', label:'Français',  flag:'🇫🇷'},
  {code:'en', label:'English',   flag:'🇬🇧'},
  {code:'wo', label:'Wolof',     flag:'🇸🇳'},
  {code:'ar', label:'العربية',    flag:'🇸🇦'},
  {code:'pt', label:'Português', flag:'🇵🇹'},
  {code:'es', label:'Español',   flag:'🇪🇸'}
];

var D = {
  'Accueil':      {en:'Home',        wo:'Kër',        ar:'الرئيسية',      pt:'Início',        es:'Inicio'},
  'Catégories':   {en:'Categories',  wo:'Xeet',       ar:'الفئات',        pt:'Categorias',    es:'Categorías'},
  'Recherche':    {en:'Search',      wo:'Seet',       ar:'بحث',           pt:'Pesquisa',      es:'Buscar'},
  'Panier':       {en:'Cart',        wo:'Kardo',      ar:'السلة',         pt:'Carrinho',      es:'Carrito'},
  'Compte':       {en:'Account',     wo:'Kont',       ar:'الحساب',        pt:'Conta',         es:'Cuenta'},
  'Favoris':      {en:'Favorites',   wo:'Bëgg-bëgg',  ar:'المفضلة',       pt:'Favoritos',     es:'Favoritos'},
  'Profil':       {en:'Profile',     wo:'Kont',       ar:'الملف الشخصي',  pt:'Perfil',        es:'Perfil'},
  'Notifications':{en:'Notifications',wo:'Xibaar',    ar:'الإشعارات',     pt:'Notificações',  es:'Notificaciones'},
  'Acheter':      {en:'Buy now',     wo:'Jënd',       ar:'اشترِ الآن',    pt:'Comprar',       es:'Comprar'},
  'Ajouter au panier':{en:'Add to cart',wo:'Yokk ci kardo',ar:'أضف إلى السلة',pt:'Adicionar ao carrinho',es:'Añadir al carrito'},
  'Commander':    {en:'Order now',   wo:'Yoon',       ar:'اطلب الآن',     pt:'Encomendar',    es:'Pedir'},
  'Voir tout':    {en:'See all',     wo:'Seet lépp',  ar:'عرض الكل',      pt:'Ver tudo',      es:'Ver todo'},
  'Détails':      {en:'Details',     wo:'Xibaar',     ar:'التفاصيل',      pt:'Detalhes',      es:'Detalles'},
  'Partager':     {en:'Share',       wo:'Séddoo',     ar:'مشاركة',        pt:'Partilhar',     es:'Compartir'},
  'Envoyer':      {en:'Send',        wo:'Yónni',      ar:'إرسال',         pt:'Enviar',        es:'Enviar'},
  'Continuer':    {en:'Continue',    wo:'Kontinuwe',  ar:'متابعة',        pt:'Continuar',     es:'Continuar'},
  'Valider':      {en:'Confirm',     wo:'Dëggal',     ar:'تأكيد',         pt:'Confirmar',     es:'Confirmar'},
  'Annuler':      {en:'Cancel',      wo:'Neen',       ar:'إلغاء',         pt:'Cancelar',      es:'Cancelar'},
  'Retour':       {en:'Back',        wo:'Dellu',      ar:'رجوع',          pt:'Voltar',        es:'Volver'},
  'Promotions':   {en:'Deals',       wo:'Ñakk ndar',  ar:'العروض',        pt:'Promoções',     es:'Ofertas'},
  'Nouveautés':   {en:'New arrivals',wo:'Légumental', ar:'وصل حديثاً',    pt:'Novidades',     es:'Novedades'},
  'Boutiques':    {en:'Shops',       wo:'Màndi',      ar:'المتاجر',       pt:'Lojas',         es:'Tiendas'},
  'Vendeurs':     {en:'Vendors',     wo:'Jaaykat',    ar:'البائعون',      pt:'Vendedores',    es:'Vendedores'},
  'Se connecter': {en:'Sign in',     wo:'Dugg',       ar:'تسجيل الدخول',  pt:'Entrar',        es:'Iniciar sesión'},
  'S\u2019inscrire':{en:'Sign up',   wo:'Bindu',      ar:'إنشاء حساب',    pt:'Registar',      es:'Registrarse'},
  'Déconnexion':  {en:'Sign out',    wo:'Génn',       ar:'تسجيل الخروج',  pt:'Sair',          es:'Cerrar sesión'},
  'Mes commandes':{en:'My orders',   wo:'Sama yoon',  ar:'طلباتي',        pt:'Encomendas',    es:'Mis pedidos'},
  'Mes adresses': {en:'My addresses',wo:'Sama kembar',ar:'عناويني',       pt:'Endereços',     es:'Direcciones'},
  'Portefeuille': {en:'Wallet',      wo:'Sak',        ar:'المحفظة',       pt:'Carteira',      es:'Monedero'},
  'Support':      {en:'Support',     wo:'Ndimbal',    ar:'الدعم',         pt:'Apoio',         es:'Soporte'},
  'Paramètres':   {en:'Settings',    wo:'Tegu',       ar:'الإعدادات',     pt:'Definições',    es:'Ajustes'},
  'Mode sombre':  {en:'Dark mode',   wo:'Lëndëm',     ar:'الوضع الداكن',  pt:'Modo escuro',   es:'Modo oscuro'},
  'Total':        {en:'Total',       wo:'Lépp',       ar:'المجموع',       pt:'Total',         es:'Total'},
  'Sous-total':   {en:'Subtotal',    wo:'Lépp bu gàtt',ar:'المجموع الفرعي',pt:'Subtotal',    es:'Subtotal'},
  'Livraison':    {en:'Delivery',    wo:'Yónnee',     ar:'التوصيل',       pt:'Entrega',       es:'Entrega'},
  'Paiement':     {en:'Payment',     wo:'Fay',        ar:'الدفع',         pt:'Pagamento',     es:'Pago'},
  'Votre panier est vide':{en:'Your cart is empty',wo:'Sa kardo amul dara',ar:'سلتك فارغة',pt:'O carrinho está vazio',es:'Tu carrito está vacío'},
  'Finaliser la commande':{en:'Checkout',wo:'Jeexal yoon',ar:'إتمام الطلب',pt:'Finalizar compra',es:'Finalizar compra'},
  'Rechercher un produit…':{en:'Search for a product…',wo:'Seet beneen…',ar:'ابحث عن منتج…',pt:'Pesquisar produto…',es:'Buscar producto…'},
  'Pose ta question à Nio Far…':{en:'Ask Nio Far…',wo:'Laaj Nio Far…',ar:'اسأل نيو فار…',pt:'Pergunta ao Nio Far…',es:'Pregunta a Nio Far…'},
  'Livraison gratuite':{en:'Free delivery',wo:'Yónnee fenn fenn',ar:'توصيل مجاني',pt:'Entrega grátis',es:'Entrega gratis'},
  'En stock':     {en:'In stock',    wo:'Am na',      ar:'متوفر',         pt:'Em stock',      es:'En stock'},
  'Rupture de stock':{en:'Out of stock',wo:'Amul',    ar:'غير متوفر',     pt:'Esgotado',      es:'Agotado'}
};

var KEY = 'st_lang';
function cur(){ return localStorage.getItem(KEY) || 'fr'; }

function applyLang(lang){
  if(lang === 'fr'){ localStorage.setItem(KEY,'fr'); location.reload(); return; }
  document.documentElement.lang = lang;
  document.documentElement.dir  = (lang === 'ar') ? 'rtl' : 'ltr';
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  var node;
  while(node = walker.nextNode()){
    var t = node.nodeValue.trim();
    if(!t || t.length > 80) continue;
    if(D[t] && D[t][lang]) node.nodeValue = node.nodeValue.replace(t, D[t][lang]);
  }
  var inputs = document.querySelectorAll('input[placeholder],textarea[placeholder]');
  for(var i=0;i<inputs.length;i++){
    var p = inputs[i].getAttribute('placeholder').trim();
    if(D[p] && D[p][lang]) inputs[i].setAttribute('placeholder', D[p][lang]);
  }
  var lab = document.querySelectorAll('[aria-label]');
  for(var j=0;j<lab.length;j++){
    var a = lab[j].getAttribute('aria-label').trim();
    if(D[a] && D[a][lang]) lab[j].setAttribute('aria-label', D[a][lang]);
  }
}

function buildUI(){
  if(document.getElementById('i18nBtn')) return;
  var st = document.createElement('style');
  st.textContent =
    '#i18nBtn{position:fixed;right:14px;bottom:150px;z-index:900;width:46px;height:46px;border-radius:50%;'+
    'background:linear-gradient(135deg,#0f6b4e,#0a1f17);color:#fff;font-size:20px;border:none;cursor:pointer;'+
    'box-shadow:0 4px 14px rgba(15,107,78,.4);display:flex;align-items:center;justify-content:center}'+
    '#i18nMenu{position:fixed;right:14px;bottom:206px;z-index:901;background:#fff;border-radius:14px;'+
    'box-shadow:0 8px 30px rgba(0,0,0,.18);overflow:hidden;display:none;min-width:170px}'+
    '#i18nMenu.on{display:block}'+
    '#i18nMenu button{display:flex;align-items:center;gap:10px;width:100%;padding:12px 16px;border:none;'+
    'background:#fff;font-size:14px;font-weight:600;color:#12312a;cursor:pointer;text-align:left}'+
    '#i18nMenu button:active{background:#f0f7f4}'+
    '#i18nMenu button.on{background:#e6f4ee;color:#0f6b4e;font-weight:800}';
  document.head.appendChild(st);
  var btn = document.createElement('button');
  btn.id = 'i18nBtn';
  btn.setAttribute('aria-label','Langue / Language');
  btn.textContent = '🌐';
  document.body.appendChild(btn);
  var menu = document.createElement('div');
  menu.id = 'i18nMenu';
  LANGS.forEach(function(L){
    var b = document.createElement('button');
    b.textContent = L.flag + ' ' + L.label;
    if(L.code === cur()) b.className = 'on';
    b.onclick = function(){
      localStorage.setItem(KEY, L.code);
      if(L.code === 'fr'){ location.reload(); }
      else { applyLang(L.code);
        var bs = menu.querySelectorAll('button');
        for(var i=0;i<bs.length;i++) bs[i].className='';
        b.className='on';
        menu.classList.remove('on');
      }
    };
    menu.appendChild(b);
  });
  document.body.appendChild(menu);
  btn.onclick = function(){ menu.classList.toggle('on'); };
  document.addEventListener('click', function(e){
    if(!menu.contains(e.target) && e.target !== btn) menu.classList.remove('on');
  });
}

function boot(){
  buildUI();
  var l = cur();
  if(l !== 'fr'){
    applyLang(l);
    if('MutationObserver' in window){
      var mo = new MutationObserver(function(){ applyLang(l); });
      mo.observe(document.body, {childList:true, subtree:true});
    }
  }
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
