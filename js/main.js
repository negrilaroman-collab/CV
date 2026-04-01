// main.js

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');

    // --- LOGIQUE POUR LE BOUTON BASCULE ---
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // --- ADAPTATION DE LA LOGIQUE DES LIENS DE NAVIGATION ---
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                if (window.innerWidth < 1024 || sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }

                document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
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
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section.getAttribute('id');
                    }
                });
                document.querySelectorAll('.nav-item').forEach(link => {
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

    // La logique des modals et lightbox est maintenant centralisée dans modals.js
    // et les écouteurs de clic sont attachés là-bas.

// Typing Animation (Nom)
const typingEl = document.querySelector('.typing-name');
if (typingEl) {
    const texts = ['ROMAN NEGRILA', 'R&T CYBERSÉCURITÉ', 'ALTERNANT 2026'];
    let i = 0; // Index du texte actuel
    let j = 0; // Index du caractère actuel dans le texte
    let dir = 1; // 1 pour écrire, -1 pour effacer
    const typingSpeed = 100; // Vitesse d'écriture (ms par caractère)
    const deletingSpeed = 50; // Vitesse d'effacement (ms par caractère)
    const pauseAfterWord = 2000; // Durée de la pause après qu'un mot est entièrement tapé (en ms)

    function type() {
        if (typingEl) {
            typingEl.textContent = texts[i].slice(0, j) + '|';

            if (dir === 1) { // Mode écriture
                if (j < texts[i].length) {
                    j++;
                    setTimeout(type, typingSpeed);
                } else { // Le mot est entièrement tapé
                    setTimeout(() => {
                        dir = -1; // Change la direction pour effacer après la pause
                        type(); // Reprend l'animation (effacement)
                    }, pauseAfterWord); // C'est ici que nous ajoutons la pause
                }
            } else { // Mode effacement (dir === -1)
                if (j > 0) {
                    j--;
                    setTimeout(type, deletingSpeed);
                } else { // Le mot est entièrement effacé
                    dir = 1; // Change la direction pour écrire
                    i = (i + 1) % texts.length; // Passe au texte suivant
                    setTimeout(type, typingSpeed); // Commence à taper le nouveau mot
                }
            }
        }
    }
    type();
}

    // Intersection Observer Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Utilise 'fade-in' qui est définie dans le CSS
            } else {
                entry.target.classList.remove('fade-in'); // Optionnel: pour refaire l'animation en scrollant
            }
        });
    }, { threshold: 0.1 }); // Déclenche quand 10% de l'élément est visible

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    
    // Initialisation des animations au chargement pour les sections déjà visibles
    document.querySelectorAll('section').forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('fade-in');
        }
    });
});

// --- NOUVELLE FONCTION POUR IMPRIMER LE CV PDF DÉDIÉ ---
// Cette fonction reste inchangée, mais assurez-vous que cv-pdf.html existe.
window.printDedicatedCvPdf = function() {
    const printWindow = window.open('cv-pdf.html', '_blank');
    if (printWindow) { // Assurez-vous que la fenêtre a été ouverte
        printWindow.onload = function() {
            printWindow.print();
        };
    } else {
        alert('Veuillez autoriser les pop-ups pour imprimer le CV.');
    }
};
