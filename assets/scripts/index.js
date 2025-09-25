// TITRE: [FONCTION ELEMENT CREATOR] = Génère des éléments. //
const elementCreator = (balise, className, iD) => {
    const element = document.createElement(balise);
    if(className) element.classList.add(className);
    if(iD) element.id = iD;
    return element;
};

// TITRE: [FONCTION CARD GENERATOR] = Génère les cards. //
const cardGenerator = (snippetsArray, container) => {
    
    // (1) On boucle sur chaque projet dans le tableau.
    snippetsArray.forEach(snippet => {
        // ¤.card
        const card = elementCreator('article', 'card');
            // ¤.card-img
            const cardImg = elementCreator('div', 'card-img');
            // On construit le chemin de l'image
            const imagePath = `/assets/img/pictures/${snippet.snippetScreenshot}`;
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

        // (2) On assemble les cards.
        tagsContainer.appendChild(language);
        tagsContainer.appendChild(date);
        tagsContainer.appendChild(category);

        cardText.appendChild(name);
        cardText.appendChild(tagsContainer);

        card.appendChild(cardImg);
        card.appendChild(cardText);

        // (3) On ajoute la carte au conteneur cible
        container.appendChild(card);
    });
};

// TITRE : [CARDS RESULTS] = Remplissage de la div .grid-results, Filtrage et Tri //
const cardContainer = document.querySelector('.grid-results');


// ###### [FETCH JSON] = Récupérer les données ###### //
export const getSnippetsData = () => {
    fetch('https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/data/snippets.json')
    .then(response => response.json())
    .then(data => {
        
        // (1) On vérifie s'il y a des valeurs
        if (!data.snippets || data.snippets.length === 0) {
            const noResult = elementCreator('div', 'no-result');
            noResult.textContent = "Aucun snippet n'a été trouvé";
            cardContainer.appendChild(noResult);
            return; // On arrête l'exécution si aucun snippet
        };
        
        // (2) On appelle la fonction de génération
        cardGenerator(data.snippets, cardContainer);


        // ###### [SEARCH BAR] = Recherche de snippets ###### //

        // (1) On pointe la search bar.
        const searchBar = document.getElementById('search-bar');

        // (2) On "écoute" et on récupère ce qui est tapé.
        searchBar.addEventListener('input', (e) => {
        let searchInput = e.target.value.toLowerCase();

            // (3) On filtre les snippets dans la base de données.
            const filteredSnippets = data.snippets.filter(snippet => {
                const matchesName = snippet.snippetName.toLowerCase().includes(searchInput);
                const matchesLanguage = snippet.snippetLanguage.toLowerCase().includes(searchInput);
                const matchesCategory = snippet.snippetCategory.toLowerCase().includes(searchInput);
                return matchesName || matchesLanguage || matchesCategory;
            });

            // (4) On vérifie s'il y a des valeurs
            if (!filteredSnippets || filteredSnippets.length === 0) {
                cardContainer.innerHTML = '';
                const noResult = elementCreator('div', 'no-result');
                noResult.textContent = "Aucun snippet n'a été trouvé";
                cardContainer.appendChild(noResult);
                return; // On arrête l'exécution si aucun snippet
            };

            // (5) On met à jour l'affichage.
            cardContainer.innerHTML = '';
            htmlFilterButton.classList.remove('filteredby');
            javascriptFilterButton.classList.remove('filteredby');
            cardGenerator(filteredSnippets, cardContainer);
        });


        // ###### [FILTRER PAR LANGUAGE] = Filtrer par appui sur un bouton de la barre de filtre/tri ###### //

        // (1) On pointe les boutons.
        const htmlFilterButton = document.getElementById('html-filter');
        const javascriptFilterButton = document.getElementById('javascript-filter');
        
        // (2) On écoute l'événement au click.
        const filterButtons = document.querySelector('.filter-buttons')
        filterButtons.addEventListener('click', (e) => {

            // (3) On filtre les snippets dans la base de données.
            let filteredSnippets = [];
            if(e.target.closest('button') == htmlFilterButton) {
                filteredSnippets = data.snippets.filter(snippet => {
                    return snippet.snippetLanguage.includes("HTML/CSS");
                });
                javascriptFilterButton.classList.remove('filteredby');
                htmlFilterButton.classList.add('filteredby');
            } else if(e.target.closest('button') == javascriptFilterButton) {
                filteredSnippets = data.snippets.filter(snippet => {
                    return snippet.snippetLanguage.includes("Javascript");
                });
                htmlFilterButton.classList.remove('filteredby');
                javascriptFilterButton.classList.add('filteredby');
            } else {
                return;
            };

            // (4) On vérifie s'il y a des valeurs
            if (!filteredSnippets || filteredSnippets.length === 0) {
                cardContainer.innerHTML = '';
                const noResult = elementCreator('div', 'no-result');
                noResult.textContent = "Aucun snippet n'a été trouvé";
                cardContainer.appendChild(noResult);
                return; // On arrête l'exécution si aucun snippet
            };

            // (5) On met à jour l'affichage.
            cardContainer.innerHTML = '';
            cardGenerator(filteredSnippets, cardContainer);
        });
        
    })
    .catch(error => console.error('Erreur de chargement du JSON : ', error));
};
getSnippetsData();


// ###### [GRID/INLINE DISPLAY] = Affichage en grille ou en ligne. ###### //
const gridOrInlineDisplay = () => {
    
    // (1) On pointe les boutons "grid" et "inline" dans le DOM.
    const displayButtons = document.querySelector('.display-buttons');
    
    const gridDisplayButton = document.getElementById('grid-display');
    const inlineDisplayButton = document.getElementById('inline-display');
    
    // (2) Quand on clique sur l'un ou l'autre des boutons, on change l'affichage grâce à la classe ".inline-display" sur le conteneur. La classe ".displayed" permet le changement de style du bouton clické.
    displayButtons.addEventListener('click', (e) => {
        if(e.target.closest('button') == gridDisplayButton) {
            gridDisplayButton.classList.add('displayed');
            inlineDisplayButton.classList.remove('displayed');
            cardContainer.classList.remove('inline-display');

        } else if(e.target.closest('button') == inlineDisplayButton) {
            inlineDisplayButton.classList.add('displayed');
            gridDisplayButton.classList.remove('displayed');
            cardContainer.classList.add('inline-display');

        } else {
            return;
        };
    });
};
gridOrInlineDisplay();



