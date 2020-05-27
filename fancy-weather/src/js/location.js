import { IPINFO_API_TOKEN, OPENCAGEDATA_API_TOKEN } from './constants'
import { getLanguage } from './language';

export const getUserLocation = async () => {
    console.log(IPINFO_API_TOKEN, 'dd369ceb01b0bd');
    return fetch(`https://ipinfo.io/json?token=${IPINFO_API_TOKEN}`)
        .then(response => response.json());
}

export const getCoordinatesByCity = async city => {
    const lang = getLanguage();
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGEDATA_API_TOKEN}&pretty=1&no_annotations=1&language=${lang}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data.results[0]);
}
