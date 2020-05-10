import {SEARCH_INPUT, BUTTON_DELETE, BUTTON_SEARCH, MESSAGES, SPINNER, CONTAINER, BUTTON_KEYBOARD,
  DEFAULT_POSTER, OMDB_API_KEY, TRANSLATE_API_KEY, NO_POSTER, NOT_FOUND, ENTER_KEYCODE, SUCCESS_CODE, FIRST_PAGE, 
  ruButtons, enButtons} from './constants';
import {createMarkup, createButtons, handleVirtualKeyboard} from './keyboard'
import {isRuLang, isEnLang} from './defineLanguage'
import swiper from './swiper'
import '../css/style.css';

require.context("../img", false, /\.(png|jpe?g|svg)$/);

let raitings = [];
let filmName = 'dream';
let currentPage = 1;
let isChanged = false;
let isTranslated = false;

const toggleSpinner = () => {
  SPINNER.classList.toggle('none');
}

const renderFilms = (filmsArray) => {
  console.log(raitings);
  console.log(filmsArray);
  const newSlides = [];
  filmsArray.forEach((film, ind) => {
    newSlides.push(`<div class="swiper-slide">
                  <img class="poster" onerror="this.onerror=null; this.src='${DEFAULT_POSTER}';" src="${film.Poster !== NO_POSTER ? film.Poster : DEFAULT_POSTER}">
                  <div class="info">
                    <a href="https://www.imdb.com/title/${film.imdbID}/videogallery">
                      <span class="title">${film.Title}</span>
                    </a>
                    <div class="info__footer">
                      <span class="year">${film.Year}</span>
                      <span>${raitings[ind]}</span>
                    </div>
                  </div>
                  </div>`)
  })
  swiper.appendSlide(newSlides);
  if(currentPage === FIRST_PAGE) {
    swiper.slideTo(0);
  }
  currentPage += 1;
  raitings.splice(0);
}

const getRaiting = async (film) => {
  const id = film.imdbID;
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      return data.imdbRating;
    });
 }

const getMovies = async (name, page) => {
  toggleSpinner();
  const url = `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${OMDB_API_KEY}`;
  let filmsArray = []; 
  console.log(name, page);
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  if(data.Response === 'True') {
    filmsArray = [].concat(data.Search);
    const promises = filmsArray.map(getRaiting);
    raitings = await Promise.all(promises);
    if(isChanged) {
      swiper.removeAllSlides();
      filmName = name;
      currentPage = 1;
      isChanged = false;
    }
    if(isTranslated) {
      MESSAGES.innerText = `Showing results for ${name}.`;
    }
    renderFilms(filmsArray);
  }
  else {
    if(isChanged) {
      if(data.Error === NOT_FOUND) {
        MESSAGES.innerText = `No results for ${name}`;
      }
      else {
          MESSAGES.innerText = data.Error;
      }
    }
    else if(currentPage > FIRST_PAGE) {
      if(data.Error === NOT_FOUND) {
        MESSAGES.innerText = `No more results.`;
      }
      else {
        MESSAGES.innerText = data.Error;
      }
    }
    else {
      MESSAGES.innerText = data.Error;
    }
    isChanged = false;
  }
  isTranslated = false;
  toggleSpinner();
}

const makeQuery = async (name = filmName, page = FIRST_PAGE) => {
  await getMovies(name, page);
}

const translateQuery = query => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_KEY}&text=${query}&lang=ru-en`;
  return fetch(url)
        .then(res => res.json())
        .then(data => {
          if(data.code === SUCCESS_CODE) {
            isTranslated = true;
            const translation = data.text.join('');
            makeQuery(translation);
          }
        });
} 

const handleInput = input =>  {
  if(input) {
    isChanged = true;
    MESSAGES.innerText = '';
    if(isRuLang(input)) {
     console.log("ru");
     translateQuery(input);
    }
    else if(isEnLang(input)) {
      console.log("en");

      makeQuery(input, FIRST_PAGE);
    }
    else {
      MESSAGES.innerText = `No results for ${input}`;
    }
  }
  else {
    MESSAGES.innerText = `You entered nothing.`;
  }
}

swiper.on('slideNextTransitionStart', () => {
  if(swiper.activeIndex === Math.round(swiper.slides.length/2)) {
    console.log(swiper.activeIndex);
    makeQuery(filmName, currentPage);
    console.log('slideChange');
  }
})

BUTTON_DELETE.addEventListener('click', () =>{
  SEARCH_INPUT.value = '';
  SEARCH_INPUT.focus();
});

BUTTON_SEARCH.addEventListener('click', () => {
  const input = SEARCH_INPUT.value.trim();
  handleInput(input);
});

BUTTON_KEYBOARD.addEventListener('click', () => {
  CONTAINER.classList.toggle('none');
  SEARCH_INPUT.focus();
})

document.addEventListener('keydown', event => {
  if(event.keyCode === ENTER_KEYCODE) { 
    const input = SEARCH_INPUT.value.trim();
    handleInput(input);
  }
});

window.addEventListener('load', () => {
  createMarkup();
  if(localStorage.getItem('lang') !== null) {
      if (localStorage.getItem('lang') === 'ru') {
          createButtons(ruButtons);
      }
      else {
          createButtons(enButtons);
      }
  }
  else {
      localStorage.setItem('lang', 'en');
      createButtons(enButtons);
  }
  handleVirtualKeyboard();
  
  document.getElementById('Enter').addEventListener('click', () => {
    const input = SEARCH_INPUT.value.trim();
    handleInput(input);
  });

  makeQuery();
});