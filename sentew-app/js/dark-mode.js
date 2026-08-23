/* ==========================================
   SEN TEW - Dark Mode Auto v42
   23 août 2026
   Détection automatique système + toggle manuel
   ========================================== */

(function() {
  'use strict';

  function applyMode() {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved === 'dark' || (saved === null && systemDark);

    document.body.classList.toggle('dark-mode', useDark);
    document.documentElement.setAttribute('data-theme', useDark ? 'dark' : 'light');

    // Meta theme-color pour barre navigateur mobile
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = useDark ? '#0a1f17' : '#0f6b4e';
  }

  // Application immédiate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMode);
  } else {
    applyMode();
  }

  // Écoute changement système
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyMode);

  // Toggle manuel accessible globalement
  window.toggleTheme = function() {
    const current = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', current);
    applyMode();
    if (navigator.vibrate) navigator.vibrate(30);
  };

  // Détection changement d'onglet (au retour, réappliquer)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) applyMode();
  });
})();
