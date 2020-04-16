import '../css/style.css';
import '../css/style.scss';

import cards from './cards';

const images = require.context("../img", false, /\.(png|jpe?g|svg)$/);

const MAIN_PAGE = document.querySelector('.main-page');
const MENU = document.querySelector('#menu');
const SECTION_PAGE = document.querySelector('.section-page');
const LINKS = document.querySelectorAll('#menu li a');
const SWITCH = document.querySelector('.toggle-button-cover');

let isPlay = false;
let page = 0;

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
const toggleModes = () => {
  SECTION_PAGE.querySelectorAll('.section-card').forEach((el) => {
    el.classList.toggle('play-card');
    el.querySelector('.word').classList.toggle('none');
    el.querySelector('.rotation').classList.toggle('none');
  });
}

SWITCH.addEventListener('click', () => {
  isPlay = !isPlay;
  MENU.classList.toggle('violet');
  document.querySelectorAll('.card').forEach((el) => {
    el.classList.toggle('violet');
  });
  if(page) {
    toggleModes();
  }
})

const renderCategoryCards = ind => {
  cards[ind].forEach(el => {
    const audio = new Audio(`https://wooordhunt.ru/data/sound/word/us/mp3/${el.word}.mp3`);
    const newCard = document.createElement('div');
    newCard.className = 'card-container';
    newCard.innerHTML = `<div class="section-card">
                            <div class="front" style="background-image: url('${el.image}');">
                                <h2 class="word">${el.word}</h2>
                                <div class="rotation" style="background-image: url('img/rotate.png');"></div>
                            </div>
                            <div class="back" style="background-image: url('${el.image}');">
                                <h2 class="word">${el.translation}</h2>
                            </div>
                         </div>`; 

    newCard.querySelector('.front').addEventListener("click", (event) => {
      if(!event.target.classList.contains('rotation'))
      audio.play();
    });                    
    SECTION_PAGE.append(newCard);
  });

  if(isPlay) {
    toggleModes();
  }
}

MENU.addEventListener('click', event => {
  if(event.target.classList.contains('menu__link')) {
    LINKS.forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
    toggleMenu();
    
    const ind = Array.from(LINKS).indexOf(event.target);
    page = ind;
    console.log(page);

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
  page = ind;
  console.log(page);

  MENU.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
  MENU.querySelector(`li:nth-child(${ind+1}) a`).classList.add('active');
 }
})

SECTION_PAGE.addEventListener('click', (event) => {
  if(event.target.classList.contains('rotation')) {
    event.target.closest('.section-card').classList.add('translate');
    event.target.closest('.section-card').addEventListener('mouseleave', ()=> {
      event.target.closest('.section-card').classList.remove('translate');
  })
  }
})

