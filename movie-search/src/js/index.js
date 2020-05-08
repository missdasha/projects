import {SEARCH_INPUT, BUTTON_DELETE, BUTTON_SEARCH, MESSAGES, SPINNER, CONTAINER, BUTTON_KEYBOARD,
  DEFAULT_POSTER, OMDB_API_KEY, TRANSLATE_API_KEY, NO_POSTER, ENTER_KEYCODE, SUCCESS_CODE, FIRST_PAGE } from './constants';
import {createMarkup, createButtons, handleVirtualKeyboard, ruButtons, enButtons} from './keyboard'
import '../../node_modules/swiper/css/swiper.min.css';
import '../css/style.css';
import '../css/style.scss';
import Swiper from '../../node_modules/swiper/js/swiper';

require.context("../img", false, /\.(png|jpe?g|svg)$/);

const raitings = [];
let filmName = 'dream';
let currentPage = 1;
let isChanged = false;
let isTranslated = false;

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  centerInsufficientSlides: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

swiper.on('slideNextTransitionStart', () => {
  if(swiper.activeIndex === Math.round(swiper.slides.length/2)) {
    console.log(swiper.activeIndex);
    getMovies(filmName, currentPage);
    console.log('slideChange');
  }
})

const toggleSpinner = () => {
  console.log("toggle");
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
                    <span class="year">${film.Year}</span><span>${raitings[ind]}</span>
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

function getRaiting(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`;
 
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.imdbRating);
      raitings.push(data.imdbRating);
    });
 } 

function getMovies(name = filmName, page = FIRST_PAGE) {
  toggleSpinner();
  const url = `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${OMDB_API_KEY}`;
  const filmsArray = []; 
  console.log(name, page);
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.Response === 'True') {
        data.Search.forEach(film => {
          filmsArray.push(film);
          // const raiting = fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=${OMDB_API_KEY}`).then(res => res.json());
          getRaiting(film.imdbID);
          /* raitings.push(raiting); */
        });
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
          if(data.Error === 'Movie not found!') {
            MESSAGES.innerText = `No results for ${name}`;
          }
          else {
            MESSAGES.innerText = data.Error;
          }
        }
        else if(currentPage > FIRST_PAGE) {
          MESSAGES.innerText = 'No more results.';
        }
        console.log(data.Error);
        isChanged = false;
      }
      /* let results = await Promise.all(raitings);
      console.log(results); */
      // getRaiting(data.Search[0].imdbID);
      isTranslated = false;
      toggleSpinner();
    });
}

getMovies();

BUTTON_DELETE.addEventListener('click', () =>{
  SEARCH_INPUT.value = '';
  SEARCH_INPUT.focus();
});

const translateQuery = query => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_KEY}&text=${query}&lang=ru-en`;
  return fetch(url)
        .then(res => res.json())
        .then(data => {
          if(data.code === SUCCESS_CODE) {
            isTranslated = true;
            const translation = data.text.join('');
            getMovies(translation);
          }
        });
} 

const isRuLang = name => /(^[А-я\s]+)(?!.*[A-z])$/.test(name);

const isEnLang = name => /(^[A-z0-9\s]+)(?!.*[А-я])$/.test(name);

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
      getMovies(input, FIRST_PAGE);
    }
    else {
      MESSAGES.innerText = `No results for ${input}`;
    }
  }
  else {
    MESSAGES.innerText = `You entered nothing.`;
  }
}

BUTTON_SEARCH.addEventListener('click', () => {
  const input = SEARCH_INPUT.value;
  handleInput(input);
});

BUTTON_KEYBOARD.addEventListener('click', () => {
  CONTAINER.classList.toggle('none');
  SEARCH_INPUT.focus();
})

document.addEventListener('keydown', event => {
  if(event.keyCode === ENTER_KEYCODE) { 
    const input = SEARCH_INPUT.value;
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
    const input = SEARCH_INPUT.value;
    handleInput(input);
  })
});