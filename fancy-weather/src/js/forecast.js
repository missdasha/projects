import { WHEATHERBIT_API_TOKEN } from './constants'
import { getLanguage } from './language';
import { getTemperature } from './temperature'

const getWeatherForecast = (lat, lon) => { 
    console.log(getTemperature());
    const lang = getLanguage();
    console.log(lat, lon);
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=16&lang=${lang}&key=${WHEATHERBIT_API_TOKEN}`;
    return fetch(url)
        .then((response) => response.json())
        .then(data => data.data.filter((el, ind) => ind < 4));
}

export default getWeatherForecast;