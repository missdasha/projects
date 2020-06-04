import renderEvents from './events'
import { getLanguage, setLanguage } from './language'
import { getTemperature, setTemperature } from './temperature'
import { getUserLocation, getCoordinatesByCity } from './location'
import { getBackground, renderBackground } from './background'
import renderInfo from './render'
import { INPUT_SEARCH, BUTTON_SEARCH, translations } from './constants'
import '../css/style.css';
import '../css/style.scss';
import getWeatherForecast from './forecast'

require.context("../img", false, /\.(png|jpe?g|svg)$/);

const init = async() => {
  const lang = getLanguage();
  if (!getLanguage()) {
    setLanguage('en');
  } 
  if (!getTemperature()) {
    setTemperature('сelsius');
  } 
  document.getElementById(getLanguage()).classList.add('active');
  document.getElementById(getTemperature()).classList.add('active');
  INPUT_SEARCH.placeholder = translations[lang].placeholder;
  BUTTON_SEARCH.innerText = translations[lang].search;

  const userLocation = await getUserLocation();
  localStorage.setItem('city', userLocation.city);
  const coords = await getCoordinatesByCity(userLocation.city);
  const {country} = coords.components;
  const city = coords.components.state;
  const latitude = coords.geometry.lat;
  const longitude = coords.geometry.lng;
  localStorage.setItem('latitude', latitude);
  localStorage.setItem('longitude', longitude);
  const timeZone = coords.annotations.timezone.name;
  localStorage.setItem('timezone', timeZone);

  const img = await getBackground();
  const {regular} = img.urls;
  
  const forecast = await getWeatherForecast(latitude, longitude);

  renderInfo(city, country, forecast, latitude, longitude);
  renderBackground(regular);
  renderEvents();
}

init();



