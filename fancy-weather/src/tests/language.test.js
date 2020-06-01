const { getLanguage, setLanguage } = require('../js/language');


describe('getLanguage', () => {
    const language = 'ru';
    localStorage.setItem('saved-language', language);
    it('should return the result which is defined', () => {
        expect(getLanguage()).toBeDefined();
    });
    it('should return saved language', () => {
        expect(getLanguage()).toEqual(language);
    });
});

describe('setLanguage', () => {
    const language = 'ru';
    setLanguage(language);
    it('should return nothing', () => {
        expect(setLanguage(language)).toBeUndefined();
    });
    it('should set the language', () => {
        expect(localStorage.getItem('saved-language')).toBeDefined();
    });
    it('should set the language', () => {
        expect(localStorage.getItem('saved-language')).toEqual(language);
    });
});