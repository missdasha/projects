import '../../node_modules/swiper/css/swiper.min.css';
import '../css/style.css';
import '../css/style.scss';
import Swiper from '../../node_modules/swiper/js/swiper';

const images = require.context("../img", false, /\.(png|jpe?g|svg)$/);
const SEARCH_INPUT = document.querySelector(".search__input");
const BUTTON_DELETE = document.querySelector(".button-delete");
const BUTTON_SEARCH = document.querySelector(".button-search");
const MESSAGES = document.querySelector(".messages");
const SPINNER = document.querySelector(".loader");
// const raitings = [];
const DEFAULT_POSTER = '../img/default.png';
const API_KEY = 'b848529c';
const firstPage = 1;
let filmName = 'dream';
let currentPage = 1;
let isChanged = false;

const imagesPath = name => images(name, true);

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    /* dynamicBullets: true,
    dynamicMainBullets: 10 */
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
  console.log(filmsArray);
  const newSlides = [];
  filmsArray.forEach((film) => {
    newSlides.push(`<div class="swiper-slide">
                  <img class="poster" src="${film.Poster !== 'N/A' ? film.Poster : DEFAULT_POSTER}">
                  <div class="info">
                    <a href="https://www.imdb.com/title/${film.imdbID}/videogallery">
                      <span class="title">${film.Title}</span>
                    </a>
                    <span class="year">${film.Year}</span>
                  </div>
                  </div>`)
  })
  swiper.appendSlide(newSlides);
  if(currentPage === 1) {
    swiper.slideTo(0);
  }
  currentPage += 1;
}

function getRaiting(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
 
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.imdbRating)
    });
 }

function getMovies(name = filmName, page = firstPage) {
  toggleSpinner();
  const url = `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${API_KEY}`;
  const filmsArray = []; 
  console.log(name, page);
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.Response === 'True') {
        data.Search.forEach(film => {
          filmsArray.push(film);
          /* const raiting = fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=${API_KEY}`).then(res => res.json());
          raitings.push(raiting); */
        });
        if(isChanged) {
          swiper.removeAllSlides();
          filmName = name;
          currentPage = 1;
          isChanged = false;
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
        else if(currentPage > 1) {
          MESSAGES.innerText = 'No more results.';
        }
        console.log(data.Error);
        isChanged = false;
      }
      /* let results = await Promise.all(raitings);
      console.log(results); */
      // getRaiting(data.Search[0].imdbID);
      toggleSpinner();
    });
}

getMovies();

BUTTON_DELETE.addEventListener('click', () =>{
  SEARCH_INPUT.value = '';
  SEARCH_INPUT.focus();
});
/*
const translateQuery = query => {
  
} */

const isRuLang = name => /(^[А-я0-9\s]+)(?!.*[A-z])$/.test(name);

const isEnLang = name => /(^[A-z0-9\s]+)(?!.*[А-я])$/.test(name);

const handleInput = input =>  {
  if(input) {
    MESSAGES.innerText = '';
    if(isRuLang(input)) {
     console.log("ru");
    }
    else if(isEnLang(input)) {
      console.log("en");
      getMovies(input, firstPage);
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
  isChanged = true;
  const input = SEARCH_INPUT.value;
  /* if(input) {
    MESSAGES.innerText = '';
    if(isRuLang) {
     console.log("ru");
    }
    else if(isEnLang) {
      getMovies(input, firstPage);
    }
    else {
      MESSAGES.innerText = `No results for ${input}`;
    }
  } */
  handleInput(input);
});

document.addEventListener('keydown', event => {
  isChanged = true;
  const input = SEARCH_INPUT.value;
  if(event.keyCode === 13/* && input */) {
    /* MESSAGES.innerText = '';
    if(isRuLang) { 
      console.log("ru");
    }
    else if(isEnLang) {
      getMovies(input, firstPage);
    }
    else {
      MESSAGES.innerText = `No results for ${input}`;
    } */
    handleInput(input);
  }
});