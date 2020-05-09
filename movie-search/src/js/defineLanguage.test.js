import {isRuLang} from './defineLanguage'

describe('isRuLang', () => {
    const ruWord = 'дом';
    const enWord = 'home';
    it('should return the result which is defined', () => {
        expect(isRuLang(ruWord)).toBeDefined();
    });
    it('should return true if argument is in russian', () => {
        expect(isRuLang(ruWord)).toBeTruthy();
    });
    it('should return false if argument is not in russian', () => {
        expect(isRuLang(enWord)).toBeFalsy();
    });
    
});