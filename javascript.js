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

});