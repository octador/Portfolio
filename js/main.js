

class ClickSpark extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.root = document.documentElement;
        this.svg;
    }

    get activeEls() {
        return this.getAttribute("active-on");
    }

    connectedCallback() {
        this.setupSpark();

        this.root.addEventListener("click", (e) => {
            if (this.activeEls && !e.target.matches(this.activeEls)) return;

            this.setSparkPosition(e);
            this.animateSpark();
        });
    }

    animateSpark() {
        let sparks = [...this.svg.children];
        let size = parseInt(sparks[0].getAttribute("y1"));
        let offset = size / 2 + "px";

        let keyframes = (i) => {
            let deg = `calc(${i} * (360deg / ${sparks.length}))`;

            return [
                {
                    strokeDashoffset: size * 3,
                    transform: `rotate(${deg}) translateY(${offset})`
                },
                {
                    strokeDashoffset: size,
                    transform: `rotate(${deg}) translateY(0)`
                }
            ];
        };

        let options = {
            duration: 660,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            fill: "forwards"
        };

        sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
    }

    setSparkPosition(e) {
        let rect = this.root.getBoundingClientRect();

        this.svg.style.left =
            e.clientX - rect.left - this.svg.clientWidth / 2 + "px";
        this.svg.style.top =
            e.clientY - rect.top - this.svg.clientHeight / 2 + "px";
    }

    setupSpark() {
        let template = `
        <style>
          :host {
            display: contents;
          }
          
          svg {
            pointer-events: none;
            position: absolute;
            rotate: -20deg;
            stroke: var(--click-spark-color, currentcolor);
          }
  
          line {
            stroke-dasharray: 30;
            stroke-dashoffset: 30;
            transform-origin: center;
          }
        </style>
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
          ${Array.from(
            { length: 8 },
            (_) => `<line x1="50" y1="30" x2="50" y2="4"/>`
        ).join("")}
        </svg>
      `;

        this.shadowRoot.innerHTML = template;
        this.svg = this.shadowRoot.querySelector("svg");
    }
}

customElements.define("click-spark", ClickSpark);

/** Demo scripts **/

const spark = document.querySelector("click-spark");
const colorPicker = document.getElementById("click-spark-color");

// colorPicker.addEventListener("change", (e) => {
//     spark.style.setProperty("--click-spark-color", e.target.value);
// });

// ---------carousel-------------------
// Ceci est une fonction auto - exécutable.Les fonctions auto - exécutables
// sont des fonctions qui s'exécutent immédiatement après leur déclaration,
// sans avoir besoin d'être appelées.Les accolades immédiatement après la 
// déclaration de la fonction et les parenthèses à la fin de la déclaration 
// définissent la fonction et permettent de l'exécuter immédiatement.
(function () {
    // Utilisation de la directive "use strict" pour activer le mode strict en JavaScript
    // Cela implique une meilleure gestion des erreurs et une syntaxe plus stricte pour le code
    "use stict"
    // Déclare la constante pour la durée de chaque slide
    const slideTimeout = 5000;
    // Récupère les boutons de navigation
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    // Récupère tous les éléments de type "slide"
    const $slides = document.querySelectorAll('.slide');
    // Initialisation de la variable pour les "dots"
    let $dots;
    // Initialisation de la variable pour l'intervalle d'affichage des slides
    let intervalId;
    // Initialisation du slide courant à 1
    let currentSlide = 1;
    // Fonction pour afficher un slide spécifique en utilisant un index
    function slideTo(index) {
        // Vérifie si l'index est inférieur à 0 (avant la première diapositive)
        if (index < 0) {
            // Définir l'index sur la dernière diapositive
            currentSlide = $slides.length - 1;
        } else {
            // Vérifie si l'index est valide (compris entre 0 et le nombre de slides - 1)
            currentSlide = index >= $slides.length ? 0 : index;
        }
    
        // Boucle sur tous les éléments de type "slide" pour les déplacer
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
    
        // Boucle sur tous les "dots" pour mettre à jour la couleur par la classe "active" ou "inactive"
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active' : 'inactive'}`);
    }
    
    // Fonction pour afficher le prochain slide
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }
    // Boucle pour créer les "dots" en fonction du nombre de slides
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }
    // Récupère tous les "dots"
    $dots = document.querySelectorAll('.dot');
    // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    // Ajout d'un écouteur d'événement "click" sur le bouton "prev" pour afficher le slide précédent
    prev.addEventListener('click', () => slideTo(--currentSlide))
    // Ajout d'un écouteur d'événement "click" sur le bouton "next" pour afficher le slide suivant
    next.addEventListener('click', () => slideTo(++currentSlide))
    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
    // Boucle sur tous les éléments de type "slide" pour ajouter des écouteurs d'événement pour les interactions avec la souris et le toucher
    $slides.forEach($elt => {
        let startX;
        let endX;
        // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        // Réinitialise l'intervalle d'affichage des slides lorsque la souris sort d'un slide
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        // Enregistre la position initiale du toucher lorsque l'utilisateur touche un slide
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        // Enregistre la position finale du toucher lorsque l'utilisateur relâche son doigt
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            // Si la position initiale est plus grande que la position finale, affiche le prochain slide
            if (startX > endX) {
                slideTo(currentSlide + 1);
                // Si la position initiale est plus petite que la position finale, affiche le slide précédent
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })
})()