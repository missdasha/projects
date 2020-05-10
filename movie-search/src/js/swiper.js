import '../../node_modules/swiper/css/swiper.min.css';
import Swiper from '../../node_modules/swiper/js/swiper';

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  centerInsufficientSlides: true,
  breakpoints: {
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

export default swiper;