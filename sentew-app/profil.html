(function(){
  // Pages ENTIÈREMENT PUBLIQUES (aucune restriction)
  const publicPages = [
    'index.html','landing.html','login.html','inscription.html',
    'onboarding.html','produit.html','boutique.html','categories.html',
    'produits.html','recherche.html','recherche-ia.html','retouche-ia.html',
    'panoramique.html','assistant-ia.html','mentions-legales.html',
    'cgu.html','cgv.html','rgpd.html','contact.html',
    'mot-de-passe-oublie.html','verified.html','bons-promo.html',
    'stories.html','live.html',''
  ];

  // Pages CONNECTÉ (n'importe quel rôle connecté)
  const authPages = [
    'profil.html','panier.html','commandes.html','notifications.html',
    'messages.html','chat.html','favoris.html','adresses.html',
    'portefeuille.html','fidelite.html','parrainage.html',
    'parametres.html','remboursement.html'
  ];

  // Pages VENDEUR uniquement
  const vendorPages = ['vendeur.html','vendeur-stats.html','ajouter-produit.html'];

  // Pages LIVREUR uniquement
  const courierPages = ['livreur.html','logistique.html'];

  // Pages ADMIN uniquement
  const adminPages = ['admin.html','audit.html'];

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // Public : accès libre pour tous
  if(publicPages.includes(currentPage)) return;

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const role = user ? user.role : null;
  const isAdmin = sessionStorage.getItem('admin_pre_auth') === '1' || role === 'admin';

  // Pages auth : besoin d'être connecté (pas de restriction de rôle)
  if(authPages.includes(currentPage)){
    if(!user && !isAdmin){
      alert('🔐 Veuillez vous connecter');
      location.href = 'login.html?redirect='+encodeURIComponent(currentPage);
    }
    return;
  }

  // Pages vendeur : rôle vendeur OU admin
  if(vendorPages.includes(currentPage)){
    if(role !== 'vendeur' && !isAdmin){
      alert('⚠️ Accès réservé aux vendeurs');
      location.href = 'index.html';
    }
    return;
  }

  // Pages livreur : rôle livreur OU admin
  if(courierPages.includes(currentPage)){
    if(role !== 'livreur' && !isAdmin){
      alert('⚠️ Accès réservé aux livreurs');
      location.href = 'index.html';
    }
    return;
  }

  // Pages admin : session admin_pre_auth requise
  if(adminPages.includes(currentPage)){
    if(!isAdmin){
      location.href = 'index.html';
    }
    return;
  }
})();
