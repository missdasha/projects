export const getTemperature = () => localStorage.getItem('saved-temperature');

export const setTemperature = (temperature) => {
    localStorage.setItem('saved-temperature', temperature);
}