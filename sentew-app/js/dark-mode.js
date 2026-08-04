// ===== SEN TEW DARK MODE - Global =====
(function(){
  const saved = localStorage.getItem('sentew_theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  
  window.toggleTheme = function(){
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sentew_theme', next);
    
    // Update icon
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  };
  
  // Auto-inject toggle button in headers
  document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.header, header.header');
    headers.forEach(h => {
      if(h.querySelector('.theme-toggle')) return;
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      const btn = document.createElement('button');
      btn.className = 'theme-toggle';
      btn.textContent = cur === 'dark' ? '☀️' : '🌙';
      btn.onclick = window.toggleTheme;
      btn.title = 'Mode sombre / clair';
      h.appendChild(btn);
    });
  });
})();
