import { elementCreator, dateConverter } from "./global.js";

//*==============================================
//*         RECUPERATION DES DONNEES                   
//*==============================================
//* ------------ getDesignData -----------------
// Récupère les données dans le fichier design.json
export const getDesignData = () => {
    // Récupération des données
    fetch('https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/data/design.json')
    .then(response => response.json())
    .then(data => {
        const colorsWithType = data.colors.map(item => ({ ...item, type: "color", itemName: item.paletteName }));
        const fontsWithType = data.fonts.map(item => ({ ...item, type: "font", itemName: item.fontName }));
        const iconsWithType = data.icons.map(item => ({ ...item, type: "icon", itemName: item.iconName }));
        allDesigns = [...colorsWithType, ...fontsWithType, ...iconsWithType];
        // Réinitialisation de l'affichage
        cardContainer.innerHTML = "";
        // Filtrage et Triage des résultats
        const designsResult = sortAndFilterDesigns();
        // Vérification des résultats
        valueVerificator(designsResult);
        // Génération des cards "résultat"
        cardGenerator(designsResult, cardContainer);
        
    })
    .catch(error => console.error('Erreur de chargement du JSON : ', error));
};
getDesignData();

// VARIABLES                                     
//* ----------- Création de carte ---------------
const cardContainer = document.querySelector('.grid-results');
let allDesigns = [];

//* ---- Affichage en grille ou en ligne --------
const displayButtons = document.querySelector('.display-buttons');
const gridDisplayButton = document.getElementById('grid-display');
const inlineDisplayButton = document.getElementById('inline-display');

//* ---------- Barre de recherche ---------------
const searchBar = document.getElementById('search-bar');

//* ---------- Filtre par language --------------
const filterButtons = document.querySelector('.filter-buttons');
const colorsFilterButton = document.getElementById('colors-filter');
const fontsFilterButton = document.getElementById('fonts-filter');
const iconsFilterButton = document.getElementById('icons-filter');

//* ------------------ Tri ----------------------
const sortSelect = document.getElementById('sort-select');

// FUNCTIONS                                     
//* ------------- cardGenerator -----------------
// Génère les cartes sur la fenêtre principale grâce à la base de données .json
const cardGenerator = (designArray, container) => {
    // On boucle sur chaque projet dans le tableau.
    designArray.forEach(item => {
        // On vérifie le type et on crée la carte correspondante
        if(item.type === "color") {
            // ¤ card
            const card = elementCreator('article', 'card');
                // ¤ card-img
                const cardImg = elementCreator('div', 'card-img');
                // On construit le chemin de l'image
                const imagePath = `https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/img/pictures/${item.paletteScreenshot}`;
                // Et on l'injecte en tant que background
                cardImg.style.setProperty('--card-img', `url('${imagePath}') center/cover`);
                // ¤.card-text
                const cardText = elementCreator('div', 'card-text');
                    // ¤.name
                    const name = elementCreator('div', 'name');
                    name.textContent = item.paletteName;
                    // ¤.color-container
                    const colorsContainer = elementCreator('div', 'colors-container');
                        // ¤.color
                        item.paletteColor.forEach(couleur => {
                            const colorDiv = elementCreator('div', 'color');
                            colorDiv.textContent = couleur;
                            colorDiv.style.background = couleur;
                            colorDiv.style.color = '#000000';
                            colorsContainer.appendChild(colorDiv);
                        });
                    // ¤.buttons-container
                    const buttonsContainer = elementCreator('div', 'buttons-container');
                        // ¤.primary-button
                        const copyBtn = elementCreator('div', 'primary-button');
                        copyBtn.classList.add('button');
                        copyBtn.textContent = "Copier";
                        // ¤.secondary-button
                        const returnBtn = elementCreator('div', 'secondary-button');
                        returnBtn.classList.add('button');
                        returnBtn.textContent = "Retour";

            // On assemble les cards.
            buttonsContainer.appendChild(copyBtn);
            buttonsContainer.appendChild(returnBtn);

            cardText.appendChild(name);
            cardText.appendChild(colorsContainer);
            cardText.appendChild(buttonsContainer);

            card.appendChild(cardImg);
            card.appendChild(cardText);

            // On ajoute la carte au conteneur cible
            container.appendChild(card);
        } else if(item.type === "font") {
            // ¤ card
            const card = elementCreator('article', 'card');
                // ¤ card-img
                const cardImg = elementCreator('div', 'card-img');
                // On construit le chemin de l'image
                const imagePath = `https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/img/pictures/${item.fontScreenshot}`;
                // Et on l'injecte en tant que background
                cardImg.style.setProperty('--card-img', `url('${imagePath}') center/cover`);
                // ¤.card-text
                const cardText = elementCreator('div', 'card-text');
                    // ¤.name
                    const name = elementCreator('div', 'name');
                    name.textContent = item.fontName;
                    // ¤.description
                    const description = elementCreator('div', 'description');
                    description.textContent = item.fontDescription;
                    // ¤.buttons-container
                    const buttonsContainer = elementCreator('div', 'buttons-container');
                        // ¤.primary-button
                        const copyBtn = elementCreator('div', 'primary-button');
                        copyBtn.classList.add('button');
                        copyBtn.textContent = "Télécharger";
                        // ¤.secondary-button
                        const returnBtn = elementCreator('div', 'secondary-button');
                        returnBtn.classList.add('button');
                        returnBtn.textContent = "Retour";

            // On assemble les cards.
            buttonsContainer.appendChild(copyBtn);
            buttonsContainer.appendChild(returnBtn);

            cardText.appendChild(name);
            cardText.appendChild(description);
            cardText.appendChild(buttonsContainer);

            card.appendChild(cardImg);
            card.appendChild(cardText);

            // On ajoute la carte au conteneur cible
            container.appendChild(card);
        } else if(item.type === "icon") {
                        // ¤ card
            const card = elementCreator('article', 'card');
                // ¤ card-img
                const cardImg = elementCreator('div', 'card-img');
                // On construit le chemin de l'image
                const imagePath = `https://raw.githubusercontent.com/jhauck67/TheDev-sToolkit/refs/heads/main/assets/img/pictures/${item.iconScreenshot}`;
                // Et on l'injecte en tant que background
                cardImg.style.setProperty('--card-img', `url('${imagePath}') center/cover`);
                // ¤.card-text
                const cardText = elementCreator('div', 'card-text');
                    // ¤.name
                    const name = elementCreator('div', 'name');
                    name.textContent = item.iconName;
                    // ¤.description
                    const description = elementCreator('div', 'description');
                    description.textContent = item.iconDescription;
                    // ¤.buttons-container
                    const buttonsContainer = elementCreator('div', 'buttons-container');
                        // ¤.primary-button
                        const copyBtn = elementCreator('div', 'primary-button');
                        copyBtn.classList.add('button');
                        copyBtn.textContent = "Copier SVG";
                        // ¤.secondary-button
                        const returnBtn = elementCreator('div', 'secondary-button');
                        returnBtn.classList.add('button');
                        returnBtn.textContent = "Retour";

            // On assemble les cards.
            buttonsContainer.appendChild(copyBtn);
            buttonsContainer.appendChild(returnBtn);

            cardText.appendChild(name);
            cardText.appendChild(description);
            cardText.appendChild(buttonsContainer);

            card.appendChild(cardImg);
            card.appendChild(cardText);

            // On ajoute la carte au conteneur cible
            container.appendChild(card);
        }
    });
};

//* ----------- valueVerificator ----------------
// Vérifie si le résultat de la base de données n'est pas vide.
// S'il est vide, déclenche un message "Aucun résultat n'a été trouvé".
const valueVerificator = (designArray) => {
    if(!designArray || designArray.length === 0) {
        cardContainer.innerHTML = '';
        const noResult = elementCreator('div', 'no-result');
        noResult.textContent = "Aucun snippet n'a été trouvé";
        cardContainer.appendChild(noResult);
        return; // On arrête l'éxecution si aucun snippet
    }
};

//* --------- sortAndFilterDesigns -------------
// Passe le résultat de la base de données à travers les filtres et le tri.
const sortAndFilterDesigns = () => {
    //(1) Filtre par type
    let filteredDesigns = [];
    if(colorsFilterButton.classList.contains('filteredby')) {
        filteredDesigns = allDesigns.filter(item => {
            return item.type.includes("color");
        });
    } else if(fontsFilterButton.classList.contains('filteredby')) {
        filteredDesigns = allDesigns.filter(item =>  {
            return item.type.includes("font");
        });
    } else if(iconsFilterButton.classList.contains('filteredby')) {
        filteredDesigns = allDesigns.filter(item =>  {
            return item.type.includes("icon");
        });
    } else {
        filteredDesigns = allDesigns;
    };

    //(2) Filtre par Search Bar
    let searchedDesigns = [];
    searchedDesigns = filteredDesigns.filter(item => {
        const matchesPaletteName = (item.paletteName || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesPaletteType = (item.type || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesFontName = (item.fontName || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesFontDescription = (item.fontDescription || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesFontType = (item.type || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesIconName = (item.iconName || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesIconDescription = (item.iconDescription || "").toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesIconType = (item.type || "").toLowerCase().includes(searchBar.value.toLowerCase());
        return matchesPaletteName || matchesPaletteType || matchesFontName || matchesFontDescription || matchesFontType || matchesIconName || matchesIconDescription || matchesIconType;
    });

    //(3) Sélecteur de tri
    let sortedDesigns = [];
    if(sortSelect.value === "alphabet") {
        sortedDesigns = searchedDesigns.sort((a, b) => {
            return a.itemName.localeCompare(b.itemName);
        });
    } else {
        sortedDesigns = searchedDesigns
    };
    return sortedDesigns;
};

//* ------------ refreshDisplay -----------------
// Rafraichit l'affichage, évite d'avoir à appeler la base de données à chaque fois.
const refreshDisplay = () => {
    cardContainer.innerHTML = "";
    const designsResult = sortAndFilterDesigns();
    valueVerificator(designsResult);
    cardGenerator(designsResult, cardContainer);
};

// EVENT LISTENER                                
//* ---------- Barre de recherche ---------------
// Déclenche un filtrage via ce qui est tapé dans la barre de recherche.
searchBar.addEventListener('input', () => {
    refreshDisplay();
});

//* ---------- Filtre par type --------------
// Déclenche un filtrage via les boutons de type dans la "filter-sort-bar".
filterButtons.addEventListener('click', (e) => {
    if(e.target.closest('button') == colorsFilterButton) {
        colorsFilterButton.classList.toggle('filteredby');
        fontsFilterButton.classList.remove('filteredby');
        iconsFilterButton.classList.remove('filteredby');
    } else if(e.target.closest('button') == fontsFilterButton) {
        fontsFilterButton.classList.toggle('filteredby');
        colorsFilterButton.classList.remove('filteredby');
        iconsFilterButton.classList.remove('filteredby');
    } else if(e.target.closest('button') == iconsFilterButton) {
        iconsFilterButton.classList.toggle('filteredby');
        colorsFilterButton.classList.remove('filteredby');
        fontsFilterButton.classList.remove('filteredby');
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
