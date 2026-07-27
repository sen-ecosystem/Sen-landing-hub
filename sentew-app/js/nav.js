// Navigation universelle SEN TEW
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) link.classList.add('active');
    });
  }
});

// Fonction pour créer la bottom nav si absente
function injectBottomNav() {
  if (document.querySelector('.bottom-nav')) return;
  const nav = document.createElement('div');
  nav.className = 'bottom-nav';
  nav.innerHTML = `
    <a href="index.html">🏠<span>Accueil</span></a>
    <a href="categories.html">📊<span>Catégories</span></a>
    <a href="panier.html">🛒<span>Panier</span></a>
    <a href="messages.html">💬<span>Messages</span></a>
    <a href="profil.html">👤<span>Profil</span></a>
  `;
  document.body.appendChild(nav);
}
