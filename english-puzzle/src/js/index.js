/* eslint-disable no-inner-declarations */
/* eslint-disable no-alert */
import '../css/style.css';
import { LEVEL, PAGE, WORDS, FIELD, BUTTON_START, START_SCREEN, GAME, BUTTON_GIVE_UP, BUTTON_CHECK, BUTTON_CONTINUE,
  HINT_TRANSLATION, BUTTON_TRANSLATION, BUTTON_DYNAMIC, BUTTON_SOUND, HINT_DYNAMIC, BUTTON_RESULTS, RESULTS, DONT_KNOW, KNOW } from './constants'
import showResults from './results'

let pageWords = [];
let wordsArray = [];
let phraseNumber = 0;
let phraseLength;
let audio;
const phrasesGiveUp = [];

const playAudio = () => {
  console.log(localStorage.getItem('pronunciation'));
  if (localStorage.getItem('pronunciation') === 'true') {
    console.log(localStorage.getItem('pronunciation'));
    HINT_DYNAMIC.classList.add('active');
    const path = pageWords[phraseNumber].audioExample;
    audio = new Audio(`https://raw.githubusercontent.com/missdasha/rslang-data/master/${path}`);
    audio.play();
    audio.addEventListener('ended', () => HINT_DYNAMIC.classList.remove('active'));
  }
} 

const getWords = (level, page) => {
  return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`)
        .then(response => response.json())
}

const shuffle = words => words.sort(() => Math.random() - 0.5)

const prepareHints = () => {
  HINT_TRANSLATION.innerText = pageWords[phraseNumber].textExampleTranslate;
  if (localStorage.getItem('translation') === 'false') {
    HINT_TRANSLATION.classList.add('hidden');
  }
  if (localStorage.getItem('automatic') === 'true' && localStorage.getItem('pronunciation') === 'true') {
      playAudio();
  }
}

const renderWords = () => {
  const wordsStr = pageWords[phraseNumber].textExample.slice(0, -1).replace('<b>', '').replace('</b>', '');
  wordsArray = wordsStr.split(' ');
  const words = shuffle(wordsStr.split(' '));
  phraseLength = wordsStr.replace(/\s+/g, '').length;

  let elements = '';
  const fieldWidth = FIELD.clientWidth;
  words.forEach(word => {
    console.log(word, word.length);
    elements += `<div class="word" style="width:${fieldWidth * (word.length / phraseLength)}px">${word}</div>`
  });
  WORDS.innerHTML = elements;
  FIELD.insertAdjacentHTML('beforeend', `<div class="row"></div>`);
  if (phraseNumber) {
    prepareHints();
  }
}

const handleLevelsAndPagesChanges = async () => {
  const level = LEVEL.value - 1;
  const round = PAGE.value;
  const page = Math.ceil(round / 2) - 1;

  const words = await getWords(level, page);
  console.log(words);
  pageWords = round % 2 === 0 ? words.slice(10) : words.slice(0, 10);

  renderWords();
  prepareHints();
}

const showHints = () => {
  if (localStorage.getItem('translation') === 'false') {
    HINT_TRANSLATION.classList.remove('hidden');
    setTimeout(() => HINT_TRANSLATION.classList.add('hidden'), 3000);
  }
  if (localStorage.getItem('automatic') === 'false') {
    if (localStorage.getItem('pronunciation') === 'false') {
      localStorage.setItem('pronunciation', true);
      playAudio();
      localStorage.setItem('pronunciation', false);
    }
    else {
      playAudio();
    }
  }
  else if (localStorage.getItem('pronunciation') === 'false') {
      localStorage.setItem('pronunciation', true);
      playAudio();
      localStorage.setItem('pronunciation', false);
  }
}

const checkSavedOptions = () => {
  if (localStorage.getItem('automatic') === null) {
    console.log(1);
    localStorage.setItem('automatic', true);
    localStorage.setItem('translation', true);
    localStorage.setItem('pronunciation', true);
  }
  console.log(localStorage.getItem('automatic'));
  console.log(localStorage.getItem('translation'));
  console.log(localStorage.getItem('pronunciation'));
  if (localStorage.getItem('automatic') === 'true') { 
    BUTTON_DYNAMIC.classList.add('chosen');
  }
  if (localStorage.getItem('translation') === 'true') { 
    BUTTON_TRANSLATION.classList.add('chosen');
  }
  if (localStorage.getItem('pronunciation') === 'true') { 
    BUTTON_SOUND.classList.add('chosen');
  }
}

const setLastRound = () => {
  const last = {'level': LEVEL.value, 'round': PAGE.value};
  localStorage.setItem('last', JSON.stringify(last));
}

const checkLastRound = () => {
  if (localStorage.getItem('last')) {
    const last = JSON.parse(localStorage.getItem('last'));
    console.log(last.level, last.round);
    LEVEL.value = +last.level;
    PAGE.value = +last.round + 1;
  }
}

HINT_DYNAMIC.addEventListener('click', () => {
  playAudio();
})

BUTTON_SOUND.addEventListener('click', () => {
  BUTTON_SOUND.classList.toggle('chosen');
  const isChosen = !(localStorage.getItem('pronunciation')  === 'true');
  localStorage.setItem('pronunciation', isChosen);
  if (isChosen && localStorage.getItem('automatic') === 'true') {
    playAudio();
  }
})

BUTTON_DYNAMIC.addEventListener('click', () => {
  BUTTON_DYNAMIC.classList.toggle('chosen');
  const isChosen = !(localStorage.getItem('automatic')  === 'true');
  localStorage.setItem('automatic', isChosen);
  console.log(localStorage.getItem('automatic'));
  if (isChosen && localStorage.getItem('pronunciation') === 'true') {
    playAudio();
  }
})

BUTTON_TRANSLATION.addEventListener('click', () => {
  BUTTON_TRANSLATION.classList.toggle('chosen');
  HINT_TRANSLATION.classList.toggle('hidden');
  const isChosen = !(localStorage.getItem('translation')  === 'true');
  localStorage.setItem('translation', isChosen);
})
/*
let currentDroppable = null;

WORDS.addEventListener('mousedown', event => {
  const word = event.target;
  if (word.className === 'word') {
    const shiftX = event.clientX - word.getBoundingClientRect().left;
    const shiftY = event.clientY - word.getBoundingClientRect().top;

    word.style.position = 'absolute';
    word.style.zIndex = 1000;
    document.body.append(word);

    function moveAt(pageX, pageY) {
      word.style.left = `${pageX - shiftX}px`;
      word.style.top = `${pageY - shiftY}px`;
    }

    moveAt(event.pageX, event.pageY);

    
    function enterDroppable(elem) {
      const el = elem;
      el.style.background = 'pink';
    }

    function leaveDroppable(elem) {
      const el = elem;
      el.style.background = '';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);

      word.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      word.hidden = false;

      if (!elemBelow) return;

      const droppableBelow = elemBelow.closest('.row');
      if (currentDroppable !== droppableBelow) {
        if (currentDroppable) { // null when we were not over a droppable before this event
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) { // null if we're not coming over a droppable now
          // (maybe just left the droppable)
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    word.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
      word.onmouseup = null;
    });

    word.addEventListener('dragstart', () => false);

    if (WORDS.innerHTML === '') {
      BUTTON_GIVE_UP.classList.add('none');
      BUTTON_CHECK.classList.remove('none');
    }
  }
})
*/
WORDS.addEventListener('click', event => {
  if (event.target.className === 'word') {
    FIELD.lastChild.append(event.target);
    if (WORDS.innerHTML === '') {
      BUTTON_GIVE_UP.classList.add('none');
      BUTTON_CHECK.classList.remove('none');
    }
  }
})

BUTTON_RESULTS.addEventListener('click', () => {
  document.querySelector('.results .button-continue').addEventListener('click', () => {
    RESULTS.classList.add('none');
    BUTTON_RESULTS.classList.add('none');
    FIELD.innerHTML = '';
    phraseNumber = 0;
    console.log(PAGE.value);
    handleLevelsAndPagesChanges();
    BUTTON_GIVE_UP.classList.remove('none');
    BUTTON_CONTINUE.classList.add('none');
    DONT_KNOW.innerHTML = '';
    KNOW.innerHTML = '';
    GAME.classList.remove('none');
  })
  showResults(pageWords, phrasesGiveUp);
})

BUTTON_CONTINUE.addEventListener('click', () => {
  console.log('continue');
  if (localStorage.getItem('translation') === 'false') {
    HINT_TRANSLATION.classList.add('hidden');
  }
  else {
    HINT_TRANSLATION.classList.remove('hidden');
  }
  if (phraseNumber < 9) {
    phraseNumber += 1;
    renderWords();
    BUTTON_GIVE_UP.classList.remove('none');
    BUTTON_CONTINUE.classList.add('none');
  }
  else if (phraseNumber === 9) {
    phraseNumber += 1;
    BUTTON_RESULTS.classList.remove('none');
    setLastRound();
    PAGE.value = +PAGE.value + 1;
  }
  else {
    BUTTON_RESULTS.classList.add('none');
    FIELD.innerHTML = '';
    phraseNumber = 0;
    handleLevelsAndPagesChanges();
    BUTTON_GIVE_UP.classList.remove('none');
    BUTTON_CONTINUE.classList.add('none');
  }
})

BUTTON_CHECK.addEventListener('click', () => {
  let isCorrect = true;
  const words = [...FIELD.lastChild.querySelectorAll('.word')];
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
    showHints();
  }
  else {
    BUTTON_GIVE_UP.classList.remove('none');
  }
})

BUTTON_GIVE_UP.addEventListener('click', () => {
  phrasesGiveUp.push(phraseNumber);
  WORDS.innerHTML = '';
  FIELD.lastChild.innerHTML = '';
  const fieldWidth = FIELD.clientWidth;
  wordsArray.forEach(word => {
    FIELD.lastChild.insertAdjacentHTML('beforeend', `<div class="word"style="width:${fieldWidth * (word.length / phraseLength)}px">${word}</div>`);
  });
  BUTTON_GIVE_UP.classList.add('none');
  BUTTON_CHECK.classList.add('none');
  BUTTON_CONTINUE.classList.remove('none');
  showHints();
})

LEVEL.addEventListener('input', () => {
  if (LEVEL.value && +LEVEL.value >= 1 && +LEVEL.value <= 6) {
    handleLevelsAndPagesChanges();
    FIELD.innerHTML = '';
    BUTTON_GIVE_UP.classList.remove('none');
    BUTTON_CHECK.classList.add('none');
    BUTTON_CONTINUE.classList.add('none');
    if (audio !== undefined) {
      audio.pause();
    }
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
    if (audio !== undefined) {
      audio.pause();
    }
  }
  else {
    alert('Input page from 1 to 60');
  }
})

BUTTON_START.addEventListener('click', () => {
  START_SCREEN.classList.add('none');
  GAME.classList.remove('none');
  checkLastRound();
  checkSavedOptions();
  handleLevelsAndPagesChanges();
})

