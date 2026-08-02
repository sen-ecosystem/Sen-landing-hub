// ===== SEN TEW - Logos SVG inline (permanents) =====

// Logo SEN TEW principal
window.SEN_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%230F6B4E'/><stop offset='1' stop-color='%23D4A574'/></linearGradient></defs><circle cx='50' cy='50' r='48' fill='url(%23g)'/><text x='50' y='45' text-anchor='middle' font-family='Arial Black' font-size='28' font-weight='900' fill='white'>SEN</text><text x='50' y='72' text-anchor='middle' font-family='Arial Black' font-size='22' font-weight='900' fill='%23D4A574'>TEW</text></svg>`;

// Logos paiement SVG inline
window.PAY_LOGOS = {
  wave: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%231BC4E8'/><ellipse cx='50' cy='45' rx='18' ry='22' fill='%23000'/><ellipse cx='50' cy='42' rx='14' ry='18' fill='white'/><circle cx='45' cy='38' r='2' fill='%23000'/><circle cx='55' cy='38' r='2' fill='%23000'/><path d='M40 48 Q50 55 60 48' stroke='%23FF6600' stroke-width='3' fill='none'/><text x='50' y='85' text-anchor='middle' font-family='Arial' font-size='14' font-weight='900' fill='white'>wave</text></svg>`,

  om: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FF6600' rx='12'/><path d='M20 30 L45 55 L20 80' stroke='white' stroke-width='8' fill='none' stroke-linecap='round'/><path d='M55 20 L80 45 L55 70' stroke='%23000' stroke-width='8' fill='none' stroke-linecap='round'/><text x='50' y='92' text-anchor='middle' font-family='Arial' font-size='10' font-weight='900' fill='white'>OM</text></svg>`,

  free: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white' rx='12'/><text x='50' y='40' text-anchor='middle' font-family='Arial Black' font-size='24' font-weight='900' fill='%23CC0000' font-style='italic'>free</text><text x='50' y='65' text-anchor='middle' font-family='Arial Black' font-size='14' font-weight='900' fill='%23333'>MONEY</text><line x1='15' y1='75' x2='40' y2='75' stroke='%23CC0000' stroke-width='2'/></svg>`,

  wizall: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2300BFD8' rx='12'/><text x='50' y='45' text-anchor='middle' font-family='Arial' font-size='22' font-weight='900' fill='white' font-style='italic'>Wizall</text><text x='50' y='72' text-anchor='middle' font-family='Arial' font-size='14' font-weight='900' fill='%23F5A524'>MONEY</text></svg>`,

  card: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='10' y='25' width='80' height='50' rx='6' fill='%231a1a1a'/><rect x='10' y='35' width='80' height='10' fill='%23333'/><text x='50' y='68' text-anchor='middle' font-family='Arial' font-size='10' font-weight='900' fill='white'>VISA</text></svg>`,

  cash: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2310B981' rx='12'/><text x='50' y='60' text-anchor='middle' font-family='Arial' font-size='40' font-weight='900' fill='white'>💵</text></svg>`
};

// Alias URL
window.SEN_LOGO = window.SEN_LOGO_SVG;
window.SEN_LOGO_ICON = window.SEN_LOGO_SVG;

// Auto-remplace tous les <img data-sen-logo>
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-sen-logo]').forEach(el=>{
    el.src = window.SEN_LOGO_SVG;
  });
  // Remplace logos paiement
  document.querySelectorAll('[data-pay-logo]').forEach(el=>{
    const key = el.getAttribute('data-pay-logo');
    if(window.PAY_LOGOS[key]) el.src = window.PAY_LOGOS[key];
  });
});
