const { countAverage, changeFormat } = require('../js/utils');

describe('countAverage', () => {
    const a = 4;
    const b = 5;
    let average;
    beforeEach(() => {
        average = countAverage(a, b);
    })
    it('should return the result which is defined', () => {
        expect(average).toBeDefined();
    });
    it('should return average', () => {
        expect(average).toEqual(5);
    });
});

describe('changeFormat', () => {
    const decimalFormat = 53.902334;
    const expected = "53° 54'";
    let format;
    beforeEach(() => {
        format = changeFormat(decimalFormat);
    })
    it('should return the result which is defined', () => {
        expect(format).toBeDefined();
    });
    it('should return average', () => {
        expect(format).toEqual(expected);
    });
}); 
