import { translations, imagePath, options } from './constants'
import { getLanguage } from './language';
import { getTemperature } from './temperature'
import { convertToFahrenheit } from './convertion'
import { getCurrentDate, translateDate, changeTime } from './date'
import getMapbox from './mapbox';
import { countAverage, changeFormat } from './utils'

const renderDays = (forecast, lang) => {
    let html = ``;
    let temperature;
    let weekDay;
    forecast.forEach((el, ind) => {
        temperature = Math.floor(el.temp);
        weekDay = (new Date(el.datetime)).getDay();
        html += `
        <div class="day">
         <p class="day-week">${translations[lang].day[weekDay]}</p>
         <div class="day-wrapper">
             <h2 class="day-degrees" data-temp>${getTemperature() === 'сelsius' ? temperature : convertToFahrenheit(temperature)}</h2>
             <span class="degree">°</span>
             <img class="day-icon" src="${imagePath}${translations.weather[forecast[ind].weather.code]}">
         </div>
        </div>`
    })
    return html;
}

const renderInfo = (city, country, forecast, latitude, longitude) => {
    const main = document.createElement('main');
    const lang = getLanguage();
    const {code} = forecast[0].weather;
    const temperature = Math.round(forecast[0].temp);
    const averageTemp = countAverage(forecast[0].app_max_temp, forecast[0].app_min_temp);
    const isCelsius = getTemperature() === "сelsius";
    options.timeZone = localStorage.getItem('timezone');
    const currDate = lang !== 'en' ? translateDate(lang) : getCurrentDate(options).replace(/,/g, '');

    main.innerHTML = `
        <div class="weather">
            <div class="weather__info">
                <h3 class="location">${city}, ${country}</h3>
                <p class="date">${currDate}</p>
            </div>
            <div class="weather__today">
                <h1 class="current-degrees" data-temp>${isCelsius ? temperature : convertToFahrenheit(temperature)}</h1>
                <span class="degree">°</span>
                <div class="current-data">
                    <img class="current-icon" src="${imagePath}${translations.weather[code]}">
                    <div class="current-details">
                        <p class="description">${forecast[0].weather.description}</p>
                        <p class="feel">${translations[lang].feel} </p><span data-temp> ${isCelsius? averageTemp : convertToFahrenheit(averageTemp)}</span>°<br>
                        <p class="wind">${translations[lang].wind} ${Math.floor(forecast[0].wind_spd)}</p><span> ${translations[lang].ms}</span>
                        <p class="humidity">${translations[lang].humidity} ${forecast[0].rh}%</p>
                    </div>
                </div>
            </div>
            <div class="weather__days">
                ${renderDays(forecast.slice(1), lang)}
            </div>
        </div>
        <div class="mapbox">
            <div class="coordinates">
                <p>${translations[lang].lat} ${changeFormat(latitude)}</p>
                <p>${translations[lang].lng} ${changeFormat(longitude)}</p>
            </div>
        </div>`;
    const map = document.createElement('div');
    map.id = 'map';
    document.querySelector('.wrapper').append(main);
    document.querySelector('.mapbox').prepend(map);
    getMapbox(latitude, longitude);
    setInterval(changeTime, 1000);
}

export default renderInfo;