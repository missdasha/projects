import { translations, options, optionsWithYear } from './constants'
import { getLanguage } from './language'

export const getCurrentDate = opts => new Date().toLocaleString('en-GB', opts); 

export const translateDate = (lang) => {
    optionsWithYear.timeZone = localStorage.getItem('timezone');
    const currDate = new Date(getCurrentDate(optionsWithYear));
    const weekDay = currDate.getDay();
    const month = currDate.getMonth() + 1;
    const day = currDate.getDate();
    const hours = currDate.getHours() < 10 ? `0${currDate.getHours()}` : currDate.getHours();
    const mins = currDate.getMinutes() < 10 ? `0${currDate.getMinutes()}` : currDate.getMinutes();
    const seconds = currDate.getSeconds() < 10 ? `0${currDate.getSeconds()}` : currDate.getSeconds();
    return `${translations[lang].shortDay[weekDay]} ${day} ${translations[lang].month[month - 1]} ${hours}:${mins}:${seconds}`;
}

export const getSeason = () => {
    options.timeZone = localStorage.getItem('timezone');
    console.log('options.timeZone: ', options.timeZone);
    const isNorthern = localStorage.getItem('latitude') > 0;
    const month = new Date(getCurrentDate(options)).getMonth() + 1;
    console.log(month);
    if (month <= 2 || month === 12) {
        return isNorthern ? 'winter' : 'summer';
    }
    if (month >= 3 && month <= 5) {
        return isNorthern ? 'spring' : 'autumn';
    }
    if (month >= 6 && month <= 8) {
        return isNorthern ? 'summer' : 'winter';
    }
    return isNorthern ? 'autumn' : 'spring';
}


export const defineDayTime = hours => {
    if (hours < 5) {
        return 'night';
    }
    if (hours < 12) {
        return 'morning'; // replace with constant
    }
    if (hours < 18) {
        return 'afternoon';
    }
    return 'evening';
}

export const getDayTime = () => {
    const hours = new Date(getCurrentDate(options)).getHours();
    return defineDayTime(hours);
}

export const changeTime = () => {
    options.timeZone = localStorage.getItem('timezone');
    const lang = getLanguage();
    document.querySelector('.date').innerHTML = lang !== 'en' ? translateDate(lang) : getCurrentDate(options).replace(/,/g, '');
}