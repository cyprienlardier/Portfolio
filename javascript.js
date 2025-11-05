// On attend que tout le HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {

    // --- Animation "Fade-in" au défilement ---

    // 1. On crée un "observateur"
    // C'est un outil moderne de JS qui regarde si un élément
    // entre ou sort de l'écran (le "viewport").
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // entry.isIntersecting est 'true' si l'élément est à l'écran
            if (entry.isIntersecting) {
                // On ajoute la classe "show" qui contient l'animation CSS
                entry.target.classList.add('show');
            } else {
                // Optionnel : si tu veux que l'animation se rejoue
                // à chaque fois qu'on re-scroll dessus, décommente la ligne ci-dessous.
                // entry.target.classList.remove('show');
            }
        });
    });

    // 2. On sélectionne tous les éléments qui ont la classe ".fade-in"
    // (Je l'ai mise sur les cartes de projet et les blocs "À Propos" dans le HTML)
    const elementsToFadeIn = document.querySelectorAll('.fade-in');

    // 3. On dit à l'observateur de "surveiller" chacun de ces éléments
    elementsToFadeIn.forEach((el) => observer.observe(el));

    // --- Animation de transition avant navigation ---
    // Crée un overlay global (une seule fois)
    let transitionOverlay = document.getElementById('page-transition-overlay');
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.id = 'page-transition-overlay';
        document.body.appendChild(transitionOverlay);
    }

    // Durée en ms correspondant à la transition CSS
    const TRANSITION_DURATION = 450;

    // Fonction utilitaire pour lancer la transition puis naviguer
    function navigateWithTransition(href, target) {
        // si cible _blank, ouvre immédiatement (évite blocage des popup)
        if (target && target === '_blank') {
            window.open(href, '_blank');
            return;
        }

        // show overlay
        transitionOverlay.classList.add('show');

        setTimeout(() => {
            // comportement selon le href
            if (!href || href === '#') {
                // nothing to navigate to: juste cacher l'overlay
                transitionOverlay.classList.remove('show');
                return;
            }

            if (href.startsWith('#')) {
                // ancre interne : défiler vers l'élément
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    // on scroll puis on retire l'overlay après un court délai
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => transitionOverlay.classList.remove('show'), 300);
                } else {
                    transitionOverlay.classList.remove('show');
                }
            } else {
                // navigation normale vers une autre page
                window.location.href = href;
            }
        }, TRANSITION_DURATION);
    }

    // Attacher l'écouteur aux liens de projets
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            // si le lien a une ancre JavaScript ou href vide, ignore
            const href = this.getAttribute('href');
            const target = this.getAttribute('target');

            // Empêche la navigation immédiate
            e.preventDefault();

            navigateWithTransition(href, target);
        });
    });

});