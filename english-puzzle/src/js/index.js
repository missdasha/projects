/* eslint-disable no-alert */
import '../css/style.css';
import { LEVEL, PAGE, WORDS, FIELD, BUTTON_START, START_SCREEN, GAME, BUTTON_GIVE_UP, BUTTON_CHECK, BUTTON_CONTINUE } from './constants'

let pageWords = [];
let wordsArray = [];
let phraseNumber = 0;
let phraseLength;

const getWords = (level, page) => {
  return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`)
        .then(response => response.json())
}

const shuffle = words => words.sort(() => Math.random() - 0.5)

const renderWords = () => {
  const wordsStr = pageWords[phraseNumber].textExample.slice(0, -1).replace('<b>', '').replace('</b>', '');
  wordsArray = wordsStr.split(' ');
  const words = shuffle(wordsStr.split(' '));
  phraseLength = wordsStr.replace(/\s+/g, '').length;
  console.log(pageWords[phraseNumber].textExample.slice(0, -1).replace('<b>', '').replace('</b>', '').replace(' ', ''));
  console.log(phraseLength);
  let elements = '';
  const fieldWidth = FIELD.clientWidth;
  words.forEach(word => {
    console.log(word, word.length);
    elements += `<div class="word" style="width:${fieldWidth * (word.length / phraseLength)}px">${word}</div>`
  });
  WORDS.innerHTML = elements;
  FIELD.insertAdjacentHTML('beforeend', `<div class="row"></div>`);
}

const handleLevelsAndPagesChanges = async () => {
  const level = LEVEL.value - 1;
  const round = PAGE.value;
  const page = Math.ceil(round / 2) - 1;
  const words = await getWords(level, page);
  console.log(words);
  pageWords = round % 2 === 0 ? words.slice(10) : words.slice(0, 10);
  renderWords();
}

WORDS.addEventListener('click', event => {
  if (event.target.className === 'word') {
    FIELD.lastChild.append(event.target);
    if (WORDS.innerHTML === '') {
      BUTTON_GIVE_UP.classList.add('none');
      BUTTON_CHECK.classList.remove('none');
    }
  }
})

BUTTON_GIVE_UP.addEventListener('click', () => {
  WORDS.innerHTML = '';
  FIELD.lastChild.innerHTML = '';
  const fieldWidth = FIELD.clientWidth;
  wordsArray.forEach(word => {
    FIELD.lastChild.insertAdjacentHTML('beforeend', `<div class="word"style="width:${fieldWidth * (word.length / phraseLength)}px">${word}</div>`);
  });
  BUTTON_GIVE_UP.classList.add('none');
  BUTTON_CHECK.classList.add('none');
  BUTTON_CONTINUE.classList.remove('none');
})

LEVEL.addEventListener('input', () => {
  if (LEVEL.value && +LEVEL.value >= 1 && +LEVEL.value <= 6) {
    handleLevelsAndPagesChanges();
  }
  else {
    alert('Input level from 1 to 6');
  }
});

PAGE.addEventListener('input', () => {
  if (PAGE.value && +PAGE.value >= 1 && +PAGE.value <= 60) {
    handleLevelsAndPagesChanges();
  }
  else {
    alert('Input page from 1 to 60');
  }
})

BUTTON_START.addEventListener('click', () => {
  START_SCREEN.classList.add('none');
  GAME.classList.remove('none');
  handleLevelsAndPagesChanges();
})

