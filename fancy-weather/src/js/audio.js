/* eslint-disable no-undef */
/* eslint-disable new-cap */
import { updateInfo } from './update'
import { MICROPHONE, isVoiceSearchEnabled } from './constants'
import { getLanguage } from './language'

const getLocationBySpeech = () => {
    isVoiceSearchEnabled.key = true;
    console.log('hello');
    window.speechRecognition = window.webkitSpeechRecognition || window.speechRecognition;
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = getLanguage() === 'en' ? 'en-US' : 'ru-RU';

    let city = localStorage.getItem('city');
    
    recognition.addEventListener('result', (e) => {
        console.log('asda');
        const transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        city = transcript;
        console.log(city);
        if(e.results[0].isFinal) {
            recognition.stop();
        }
    });
   
    recognition.addEventListener('end', () => {
        if(isVoiceSearchEnabled.key) {
            MICROPHONE.classList.remove('micro-active');
            updateInfo(city);
            isVoiceSearchEnabled.key = !isVoiceSearchEnabled.key;
        }
    });

    MICROPHONE.classList.add('micro-active');
    recognition.start();
}

export default getLocationBySpeech;