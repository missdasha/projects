import { convertToFahrenheit, convertToCelsius } from './convertion'
import { translations, REGEXP, INPUT_SEARCH, BUTTON_SEARCH, options, imagePath } from './constants'
import { getLanguage, setLanguage } from './language';
import { getCoordinatesByCity } from './location'
import { setTemperature, getTemperature } from './temperature'
import getWeatherForecast from './forecast'
import { getBackground, renderBackground } from './background'
import { translateDate, getCurrentDate, changeTime } from './date'
import { countAverage, changeFormat } from './utils'
import getMapbox from './mapbox'

export const updateTemperature = temp => {
    const convert = (temp !== "сelsius") ? convertToFahrenheit : convertToCelsius;
    [...document.querySelectorAll('[data-temp]')].forEach(el => {
        const elem = el;
        const valueToConvert = el.innerText;
        elem.innerText = ` ${convert(+valueToConvert)}`;
    });
    setTemperature(temp);
}

export const updateLanguage = async (lang) => {
    INPUT_SEARCH.placeholder = translations[lang].placeholder;
    BUTTON_SEARCH.innerText = translations[lang].search;

    document.querySelector('.feel').innerText = translations[lang].feel;

    const wind = document.querySelector('.wind');
    wind.innerText = wind.innerText.replace(REGEXP, translations[lang].wind);
    wind.nextSibling.innerText = translations[lang].ms;

    const humidity = document.querySelector('.humidity');
    humidity.innerText = humidity.innerText.replace(REGEXP, translations[lang].humidity);

    [...document.querySelectorAll('.day-week')].forEach(el => {
        const prevLang = getLanguage();
        const elem = el;
        const valueToTranslate = el.innerText;
        const pos = translations[prevLang].day.indexOf(valueToTranslate);
        console.log(pos);
        elem.innerText = translations[lang].day[pos];
    });

    const latitude = document.querySelector('.coordinates p:first-child');
    latitude.innerText = latitude.innerText.replace(REGEXP, translations[lang].lat);
    const longitude = document.querySelector('.coordinates p:last-child');
    longitude.innerText = longitude.innerText.replace(REGEXP, translations[lang].lng);

    setLanguage(lang);

    const coords = await getCoordinatesByCity(localStorage.getItem('city'));
    const stringLocation = coords.formatted;
    document.querySelector('.location').innerText = stringLocation;

    const forecast = await getWeatherForecast(localStorage.getItem('latitude'), localStorage.getItem('longitude'));
    document.querySelector('.description').innerText = forecast[0].weather.description;
}

export const updateInfo = async (location) => {
    const coords = await getCoordinatesByCity(location);
    console.log(coords);
    const city = coords.components.state;
    localStorage.setItem('city', city);
    const stringLocation = coords.formatted;
    console.log('stringLocation: ', stringLocation);
    const latitude = coords.geometry.lat;
    const longitude = coords.geometry.lng;
    console.log(latitude, longitude);
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    const timeZone = coords.annotations.timezone.name;
    console.log(timeZone);
    localStorage.setItem('timezone', timeZone);
  
    const forecast = await getWeatherForecast(latitude, longitude);
    console.log(forecast);

    const img = await getBackground();
    const {regular} = img.urls;
    renderBackground(regular);

    const lang = getLanguage();
    const {code} = forecast[0].weather;
    const temperature = Math.round(forecast[0].temp);
    const averageTemp = countAverage(forecast[0].app_max_temp, forecast[0].app_min_temp);
    const isCelsius = getTemperature() === "сelsius";
    // location
    document.querySelector('.location').innerText = stringLocation;
    // current date
    options.timeZone = localStorage.getItem('timezone');
    const currDate = lang !== 'en' ? translateDate(lang) : getCurrentDate(options).replace(/,/g, '');
    document.querySelector('.date').innerText = currDate;
    // current-degrees
    document.querySelector('.current-degrees').innerText =`${isCelsius ? temperature : convertToFahrenheit(temperature)}`;
    // current-icon
    document.querySelector('.current-icon').src =`${imagePath}${translations.weather[code]}`;
    // description
    document.querySelector('.description').innerText = `${forecast[0].weather.description}`;
    // feelsLike
    const feelsLike = document.querySelector('.feel');
    feelsLike.innerText = translations[lang].feel;
    feelsLike.nextSibling.innerText = ` ${isCelsius? averageTemp : convertToFahrenheit(averageTemp)}`;
    // wind
    const wind = document.querySelector('.wind');
    wind.innerText = `${translations[lang].wind} ${Math.floor(forecast[0].wind_spd)}`;
    wind.nextSibling.innerText = translations[lang].ms;
    // humidity
    const humidity = document.querySelector('.humidity');
    humidity.innerText = `${translations[lang].humidity} ${forecast[0].rh}%`;
    // days
    let temp;
    let weekDay;
    [...document.querySelectorAll('.day')].forEach((el, ind) => {
        const elem = el;
        temp = Math.round(forecast[ind+1].temp);
        weekDay = (new Date(forecast[ind+1].datetime)).getDay();
        elem.querySelector('.day-week').innerText = `${translations[lang].day[weekDay]}`;
        elem.querySelector('.day-degrees').innerText = `${getTemperature() === 'сelsius' ? temp : convertToFahrenheit(temp)}`;
        elem.querySelector('.day-icon').src = `${imagePath}${translations.weather[forecast[ind+1].weather.code]}`;
    });

    document.querySelector('.coordinates p:first-child').innerText = `${translations[lang].lat} ${changeFormat(+latitude)}`;
    document.querySelector('.coordinates p:last-child').innerText = `${translations[lang].lng} ${changeFormat(+longitude)}`;

    getMapbox(latitude, longitude);
    setInterval(changeTime, 1000);
}