export const getLanguage = () => localStorage.getItem('saved-language');

export const setLanguage = language => {
    localStorage.setItem('saved-language', language);
}