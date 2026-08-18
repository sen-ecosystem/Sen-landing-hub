// ===== ROLE GUARD v4 — Session invité + Retouche IA vendeurs =====
(function(){
  // AUTO-CRÉATION PROFIL INVITÉ
  if(!localStorage.getItem('user') && !localStorage.getItem('sen_role')){
    localStorage.setItem('user', JSON.stringify({
      id:'guest_'+Date.now(), name:'Utilisateur SEN TEW',
      email:'invite@sen-tew.com', role:'guest', avatar:'U', isGuest:true
    }));
    localStorage.setItem('sen_role','guest');
    localStorage.setItem('sen_wallet','500');
  }

  const publicPages = [
    'index.html','landing.html','login.html','inscription.html',
    'onboarding.html','produit.html','boutique.html','categories.html',
    'produits.html','recherche.html','recherche-ia.html',
    'panoramique.html','assistant-ia.html','mentions-legales.html',
    'cgu.html','cgv.html','rgpd.html','contact.html',
    'mot-de-passe-oublie.html','verified.html','bons-promo.html',
    'stories.html','live.html','profil.html','panier.html',
    'favoris.html','notifications.html','messages.html','chat.html',
    'commandes.html','adresses.html','portefeuille.html','fidelite.html',
    'parrainage.html','parametres.html','remboursement.html','signaler.html',
    'paiement.html','suivi.html',''
  ];

  const vendorOnlyIA = ['retouche-ia.html'];
  const vendorPages = ['vendeur.html','vendeur-stats.html','ajouter-produit.html'];
  const courierPages = ['livreur.html','logistique.html'];
  const adminPages = ['admin.html','audit.html'];

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || localStorage.getItem('sen_role') || 'guest';
  const isAdmin = sessionStorage.getItem('admin_pre_auth') === '1' || role === 'admin';

  if(publicPages.includes(currentPage)) return;

  if(vendorOnlyIA.includes(currentPage)){
    if(role !== 'vendeur' && !isAdmin){
      if(confirm('✨ Retouche Photo IA — Réservée aux vendeurs\n\n🎯 Améliorez vos photos produits automatiquement\n💰 Incluse dans plan Gold (15 000 FCFA/mois)\n📈 Augmentez vos ventes de 40%\n\n✓ Devenir vendeur maintenant ?')){
        location.href = 'inscription.html?role=vendeur&from=retouche-ia';
      } else {
        location.href = 'index.html';
      }
    }
    return;
  }
  if(vendorPages.includes(currentPage)){
    if(role !== 'vendeur' && !isAdmin){
      if(confirm('🏪 Section réservée aux vendeurs.\n\n✓ OK → Devenir vendeur\n✗ Annuler → Accueil')){
        localStorage.setItem('sen_role','vendeur');
        localStorage.setItem('user', JSON.stringify({...user, role:'vendeur'}));
        location.reload();
      } else { location.href = 'index.html'; }
    }
    return;
  }
  if(courierPages.includes(currentPage)){
    if(role !== 'livreur' && !isAdmin){
      if(confirm('🛵 Section réservée aux livreurs.\n\n✓ Livrez à Dakar\n✓ 3 000–8 000 FCFA/jour')){
        localStorage.setItem('sen_role','livreur');
        localStorage.setItem('user', JSON.stringify({...user, role:'livreur'}));
        location.reload();
      } else { location.href = 'index.html'; }
    }
    return;
  }
  if(adminPages.includes(currentPage)){
    if(!isAdmin){ location.href = 'index.html'; }
    return;
  }
})();
