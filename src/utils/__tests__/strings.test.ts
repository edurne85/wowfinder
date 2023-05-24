import { capitalizeFirstLetter, parseIfNeeded } from '../strings';
describe('utils/strings.ts', () => {
    describe('capitalizeFirstLetter', () => {
        it('should capitalize the first letter of a string', () => {
            expect(capitalizeFirstLetter('hello')).toBe('Hello');
        });
        it('should handle empty strings', () => {
            expect(capitalizeFirstLetter('')).toBe('');
        });
        it('should handle single-letter strings', () => {
            expect(capitalizeFirstLetter('a')).toBe('A');
        });
        it('should handle non-letter strings', () => {
            expect(capitalizeFirstLetter('1')).toBe('1');
            expect(capitalizeFirstLetter('!')).toBe('!');
        });
    });
    describe('parseIfNeeded', () => {
        it('should parse a string', () => {
            expect(parseIfNeeded('123', parseInt)).toBe(123);
        });
        it('should return a number as is', () => {
            expect(parseIfNeeded(123, parseInt)).toBe(123);
        });
        it('should return a string as is', () => {
            expect(parseIfNeeded('123', input => input)).toBe('123');
        });
    });
});
