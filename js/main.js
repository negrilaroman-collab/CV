// CV Main JS - Adapté Portfolio (Sidebar, Modal, Animations)
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle Mobile
    const sidebar = document.querySelector('.sidebar');
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) sidebar.classList.remove('open');
        });
    });

    // Smooth Scroll & Active Nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Active sidebar
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Scroll Active Sidebar
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section[id]');
                let current = '';
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section.getAttribute('id');
                    }
                });
                document.querySelectorAll('.sidebar-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

// Modals - Load modals.js for detailed content
    if (typeof openModal === 'undefined') {
      const script = document.createElement('script');
      script.src = 'js/modals.js';
      document.head.appendChild(script);
    }

    // Close Modal
    document.addEventListener('click', e => {
        if (e.target.classList.contains('project-modal') || e.target.classList.contains('modal-close')) {
            document.getElementById('project-modal').classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.getElementById('project-modal').classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle') || document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
            localStorage.theme = document.body.dataset.theme;
        };
    }

    // Typing Animation (Nom)
    const typingEl = document.querySelector('.typing-name');
    if (typingEl) {
        const texts = ['ROMAN NEGRILA', 'R&T CYBERSÉCURITÉ', 'ALTERNANT 2026'];
        let i = 0, j = 0, dir = 1;
        function type() {
            typingEl.textContent = texts[i].slice(0, j) + '|';
            if (j === texts[i].length && dir === 1) dir = -1;
            else if (j === 0 && dir === -1) { dir = 1; i = (i + 1) % texts.length; }
            j += dir;
            setTimeout(type, dir > 0 ? 100 : 50);
        }
        type();
    }

    // Intersection Observer Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    document.querySelectorAll('section').forEach(section => observer.observe(section));
});

