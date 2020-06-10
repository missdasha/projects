/* eslint-disable no-alert */
import '../css/style.css';
import { LEVEL, PAGE, WORDS, FIELD, BUTTON_START, START_SCREEN, GAME, BUTTON_GIVE_UP, BUTTON_CHECK, BUTTON_CONTINUE,
  HINT_TRANSLATION, BUTTON_TRANSLATION } from './constants'

let pageWords = [];
let wordsArray = [];
let phraseNumber = 0;
let phraseLength;
let audio;

const playAudio = isExample => {
  const path = isExample ? pageWords[phraseNumber].audioExample : pageWords[phraseNumber].audio;
  audio = new Audio(`https://raw.githubusercontent.com/missdasha/rslang-data/master/${path}`);
  audio.play();
} 

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
  console.log(PAGE.innerHTML);
  const page = Math.ceil(round / 2) - 1;
  const words = await getWords(level, page);
  console.log(words);
  pageWords = round % 2 === 0 ? words.slice(10) : words.slice(0, 10);
  renderWords();
  HINT_TRANSLATION.innerText = pageWords[phraseNumber].textExampleTranslate;
  playAudio(true);
  setTimeout(() => playAudio(false), 5000);
}

BUTTON_TRANSLATION.addEventListener('click', () => {
  BUTTON_TRANSLATION.classList.toggle('chosen');
  HINT_TRANSLATION.classList.toggle('hidden');
})

WORDS.addEventListener('click', event => {
  if (event.target.className === 'word') {
    FIELD.lastChild.append(event.target);
    if (WORDS.innerHTML === '') {
      BUTTON_GIVE_UP.classList.add('none');
      BUTTON_CHECK.classList.remove('none');
    }
  }
})

BUTTON_CONTINUE.addEventListener('click', () => {
  if (phraseNumber < 9) {
    phraseNumber += 1;
  }
  else {
    FIELD.innerHTML = '';
    phraseNumber = 0;
    PAGE.value = +PAGE.value + 1;
    console.log(PAGE.value);
  }
  BUTTON_GIVE_UP.classList.remove('none');
  BUTTON_CONTINUE.classList.add('none');
  handleLevelsAndPagesChanges();
})

BUTTON_CHECK.addEventListener('click', () => {
  let isCorrect = true;
  const words =  [...FIELD.lastChild.querySelectorAll('.word')];
  words.forEach((word, ind) => {
    if (word.innerHTML === wordsArray[ind]) {
      console.log(word.innerHTML, 'green');
      word.classList.add('correct');
    }
    else {
      console.log(word.innerHTML, 'red');
      word.classList.add('wrong');
      isCorrect = false;
    }
  });
  if (isCorrect) {
    BUTTON_CHECK.classList.add('none');
    BUTTON_CONTINUE.classList.remove('none');
    setTimeout(() => {
      words.forEach(word => {
        word.classList.remove('correct');
      });
    }, 2000);
  }
  else {
    BUTTON_GIVE_UP.classList.remove('none');
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
    FIELD.innerHTML = '';
    BUTTON_GIVE_UP.classList.remove('none');
    BUTTON_CHECK.classList.add('none');
    BUTTON_CONTINUE.classList.add('none');
    audio.pause();
  }
  else {
    alert('Input level from 1 to 6');
  }
});

PAGE.addEventListener('input', () => {
  if (PAGE.value && +PAGE.value >= 1 && +PAGE.value <= 60) {
    handleLevelsAndPagesChanges();
    FIELD.innerHTML = '';
    BUTTON_GIVE_UP.classList.remove('none');
    BUTTON_CHECK.classList.add('none');
    BUTTON_CONTINUE.classList.add('none');
    audio.pause();
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

