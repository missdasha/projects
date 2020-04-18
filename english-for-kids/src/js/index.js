import '../css/style.css';
import '../css/style.scss';

import cards from './cards';

const images = require.context("../img", false, /\.(png|jpe?g|svg)$/);
const sounds = require.context('../audio', true);
const soundPath = (name) => sounds(name, true);

const MAIN_PAGE = document.querySelector('.main-page');
const MENU = document.querySelector('#menu');
const SECTION_PAGE = document.querySelector('.section-page');
const LINKS = document.querySelectorAll('#menu li a');
const SWITCH = document.querySelector('.toggle-button-cover');
const BUTTON_START = document.querySelector('.btn-start');
const BUTTON_REPEAT = document.querySelector('.btn-repeat');
const RATING = document.querySelector('.rating');

let words = [];
let isPlay = false;
let page = 0;
let error = 0;

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
  if(words.length === 0) {
    BUTTON_START.classList.toggle('none');
  }

}

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

const interruptGame = () => {
  RATING.innerHTML = "";
  RATING.style.justifyContent = '';
  BUTTON_REPEAT.classList.toggle('none');
  SECTION_PAGE.innerHTML = "";
  // renderCategoryCards(page);
  words = [];
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
  if(words.length !== 0) {
    interruptGame();
    renderCategoryCards(page);
  }
})


MENU.addEventListener('click', event => {
  if(event.target.classList.contains('menu__link')) {
    LINKS.forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
    toggleMenu();
    
    const ind = Array.from(LINKS).indexOf(event.target);
    page = ind;

    if(!MAIN_PAGE.classList.contains('hidden')) { // if the user is on the main page
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
  page = ind;

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

const shuffle = arr => {
  const a = arr;
  let j; 
	for(let i = a.length - 1; i > 0; i -= 1){
		j = Math.floor(Math.random()*(i + 1));
    [a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

const playAudio = (word) => {
  const audio = new Audio(`https://wooordhunt.ru/data/sound/word/us/mp3/${word}.mp3`);
  audio.play();
} 

const repeatWord = () => {
  playAudio(words[0]);
}

const playError = () => {
  const audio = new Audio(soundPath('./error.mp3'));
  audio.play();
}

const playCorrect = () => {
  const audio = new Audio(soundPath('./correct.mp3'));
  audio.play();
}

const showStar = bool => {
  const star = document.createElement('div');
  star.className = bool ? 'star-correct' : 'star-error';
  RATING.append(star);
}

const finishGame = (str) => {
  RATING.innerHTML = "";
  RATING.style.justifyContent = '';
  document.body.classList.remove(`${str}`);
  togglePages();
  BUTTON_REPEAT.classList.add('none');
  LINKS.forEach(elem => elem.classList.remove('active'));
  MENU.querySelector('li:nth-child(1) a').classList.add('active');
  page = 0;
}

const playResult = str => {
  const audio = new Audio(soundPath(`./${str}.mp3`));
  /* switch (str) {
    case 'failure':
      audio = new Audio(soundPath(`./${str}.mp3`));
      break;
    case 'success':
      audio = new Audio(soundPath(`./${str}.mp3`));
      break;
    default:
      break;
  } */
  audio.play();
  setTimeout(() => finishGame(str), 3000);
}

const showResult = () => {
  RATING.style.justifyContent = 'center';
  SECTION_PAGE.innerHTML = '';
  BUTTON_REPEAT.classList.toggle('none');
  if(error) {
    RATING.innerHTML = error === 1 ? `${error} error` : `${error} errors`;
    document.body.classList.add('failure');
    playResult('failure');
  }
  else {
    RATING.innerHTML = `Win!`;
    document.body.classList.add('success');
    playResult('success');
  }
}

const check = selectedCard => {
  if(selectedCard.querySelector('.word').innerHTML === words[0]) {
    words.shift();

    playCorrect();
    selectedCard.classList.add('guessed');
    showStar(true);

    if(words.length !== 0) {
      setTimeout(() => playAudio(words[0]), 1000);
    }
    else {
      setTimeout(showResult(), 1000);
    }
  }
  else {
    error += 1;
    playError(words[0]);
    showStar(false);
  }
}

const startGame = () => {
  BUTTON_START.classList.add('none');
  BUTTON_REPEAT.classList.toggle('none');

  BUTTON_REPEAT.addEventListener('click', repeatWord);

  const categoryWords = [];
  cards[page].forEach(el => {
    categoryWords.push(el.word);
  })
  words = shuffle(categoryWords);

  playAudio(words[0]);
  error = 0;
  SECTION_PAGE.querySelectorAll('.front').forEach(el => {
    el.addEventListener("click", () => {
    if(!el.classList.contains('guessed'))
      check(el);
    });
  });
}

BUTTON_START.addEventListener('click', startGame);
