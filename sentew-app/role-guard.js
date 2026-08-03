// ===== SEN TEW ROLE GUARD =====
// Cloisonne les vues selon le rôle : client / vendeur / livreur / admin
(function(){
  const role = localStorage.getItem('sentew_role') || 'client';
  const isAdmin = sessionStorage.getItem('admin_pre_auth') === '1';
  
  const PAGES = {
    client: ['index.html','produits.html','produit.html','panier.html','favoris.html',
             'boutique.html','live.html','recherche-ia.html','categories.html',
             'commandes.html','profil.html','messages.html','notifications.html',
             'adresses.html','portefeuille.html','fidelite.html','bons-promo.html',
             'parrainage.html','stories.html','remboursement.html','avis.html',
             'assistant-ia.html','panoramique.html','retouche-ia.html','verified.html',
             'confidentialite-app.html','mentions-legales.html','parametres.html',
             'login-guest.html','login.html','onboarding.html'],
    vendeur: ['vendeur.html','vendeur-stats.html','ajouter-produit.html',
              'commandes.html','messages.html','portefeuille.html','audit.html',
              'live.html','bons-promo.html','avis.html','profil.html'],
    livreur: ['livreur.html','logistique.html','messages.html','profil.html','portefeuille.html'],
    admin:   ['admin.html']
  };
  
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  
  // Admin caché sauf pré-auth
  if(currentPage === 'admin.html' && !isAdmin){
    alert('🔒 Accès administrateur non autorisé');
    location.href = 'index.html';
    return;
  }
  
  // Marquer body avec le rôle pour CSS
  document.documentElement.setAttribute('data-role', role);
  
  // Cacher les icônes admin partout
  document.addEventListener('DOMContentLoaded', () => {
    if(!isAdmin){
      document.querySelectorAll('[data-role="admin"], .admin-only, a[href*="admin.html"]').forEach(el => {
        el.style.display = 'none';
      });
    }
    
    // Client ne voit pas les liens vendeur/livreur (sauf via bascule de rôle)
    if(role === 'client'){
      document.querySelectorAll('.vendeur-only, .livreur-only').forEach(el => el.style.display='none');
    }
    if(role === 'vendeur'){
      document.querySelectorAll('.client-only, .livreur-only').forEach(el => el.style.display='none');
    }
    if(role === 'livreur'){
      document.querySelectorAll('.client-only, .vendeur-only').forEach(el => el.style.display='none');
    }
  });
  
  // Helper : basculer de rôle depuis profil
  window.switchRole = function(newRole){
    if(!['client','vendeur','livreur'].includes(newRole)) return;
    localStorage.setItem('sentew_role', newRole);
    const home = {client:'index.html', vendeur:'vendeur.html', livreur:'livreur.html'};
    location.href = home[newRole];
  };
  
  window.currentRole = role;
})();
