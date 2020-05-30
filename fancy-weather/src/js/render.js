import { translations, imagePath } from './constants'
import { getLanguage } from './language';
import { getTemperature } from './temperature'
import { convertToFahrenheit } from './convertion'

const countAverage = (a, b) => Math.floor((a + b) / 2);

const renderDays = (forecast, lang) => {
    let html = ``;
    let temperature;
    let weekDay;
    forecast.forEach((el, ind) => {
        temperature = Math.floor(el.temp);
        weekDay = (new Date(el.datetime)).getDay();
        console.log(weekDay);
        html += `
        <div class="day">
         <p class="day-week">${translations[lang].day[weekDay]}</p>
         <div class="day-wrapper">
             <h2 class="day-degrees">${getTemperature() === 'сelsius' ? temperature : convertToFahrenheit(temperature)}°</h2>
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
    const temperature = Math.floor(forecast[0].temp);
    const averageTemp = countAverage(forecast[0].app_max_temp, forecast[0].app_min_temp);
    const isCelsius = getTemperature() === "сelsius";
    console.log('isCelsius: ', isCelsius);

    main.innerHTML = `<div class="weather">
                        <div class="weather__info">
                            <h3 class="location">${city}, ${country}</h3>
                            <p class="date">Mon 28 October 17:23</p>
                        </div>
                        <div class="weather__today">
                            <h1 class="current-degrees">${isCelsius ? temperature : convertToFahrenheit(temperature)}°</h1>
                            <div class="current-data">
                                <img class="current-icon" src="${imagePath}${translations.weather[code]}">
                                <div class="current-details">
                                    <p>${forecast[0].weather.description}</p>
                                    <p>${translations[lang].feel} ${isCelsius? averageTemp : convertToFahrenheit(averageTemp)}°</p>
                                    <p>${translations[lang].wind} ${Math.floor(forecast[0].wind_spd)} m/s</p>
                                    <p>${translations[lang].humidity} ${forecast[0].rh}%</p>
                                </div>
                            </div>
                        </div>
                        <div class="weather__days">
                           ${renderDays(forecast.slice(1), lang)}
                        </div>
                    </div>
                    <div class="map"></div>`;
    document.querySelector('.wrapper').append(main);
}

export default renderInfo;