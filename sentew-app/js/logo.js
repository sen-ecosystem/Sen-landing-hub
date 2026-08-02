// ===== LOGO OFFICIEL SEN TEW =====
window.SEN_LOGO = 'https://www.genspark.ai/api/files/s/wdpD8VqY';
window.SEN_LOGO_ICON = 'https://www.genspark.ai/api/files/s/wdpD8VqY';

// Auto-inject dans tous les <img data-sen-logo>
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-sen-logo]').forEach(el=>{
    el.src = window.SEN_LOGO;
  });
});
