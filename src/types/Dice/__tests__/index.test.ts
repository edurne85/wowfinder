import { Dice, average, max, min, make } from '..';

describe('Dice', () => {
    it('should export Dice', () => {
        expect(Dice).toBeDefined();
    });
    it('should export average', () => {
        expect(average).toBeDefined();
    });
    it('should export max', () => {
        expect(max).toBeDefined();
    });
    it('should export min', () => {
        expect(min).toBeDefined();
    });
    it('should export make', () => {
        expect(make).toBeDefined();
    });
});
