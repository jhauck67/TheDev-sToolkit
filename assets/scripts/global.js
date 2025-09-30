//*==============================================
//*             FONCTIONS UTILES
//*==============================================

// FUNCTIONS                                     
// (1) elementCreator
// Créer un élément HTML avec une balise, une classe et un iD (facultatif)
// Exemple : elementCreator('div', 'container', 'view') => <div class='container' id='view'></div>
export const elementCreator = (balise, className, iD) => {
    const element = document.createElement(balise);
    if(className) element.classList.add(className);
    if(iD) element.id = iD;
    return element;
};

// (2) dateConverter
// Convertir une date JJ/MM/AAAA en AAAA/MM/JJ
// Exemple : dateConverter('28/09/2025') => 2025/09/28
export const dateConverter = (dateString) => {
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