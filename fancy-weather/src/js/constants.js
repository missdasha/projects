export const ENTER_KEYCODE = 13;
export const INPUT_SEARCH = document.querySelector('.search-input');
export const BUTTON_SEARCH = document.querySelector('.search-button');
export const BUTTON_LANGS = document.querySelector('.langs');
export const BUTTON_TEMPERATURE = document.querySelector('.temperature');
export const BUTTON_REFRESH = document.querySelector('.refresh');
export const IPINFO_API_TOKEN = 'dd369ceb01b0bd';
export const OPENCAGEDATA_API_TOKEN = '6232b50466a04b0db0ba1d373c025c89';
// export const UNSPLASH_API_TOKEN = 'TdwoihXSFNrstI-z8Ul89VK56omx4O1_bO9EWEkUMns';
export const UNSPLASH_API_TOKEN = 'alpfdxmMt9lZmTGArar3W6E9QPRPgVwsbsaOtd50PpM';
export const WHEATHERBIT_API_TOKEN = 'fd424af990004c9cae11910b2512681f';
export const imagePath = 'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/';
export const options = {/* timeZone: localStorage.getItem('timezone'), */
weekday: 'short',  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'};
export const optionsWithYear = {/* timeZone: localStorage.getItem('timezone'), */ year: 'numeric',
weekday: 'short',  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'};
export const REGEXP = new RegExp('[а-яa-zі]+:', 'i');

export const translations = {
    en: {
        "placeholder": "Enter city",
        "search": "Search",
        "feel": "Feels like:",
        "wind": "Wind:",
        "ms": " m/s",
        "humidity": "Humidity:",
        "day": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "month": [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", 
          "October", "November", "December"],
        "lat": "Latitude",
        "lng": "Longitude",
        "error": "There is no such place"
    },
    ru: {
        "placeholder": "Введите город",
        "search": "Поиск",
        "feel": "Ощущается как:",
        "wind": "Ветер:",
        "ms": " м/с",
        "humidity": "Влажность:",
        "day": ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        "shortDay": ["Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        "month": ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        "lat": "Широта",
        "lng": "Долгота",
        "error": "Нет такого места"
    },
    be: {
        "placeholder": "Увядзіце горад",
        "search": "Пошук",
        "feel": "Адчуваецца як:",
        "wind": "Вецер:",
        "ms": " м/с",
        "humidity": "Вільготнасць:",
        "day": ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятнiца", "Субота"],
        "shortDay": ["Нядз", "Пн", "Аўт", "Сер", "Чацв", "Пт", "Сб"],
        "month": [
            "Студзеня",
            "Лютага",
            "Сакавіка",
            "Красавіка",
            "Мая",
            "Чэрвеня",
            "Ліпеня",
            "Жнівеня",
            "Верасня",
            "Кастрычніка",
            "Лістапада",
            "Снежня"
        ],
        "lat": "Шырата",
        "lng": "Даўгата",
        "error": "Няма такога месца"
    },
    weather: {
        "200": "thunder.svg",
        "201": "thunder.svg",
        "202": "thunder.svg",
        "231": "thunder.svg",
        "232": "thunder.svg",
        "233": "thunder.svg",
        "300": "rainy-4.svg",
        "301": "rainy-4.svg",
        "302": "rainy-6.svg",
        "500": "rainy-5.svg",
        "501": "rainy-5.svg",
        "502": "rainy-6.svg",
        "511": "rainy-7.svg",
        "520": "rainy-5.svg",
        "521": "rainy-5.svg",
        "522": "rainy-6.svg",
        "600": "snowy-4.svg",
        "601": "snowy-5.svg",
        "602": "snowy-6.svg",
        "610": "rainy-7.svg",
        "611": "rainy-7.svg",
        "612": "snowy-6.svg",
        "621": "snowy-6.svg",
        "622": "snowy-6.svg",
        "623": "rainy-7.svg",
        "700": "cloudy.svg",
        "711": "cloudy.svg",
        "721": "cloudy.svg",
        "731": "cloudy.svg",
        "741": "cloudy.svg",
        "751": "cloudy.svg",
        "800": "day.svg",
        "801": "cloudy-day-1.svg",
        "802": "cloudy-day-2.svg",
        "803": "cloudy-day-2.svg",
        "804": "cloudy.svg",
        "900": "rainy-7.svg"
    }
}