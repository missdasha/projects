const { getSeason, defineDayTime } = require('../js/date');

describe('getSeason', () => {
    let season;
    localStorage.setItem('timezone', 'Europe/Minsk');
    localStorage.setItem('latitude', 53);
    const expected = 'summer';
    beforeEach(() => {
        season = getSeason();
    })
    it('should return the result which is defined', () => {
        expect(season).toBeDefined();
    });
    it('should return correct season', () => {
        expect(season).toEqual(expected);
    });
});

describe('defineDayTime', () => {
    const expected = 'evening';
    const hours = 18;
    let dayTime;
    beforeEach(() => {
        dayTime = defineDayTime(hours);
    })
    it('should return the result which is defined', () => {
        expect(dayTime).toBeDefined();
    });
    it('should return correct day time', () => {
        expect(dayTime).toEqual(expected);
    });
});