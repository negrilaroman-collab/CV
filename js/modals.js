// modals.js
 
const allModalsData = {
  'pepiniere': {
    type: 'project', // Ajout d'un type
    title: 'Pépinière d\'Entreprise - SAE21/SAE24', 
    description: 'Infrastructure réseau complète pour pépinière d\'entreprises: VLANs, routage OSPF, ToIP Asterisk, AD/LDAP, portail web Guacamole, sécurité pfSense. Un projet bien costaud qui m\'a permis de mettre les mains dans le cambouis réseau et système. Note: <strong>16/20</strong>',
    technologies: ['Cisco IOS', 'Asterisk VoIP', 'Docker', 'pfSense', 'Active Directory'],
    images: [
      { src: 'images/connec/connecter_infra.jpg', description: 'Schéma détaillé de l\'infrastructure réseau avec ses VLANs.' },
      { src: 'images/connec/connecter_telephonie.jpg', description: 'Architecture de la téléphonie VoIP Asterisk mise en place.' }
    ],
    achievements: ['Réseau multi-VLAN fonctionnel de A à Z', 'ToIP opérationnel avec 20 extensions configurées', 'Portail d\'accès sécurisé et robuste']
  },
  'sae501': {
    type: 'project',
    title: 'SAE 501 - Infrastructure DevOps from scratch',
    description: 'Une plateforme conteneurisée super pratique pour nos TPs ! J\'ai monté une API Flask Python, une base MySQL, et mis en place le monitoring multi-conteneurs Docker avec Portainer. Le déploiement est automatisé, un vrai gain de temps et d\'efficacité. Note: <strong>17/20</strong>',
    technologies: ['Docker Compose', 'Flask Python', 'MySQL', 'Portainer', 'Linux'],
    images: [
      { src: 'images/projets/SAE/connecter_docker.png', description: 'Vue d\'ensemble de l\'architecture Docker et de ses services.' },
      { src: 'images/connec/connecter_docker.png', description: 'Interface Portainer pour la gestion visuelle des conteneurs et stacks.' }
    ],
    achievements: ['API REST complète et fonctionnelle', 'Tableaux de bord de monitoring clairs et réactifs', 'Capacité de scale horizontal des conteneurs, au top pour la charge']
  },
  'sae503': {
    type: 'project',
    title: 'SAE 503 - Communications Multimédia (VoIP & QR)',
    description: 'Pour cette SAÉ, on a bossé sur un système de communication VoIP avec Asterisk, couplé à de la détection de QR code en temps réel via OpenCV en Python. Et bien sûr, analyse Wireshark pour comprendre tout ce qui se passe sous le capot. Un travail d\'équipe avec Duval et Bauchart. Note: <strong>15/20</strong>',
    technologies: ['Asterisk VoIP', 'OpenCV Python', 'Wireshark', 'QR Detection'],
    images: [
      { src: 'images/projets/SAE/connecter_videoufc.jpg', description: 'Paramétrage de VLC pour le visionnage d\'une chaîne TV via notre infrastructure.' },
      { src: 'images/connec/connecter_camqrcode.jpg', description: 'Démonstration en direct de la détection de QR codes via webcam.' }
    ],
    achievements: ['Détection QR en temps réel précise et rapide', 'Flux vidéo sécurisé mis en place', 'Analyse de paquets VoIP détaillée avec Wireshark']
  },
  'sae_rom03': {
    type: 'project',
    title: 'SAE ROM.03 - Services Multimédias Web',
    description: 'Déploiement de services multimédias et intégration web pour la section ROM. On a conçu une infrastructure web robuste pour supporter du streaming et du contenu interactif, en optimisant l\'expérience utilisateur. C\'était l\'occasion de mixer mes compétences réseau et développement web !',
    technologies: ['Web Integration', 'Multimédia', 'Streaming', 'ROM Services'],
    images: [
      { src: 'images/projets/SAE/connecter_emetteur.png', description: 'Schéma de la mise en place d\'un émetteur multimédia pour la diffusion.' }
    ],
    achievements: ['Plusieurs services web multimédias déployés avec succès', 'Intégration multimédia fluide et performante', 'Solution optimisée pour la diffusion en temps réel']
  },
  // NOUVELLES DONNÉES POUR LES LOISIRS
  'music': {
    type: 'hobby', // Ajout d'un type
    title: 'Passion Musique : Artiste ',
    description: 'Depuis 3 ans, je crée de la musique avec tout son aspect visuel et je la diffuse sur toutes sortes de plateformes de streaming. Pour ce faire j\'utilise FL Studio, Photoshop et Première Pro',
    technologies: ['FL Studio', 'Photoshop', 'Premiere Pro', 'Mixage DJ', 'Sound Design', 'Composition'], // Ajout de l'array manquant
    images: [
      { src: 'images/hobbies/Spotify.jpg', description: 'Mon compte Spotify' }, // Correction : ajout de la quote fermante
      { src: 'images/hobbies/music_mix.jpg', description: 'Exemple pochette d\'un morceau' }
    ],
    achievements: ['Plusieurs morceaux composés et finalisés', 'Création et gestion d\'une chaîne Soundcloud/YouTube pour mes productions']
  },
  'it': {
    type: 'hobby',
    title: 'Mon Home Lab : L\'Info en Mode Bac à Sable',
    description: 'L\'informatique et les réseaux, ce n\'est pas juste mon BUT, c\'est ma passion ! J\'ai monté un petit "home lab" où je peux tester tout ce qui me passe par la tête : configurer des switches, installer des points d\'accès Wi-Fi, bidouiller des serveurs Linux... C\'est mon terrain de jeu pour expérimenter, casser et reconstruire sans pression, ce qui renforce mes compétences pour le monde pro.',
    technologies: ['Linux Servers', 'Cisco Packet Tracer', 'Ubiquiti (Unifi)', 'Proxmox', 'Docker'],
    images: [], // Ajout de l'array manquant (vide si pas d'images pour l'instant)
    achievements: ['Mise en place d\'un serveur Proxmox avec VMs et conteneurs', 'Configuration de réseaux VLAN complexes à domicile', 'Expérimentation avec des pare-feu et VPN open-source']
  },
  'gaming': {
    type: 'hobby',
    title: 'Gaming : Défis, Stratégie et Immersion',
    description: 'Les jeux vidéo sont ma bouffée d\'air frais. Particulièrement fan des "Souls-like" comme Sekiro, Dark Souls ou Elden Ring, j\'apprécie la persévérance et l\'analyse des patterns nécessaires pour surmonter les défis. Des mondes ouverts riches comme Ghost of Tsushima me permettent de m\'évader et d\'apprécier la narration. Une excellente façon de développer ma capacité à résoudre des problèmes complexes et à m\'adapter rapidement !',
    technologies: ['PC Gaming', 'Stratégie', 'Réflexes', 'Patience'],
    images: [], // Correction : doit être un array valide, même vide
    achievements: ['Platiné plusieurs jeux exigeants (ex: Elden Ring, Bloodborne)', 'Participation et victoire occasionnelle à des tournois amicaux', 'Capacité à apprendre et maîtriser de nouvelles mécaniques de jeu rapidement']
  }
};

// Modifié pour prendre en compte le type de contenu (project/hobby)
function openModal(id) {
  console.log(`[modals.js] openModal appelée avec l'ID: ${id}`); // LOG
  const data = allModalsData[id]; // Utilise le nouvel objet global
  if (!data) {
    console.error(`[modals.js] Aucune donnée trouvée pour l'ID: ${id}`); // LOG D'ERREUR
    return;
  }
  console.log(`[modals.js] Données chargées pour le modal:`, data); // LOG
  
  const body = document.getElementById('modal-body');
  if (!body) {
      console.error(`[modals.js] L'élément #modal-body est introuvable !`); // LOG D'ERREUR
      return;
  }

  // Correction: Si technologies est undefined, on utilise un array vide pour éviter l'erreur .map
  const technologiesHtml = (data.technologies && data.technologies.length > 0) 
    ? data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')
    : '';

  body.innerHTML = `
    <div class="modal-title">${data.title}</div>
    <div class="modal-description">${data.description}</div>
    <div class="modal-tech">
      ${technologiesHtml}
    </div>
    ${data.images && data.images.length > 0 ? `<div class="modal-images">
      ${data.images.map(img => `
        <div class="modal-image-wrapper">
          <img src="${img.src}" alt="${img.description || 'Image'}" class="modal-img" data-full-src="${img.src}" data-description="${img.description || ''}">
          <div class="modal-image-description">
            ${img.description || 'Description non disponible'}
          </div>
        </div>
      `).join('')}
    </div>` : ''}
    <div class="modal-achievements">
      <h5>${data.type === 'project' ? 'Résultats:' : 'Ce que ça m\'apporte / Highlights :'}</h5>
      <ul>${data.achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
    </div>
  `;
  
  // Attacher les écouteurs d'événements aux images de la modale pour ouvrir la lightbox
  const modalImages = body.querySelectorAll('.modal-image-wrapper .modal-img');
  modalImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation(); 
      openLightbox(img.dataset.fullSrc, img.dataset.description);
    });
  });

  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
      modalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
      console.log(`[modals.js] Modal affiché pour l'ID: ${id}`); // LOG
  } else {
      console.error(`[modals.js] L'élément #modal-overlay est introuvable !`); // LOG D'ERREUR
  }
}

function closeModal() {
  console.log(`[modals.js] closeModal appelée`); // LOG
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
      modalOverlay.classList.remove('show');
      document.body.style.overflow = '';
  }
}

// Nouvelle fonction pour ouvrir la lightbox
function openLightbox(imageSrc, imageDescription) {
    console.log(`[modals.js] openLightbox appelée avec l'image: ${imageSrc}`); // LOG
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');

    if (!lightboxOverlay || !lightboxImage || !lightboxDescription) {
        console.error(`[modals.js] Un élément de la lightbox est introuvable !`); // LOG D'ERREUR
        return;
    }

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageDescription || 'Image en plein écran';
    lightboxDescription.textContent = imageDescription || '';
    lightboxDescription.style.display = imageDescription ? 'block' : 'none';

    lightboxOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Nouvelle fonction pour fermer la lightbox
function closeLightbox() {
    console.log(`[modals.js] closeLightbox appelée`); // LOG
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    if (lightboxOverlay) {
        lightboxOverlay.classList.remove('show');
        document.body.style.overflow = '';
        document.getElementById('lightbox-image').src = ''; // Clear image src
    }
}

// Init modals onclick et gestion de la lightbox
document.addEventListener('DOMContentLoaded', () => {
  console.log('[modals.js] DOMContentLoaded fired.'); // LOG

  // Attache les écouteurs pour les projets
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId; // Utilise data-project-id
      console.log(`[modals.js] Clic sur Project Card: ${projectId}`); // LOG
      if (projectId) {
        openModal(projectId);
      } else {
        console.warn(`[modals.js] Project Card cliquée sans data-projectId:`, card); // LOG D'ALERTE
      }
    });
  });

  // NOUVEAU: Attache les écouteurs pour les loisirs
  document.querySelectorAll('.hobby-card').forEach(card => {
    card.addEventListener('click', () => {
      const hobbyId = card.dataset.hobbyId; // Utilise data-hobby-id
      console.log(`[modals.js] Clic sur Hobby Card: ${hobbyId}`); // LOG
      if (hobbyId) {
        openModal(hobbyId);
      } else {
        console.warn(`[modals.js] Hobby Card cliquée sans data-hobby-id:`, card); // LOG D'ALERTE
      }
    });
  });

  // Écouteurs d'événements pour la fermeture de la lightbox
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  if (lightboxOverlay) {
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
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
