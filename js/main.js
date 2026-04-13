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
const texts = ['ROMAN NEGRILA', 'R&T CYBERSÉCURITÉ', 'ALTERNANT'];
let textIndex = 0; // Index du texte actuel dans le tableau 'texts'
let charIndex = 0; // Index du caractère actuel dans le texte en cours
let isDeleting = false; // true si on efface, false si on écrit

const typingSpeed = 100; // Vitesse d'écriture (ms par caractère)
const deletingSpeed = 50; // Vitesse d'effacement (ms par caractère)
const pauseAfterWord = 2000; // Durée de la pause après qu'un mot est entièrement tapé (en ms)

function type() {
    if (!typingEl) return; // S'assurer que l'élément existe toujours

    const currentText = texts[textIndex];
    let currentDisplayedText = '';
    let timeoutDuration = typingSpeed;

    if (isDeleting) {
        // Mode effacement
        currentDisplayedText = currentText.substring(0, charIndex - 1);
        charIndex--;
        timeoutDuration = deletingSpeed;

        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Passe au texte suivant
            charIndex = 0; // Réinitialise l'index des caractères pour le nouveau mot
            // Pas de setTimeout ici, le prochain appel de type() commencera à écrire
            timeoutDuration = typingSpeed; // Pour le prochain cycle d'écriture
        }
    } else {
        // Mode écriture
        currentDisplayedText = currentText.substring(0, charIndex + 1);
        charIndex++;
        timeoutDuration = typingSpeed;

        if (charIndex > currentText.length) {
            isDeleting = true;
            // Le mot est entièrement tapé, on ajoute une pause avant de commencer à effacer
            timeoutDuration = pauseAfterWord; // La pause avant l'effacement
        }
    }
    
    // Mise à jour de l'affichage avec le curseur clignotant
    typingEl.textContent = currentDisplayedText + '|';

    // Planifie la prochaine étape
    setTimeout(type, timeoutDuration);
}

// Démarre l'animation
type();
}
    // Intersection Observer Animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // S'assure que l'animation ne se déclenche que pour les sections NON-hero
                if (!entry.target.matches('#hero')) { // <-- AJOUT DE CETTE CONDITION
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe toutes les sections pour l'animation, SAUF la section #hero
    document.querySelectorAll('section').forEach(section => {
        if (!section.matches('#hero')) { // <-- AJOUT DE CETTE CONDITION
            observer.observe(section);
        }
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
});
