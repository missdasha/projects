
import {ENTER_KEYCODE, INPUT_SEARCH, BUTTON_SEARCH} from './constants'

import '../css/style.css';
import '../css/style.scss';

require.context("../img", false, /\.(png|jpe?g|svg)$/);

document.addEventListener('keydown', event => {
  if(event.keyCode === ENTER_KEYCODE) { 
    const input = INPUT_SEARCH.value;
    console.log(input);
  }
});

BUTTON_SEARCH.addEventListener('click', () => {
  const input = INPUT_SEARCH.value;
  console.log(input);
});