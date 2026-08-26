// ================================================================
// SEN TEW — Dark/Light Mode Manager v46
// 26 août 2026 — Bascule robuste avec persistance localStorage
// ================================================================

(function() {
  'use strict';

  const STORAGE_KEY = 'sentew-theme';
  const DEFAULT_THEME = 'light'; // Mode clair par défaut

  function applyTheme(theme) {
    const body = document.body;
    if (!body) {
      document.addEventListener('DOMContentLoaded', () => applyTheme(theme));
      return;
    }
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(theme + '-mode');
    body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Meta theme-color (barre statut mobile)
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = theme === 'dark' ? '#0a1f17' : '#ffffff';

    // Mettre à jour l'icône du bouton toggle
    document.querySelectorAll('[data-theme-toggle], .btn-theme').forEach(btn => {
      const icon = btn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      }
    });
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  window.toggleTheme = function() {
    const current = getTheme();
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  // Application immédiate
  applyTheme(getTheme());

  // Après DOM prêt : brancher les boutons
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getTheme());
    document.querySelectorAll('[data-theme-toggle], .btn-theme').forEach(btn => {
      btn.addEventListener('click', window.toggleTheme);
    });
  });

  console.log('[SEN TEW] Theme manager v46 loaded — current:', getTheme());
})();
