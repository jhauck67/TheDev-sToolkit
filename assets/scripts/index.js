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

// TITRE : [CARDS RESULTS] = Remplissage de la div .grid-results //
const cardContainer = document.querySelector('.grid-results');


// ###### [FETCH JSON] = Récupérer les données ###### //
export const getSnippetsData = () => {
    fetch('/assets/data/snippets.json')
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


