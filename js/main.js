// main.js · navigation, animations et fond réseau du CV web

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Barre du haut : fond au défilement + barre de progression ---
  const topbar = document.getElementById('topbar');
  const progress = document.getElementById('progress-bar');
  const navLinks = [...document.querySelectorAll('.nav-item')];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    topbar.classList.toggle('scrolled', y > 20);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    // Lien actif selon la section visible
    let current = null;
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= 140) current = sec.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // --- Menu mobile ---
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menu-btn');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.innerHTML = `<svg class="ico"><use href="#i-${open ? 'close' : 'menu'}"/></svg>`;
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  navLinks.forEach(l => l.addEventListener('click', () => setMenu(false)));

  // --- Apparition au défilement ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // léger décalage entre cartes d'une même grille
          const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
          el.style.transitionDelay = Math.min(siblings.indexOf(el), 5) * 70 + 'ms';
          el.classList.add('visible');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // --- Rôle tapé façon terminal ---
  const typed = document.getElementById('typed');
  if (typed && !reduceMotion) {
    const words = [
      'Technicien Infrastructure & Réseaux',
      'Exploitation réseau · Auchan Retail',
      'Supervision & ITSM · EasyVista',
      'BUT R&T Cybersécurité · Bac+3'
    ];
    let w = 0, c = words[0].length, deleting = true;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 28 : 55;
      if (!deleting && c === word.length) { deleting = true; delay = 2200; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2600);
  }

  // --- Fond : petit réseau de nœuds animé ---
  const canvas = document.getElementById('net-bg');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let nodes = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (W * H) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.14 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(125, 211, 252, 0.55)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  // --- Fermer la modale avec Échap ou en cliquant à côté ---
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('show')) closeModal();
    });
  }
});
