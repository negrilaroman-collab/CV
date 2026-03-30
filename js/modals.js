const modalsData = {
  'pepiniere': {
    title: 'Pépinière d\'Entreprise - SAE21/SAE24',
    description: 'Infrastructure réseau complète pour pépinière d\'entreprises: VLANs, routage OSPF, ToIP Asterisk, AD/LDAP, portail web Guacamole, sécurité pfSense. Note: <strong>16/20</strong>',
    technologies: ['Cisco IOS', 'Asterisk VoIP', 'Docker', 'pfSense', 'Active Directory'],
    images: ['../assets/images/connec/connecter_infra.jpg', '../assets/images/connec/connecter_telephonie.jpg'],
    achievements: ['Réseau multi-VLAN fonctionnel', 'ToIP opérationnel 20 extensions', 'Portail d\'accès sécurisé']
  },
  'sae501': {
    title: 'SAE 501 - Infrastructure DevOps',
    description: 'Plateforme TP conteneurisée: API Flask Python, base MySQL, monitoring multi-conteneurs Docker avec Portainer. Déploiement automatisé. Note: <strong>17/20</strong>',
    technologies: ['Docker Compose', 'Flask Python', 'MySQL', 'Portainer', 'Linux'],
    images: ['../assets/sae23/static/Images/docker.jpg', '../assets/sae23/static/Images/flask.png'],
    achievements: ['API REST complète', 'Monitoring dashboards', 'Scale horizontal conteneurs']
  },
  'sae503': {
    title: 'SAE 503 - Communications Multimédia',
    description: 'Système de communication VoIP Asterisk + detection QR code realtime OpenCV Python + analyse Wireshark. Équipe Duval/Bauchart/Negrila. Note: <strong>15/20</strong>',
    technologies: ['Asterisk VoIP', 'OpenCV Python', 'Wireshark', 'QR Detection'],
    images: ['../assets/images/projets/SAE/connecter_videoufc.jpg', '../assets/images/surve/surveiller_docker.jpg'],
    achievements: ['Détection QR temps réel', 'Flux vidéo sécurisé', 'Analyse paquets VoIP']
  },
  'sae_rom03': {
    title: 'SAE ROM.03 - Services Multimédias Web',
    description: 'Déploiement services multimédias et intégration web pour ROM. Infrastructure web + streaming.',
    technologies: ['Web Integration', 'Multimédia', 'ROM Services'],
    images: ['../assets/images/projets/SAE/connecter_emetteur.png'],
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
    ${data.images ? `<div class="modal-images">
      ${data.images.map(img => `<img src="${img}" alt="Projet" class="modal-img">`).join('')}
    </div>` : ''}
    <div class="modal-achievements">
      <h5>Résultats:</h5>
      <ul>${data.achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
    </div>
  `;
  
  document.getElementById('modal-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// Init modals onclick
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const projectId = card.getAttribute('onclick').match(/'([^']+)'/)[1];
      openModal(projectId);
    });
  });
});

