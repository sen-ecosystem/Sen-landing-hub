// Audit + activation automatique de tous les boutons/icônes
document.addEventListener('DOMContentLoaded', function() {
  // 1. Bouton retour universel
  document.querySelectorAll('.btn-back, [data-back]').forEach(btn => {
    if (!btn.onclick) btn.onclick = () => history.back();
  });

  // 2. Icônes sans action → alerte console
  document.querySelectorAll('.icon-btn').forEach(btn => {
    if (!btn.onclick && !btn.getAttribute('href')) {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => {
        console.warn('⚠️ Bouton sans action:', btn);
      });
    }
  });

  // 3. Cartes cliquables
  document.querySelectorAll('[data-href]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => location.href = el.dataset.href);
  });

  // 4. Bottom nav active state
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.bottom-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // 5. Lucide refresh
  if (typeof lucide !== 'undefined') lucide.createIcons();
});
