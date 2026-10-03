/* ══════════════════════════════════════════════════════════
   SEN TEW — I18N.JS v2.0 — Traduction instantanée du site
   FR (défaut) · EN · WO · AR · PT · ES
   Choix de langue UNIQUEMENT dans Paramètres (pas de bouton
   flottant). Dictionnaire v2 : pages visibles sur captures.
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
  /* ── Navigation ── */
  'Accueil':      {en:'Home',        wo:'Kër',        ar:'الرئيسية',      pt:'Início',        es:'Inicio'},
  'Catégories':   {en:'Categories',  wo:'Xeet',       ar:'الفئات',        pt:'Categorias',    es:'Categorías'},
  'Recherche':    {en:'Search',      wo:'Seet',       ar:'بحث',           pt:'Pesquisa',      es:'Buscar'},
  'Panier':       {en:'Cart',        wo:'Kardo',      ar:'السلة',         pt:'Carrinho',      es:'Carrito'},
  'Compte':       {en:'Account',     wo:'Kont',       ar:'الحساب',        pt:'Conta',         es:'Cuenta'},
  'Favoris':      {en:'Favorites',   wo:'Bëgg-bëgg',  ar:'المفضلة',       pt:'Favoritos',     es:'Favoritos'},
  'Profil':       {en:'Profile',     wo:'Kont',       ar:'الملف الشخصي',  pt:'Perfil',        es:'Perfil'},
  'Notifications':{en:'Notifications',wo:'Xibaar',    ar:'الإشعارات',     pt:'Notificações',  es:'Notificaciones'},
  'Messages':     {en:'Messages',    wo:'Bataaxal',   ar:'الرسائل',       pt:'Mensagens',     es:'Mensajes'},
  /* ── Actions ── */
  'Acheter':      {en:'Buy now',     wo:'Jënd',       ar:'اشترِ الآن',    pt:'Comprar',       es:'Comprar'},
  'Ajouter':      {en:'Add',         wo:'Yokk',       ar:'أضف',           pt:'Adicionar',     es:'Añadir'},
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
  'Utiliser':     {en:'Use',         wo:'Jëfandikoo', ar:'استخدام',       pt:'Usar',          es:'Usar'},
  'Copier':       {en:'Copy',        wo:'Duppi',      ar:'نسخ',           pt:'Copiar',        es:'Copiar'},
  'Suivre':       {en:'Follow',      wo:'Topp',       ar:'متابعة',        pt:'Seguir',        es:'Seguir'},
  'Signaler':     {en:'Report',      wo:'Waxit',      ar:'إبلاغ',         pt:'Denunciar',     es:'Reportar'},
  'Modifier':     {en:'Edit',        wo:'Soppi',      ar:'تعديل',         pt:'Editar',        es:'Editar'},
  'Suppr.':       {en:'Delete',      wo:'Dindi',      ar:'حذف',           pt:'Apagar',        es:'Borrar'},
  /* ── Boutique / catalogue ── */
  'Promotions':   {en:'Deals',       wo:'Ñakk ndar',  ar:'العروض',        pt:'Promoções',     es:'Ofertas'},
  'Nouveautés':   {en:'New arrivals',wo:'Légumental', ar:'وصل حديثاً',    pt:'Novidades',     es:'Novedades'},
  'Boutiques':    {en:'Shops',       wo:'Màndi',      ar:'المتاجر',       pt:'Lojas',         es:'Tiendas'},
  'Vendeurs':     {en:'Vendors',     wo:'Jaaykat',    ar:'البائعون',      pt:'Vendedores',    es:'Vendedores'},
  'Promo':        {en:'Deal',        wo:'Ñakk ndar',  ar:'عرض',           pt:'Promo',         es:'Oferta'},
  'Gratuit':      {en:'Free',        wo:'Fenn fenn',  ar:'مجاني',         pt:'Grátis',        es:'Gratis'},
  'Trier':        {en:'Sort',        wo:'Tëral',      ar:'ترتيب',         pt:'Ordenar',       es:'Ordenar'},
  'Filtres':      {en:'Filters',     wo:'Tann',       ar:'فلاتر',         pt:'Filtros',       es:'Filtros'},
  'Livraison gratuite':{en:'Free delivery',wo:'Yónnee fenn fenn',ar:'توصيل مجاني',pt:'Entrega grátis',es:'Entrega gratis'},
  'En stock':     {en:'In stock',    wo:'Am na',      ar:'متوفر',         pt:'Em stock',      es:'En stock'},
  'Rupture de stock':{en:'Out of stock',wo:'Amul',    ar:'غير متوفر',     pt:'Esgotado',      es:'Agotado'},
  'Voir la boutique':{en:'View shop',wo:'Seet màndi mi',ar:'عرض المتجر',  pt:'Ver loja',      es:'Ver tienda'},
  'articles':     {en:'items',       wo:'yëf',        ar:'منتجات',        pt:'artigos',       es:'artículos'},
  'vendus':       {en:'sold',        wo:'ñoómu',      ar:'مبيع',          pt:'vendidos',      es:'vendidos'},
  'avis':         {en:'reviews',     wo:'xalaat',     ar:'تقييمات',       pt:'avaliações',    es:'reseñas'},
  /* ── Compte ── */
  'Se connecter': {en:'Sign in',     wo:'Dugg',       ar:'تسجيل الدخول',  pt:'Entrar',        es:'Iniciar sesión'},
  "S'inscrire":   {en:'Sign up',     wo:'Bindu',      ar:'إنشاء حساب',    pt:'Registar',      es:'Registrarse'},
  'Déconnexion':  {en:'Sign out',    wo:'Génn',       ar:'تسجيل الخروج',  pt:'Sair',          es:'Cerrar sesión'},
  'Se déconnecter':{en:'Sign out',   wo:'Génn',       ar:'تسجيل الخروج',  pt:'Sair',          es:'Cerrar sesión'},
  'Mon compte':   {en:'My account',  wo:'Sama kont',  ar:'حسابي',         pt:'Minha conta',   es:'Mi cuenta'},
  'Mes commandes':{en:'My orders',   wo:'Sama yoon',  ar:'طلباتي',        pt:'Encomendas',    es:'Mis pedidos'},
  'Mes adresses': {en:'My addresses',wo:'Sama kembar',ar:'عناويني',       pt:'Endereços',     es:'Direcciones'},
  'Mes favoris':  {en:'My favorites',wo:'Sama bëgg-bëgg',ar:'مفضلاتي',    pt:'Meus favoritos',es:'Mis favoritos'},
  'Portefeuille': {en:'Wallet',      wo:'Sak',        ar:'المحفظة',       pt:'Carteira',      es:'Monedero'},
  'Support':      {en:'Support',     wo:'Ndimbal',    ar:'الدعم',         pt:'Apoio',         es:'Soporte'},
  'Paramètres':   {en:'Settings',    wo:'Tegu',       ar:'الإعدادات',     pt:'Definições',    es:'Ajustes'},
  'Mode sombre':  {en:'Dark mode',   wo:'Lëndëm',     ar:'الوضع الداكن',  pt:'Modo escuro',   es:'Modo oscuro'},
  'Modifier mon profil':{en:'Edit my profile',wo:'Soppi sama joxe',ar:'تعديل ملفي',pt:'Editar perfil',es:'Editar perfil'},
  'Mot de passe': {en:'Password',    wo:'Baatu dugg', ar:'كلمة المرور',   pt:'Palavra-passe', es:'Contraseña'},
  'Email de contact':{en:'Contact email',wo:'Emailu jokkoo',ar:'البريد الإلكتروني',pt:'Email de contacto',es:'Email de contacto'},
  'Documents légaux':{en:'Legal documents',wo:'Téere yu yoon',ar:'الوثائق القانونية',pt:'Documentos legais',es:'Documentos legales'},
  'Espace Vendeur':{en:'Seller area',wo:'Bérab jaaykat',ar:'منطقة البائع',pt:'Área do vendedor',es:'Zona vendedor'},
  'Espace Livreur':{en:'Courier area',wo:'Bérab yónnekat',ar:'منطقة السائق',pt:'Área do entregador',es:'Zona repartidor'},
  'Programme fidélité':{en:'Loyalty program',wo:'Sànku wéeru',ar:'برنامج الولاء',pt:'Programa fidelidade',es:'Programa fidelidad'},
  'Mes bons promo':{en:'My promo codes',wo:'Sama kodu ñakk ndar',ar:'قسائمي',pt:'Meus cupões',es:'Mis cupones'},
  'Parrainage':   {en:'Referral',    wo:'Waccoo',     ar:'الإحالة',       pt:'Indicação',     es:'Referidos'},
  "Télécharger l'app":{en:'Download the app',wo:'Yebbi app bi',ar:'تحميل التطبيق',pt:'Descarregar a app',es:'Descargar la app'},
  'Aide & Support':{en:'Help & Support',wo:'Ndimbal', ar:'مساعدة ودعم',   pt:'Ajuda e apoio', es:'Ayuda y soporte'},
  /* ── Paramètres ── */
  'Commandes & livraisons':{en:'Orders & delivery',wo:'Yoon ak yónnee',ar:'الطلبات والتوصيل',pt:'Encomendas e entregas',es:'Pedidos y entregas'},
  'Promos & ventes flash':{en:'Deals & flash sales',wo:'Ñakk ndar ak jaay bu gaaw',ar:'العروض والتخفيضات',pt:'Promoções relâmpago',es:'Ofertas flash'},
  'Messages vendeurs':{en:'Seller messages',wo:'Bataaxal jaaykat',ar:'رسائل البائعين',pt:'Mensagens vendedores',es:'Mensajes vendedores'},
  'Newsletter hebdo':{en:'Weekly newsletter',wo:'Xibaar yu ayubis',ar:'النشرة الأسبوعية',pt:'Newsletter semanal',es:'Boletín semanal'},
  'Support & FAQ':{en:'Support & FAQ',wo:'Ndimbal ak laaj',ar:'الدعم والأسئلة',pt:'Apoio e FAQ',es:'Soporte y FAQ'},
  "Centre d'aide":{en:'Help center',wo:'Bérab ndimbal',ar:'مركز المساعدة',pt:'Centro de ajuda',es:'Centro de ayuda'},
  'À propos de SEN TEW':{en:'About SEN TEW',wo:'Ci mbir SEN TEW',ar:'حول SEN TEW',pt:'Sobre a SEN TEW',es:'Acerca de SEN TEW'},
  "Version de l'app":{en:'App version',wo:'Version app',ar:'إصدار التطبيق',pt:'Versão da app',es:'Versión de la app'},
  'Langue':       {en:'Language',    wo:'Làkk',       ar:'اللغة',         pt:'Idioma',        es:'Idioma'},
  'Devise':       {en:'Currency',    wo:'Koppar',     ar:'العملة',        pt:'Moeda',         es:'Moneda'},
  /* ── Panier / commandes ── */
  'Total':        {en:'Total',       wo:'Lépp',       ar:'المجموع',       pt:'Total',         es:'Total'},
  'Sous-total':   {en:'Subtotal',    wo:'Lépp bu gàtt',ar:'المجموع الفرعي',pt:'Subtotal',    es:'Subtotal'},
  'Livraison':    {en:'Delivery',    wo:'Yónnee',     ar:'التوصيل',       pt:'Entrega',       es:'Entrega'},
  'Paiement':     {en:'Payment',     wo:'Fay',        ar:'الدفع',         pt:'Pagamento',     es:'Pago'},
  'Mon Panier':   {en:'My Cart',     wo:'Sama kardo', ar:'سلتي',          pt:'O meu carrinho',es:'Mi carrito'},
  'Ton panier est vide':{en:'Your cart is empty',wo:'Sa kardo amul dara',ar:'سلتك فارغة',pt:'O teu carrinho está vazio',es:'Tu carrito está vacío'},
  'Votre panier est vide':{en:'Your cart is empty',wo:'Sa kardo amul dara',ar:'سلتك فارغة',pt:'O carrinho está vazio',es:'Tu carrito está vacío'},
  'Finaliser la commande':{en:'Checkout',wo:'Jeexal yoon',ar:'إتمام الطلب',pt:'Finalizar compra',es:'Finalizar compra'},
  'Voir les articles':{en:'Browse items',wo:'Seet yëf yi',ar:'عرض المنتجات',pt:'Ver artigos',es:'Ver artículos'},
  'Découvrir les articles':{en:'Discover items',wo:'Xol yëf yi',ar:'اكتشف المنتجات',pt:'Descobrir artigos',es:'Descubrir artículos'},
  'Mes Commandes':{en:'My Orders',   wo:'Sama yoon',  ar:'طلباتي',        pt:'Minhas encomendas',es:'Mis pedidos'},
  'Toutes':       {en:'All',         wo:'Lépp',       ar:'الكل',          pt:'Todas',         es:'Todas'},
  'En cours':     {en:'In progress', wo:'Dafa dox',   ar:'قيد التنفيذ',   pt:'Em curso',      es:'En curso'},
  'Livrées':      {en:'Delivered',   wo:'Yónnoona',   ar:'تم التوصيل',    pt:'Entregues',     es:'Entregados'},
  'Confirmée':    {en:'Confirmed',   wo:'Dëggalo na', ar:'مؤكد',          pt:'Confirmada',    es:'Confirmada'},
  'Préparation':  {en:'Preparing',   wo:'Dafay waajur',ar:'قيد التحضير',  pt:'Em preparação', es:'Preparando'},
  'En route':     {en:'On the way',  wo:'Ci yoon wi', ar:'في الطريق',     pt:'A caminho',     es:'En camino'},
  'Livrée':       {en:'Delivered',   wo:'Yónnoona',   ar:'تم التوصيل',    pt:'Entregue',      es:'Entregado'},
  /* ── Favoris / bons ── */
  'Mes Favoris':  {en:'My Favorites',wo:'Sama bëgg-bëgg',ar:'مفضلاتي',    pt:'Os meus favoritos',es:'Mis favoritos'},
  'Aucun favori': {en:'No favorites',wo:'Amul bëgg-bëgg',ar:'لا مفضلات',  pt:'Sem favoritos', es:'Sin favoritos'},
  'Mes Bons & Promotions':{en:'My Vouchers & Deals',wo:'Sama bon ak ñakk ndar',ar:'قسائمي وعروضي',pt:'Os meus vales e promoções',es:'Mis vales y ofertas'},
  'Bons cadeaux': {en:'Gift cards',  wo:'Bonu àll',   ar:'بطاقات هدايا',  pt:'Vales-presente',es:'Tarjetas regalo'},
  'Codes promo':  {en:'Promo codes', wo:'Kodu ñakk ndar',ar:'رموز الخصم', pt:'Códigos promo', es:'Códigos promo'},
  'Coupons':      {en:'Coupons',     wo:'Kupon',      ar:'قسائم',         pt:'Cupões',        es:'Cupones'},
  'Ajouter un code promo':{en:'Add a promo code',wo:'Yokk benn kodu ñakk ndar',ar:'أضف رمز خصم',pt:'Adicionar código promo',es:'Añadir código promo'},
  /* ── Divers ── */
  'Tendances':    {en:'Trending',    wo:'Li bëggoon', ar:'الأكثر رواجاً', pt:'Tendências',    es:'Tendencias'},
  'Rechercher un produit…':{en:'Search for a product…',wo:'Seet beneen…',ar:'ابحث عن منتج…',pt:'Pesquisar produto…',es:'Buscar producto…'},
  'Rechercher un article, une boutique…':{en:'Search an item, a shop…',wo:'Seet yëf walla màndi…',ar:'ابحث عن منتج أو متجر…',pt:'Pesquisar artigo, loja…',es:'Buscar artículo, tienda…'},
  'Pose ta question à Nio Far…':{en:'Ask Nio Far…',wo:'Laaj Nio Far…',ar:'اسأل نيو فار…',pt:'Pergunta ao Nio Far…',es:'Pregunta a Nio Far…'},
  'Boutique':     {en:'Shop',        wo:'Màndi',      ar:'المتجر',        pt:'Loja',          es:'Tienda'},
  'Abonnés':      {en:'Followers',   wo:'Ñoo topp',   ar:'المتابعون',     pt:'Seguidores',    es:'Seguidores'},
  'Produits':     {en:'Products',    wo:'Yëf',        ar:'المنتجات',      pt:'Produtos',      es:'Productos'},
  'Notifs':       {en:'Alerts',      wo:'Xibaar',     ar:'تنبيهات',       pt:'Alertas',       es:'Avisos'},
  'Solde disponible':{en:'Available balance',wo:'Koppar bu fékk',ar:'الرصيد المتاح',pt:'Saldo disponível',es:'Saldo disponible'},
  'Recharger':    {en:'Top up',      wo:'Yokk koppar',ar:'شحن',           pt:'Carregar',      es:'Recargar'},
  'Retirer':      {en:'Withdraw',    wo:'Dindi',      ar:'سحب',           pt:'Levantar',      es:'Retirar'}
};

var KEY = 'st_lang';
function cur(){ return localStorage.getItem(KEY) || 'fr'; }

function applyLang(lang){
  if(lang === 'fr'){ document.documentElement.lang='fr'; document.documentElement.dir='ltr'; return; }
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
  syncSelect(lang);
}

/* Sélecteur unique : Paramètres → Langue (id="langSel") */
function syncSelect(lang){
  var s = document.getElementById('langSel');
  if(s && s.value !== lang) s.value = lang;
}

window.stSetLang = function(lang){
  localStorage.setItem(KEY, lang);
  if(lang === 'fr'){ location.reload(); return; }
  applyLang(lang);
  if('MutationObserver' in window && !window.__i18nMO){
    window.__i18nMO = new MutationObserver(function(){ applyLang(lang); });
    window.__i18nMO.observe(document.body, {childList:true, subtree:true});
  }
};

function boot(){
  /* PLUS de bouton flottant 🌐 — la langue se change dans Paramètres */
  var l = cur();
  syncSelect(l);
  if(l !== 'fr'){
    applyLang(l);
    if('MutationObserver' in window && !window.__i18nMO){
      window.__i18nMO = new MutationObserver(function(){ applyLang(l); });
      window.__i18nMO.observe(document.body, {childList:true, subtree:true});
    }
  }
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
