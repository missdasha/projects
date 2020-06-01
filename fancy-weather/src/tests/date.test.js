const { getSeason } = require('../js/date');

describe('getSeason', () => {
    // const options = { weekday: 'short',  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'};
    let season;
    localStorage.setItem('timezone', 'Europe/Minsk');
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