import { WHEATHERBIT_API_TOKEN } from './constants'
import { getLanguage } from './language';

const getWeatherForecast = async (lat, lon) => { 
    const lang = getLanguage();
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=16&lang=${lang}&key=${WHEATHERBIT_API_TOKEN}`;
    return fetch(url)
        .then((response) => response.json())
        .then(data => data.data.filter((el, ind) => ind < 4))
        .catch((e) => console.log(e));
}

export default getWeatherForecast;