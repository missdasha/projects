import { IPINFO_API_TOKEN, OPENCAGEDATA_API_TOKEN, INPUT_SEARCH, translations } from './constants'
import { getLanguage } from './language';

export const getUserLocation = async () => {
    return fetch(`https://ipinfo.io/json?token=${IPINFO_API_TOKEN}`)
        .then(response => response.json());
}

export const getCoordinatesByCity = async (city) => {
    const lang = getLanguage();
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGEDATA_API_TOKEN}&pretty=1&language=${lang}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if(!data.results.length || data.status.code !== 200)
                throw new Error(data.status.message);
            return data.results[0];
        })
        .catch(() => {
            INPUT_SEARCH.value = '';
            INPUT_SEARCH.placeholder = translations[lang].error;
        });
}
