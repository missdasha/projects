import { UNSPLASH_API_TOKEN, INPUT_SEARCH, translations } from './constants'
import { getSeason, getDayTime } from './date'
import { getLanguage } from './language';

export const getBackground = async () => {
    const season = getSeason();
    const dayTime = getDayTime();
    console.log(`getBackground(${season}, ${dayTime})`);
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={${season},${dayTime},city}&client_id=${UNSPLASH_API_TOKEN}`;
    return fetch(url)
        .then((response) => {
            if(!response.ok) {
                const lang = getLanguage();
                INPUT_SEARCH.value = '';
                INPUT_SEARCH.placeholder = translations[lang].keyError;
            }
            return response.json();
        });
}

export const renderBackground = img => { 
    const bgImage = new Image();
    bgImage.onload = () => {
        document.body.style.backgroundImage = `linear-gradient(rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url(${img})`;
        bgImage.remove();
    };
    bgImage.onerror = () => {
        document.body.style.backgroundImage = `linear-gradient(rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url(../img/default.jpg)`;
    };
    bgImage.src = img;
    
}