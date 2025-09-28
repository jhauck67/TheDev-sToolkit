//*==============================================
//*             FONCTIONS UTILES
//*==============================================

// FUNCTIONS                                     
// (1) elementCreator
// Créer un élément HTML avec une balise, une classe et un iD (facultatif)
// Exemple : elementCreator('div', 'container', 'view') => <div class='container' id='view'></div>
const elementCreator = (balise, className, iD) => {
    const element = document.createElement(balise);
    if(className) element.classList.add(className);
    if(iD) element.id = iD;
    return element;
};

// (2) dateConverter
// Convertir une date JJ/MM/AAAA en AAAA/MM/JJ
// Exemple : dateConverter('28/09/2025') => 2025/09/28
const dateConverter = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date (`${year}/${month}/${day}`);
};

//*==============================================
//*                BURGER MENU                   
//*==============================================

// VARIABLES                                     
const sidebar = document.querySelector('.sidebar');
const burgerButton = document.getElementById('burgerButton');
const closeCross = document.getElementById('closeCross');
const links = document.querySelectorAll('.link');

// EVENT LISTENER                                
// Au clic sur le Bouton Burger, on ouvre la sidebar.
burgerButton.addEventListener('click', () => {
    sidebar.classList.add('open');
});
// Au clic sur la croix, on ferme la sidebar.
closeCross.addEventListener('click', (e) => {
    sidebar.classList.remove('open');
});
// Si un lien est cliqué, on ferme la sidebar.
links.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

//*==============================================
//*         RECUPERATION DES DONNEES                   
//*==============================================
//* ------------ getSnippetData -----------------
// Récupère les données dans le fichier snippets.json
export const getSnippetsData = () => {
    // Récupération des données
    fetch('https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/data/snippets.json')
    .then(response => response.json())
    .then(data => {
        allSnippets = data.snippets;
        // Réinitialisation de l'affichage
        cardContainer.innerHTML = "";
        // Filtrage et Triage des résultats
        const snippetsResult = sortAndFilterSnippets();
        // Vérification des résultats
        valueVerificator(snippetsResult);
        // Génération des cards "résultat"
        cardGenerator(snippetsResult, cardContainer);
    })
    .catch(error => console.error('Erreur de chargement du JSON : ', error));
};
getSnippetsData();

//*==============================================
//*            FENÊTRE PRINCIPALE                   
//*==============================================

// VARIABLES                                     
//* ----------- Création de carte ---------------
const cardContainer = document.querySelector('.grid-results');
let allSnippets = [];

//* ---- Affichage en grille ou en ligne --------
const displayButtons = document.querySelector('.display-buttons');
const gridDisplayButton = document.getElementById('grid-display');
const inlineDisplayButton = document.getElementById('inline-display');

//* ---------- Barre de recherche ---------------
const searchBar = document.getElementById('search-bar');

//* ---------- Filtre par language --------------
const filterButtons = document.querySelector('.filter-buttons');
const htmlFilterButton = document.getElementById('html-filter');
const javascriptFilterButton = document.getElementById('javascript-filter');

//* ------------------ Tri ----------------------
const sortSelect = document.getElementById('sort-select');

// FUNCTIONS                                     
//* ------------- cardGenerator -----------------
// Génère les cartes sur la fenêtre principale grâce à la base de données .json
const cardGenerator = (snippetsArray, container) => {
    // On boucle sur chaque projet dans le tableau.
    snippetsArray.forEach(snippet => {
        // ¤.card
        const card = elementCreator('article', 'card');
        card.setAttribute('data-snippet', `${snippet.id}`)
            // ¤.card-img
            const cardImg = elementCreator('div', 'card-img');
            // On construit le chemin de l'image
            const imagePath = `https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/img/pictures/${snippet.snippetScreenshot}`;
            // Et on l'injecte en tant que background
            cardImg.style.setProperty('--card-img', `url('${imagePath}') center/cover`);
            // ¤.card-text
            const cardText = elementCreator('div', 'card-text');
                // ¤.name
                const name = elementCreator('div', 'name');
                name.textContent = snippet.snippetName;
                // ¤.tags-container
                const tagsContainer = elementCreator('div', 'tags-container');
                    // ¤.language
                    const language = elementCreator('div', 'language');
                    language.classList.add('tag');
                    language.textContent = snippet.snippetLanguage;
                    // ¤.date
                    const date = elementCreator('div', 'date');
                    date.classList.add('tag');
                    date.textContent = snippet.snippetDate;
                    // ¤.category
                    const category = elementCreator('div', 'category');
                    category.classList.add('tag');
                    category.textContent = snippet.snippetCategory;

        // On assemble les cards.
        tagsContainer.appendChild(language);
        tagsContainer.appendChild(date);
        tagsContainer.appendChild(category);

        cardText.appendChild(name);
        cardText.appendChild(tagsContainer);

        card.appendChild(cardImg);
        card.appendChild(cardText);

        // On ajoute la carte au conteneur cible
        container.appendChild(card);
    });
};

//* ----------- valueVerificator ----------------
// Vérifie si le résultat de la base de données n'est pas vide.
// S'il est vide, déclenche un message "Aucun résultat n'a été trouvé".
const valueVerificator = (snippetsArray) => {
    if(!snippetsArray || snippetsArray.length === 0) {
        cardContainer.innerHTML = '';
        const noResult = elementCreator('div', 'no-result');
        noResult.textContent = "Aucun snippet n'a été trouvé";
        cardContainer.appendChild(noResult);
        return; // On arrête l'éxecution si aucun snippet
    }
};

//* --------- sortAndFilterSnippets -------------
// Passe le résultat de la base de données à travers les filtres et le tri.
const sortAndFilterSnippets = () => {
    //(1) Filtre par Language
    let filteredSnippets = [];
    if(htmlFilterButton.classList.contains('filteredby')) {
        filteredSnippets = allSnippets.filter(snippet => {
            return snippet.snippetLanguage.includes("HTML/CSS");
        });
    } else if(javascriptFilterButton.classList.contains('filteredby')) {
        filteredSnippets = allSnippets.filter(snippet => {
            return snippet.snippetLanguage.includes("Javascript");
        });
    } else {
        filteredSnippets = allSnippets
    };
        
    //(2) Filtre par Search Bar
    let searchedSnippets = [];
    searchedSnippets = filteredSnippets.filter(snippet => {
        const matchesName = snippet.snippetName.toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesLanguage = snippet.snippetLanguage.toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesCategory = snippet.snippetCategory.toLowerCase().includes(searchBar.value.toLowerCase());
        return matchesName || matchesLanguage || matchesCategory;
    });
        
    //(3) Sélecteur de tri
    let sortedSnippets = [];

    //¤ Filtrer par date : du plus récent au plus ancien
    if(sortSelect.value === "created") {
        sortedSnippets = searchedSnippets.sort((a, b) => {
            const dateA = dateConverter(a.snippetDate);
            const dateB = dateConverter(b.snippetDate);
            return dateB - dateA;
        });
    //¤ Filtrer par ordre alphabétique
    } else if(sortSelect.value === "alphabet") {
        sortedSnippets = searchedSnippets.sort((a, b) => {
            return a.snippetName.localeCompare(b.snippetName);
        });
    //¤ Filtrer par catégorie
    } else if(sortSelect.value === ("navbar") || sortSelect.value === ("gallery") || sortSelect.value === ("animation")) {
        sortedSnippets = searchedSnippets.filter(snippet => {
            return snippet.snippetCategory.toLowerCase().includes(sortSelect.value.toLowerCase());
        });
    } else {
        sortedSnippets = searchedSnippets;
    };
    return sortedSnippets;
};

//* ------------ refreshDisplay -----------------
// Rafraichit l'affichage, évite d'avoir à appeler la base de données à chaque fois.
const refreshDisplay = () => {
    cardContainer.innerHTML = "";
    const snippetsResult = sortAndFilterSnippets();
    valueVerificator(snippetsResult);
    cardGenerator(snippetsResult, cardContainer);
};

// EVENT LISTENER                                
//* ---------- Barre de recherche ---------------
// Déclenche un filtrage via ce qui est tapé dans la barre de recherche.
searchBar.addEventListener('input', () => {
    refreshDisplay();
});

//* ---------- Filtre par language --------------
// Déclenche un filtrage via les boutons de language dans la "filter-sort-bar".
filterButtons.addEventListener('click', (e) => {
    if(e.target.closest('button') == htmlFilterButton) {
        htmlFilterButton.classList.toggle('filteredby');
        javascriptFilterButton.classList.remove('filteredby');
    } else if(e.target.closest('button') == javascriptFilterButton) {
        javascriptFilterButton.classList.toggle('filteredby');
        htmlFilterButton.classList.remove('filteredby');
    };
    refreshDisplay();
});

//* -------- Tri par l'input select -------------
// Déclenche un tri par date, ordre alphabetique ou catégorie.
sortSelect.addEventListener('change', () => {
    refreshDisplay();
});

//* -------- Grid ou Inline Display -------------
// Déclenche une modification de la disposition des cards.
displayButtons.addEventListener('click', (e) => {
    if(e.target.closest('button') == gridDisplayButton) {
        gridDisplayButton.classList.add('displayed');
        inlineDisplayButton.classList.remove('displayed');
        cardContainer.classList.remove('inline-display');
    } else if(e.target.closest('button') == inlineDisplayButton) {
        inlineDisplayButton.classList.add('displayed');
        gridDisplayButton.classList.remove('displayed');
        cardContainer.classList.add('inline-display');
    };
});

//*==============================================
//*              FENÊTRE MODALE                   
//*==============================================

// VARIABLES                                     
const resultsWindow = document.querySelector('.container');
const modaleWindow = document.querySelector('.modale');

//* ------------- Modale Header -----------------
const SnippetTitle = document.querySelector('.modale-snippet-title');
const SnippetLink = document.querySelector('.modale-snippet-source');
const closeModaleBtn = document.getElementById('closeModaleBtn');

//* ----------- Modale code part ----------------
const htmlContainer = document.querySelector('.code-html-body');
const cssContainer = document.querySelector('.code-css-body');
const jsContainer = document.querySelector('.code-js-body');
const htmlCopyBtn = document.getElementById('htmlCopyButton');
const cssCopyBtn = document.getElementById('cssCopyButton');
const jsCopyBtn = document.getElementById('jsCopyButton');

//* ----------- Modale view part ----------------
const viewContainer = document.querySelector('.modale-main-view');

// FUNCTIONS                                     
//* ----------- openModaleWindow ----------------
// Ouvre la fenêtre modale de la card cliquée.
const openModaleWindow = (snippet) => {
    // Changement de la fenêtre d'affichage.
    resultsWindow.classList.add('modaleMode');
    modaleWindow.classList.add('modaleMode');
    // Préparation et remplissage.
    viewContainer.innerHTML = '';
    const newViewSnippet = elementCreator('iframe', 'view-snippet');

    SnippetTitle.textContent = `${snippet.snippetName}`;
    SnippetLink.setAttribute('href', `${snippet.snippetSourceLink}`);
    SnippetLink.textContent = `${snippet.snippetSourceTitle}`;
    htmlContainer.textContent = `${snippet.snippetHTML}`;
    cssContainer.textContent = `${snippet.snippetCSS}`;
    jsContainer.textContent = `${snippet.snippetJS}`;
    viewContainer.innerHTML = '';
    viewContainer.appendChild(newViewSnippet);
    const SnippetCode = `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                html {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                ${snippet.snippetCSS}
            </style>
        </head>
        <body>
            ${snippet.snippetHTML}
            <script>
                ${snippet.snippetJS}
            </script>
        </body>
    </html>
    `;
    newViewSnippet.setAttribute('srcdoc', SnippetCode);
};

//* --------------- copyCode --------------------
// Copie le code correspondant à l'icône cliquée.
const copyCode = (codeContainerElement, copyButton) => {
    const codeToCopy = codeContainerElement.textContent;
    navigator.clipboard.writeText(codeToCopy)
        .then(() => {
            console.log('Code copié');
        })
        .catch(err => {
            console.error('Erreur lors de la copie', err);
            alert('Désolé, la copie a échoué. Veuillez selectionner le code manuellement');
        });
};

// EVENT LISTENER                                
//* ------- Ouvrir la fenêtre modale ------------
//Déclenchement de l'ouverture de la fenêtre modale de la carte cliquée.
cardContainer.addEventListener('click', (e) => {
    // On trouve la carte cliquée
    const clickedCard = e.target.closest('.card');
    if(!clickedCard) return;
    const cardSnippetId = clickedCard.dataset.snippet;
    // Utilisation de .find() pour obtenir l'objet
    const selectedSnippet = allSnippets.find(snippet => snippet.id === cardSnippetId);
    if(!selectedSnippet) return;
    openModaleWindow(selectedSnippet);
});

//* ------- Fermer la fenêtre modale ------------
// Quand on clique sur la croix, la fenêtre modale se ferme.
closeModaleBtn.addEventListener('click', () => {
    resultsWindow.classList.remove('modaleMode');
    modaleWindow.classList.remove('modaleMode');
});

//* ------------ Copier le code -----------------
// Quand on clique sur l'icône "Copier", le code est copié dans le presse papier.
htmlCopyBtn.addEventListener('click', () => copyCode(htmlContainer, htmlCopyBtn));
cssCopyBtn.addEventListener('click', () => copyCode(cssContainer, cssCopyBtn));
jsCopyBtn.addEventListener('click', () => copyCode(jsContainer, jsCopyBtn));

//*==============================================
//*             COPYRIGHT FOOTER                   
//*==============================================

// VARIABLES                                     
const copyrightYear = document.querySelector('.current-year');
const currentDate = new Date();

// FUNCTION                                      
// Récupère l'année en cours et l'implémente dans le footer
const getCurrentYear = () => {
    // On récupère l'année en cours
    const currentYear = currentDate.getFullYear();
    // On injecte cette valeur dans le span.current-year
    copyrightYear.textContent = currentYear;
};
getCurrentYear();