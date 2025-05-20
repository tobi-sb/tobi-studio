// Script de correction pour la navigation mobile/tablette
document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour masquer les liens vides et non pertinents
  function hideEmptyNavLinks() {
    // Sélectionne tous les liens de navigation
    const allNavLinks = document.querySelectorAll('.navbar-menu-item-link, .navbar-menu-item-link-copy');
    
    allNavLinks.forEach(function(link) {
      // Si le lien ne contient pas d'élément .text-block ou si le text-block est vide
      if (!link.querySelector('.text-block') || 
          (link.querySelector('.text-block') && link.querySelector('.text-block').textContent.trim() === '')) {
        // Masque le lien avec !important pour être sûr
        link.style.cssText = 'display: none !important';
      }
    });
    
    // Sélectionner spécifiquement les liens qui contiennent seulement une ligne sans texte
    const emptyLineLinks = document.querySelectorAll('.navbar-menu-item-link:not(:has(.text-block)), .navbar-menu-item-link .navbar-menu-item-inner:empty');
    emptyLineLinks.forEach(function(element) {
      // Si c'est un .navbar-menu-item-inner, on cible le parent
      if (element.classList.contains('navbar-menu-item-inner')) {
        element.closest('.navbar-menu-item-link, .navbar-menu-item-link-copy').style.cssText = 'display: none !important';
      } else {
        element.style.cssText = 'display: none !important';
      }
    });
  }
  
  // Fonction spécifique pour le mobile
  function fixMobileNavigation() {
    // Sur mobile, on est encore plus strict
    const mediaQuery = window.matchMedia('(max-width: 991px)');
    
    if (mediaQuery.matches) {
      // Sur les petits écrans, on est plus agressif
      const mobileNavLinks = document.querySelectorAll('.navbar-menu .navbar-menu-item-link, .navbar-menu .navbar-menu-item-link-copy');
      
      mobileNavLinks.forEach(function(link) {
        // Si le lien n'a pas de .text-block avec du contenu, on le cache
        if (!link.querySelector('.text-block') || 
            (link.querySelector('.text-block') && link.querySelector('.text-block').textContent.trim() === '')) {
          // Appliquer le style directement
          link.style.cssText = 'display: none !important';
          
          // Également injecter du CSS pour être doublement sûr
          const styleEl = document.createElement('style');
          const linkClass = link.className.split(' ').join('.');
          styleEl.innerHTML = `.${linkClass} { display: none !important; }`;
          document.head.appendChild(styleEl);
        }
      });
      
      // Cible également les liens dans les sous-menus
      const navMenus = document.querySelectorAll('.navbar-menu .navbar-menu');
      navMenus.forEach(function(menu) {
        const emptyLinks = menu.querySelectorAll('.navbar-menu-item-link:not(:has(.text-block))');
        emptyLinks.forEach(function(link) {
          link.style.cssText = 'display: none !important';
        });
      });
    }
  }
  
  // Exécuter les fonctions immédiatement
  hideEmptyNavLinks();
  fixMobileNavigation();
  
  // Ajouter les écouteurs d'événements
  window.addEventListener('resize', function() {
    hideEmptyNavLinks();
    fixMobileNavigation();
  });
  
  // Pour s'assurer que les corrections sont appliquées même après un chargement de page lent
  window.addEventListener('load', function() {
    hideEmptyNavLinks();
    fixMobileNavigation();
    
    // Un petit délai pour s'assurer que tout est bien chargé
    setTimeout(function() {
      hideEmptyNavLinks();
      fixMobileNavigation();
    }, 500);
  });
}); 