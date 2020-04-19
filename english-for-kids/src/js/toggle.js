import { words, BUTTON_START, MENU, SECTION_PAGE } from './game';

export const toggleMenu = () => {
    document.querySelector('.hamburger__icon').classList.toggle('hamburger__icon-active');
    MENU.classList.toggle('to-right');
    document.querySelector('.overlay').classList.toggle('hidden');
}

export const toggleModes = () => {
    SECTION_PAGE.querySelectorAll('.section-card').forEach((el) => {
      el.classList.toggle('play-card');
      el.querySelector('.word').classList.toggle('none');
      el.querySelector('.rotation').classList.toggle('none');
    });
    if(words.length === 0) {
      BUTTON_START.classList.toggle('none');
    }
}