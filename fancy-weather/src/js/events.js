/* eslint-disable no-undef */
/* eslint-disable new-cap */
import {ENTER_KEYCODE, INPUT_SEARCH, BUTTON_SEARCH, BUTTON_LANGS, BUTTON_TEMPERATURE, BUTTON_REFRESH, IMAGE_REFRESH, MICROPHONE, isVoiceSearchEnabled} from './constants'
import {getLanguage} from './language'
import {getTemperature} from './temperature'
import {getBackground, renderBackground} from './background'
import {updateTemperature, updateLanguage, updateInfo} from './update'
import getLocationBySpeech from './audio'

const renderEvents = () => {
    document.addEventListener('keydown', event => {
        if(event.keyCode === ENTER_KEYCODE) { 
          event.preventDefault();
          const input = INPUT_SEARCH.value;
          updateInfo(input);
        }
    });
      
    BUTTON_SEARCH.addEventListener('click', () => {
        const input = INPUT_SEARCH.value;
        updateInfo(input);
    });
      
    BUTTON_LANGS.addEventListener('click', event => {
        const {target} = event;
        if(target.id !== getLanguage()) {
          BUTTON_LANGS.children.forEach(button => {
            button.classList.remove('active');
          });
          target.classList.add('active');
          updateLanguage(target.id);
        }
    });
      
    BUTTON_TEMPERATURE.addEventListener('click', event => {
        const {target} = event;
        if(target.id !== getTemperature()) {
          BUTTON_TEMPERATURE.children.forEach(button => {
            button.classList.remove('active');
          });
          target.classList.add('active');
          updateTemperature(target.id);
        }
    });

    BUTTON_REFRESH.addEventListener('click', async () => {
      IMAGE_REFRESH.classList.add('rotate');
      const img = await getBackground();
      const {regular} = img.urls;
      renderBackground(regular);
      IMAGE_REFRESH.classList.remove('rotate');
    });

    MICROPHONE.addEventListener('click', () => {
      if(!isVoiceSearchEnabled.key) {
        getLocationBySpeech();
      }
      else {
        isVoiceSearchEnabled.key = false;
        MICROPHONE.classList.remove('micro-active');
      }
    })
}

export default renderEvents;