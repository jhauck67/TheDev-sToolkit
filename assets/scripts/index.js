/**============================================
 **                VARIABLES
 *=============================================**/
//¤ Burger Menu
const sidebar = document.querySelector('.sidebar');
const burgerButton = document.getElementById('burgerButton');
const closeCross = document.getElementById('closeCross');
const links = document.querySelectorAll('.link');
//¤ Création de carte
const cardContainer = document.querySelector('.grid-results');
let allSnippets = [];
//¤ Affichage en grille ou en ligne
const displayButtons = document.querySelector('.display-buttons');
const gridDisplayButton = document.getElementById('grid-display');
const inlineDisplayButton = document.getElementById('inline-display');
//¤ Barre de recherche
const searchBar = document.getElementById('search-bar');
//¤ Filtre par language
const filterButtons = document.querySelector('.filter-buttons');
const htmlFilterButton = document.getElementById('html-filter');
const javascriptFilterButton = document.getElementById('javascript-filter');
//¤ Tri
const sortSelect = document.getElementById('sort-select');
//¤ Modale
const resultsWindow = document.querySelector('.container');
const modaleWindow = document.querySelector('.modale');

/**============================================
 **             UTILS FUNCTIONS
 *=============================================**/

// FUNCTION : elementCreator
const elementCreator = (balise, className, iD) => {
    const element = document.createElement(balise);
    if(className) element.classList.add(className);
    if(iD) element.id = iD;
    return element;
};

// FUNCTION : cardGenerator
const cardGenerator = (snippetsArray, container) => {
    // (1) On boucle sur chaque projet dans le tableau.
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

// FUNCTION : valueVerificator
const valueVerificator = (snippetsArray) => {
    if(!snippetsArray || snippetsArray.length === 0) {
        cardContainer.innerHTML = '';
        const noResult = elementCreator('div', 'no-result');
        noResult.textContent = "Aucun snippet n'a été trouvé";
        cardContainer.appendChild(noResult);
        return; // On arrête l'éxecution si aucun snippet
    }
};

// FUNCTION : dateConverter
const dateConverter = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date (`${year}/${month}/${day}`);
};

// FUNCTION : sortAndFilterSnippets
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

// FUNCTION : refreshDisplay
const refreshDisplay = () => {
    cardContainer.innerHTML = "";
    const snippetsResult = sortAndFilterSnippets();
    valueVerificator(snippetsResult);
    cardGenerator(snippetsResult, cardContainer);
};

/**============================================
 **           PRINCIPAL FUNCTIONS
 *=============================================**/
// FUNCTION : getSnippetsData
export const getSnippetsData = () => {
    fetch('https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/data/snippets.json')
    .then(response => response.json())
    .then(data => {
        allSnippets = data.snippets;
        cardContainer.innerHTML = "";
        const snippetsResult = sortAndFilterSnippets();
        valueVerificator(snippetsResult);
        cardGenerator(snippetsResult, cardContainer);

        cardContainer.addEventListener('click', (e) => {
            resultsWindow.classList.add('modaleMode');
            modaleWindow.classList.add('modaleMode');
            const clickedSnippet = snippetsResult.filter(snippet => {
                return snippet.id.includes(e.target.closest('.card').dataset.snippet);
            });
            // Variables
            const SnippetTitle = document.querySelector('.modale-snippet-title');

            SnippetTitle.textContent = `${clickedSnippet[0].snippetName}`
            console.log(clickedSnippet);
    
            console.log(SnippetTitle);
        });
    })
    .catch(error => console.error('Erreur de chargement du JSON : ', error));
};
getSnippetsData();

/**============================================
 **             EVENT LISTENER
 *=============================================**/
//# Recherche dans l'input search
searchBar.addEventListener('input', () => {
    refreshDisplay();
});

//# Filtre par language
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

//# Tri par l'input select
sortSelect.addEventListener('change', () => {
    refreshDisplay();
});

//# Grid ou Inline Display
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

//# Burger Menu
burgerButton.addEventListener('click', () => {
    sidebar.classList.add('open');
});
closeCross.addEventListener('click', (e) => {
    sidebar.classList.remove('open');
});
links.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

