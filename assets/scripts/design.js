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
        const colorsWithType = data.colors.map(item => ({ ...item, type: "color" }));
        const fontsWithType = data.fonts.map(item => ({ ...item, type: "font" }));
        const iconsWithType = data.icons.map(item => ({ ...item, type: "icon" }));
        allDesigns = [...colorsWithType, ...fontsWithType, ...iconsWithType];
        console.log(allDesigns);
        cardGenerator(allDesigns, cardContainer);
        
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
const htmlFilterButton = document.getElementById('html-filter');
const javascriptFilterButton = document.getElementById('javascript-filter');

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
            cardText.appendChild(buttonsContainer);

            card.appendChild(cardImg);
            card.appendChild(cardText);

            // On ajoute la carte au conteneur cible
            container.appendChild(card);
        }
    });
};