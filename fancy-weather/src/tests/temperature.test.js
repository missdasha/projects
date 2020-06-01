const { getTemperature, setTemperature } = require('../js/temperature');


describe('getTemperature', () => {
    const units = 'celsius';
    localStorage.setItem('saved-temperature', units);
    it('should return the result which is defined', () => {
        expect(getTemperature()).toBeDefined();
    });
    it('should return saved temperature', () => {
        expect(getTemperature()).toEqual(units);
    });
});

describe('setTemperature', () => {
    const units = 'celsius';
    setTemperature(units);
    it('should return nothing', () => {
        expect(setTemperature(units)).toBeUndefined();
    });
    it('should set the temperature', () => {
        expect(localStorage.getItem('saved-temperature')).toBeDefined();
    });
    it('should set the temperature', () => {
        expect(localStorage.getItem('saved-temperature')).toEqual(units);
    });
});