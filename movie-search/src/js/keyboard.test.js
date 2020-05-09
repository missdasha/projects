import {isSpecial} from './keyboard'

describe('isSpecial', () => {
    const specialCode = 'Backspace';
    const commonCode = 'Semicolon';
    it('should return the result which is defined', () => {
        expect(isSpecial(specialCode)).toBeDefined();
    });
    it('should return true if argument is in array of special codes', () => {
        expect(isSpecial(specialCode)).toBeTruthy();
    });
    it('should return false if argument is not in array of special codes', () => {
        expect(isSpecial(commonCode)).toBeFalsy();
    });
});

