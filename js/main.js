document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle'); // Votre nouveau bouton

    // --- LOGIQUE POUR LE BOUTON BASCULE ---
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active'); // Ajoute/retire la classe 'active'
        });
    }

    // --- ADAPTATION DE LA LOGIQUE DES LIENS DE NAVIGATION ---
    document.querySelectorAll('.nav-item').forEach(link => { // Note: C'était '.sidebar-link' dans votre JS original, mais votre HTML utilise '.nav-item'
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Fermer la sidebar après avoir cliqué sur un lien (sur mobile ou si elle est ouverte)
                if (window.innerWidth < 1024 || sidebar.classList.contains('active')) { // Vérifie si mobile OU si la sidebar est ouverte
                    sidebar.classList.remove('active');
                }

                // Logique pour marquer le lien actif
                document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active')); // Utilisez .nav-item
                this.classList.add('active');
            }
        });
    });

    // --- ADAPTATION DE LA LOGIQUE DE DÉFILEMENT (Active Nav) ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section[id]');
                let current = '';
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    // Ajustez ces valeurs si nécessaire pour un meilleur déclenchement
                    if (rect.top <= 150 && rect.bottom >= 150) { // Un peu plus large pour la détection
                        current = section.getAttribute('id');
                    }
                });
                document.querySelectorAll('.nav-item').forEach(link => { // Utilisez .nav-item ici aussi
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

    // Votre code existant pour les modals et autres...
    // Modals - Load modals.js for detailed content
    if (typeof openModal === 'undefined') {
        const script = document.createElement('script');
        script.src = 'js/modals.js';
        document.head.appendChild(script);
    }

    // Close Modal
    document.addEventListener('click', e => {
        // Assurez-vous que l'ID ici correspond à votre modal si elle a changé
        const projectModal = document.getElementById('modal-overlay'); // Votre modal a l'id modal-overlay
        if (projectModal && (e.target.classList.contains('modal-overlay') || e.target.closest('.modal-close'))) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', e => {
        const projectModal = document.getElementById('modal-overlay');
        if (projectModal && e.key === 'Escape') {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

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

