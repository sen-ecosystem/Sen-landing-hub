// ===== SEN TEW - Swipe entre pages =====
(function(){
  const PAGES = [
    {url:'index.html', name:'home'},
    {url:'categories.html', name:'categories'},
    {url:'panier.html', name:'cart'},
    {url:'messages.html', name:'messages'},
    {url:'profil.html', name:'profile'}
  ];

  const current = location.pathname.split('/').pop() || 'index.html';
  const curIdx = PAGES.findIndex(p => p.url === current);
  if (curIdx === -1) return;

  let startX = 0, startY = 0, startT = 0;
  const app = document.getElementById('app-swipe') || document.body;

  app.addEventListener('touchstart', e=>{
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startT = Date.now();
  }, {passive:true});

  app.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const dt = Date.now() - startT;

    // Swipe seulement si horizontal, rapide, et près du bord
    if (Math.abs(dx) > 100 && Math.abs(dy) < 60 && dt < 500 && (startX < 40 || startX > window.innerWidth - 40 || Math.abs(dx) > 150)) {
      if (dx < 0 && curIdx < PAGES.length - 1) {
        // Swipe gauche → page suivante
        animateAndGo(PAGES[curIdx+1].url, 'left');
      } else if (dx > 0 && curIdx > 0) {
        // Swipe droite → page précédente
        animateAndGo(PAGES[curIdx-1].url, 'right');
      }
    }
  }, {passive:true});

  function animateAndGo(url, dir){
    document.body.style.transition = 'transform .25s ease, opacity .25s ease';
    document.body.style.transform = `translateX(${dir==='left'?-50:50}px)`;
    document.body.style.opacity = '0.5';
    if(navigator.vibrate) navigator.vibrate(15);
    setTimeout(()=>location.href = url, 200);
  }
})();
