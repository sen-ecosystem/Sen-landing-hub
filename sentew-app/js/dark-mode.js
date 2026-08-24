/* ==========================================
   SEN TEW - Dark/Light Mode v44
   24 août 2026 - Priorité utilisateur
   ========================================== */
(function() {
  'use strict';

  function applyMode() {
    const saved = localStorage.getItem('theme');
    // PRIORITÉ AU CHOIX UTILISATEUR
    let useDark;
    if (saved === 'dark') useDark = true;
    else if (saved === 'light') useDark = false;
    else {
      // Par défaut : LIGHT (mode clair pour meilleure lisibilité)
      useDark = false;
    }

    document.body.classList.toggle('dark-mode', useDark);
    document.body.classList.toggle('light-mode', !useDark);
    document.documentElement.setAttribute('data-theme', useDark ? 'dark' : 'light');

    // Meta theme-color
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = useDark ? '#0a1f17' : '#ffffff';

    // Update icons dans les boutons toggle
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.innerHTML = useDark
        ? '<i data-lucide="sun" class="icon icon-md icon-or"></i>'
        : '<i data-lucide="moon" class="icon icon-md icon-vert"></i>';
    });
    if (window.lucide) lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMode);
  } else {
    applyMode();
  }

  window.toggleTheme = function() {
    const current = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', current);
    applyMode();
    if (navigator.vibrate) navigator.vibrate(30);
  };

  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) applyMode();
  });
})();
