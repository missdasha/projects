import '../../node_modules/swiper/css/swiper.min.css';
import '../css/style.css';
import '../css/style.scss';
import Swiper from '../../node_modules/swiper/js/swiper';

const SEARCH_INPUT = document.querySelector(".search__input");
const BUTTON_DELETE = document.querySelector(".button-delete");
const BUTTON_SEARCH =document.querySelector(".button-search");
// const raitings = [];
const API_KEY = 'b848529c';
const firstPage = 1;

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

const renderFilms = (filmsArray) => {
  console.log(filmsArray);
  const newSlides = [];
  filmsArray.forEach((film) => {
    newSlides.push(`<div class="swiper-slide">
                  <img class="poster" src="${film.Poster}">
                  <div class="info">
                    <a href="https://www.imdb.com/title/${film.imdbID}/videogallery">
                      <span class="title">${film.Title}</span>
                    </a>
                    <span class="year">${film.Year}</span>
                  </div>
                  </div>`)
  })
  swiper.appendSlide(newSlides);
  swiper.slideTo(0)
  console.log("Appand");
  swiper.pagination.update()
}

function getRaiting(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
 
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.imdbRating)
    });
 }

async function getMovies(name = 'dream', page = firstPage) {
  const url = `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=${API_KEY}`;
  const filmsArray = []; 

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      data.Search.forEach(film => {
        filmsArray.push(film);
        /* const raiting = fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=${API_KEY}`).then(res => res.json());
        raitings.push(raiting); */
      });
      /* let results = await Promise.all(raitings);
      console.log(results); */
      renderFilms(filmsArray);
      getRaiting(data.Search[0].imdbID);
    });
}

getMovies();

BUTTON_DELETE.addEventListener('click', () =>{
  SEARCH_INPUT.value = '';
  SEARCH_INPUT.focus();
});

BUTTON_SEARCH.addEventListener('click', () => {
  const name = SEARCH_INPUT.value;
  if(name) {
    swiper.removeAllSlides();
    getMovies(name, firstPage);
  }
});

document.addEventListener('keydown', event => {
  const name = SEARCH_INPUT.value;
  if(event.keyCode === 13 && name !== '') {
    swiper.removeAllSlides();
    getMovies(name, firstPage);
  }
});