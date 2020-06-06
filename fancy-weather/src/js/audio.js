/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
import { updateInfo } from './update'
import { MICROPHONE, isVoiceSearchEnabled } from './constants'
import { getLanguage } from './language'

export const getLocationBySpeech = () => {
    isVoiceSearchEnabled.key = true;
    window.speechRecognition = window.webkitSpeechRecognition || window.speechRecognition;
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = getLanguage() === 'en' ? 'en-GB' : 'ru-RU';

    let city = localStorage.getItem('city');
    let isFinal = false;
    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        city = transcript;
        if(e.results[0].isFinal) {
            recognition.stop();
            isFinal = true;
        }
    });
   
    recognition.addEventListener('end', () => {
        if(isVoiceSearchEnabled.key && isFinal) {
            MICROPHONE.classList.remove('micro-active');
            updateInfo(city);
            isVoiceSearchEnabled.key = false;
        }
    });

    MICROPHONE.classList.add('micro-active');
    recognition.start();
}

export const listenToWeatherForecast = async () => {
    return new Promise(resolve => {
        let allVoices = window.speechSynthesis.getVoices();
        if (allVoices.length) {
          resolve(allVoices);
        } else {
          window.speechSynthesis.addEventListener("voiceschanged", () => {
            allVoices = window.speechSynthesis.getVoices();
            resolve(allVoices);
          });
        }
    }).then(allVoices => {
        const msg = new SpeechSynthesisUtterance();
        const lang = getLanguage() === 'en' ? 'en-GB' : 'ru-RU';
        msg.voice = allVoices.filter(voice => voice.lang === lang)[0];
        const phrases = [];
        phrases.push(document.querySelector('.description').innerHTML);
        phrases.push(`${document.querySelector('.feel').innerHTML}${document.querySelector('.feel').nextElementSibling.innerHTML}°`);
        phrases.push(`${document.querySelector('.wind').innerHTML}${getLanguage() === 'en' ? 'm/s' : 'метров в секунду'}`);
        phrases.push(document.querySelector('.humidity').innerHTML);
        const message = phrases.join('\n');
        msg.text = message;
        window.speechSynthesis.speak(msg);
    });
}

