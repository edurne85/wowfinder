import { intAverage } from '../helpers';

describe('intAverage', () => {
    it('returns the rounded average of a dice roll', () => {
        expect(intAverage(6, 1, 0)).toBe(4);
        expect(intAverage(4, 2, 0)).toBe(5);
        expect(intAverage(8, 3, 0)).toBe(14);
        expect(intAverage(10, 4, 0)).toBe(22);
        expect(intAverage(12, 5, 0)).toBe(33);
        expect(intAverage(20, 6, 0)).toBe(63);
    });

    it('returns the rounded average of a dice roll with a modifier', () => {
        expect(intAverage(6, 1, 1)).toBe(5);
        expect(intAverage(4, 2, 2)).toBe(7);
        expect(intAverage(8, 3, 3)).toBe(17);
        expect(intAverage(10, 4, 4)).toBe(26);
        expect(intAverage(12, 5, 5)).toBe(38);
        expect(intAverage(20, 6, 6)).toBe(69);
    });

    it('returns the rounded average of a dice roll with a negative modifier', () => {
        expect(intAverage(6, 1, -1)).toBe(3);
        expect(intAverage(4, 2, -2)).toBe(3);
        expect(intAverage(8, 3, -3)).toBe(11);
        expect(intAverage(10, 4, -4)).toBe(18);
        expect(intAverage(12, 5, -5)).toBe(28);
        expect(intAverage(20, 6, -6)).toBe(57);
    });
});
