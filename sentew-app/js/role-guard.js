// ===== ROLE GUARD v3 — Session invité universelle =====
(function(){

  // AUTO-CRÉATION DU PROFIL INVITÉ (si aucune session)
  if(!localStorage.getItem('user') && !localStorage.getItem('sen_role')){
    const guestUser = {
      id: 'guest_' + Date.now(),
      name: 'Utilisateur SEN TEW',
      email: 'invite@sen-tew.com',
      role: 'guest',
      avatar: 'U',
      isGuest: true,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.setItem('sen_role', 'guest');
    localStorage.setItem('sen_wallet', '500'); // Cadeau bienvenue 500 FCFA
    console.log('✅ Session invité créée : Utilisateur SEN TEW');
  }

  // Pages ENTIÈREMENT PUBLIQUES (accès total)
  const publicPages = [
    'index.html','landing.html','login.html','inscription.html',
    'onboarding.html','produit.html','boutique.html','categories.html',
    'produits.html','recherche.html','recherche-ia.html','retouche-ia.html',
    'panoramique.html','assistant-ia.html','mentions-legales.html',
    'cgu.html','cgv.html','rgpd.html','contact.html',
    'mot-de-passe-oublie.html','verified.html','bons-promo.html',
    'stories.html','live.html','profil.html','panier.html',
    'favoris.html','notifications.html','messages.html','chat.html',
    'commandes.html','adresses.html','portefeuille.html','fidelite.html',
    'parrainage.html','parametres.html','remboursement.html',''
  ];

  // Pages RESTREINTES par rôle (achat/action requis)
  const vendorPages = ['vendeur.html','vendeur-stats.html','ajouter-produit.html'];
  const courierPages = ['livreur.html','logistique.html'];
  const adminPages = ['admin.html','audit.html'];

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // Toutes les pages publiques → accès libre pour l'invité
  if(publicPages.includes(currentPage)) return;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || localStorage.getItem('sen_role') || 'guest';
  const isAdmin = sessionStorage.getItem('admin_pre_auth') === '1' || role === 'admin';

  // VENDEUR : demande de conversion douce (pas de blocage)
  if(vendorPages.includes(currentPage)){
    if(role !== 'vendeur' && !isAdmin){
      if(confirm('🏪 Cette section est réservée aux vendeurs.\n\nSouhaitez-vous ouvrir votre boutique ?\n\n✓ OK → Devenir vendeur\n✗ Annuler → Retour accueil')){
        localStorage.setItem('sen_role','vendeur');
        localStorage.setItem('user', JSON.stringify({...user, role:'vendeur'}));
        location.reload();
      } else {
        location.href = 'index.html';
      }
    }
    return;
  }

  // LIVREUR : conversion douce
  if(courierPages.includes(currentPage)){
    if(role !== 'livreur' && !isAdmin){
      if(confirm('🛵 Cette section est réservée aux livreurs.\n\nSouhaitez-vous devenir livreur ?\n\n✓ Livrez à Dakar\n✓ Gagnez 3 000–8 000 FCFA/jour\n✓ Horaires flexibles')){
        localStorage.setItem('sen_role','livreur');
        localStorage.setItem('user', JSON.stringify({...user, role:'livreur'}));
        location.reload();
      } else {
        location.href = 'index.html';
      }
    }
    return;
  }

  // ADMIN : blocage strict (session sécurisée requise)
  if(adminPages.includes(currentPage)){
    if(!isAdmin){
      location.href = 'index.html';
    }
    return;
  }
})();
