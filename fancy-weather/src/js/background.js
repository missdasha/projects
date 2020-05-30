import { UNSPLASH_API_TOKEN } from './constants'
import { getSeason, getDayTime } from './date'

export const getBackground = async () => {
    const season = getSeason();
    const dayTime = getDayTime();
    console.log(season, dayTime);
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={${season},${dayTime},city}&client_id=${UNSPLASH_API_TOKEN}`;
    return fetch(url)
        .then((response) => response.json());
}

export const renderBackground = img => { 
    const bgImage = new Image();
    bgImage.onload = () => {
        document.body.style.backgroundImage = `linear-gradient(rgba(8, 15, 26, 0.59), rgba(17, 17, 46, 0.46)), url(${img})`;
    };
    bgImage.src = img;
    
}