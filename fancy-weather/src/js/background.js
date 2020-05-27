import { UNSPLASH_API_TOKEN } from './constants'

const getBackground = async(city) => {
    // const season = getSeason();
    console.log(city, UNSPLASH_API_TOKEN);
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${city}&client_id=${UNSPLASH_API_TOKEN}`;
    return fetch(url)
        .then((response) => response.json());
}

export default getBackground;