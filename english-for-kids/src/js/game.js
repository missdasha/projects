import cards from './cards';

export const error = {key: 0};
export const page = {key: 0};
export let words = [];

export const sounds = require.context('../audio', true);
export const BUTTON_START = document.querySelector('.btn-start');
export const MENU = document.querySelector('#menu');
export const BUTTON_REPEAT = document.querySelector('.btn-repeat');
export const RATING = document.querySelector('.rating');
export const SECTION_PAGE = document.querySelector('.section-page');
export const LINKS = document.querySelectorAll('#menu li a');
export const MAIN_PAGE = document.querySelector('.main-page');

const soundPath = (name) => sounds(name, true);
export const interruptGame = () => {
  RATING.innerHTML = "";
  RATING.style.justifyContent = '';
  BUTTON_REPEAT.classList.toggle('none');
  SECTION_PAGE.innerHTML = "";
  words.splice(0);
} 

export const shuffle = arr => {
  const a = arr;
  let j; 
	for(let i = a.length - 1; i > 0; i -= 1){
		j = Math.floor(Math.random()*(i + 1));
    [a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export const playAudio = (word) => {
  const audio = new Audio(`https://wooordhunt.ru/data/sound/word/us/mp3/${word}.mp3`);
  audio.play();
} 

export const repeatWord = () => {
  playAudio(words[0]);
}

export const showStar = bool => {
  const star = document.createElement('div');
  star.className = bool ? 'star-correct' : 'star-error';
  RATING.append(star);
}

export const togglePages = () => {
  MAIN_PAGE.classList.toggle('hidden');
  SECTION_PAGE.classList.toggle('hidden');
} 

export const finishGame = (str) => {
  RATING.innerHTML = "";
  RATING.style.justifyContent = '';
  document.body.classList.remove(`${str}`);
  togglePages();
  BUTTON_REPEAT.classList.add('none');
  LINKS.forEach(elem => elem.classList.remove('active'));
  MENU.querySelector('li:nth-child(1) a').classList.add('active');
  page.key = 0;
}

export const playResult = str => {
  const audio = new Audio(soundPath(`./${str}.mp3`));
  audio.play();
}

export const showResult = () => {
  RATING.style.justifyContent = 'center';
  SECTION_PAGE.innerHTML = '';
  BUTTON_REPEAT.classList.toggle('none');
  if(error.key) {
    RATING.innerHTML = error.key === 1 ? `${error.key} error` : `${error.key} errors`;
    document.body.classList.add('failure');
    playResult('failure');
    setTimeout(() => finishGame('failure'), 3000);
  }
  else {
    RATING.innerHTML = `Win!`;
    document.body.classList.add('success');
    playResult('success');
    setTimeout(() => finishGame('success'), 3000);
  }
}

export const check = selectedCard => {
  if(selectedCard.querySelector('.word').innerHTML === words[0]) {
    words.shift();

    playResult('correct');
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
    error.key += 1;
    playResult('error');
    showStar(false);
  }
}

export const startGame = () => {
  BUTTON_START.classList.add('none');
  BUTTON_REPEAT.classList.toggle('none');

  BUTTON_REPEAT.addEventListener('click', repeatWord);

  const categoryWords = [];
  cards[page.key].forEach(el => {
    categoryWords.push(el.word);
  })
  words = shuffle(categoryWords);

  playAudio(words[0]);
  error.key = 0;
  SECTION_PAGE.querySelectorAll('.front').forEach(el => {
    el.addEventListener("click", () => {
    if(!el.classList.contains('guessed'))
      check(el);
    });
  });
}