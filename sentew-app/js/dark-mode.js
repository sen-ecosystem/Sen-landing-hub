// ===== DARK MODE AUTO SEN TEW v3 =====
(function(){

  // Récupère la préférence utilisateur, sinon dark par défaut
  const savedTheme = localStorage.getItem('sen_theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || 'dark'; // ← DARK PAR DÉFAUT

  // Applique immédiatement
  document.documentElement.setAttribute('data-theme', theme);

  // Applique aussi le pays si défini
  const country = localStorage.getItem('sen_country') || 'SN';
  document.documentElement.setAttribute('data-country', country);

  // Fonction toggle (utilisée par le bouton ☀️/🌙 dans les paramètres)
  window.toggleDarkMode = function(){
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sen_theme', next);
    if(navigator.vibrate) navigator.vibrate(30);
  };

  // Écoute les changements système
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if(!localStorage.getItem('sen_theme')){
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  // Debug console
  console.log('🌙 Dark mode auto-appliqué :', theme);
})();
