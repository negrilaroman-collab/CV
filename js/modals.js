const modalsData = {
  'pepiniere': {
    title: 'Pépinière d\'Entreprise - SAE21/SAE24', 
    description: 'Infrastructure réseau complète pour pépinière d\'entreprises: VLANs, routage OSPF, ToIP Asterisk, AD/LDAP, portail web Guacamole, sécurité pfSense. Note: <strong>16/20</strong>',
    technologies: ['Cisco IOS', 'Asterisk VoIP', 'Docker', 'pfSense', 'Active Directory'],
    images: [
      { src: 'images/connec/connecter_infra.jpg', description: 'Schéma de l\'infrastructure réseau VLANs' },
      { src: 'images/connec/connecter_telephonie.jpg', description: 'Architecture de la téléphonie VoIP Asterisk' }
    ],
    achievements: ['Réseau multi-VLAN fonctionnel', 'ToIP opérationnel 20 extensions', 'Portail d\'accès sécurisé']
  },
  'sae501': {
    title: 'SAE 501 - Infrastructure DevOps',
    description: 'Plateforme TP conteneurisée: API Flask Python, base MySQL, monitoring multi-conteneurs Docker avec Portainer. Déploiement automatisé. Note: <strong>17/20</strong>',
    technologies: ['Docker Compose', 'Flask Python', 'MySQL', 'Portainer', 'Linux'],
    images: [
      { src: 'images/projets/SAE/connecter_docker.png', description: 'Vue d\'ensemble de l\'architecture Docker' },
      { src: 'images/connec/connecter_docker.png', description: 'Interface Portainer pour la gestion des conteneurs' }
    ],
    achievements: ['API REST complète', 'Monitoring dashboards', 'Scale horizontal conteneurs']
  },
  'sae503': {
    title: 'SAE 503 - Communications Multimédia',
    description: 'Système de communication VoIP Asterisk + detection QR code realtime OpenCV Python + analyse Wireshark. Équipe Duval/Bauchart/Negrila. Note: <strong>15/20</strong>',
    technologies: ['Asterisk VoIP', 'OpenCV Python', 'Wireshark', 'QR Detection'],
    images: [
      { src: 'images/projets/SAE/connecter_videoufc.jpg', description: 'Paramétrage de VLC : Visionnage Chaine TV' },
      { src: 'images/connec/connecter_camqrcode.jpg', description: 'Démonstration de la détection QR code en temps réel' }
    ],
    achievements: ['Détection QR temps réel', 'Flux vidéo sécurisé', 'Analyse paquets VoIP']
  },
  'sae_rom03': {
    title: 'SAE ROM.03 - Services Multimédias Web',
    description: 'Déploiement services multimédias et intégration web pour ROM. Infrastructure web + streaming.',
    technologies: ['Web Integration', 'Multimédia', 'ROM Services'],
    images: [
      { src: 'images/projets/SAE/connecter_emetteur.png', description: 'Mise en place d\'un émetteur multimédia' }
    ],
    achievements: ['Services web déployés', 'Intégration multimédia']
  }
};

function openModal(projectId) {
  const data = modalsData[projectId];
  if (!data) return;
  
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <div class="modal-title">${data.title}</div>
    <div class="modal-description">${data.description}</div>
    <div class="modal-tech">
      ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
    ${data.images && data.images.length > 0 ? `<div class="modal-images">
      ${data.images.map(img => `
        <div class="modal-image-wrapper">
          <!-- L'image n'est plus dans un lien, le clic sera géré par JS -->
          <img src="${img.src}" alt="${img.description || 'Image du projet'}" class="modal-img" data-full-src="${img.src}" data-description="${img.description || ''}">
          <div class="modal-image-description">
            ${img.description || 'Description de l\'image non disponible'}
          </div>
        </div>
      `).join('')}
    </div>` : ''}
    <div class="modal-achievements">
      <h5>Résultats:</h5>
      <ul>${data.achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
    </div>
  `;
  
  // Attacher les écouteurs d'événements aux images de la modale pour ouvrir la lightbox
  const modalImages = body.querySelectorAll('.modal-image-wrapper .modal-img');
  modalImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêche la propagation du clic, au cas où
      openLightbox(img.dataset.fullSrc, img.dataset.description);
    });
  });

  document.getElementById('modal-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// Nouvelle fonction pour ouvrir la lightbox
function openLightbox(imageSrc, imageDescription) {
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageDescription || 'Image en plein écran';
    lightboxDescription.textContent = imageDescription || '';
    lightboxDescription.style.display = imageDescription ? 'block' : 'none'; // Affiche seulement si description présente

    lightboxOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page principale
}

// Nouvelle fonction pour fermer la lightbox
function closeLightbox() {
    document.getElementById('lightbox-overlay').classList.remove('show');
    document.body.style.overflow = ''; // Rétablit le défilement
    // Optionnel : effacer l'image src pour libérer la mémoire ou éviter le flickering
    document.getElementById('lightbox-image').src = '';
}

// Init modals onclick et gestion de la lightbox
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const onclickAttr = card.getAttribute('onclick');
      if (onclickAttr) {
        const match = onclickAttr.match(/openModal\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          const projectId = match[1];
          openModal(projectId);
        }
      }
    });
  });

  // Écouteurs d'événements pour la fermeture de la lightbox
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  if (lightboxOverlay) {
    // Fermeture en cliquant sur le bouton "x"
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // Fermeture en cliquant en dehors de l'image (sur l'overlay)
    lightboxOverlay.addEventListener('click', (e) => {
      // Vérifie si le clic a eu lieu directement sur l'overlay et non sur l'image ou la description
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  }

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('show')) {
      closeLightbox();
    }
  });
});
