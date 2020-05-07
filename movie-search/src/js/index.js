import '../../node_modules/swiper/css/swiper.min.css';
import '../css/style.css';
import '../css/style.scss';
import Swiper from '../../node_modules/swiper/js/swiper';

require.context("../img", false, /\.(png|jpe?g|svg)$/);
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
let isTranslated = false;
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
                  <img class="poster" onerror="this.onerror=null; this.src='${DEFAULT_POSTER}';" src="${film.Poster !== 'N/A' ? film.Poster : DEFAULT_POSTER}">
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
/*
function getRaiting(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
 
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.imdbRating)
    });
 } */

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
        else if(currentPage > 1) {
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
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${query}&lang=ru-en`;
  return fetch(url)
        .then(res => res.json())
        .then(data => {
          if(data.code === 200) {
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
  const input = SEARCH_INPUT.value;
  handleInput(input);
});

document.addEventListener('keydown', event => {
  if(event.keyCode === 13) {
    const input = SEARCH_INPUT.value;
    handleInput(input);
  }
});