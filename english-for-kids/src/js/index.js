import '../css/style.css';

import cards from './cards';
import { toggleMenu, toggleModes } from './toggle';
import { BUTTON_START, MENU, SECTION_PAGE, LINKS, words, startGame, interruptGame, page, MAIN_PAGE, togglePages } from './game';

const images = require.context("../img", false, /\.(png|jpe?g|svg)$/);
const SWITCH = document.querySelector('.toggle-button-cover');
let isPlay = false;

const renderCategoryCards = ind => {
  cards[ind].forEach(el => {
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
      if(!isPlay) {
        if(!event.target.classList.contains('rotation')) {
          const audio = new Audio(`https://wooordhunt.ru/data/sound/word/us/mp3/${el.word}.mp3`);
          audio.play();
        }
      }
    });
    SECTION_PAGE.append(newCard);
  });

  if(isPlay) {
    toggleModes();
  }
}

window.onload = () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
      toggleMenu();
  });
    
  document.querySelector('.overlay').addEventListener('click', () => {
      toggleMenu();
  }); 
    
  SWITCH.addEventListener('click', () => {
    isPlay = !isPlay;
    MENU.classList.toggle('violet');
    document.querySelectorAll('.card').forEach((el) => {
      el.classList.toggle('violet');
    });
    if(page.key) {
      toggleModes();
    }
    if(words.length !== 0) {
      interruptGame();
      renderCategoryCards(page.key);
    }
  }) 

  MENU.addEventListener('click', event => {
    if(event.target.classList.contains('menu__link')) {
      LINKS.forEach(elem => elem.classList.remove('active'));
      event.target.classList.add('active');
      toggleMenu();
      
      const ind = Array.from(LINKS).indexOf(event.target);
      page.key = ind;
  
      if(!MAIN_PAGE.classList.contains('hidden')) {
        if(ind !== 0) {
          togglePages();
          renderCategoryCards(ind);
        }
      }
      else {
        SECTION_PAGE.innerHTML = '';
        if(words.length !== 0) {
          interruptGame(); 
        }
        if(ind !== 0) {
            renderCategoryCards(ind);
            if(isPlay) {
              BUTTON_START.classList.remove('none');
            }
        }
        else {
          togglePages();
          if(isPlay) {
            BUTTON_START.classList.add('none');
          }
        }
      }
    }
  })
  
  MAIN_PAGE.addEventListener('click', (event) => {
    if(event.target.classList.contains('card')) {
      togglePages();
  
      const ind = Array.from(document.querySelectorAll('.card')).indexOf(event.target) + 1;
      renderCategoryCards(ind);
      page.key = ind;
  
      MENU.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
      MENU.querySelector(`li:nth-child(${ind+1}) a`).classList.add('active');
    }
  })
  
  SECTION_PAGE.addEventListener('click', (event) => {
      if(event.target.classList.contains('rotation')) {
  
        const closest = event.target.closest('.section-card');
        closest.classList.add('translate');
  
        closest.addEventListener('mouseleave', () => {
          closest.classList.remove('translate');
      })
      }
  })

  BUTTON_START.addEventListener('click', startGame);
}