// Auto dark-mode SEN TEW v40
(function(){
  function applyMode(){
    const saved = localStorage.getItem('theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved === 'dark' || (saved === null && sysDark);
    document.body.classList.toggle('dark-mode', useDark);
    document.documentElement.setAttribute('data-theme', useDark ? 'dark' : 'light');
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMode);
  } else {
    applyMode();
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyMode);
  window.toggleTheme = function(){
    const cur = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', cur);
    applyMode();
  };
})();
