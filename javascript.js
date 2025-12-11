document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const cursor = document.querySelector('.custom-cursor');
    const contentContainer = document.getElementById('content-container');

    // Burger Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burgerMenu && navMenu) {
        // S'assurer que le menu est fermé au chargement
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        
        burgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fermer le menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 1. GESTION DU CHANGEMENT DE PAGE (Transitions d'Opacité)
    // Sur le site multi-page, on ne veut pas empêcher la navigation normale.
    // Ce handler n'intercepte les clics que si la page utilise le mode
    // 'single-page' (présence d'éléments `.page`).
    // Only enable single-page JS navigation if pages exist AND nav items use data-page
    const navHasDataPage = Array.from(navItems).some(i => i.hasAttribute && i.hasAttribute('data-page'));
    if (pages.length > 0 && navHasDataPage) {
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPageId = item.getAttribute('data-page');

                // Mise à jour de la navigation
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Transition de Page
                pages.forEach(page => {
                    if (page.id === targetPageId) {
                        page.classList.add('active');
                    } else {
                        page.classList.remove('active');
                    }
                });
            });
        });
    }

    // 2. MOUVEMENT DU CURSEUR PERSONNALISÉ
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            // Déplacer le curseur avec la souris
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // ... (Code existant pour la navigation et le curseur) ...

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- CORRECTION : Initialiser toutes les cartes en mode visible ---
    projectCards.forEach(card => {
        card.style.display = 'flex'; // S'assurer que le style d'affichage est correct
        card.style.opacity = 1;      // S'assurer qu'elles ne sont pas transparentes
        card.style.transform = 'translateY(0)'; // S'assurer qu'elles ne sont pas décalées
    });
    // ------------------------------------------------------------------

    // ------------------------------------------------------------------
    // Logique de Filtrage des Projets (À conserver)
    // ------------------------------------------------------------------
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Mise à jour de l'état actif des boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                // Restaurer l'image grise
                const img = btn.querySelector('img[data-img-color]');
                if (img && img.hasAttribute('data-img-gray')) {
                    img.src = img.getAttribute('data-img-gray');
                }
            });
            button.classList.add('active');
            
            // Changer pour l'image couleur si disponible
            const activeImg = button.querySelector('img[data-img-color]');
            if (activeImg) {
                if (!activeImg.hasAttribute('data-img-gray')) {
                    activeImg.setAttribute('data-img-gray', activeImg.src);
                }
                activeImg.src = activeImg.getAttribute('data-img-color');
            }

            // Logique de masquage/affichage
            projectCards.forEach(card => {
                // Utiliser 'includes(filterValue)' pour chercher la catégorie
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    // Afficher la carte
                    // Si une timeout de masquage est en cours, l'annule
                    if (card._hideTimeout) {
                        clearTimeout(card._hideTimeout);
                        delete card._hideTimeout;
                    }
                    card.style.display = 'flex';
                    // Forcer repaint avant l'animation (sécurité)
                    requestAnimationFrame(() => {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    // Masquer la carte avec animation
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(20px)';
                    // Retarder le display none pour laisser l'animation se faire
                    // On stocke l'ID du timeout sur l'élément pour pouvoir l'annuler
                    card._hideTimeout = setTimeout(() => {
                        card.style.display = 'none';
                        delete card._hideTimeout;
                    }, 420);
                }
            });
        });
    });
});


// (Dans votre fichier script.js, à ajouter après la déclaration des cartes)
// (cleanup: duplicate initialization removed — projectCards is already handled above)



// Preloader removed — no page-loading behavior

// Smooth scroll for nav anchors + update active nav item on scroll
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-landing');

    // Click -> smooth scroll to anchor
    navItems.forEach(item => {
        const href = item.getAttribute('href') || '';
        if (href.startsWith('#')) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // update active class instantly
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            });
        }
    });

    // IntersectionObserver to update active nav as user scrolls
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const navMatch = document.querySelector(`.nav-item[href="#${id}"]`);
            if (entry.isIntersecting && navMatch) {
                navItems.forEach(n => n.classList.remove('active'));
                navMatch.classList.add('active');
            }
        });
    }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
});