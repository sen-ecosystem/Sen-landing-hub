// SEN TEW - Mode sombre + Multi-devise
(function() {
  // Init dark mode depuis localStorage
  const isDark = localStorage.getItem('sentew_dark') === '1';
  if (isDark) document.body.classList.add('dark-theme');

  // Bouton toggle flottant (seulement pages user)
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.dark-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'dark-toggle';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = 'Basculer mode sombre';
    btn.onclick = () => {
      document.body.classList.toggle('dark-theme');
      const nowDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('sentew_dark', nowDark ? '1' : '0');
      btn.textContent = nowDark ? '☀️' : '🌙';
    };
    document.body.appendChild(btn);
  });
})();

// Multi-devise global
window.CURRENCY = {
  current: localStorage.getItem('sentew_currency') || 'FCFA',
  rates: { FCFA: 1, EUR: 0.00152, USD: 0.00165 },
  set: function(cur) {
    this.current = cur;
    localStorage.setItem('sentew_currency', cur);
    location.reload();
  },
  format: function(fcfa) {
    if (this.current === 'FCFA') return Math.round(fcfa).toLocaleString('fr-FR') + ' FCFA';
    if (this.current === 'EUR') return (fcfa * this.rates.EUR).toFixed(2) + ' €';
    if (this.current === 'USD') return '$' + (fcfa * this.rates.USD).toFixed(2);
    return fcfa + ' FCFA';
  }
};
