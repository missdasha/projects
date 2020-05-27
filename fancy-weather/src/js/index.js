import renderEvents from './events'
import {getLanguage, setLanguage} from './language'
import {getTemperature, setTemperature} from './temperature'
import {getUserLocation, getCoordinatesByCity} from './location'
import {getBackground} from './background'
import '../css/style.css';
import '../css/style.scss';

require.context("../img", false, /\.(png|jpe?g|svg)$/);

function success(pos) {
  const crd = pos.coords;

  console.log('Ваше текущее метоположение:');
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
};

const init = async() => {
  console.log(getLanguage());
  if (!getLanguage()) {
    setLanguage('en'); // replace with constant
  } 
  if (!getTemperature()) {
    setTemperature('сelsius'); // replace with constant
  } 
  document.getElementById(getLanguage()).classList.add('active');
  document.getElementById(getTemperature()).classList.add('active');
  renderEvents();
  navigator.geolocation.getCurrentPosition(success);
  const userLocation = await getUserLocation();
  console.log(userLocation);
  const coords = await getCoordinatesByCity(userLocation.city);
  console.log(coords);
  const {country} = coords.components;
  console.log('country: ', country);
  const city = coords.components.state;
  const stringLocation = coords.formatted;
  console.log('stringLocation: ', stringLocation, city, country);
  const latitude = coords.geometry.lat;
  const longitude = coords.geometry.lng;
  console.log(latitude, longitude);
  const img = await getBackground(city);
  console.log('await getBackground(city): ', img);
}

init();