const { convertToFahrenheit, convertToCelsius } = require('../js/convertion');

describe('convertToFahrenheit', () => {
    const celsiusDegrees = 20;
    let fahrenheitDegrees;
    beforeEach(() => {
        fahrenheitDegrees = convertToFahrenheit(celsiusDegrees);
    })
    it('should return the result which is defined', () => {
        expect(fahrenheitDegrees).toBeDefined();
    });
    it('should convert celsius to fahrenheit', () => {
        expect(fahrenheitDegrees).toEqual(68);
    });
});

describe('convertToCelsius', () => {
    const fahrenheitDegrees = 45;
    let celsiusDegrees;
    beforeEach(() => {
        celsiusDegrees = convertToCelsius(fahrenheitDegrees);
    })
    it('should return the result which is defined', () => {
        expect(celsiusDegrees).toBeDefined();
    });
    it('should convert celsius to fahrenheit', () => {
        expect(celsiusDegrees).toEqual(7);
    });
});