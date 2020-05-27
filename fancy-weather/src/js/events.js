import {ENTER_KEYCODE, INPUT_SEARCH, BUTTON_SEARCH, BUTTON_LANGS, BUTTON_TEMPERATURE} from './constants'
import {setLanguage} from './language'
import {setTemperature} from './temperature'

const renderEvents = () => {
    document.addEventListener('keydown', event => {
        if(event.keyCode === ENTER_KEYCODE) { 
          event.preventDefault();
          const input = INPUT_SEARCH.value;
          console.log(input);
        }
    });
      
    BUTTON_SEARCH.addEventListener('click', () => {
        const input = INPUT_SEARCH.value;
        console.log(input);
    });
      
    BUTTON_LANGS.addEventListener('click', event => {
        const {target} = event;
        BUTTON_LANGS.children.forEach(button => {
          button.classList.remove('active');
        });
        target.classList.add('active');
        setLanguage(target.id);
    });
      

    BUTTON_TEMPERATURE.addEventListener('click', event => {
        const {target} = event;
        BUTTON_TEMPERATURE.children.forEach(button => {
            button.classList.remove('active');
          });
          target.classList.add('active');
          setTemperature(target.id);
    });
}

export default renderEvents;