import '../css/style.css';
import '../css/style.scss';

import cards from './cards';

const images = require.context("../img", false, /\.(png|jpe?g|svg)$/);

const MAIN_PAGE = document.querySelector('.main-page');
const MENU = document.querySelector('#menu');
const SECTION_PAGE = document.querySelector('.section-page');
const LINKS = document.querySelectorAll('#menu li a');

const toggleMenu = () => {
  document.querySelector('.hamburger__icon').classList.toggle('hamburger__icon-active');
  document.querySelector('#menu').classList.toggle('to-right');
  document.querySelector('.overlay').classList.toggle('hidden');
}

document.querySelector('.hamburger').addEventListener('click', () => {
  toggleMenu();
});

document.querySelector('.overlay').addEventListener('click', () => {
  toggleMenu();
});

const togglePages = () => {
  MAIN_PAGE.classList.toggle('hidden');
  SECTION_PAGE.classList.toggle('hidden');
}

const renderCategoryCards = ind => {
  cards[ind].forEach(el => {
    const audio = new Audio(`https://wooordhunt.ru/data/sound/word/us/mp3/${el.word}.mp3`);
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `<img class="card__img" src='${el.image}'>
                        <h2>${el.word}</h2>`; 
    newCard.addEventListener("click", () => {
      audio.play();
    });                    
    SECTION_PAGE.append(newCard);
  });
}

MENU.addEventListener('click', event => {
  if(event.target.classList.contains('menu__link')) {
    LINKS.forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
    toggleMenu();
    
    const ind = Array.from(LINKS).indexOf(event.target);
    if(!MAIN_PAGE.classList.contains('hidden')) {
      if(ind !== 0) {
        togglePages();
        renderCategoryCards(ind);
      }
    }
    else {
      SECTION_PAGE.innerHTML = '';
      if(ind !== 0) {
          renderCategoryCards(ind);
      }
      else {
        togglePages();
      }
    }
  }
})

MAIN_PAGE.addEventListener('click', (event) => {
 if(event.target.classList.contains('card')) {
  togglePages();

  const ind = Array.from(document.querySelectorAll('.card')).indexOf(event.target) + 1;
  renderCategoryCards(ind);

  MENU.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
  MENU.querySelector(`li:nth-child(${ind+1}) a`).classList.add('active');
 }
})

