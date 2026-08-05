(function(){
  // Pages PUBLIQUES accessibles sans connexion
  const publicPages = [
    'index.html','landing.html','login.html','inscription.html',
    'onboarding.html','produit.html','boutique.html','categories.html',
    'recherche.html','mentions-legales.html','cgu.html','cgv.html',
    'rgpd.html','contact.html','mot-de-passe-oublie.html',''
  ];

  // Pages RÉSERVÉES vendeur
  const vendorPages = ['vendeur.html','vendeur-stats.html','ajouter-produit.html'];

  // Pages RÉSERVÉES livreur
  const courierPages = ['livreur.html','logistique.html'];

  // Pages RÉSERVÉES admin
  const adminPages = ['admin.html','audit.html'];

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // Si page publique → autoriser TOUT LE MONDE
  if(publicPages.includes(currentPage)) return;

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const role = user ? user.role : null;

  // Vérifications de rôle
  if(vendorPages.includes(currentPage) && role !== 'vendeur' && role !== 'admin'){
    alert('⚠️ Accès réservé aux vendeurs');
    location.href = 'index.html';
    return;
  }
  if(courierPages.includes(currentPage) && role !== 'livreur' && role !== 'admin'){
    alert('⚠️ Accès réservé aux livreurs');
    location.href = 'index.html';
    return;
  }
  if(adminPages.includes(currentPage) && !sessionStorage.getItem('admin_pre_auth')){
    location.href = 'index.html';
    return;
  }
})();
