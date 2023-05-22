import { sum, fThousands, toRoman } from '../numbers';

describe('utils/numbers.ts', () => {
    describe('sum', () => {
        it('should sum two numbers', () => {
            expect(sum(1, 2)).toBe(3);
        });
        it('should sum three numbers', () => {
            expect(sum(1, 2, 3)).toBe(6);
        });
        it('should sum an empty set of numbers', () => {
            expect(sum()).toBe(0);
        });
    });
    describe('fThousands', () => {
        it('should format a number with thousands', () => {
            expect(fThousands(123456789)).toBe('123 456 789');
        });
        it('should format a number with thousands and decimals', () => {
            // Can't use .toBe because of floating point precision
            expect(fThousands(123456789.123)).toMatch(/^123 456 789\.12[23]/);
            // one eight can be represented exactly in binary
            expect(fThousands(123456789.125)).toBe('123 456 789.125');
        });
        it('should format a negative number with thousands', () => {
            expect(fThousands(-123456789)).toBe('-123 456 789');
        });
        it('should format a number with a custom separator', () => {
            expect(fThousands(123456789, '.')).toBe('123.456.789');
        });
        it('should render zero as is', () => {
            expect(fThousands(0)).toBe('0');
        });
    });
    describe('toRoman', () => {
        it('should convert a number to its roman numeral form', () => {
            expect(toRoman(2345)).toBe('MMCCCXLV');
        });
        it('should handle negative numbers', () => {
            expect(toRoman(-761)).toBe('-DCCLXI');
        });
        it('should handle zero', () => {
            expect(toRoman(0)).toBe('0');
            expect(toRoman(-0.9)).toBe('0');
        });
        it('should ignore decimals', () => {
            expect(toRoman(444.456)).toBe('CDXLIV');
        });
        it('should handle large-ish numbers', () => {
            expect(toRoman(3999)).toBe('MMMCMXCIX');
        });
    });
});
