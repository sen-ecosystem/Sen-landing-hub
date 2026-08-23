/* ==========================================
   SEN TEW - Role Guard v42
   23 août 2026
   Gestion des rôles + session invité
   ========================================== */

(function() {
  'use strict';

  // Pages publiques accessibles sans connexion
  const publicPages = [
    'index.html',
    'landing.html',
    'onboarding.html',
    'login.html',
    'login-guest.html',
    'inscription.html',
    'mot-de-passe-oublie.html',
    'reset.html',
    'produit.html',
    'produits.html',
    'boutique.html',
    'categories.html',
    'recherche-ia.html',
    'mentions-legales.html',
    'cgu.html',
    'cgv.html',
    'cookies.html',
    'confidentialite-app.html',
    'signaler.html',
    'sw-kill.html',
    ''
  ];

  // Initialiser profil invité si aucun utilisateur
  function initGuestProfile() {
    if (!localStorage.getItem('user')) {
      const guest = {
        id: 'guest-' + Date.now(),
        name: 'Utilisateur SEN TEW',
        email: 'invite@sen-tew.com',
        role: 'guest',
        wallet: 500,
        avatar: '',
        verified: false,
        createdAt: Date.now(),
        isGuest: true
      };
      localStorage.setItem('user', JSON.stringify(guest));
    }
  }

  // Récupérer utilisateur courant
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch(e) {
      return null;
    }
  }

  // Vérifier accès à la page courante
  function checkPageAccess() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    // Pages publiques : accès libre
    if (publicPages.includes(currentPage)) return true;

    // Pages restreintes : nécessitent un utilisateur
    const user = getCurrentUser();
    if (!user) {
      // Créer profil invité automatiquement
      initGuestProfile();
      return true;
    }

    // Pages admin uniquement
    if (currentPage === 'admin.html' && user.role !== 'admin') {
      const isAdmin = sessionStorage.getItem('admin_pro') === '1';
      if (!isAdmin) {
        location.href = 'index.html';
        return false;
      }
    }

    // Pages vendeur
    if (['vendeur.html', 'vendeur-stats.html', 'ajouter-produit.html'].includes(currentPage)) {
      if (user.role !== 'vendeur' && user.role !== 'admin') {
        // Permettre l'accès en mode "démo" pour invités
        return true;
      }
    }

    return true;
  }

  // Exposer API globale
  window.RoleGuard = {
    initGuest: initGuestProfile,
    getUser: getCurrentUser,
    checkAccess: checkPageAccess,

    setRole: function(role) {
      const user = getCurrentUser() || {};
      user.role = role;
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout: function() {
      localStorage.removeItem('user');
      sessionStorage.removeItem('admin_pro');
      initGuestProfile();
      location.href = 'index.html';
    }
  };

  // Init au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initGuestProfile();
      checkPageAccess();
    });
  } else {
    initGuestProfile();
    checkPageAccess();
  }
})();
