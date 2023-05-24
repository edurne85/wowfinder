import { jClone } from '../json';

describe('utils/json.ts', () => {
    describe('jClone', () => {
        it('should clone null values', () => {
            const value = null;
            expect(value).toBe(jClone(value));
        });
        it('should clone primitive values', () => {
            const values = [true, 42, 'hello'];
            for (const value of values) {
                expect(value).toBe(jClone(value));
            }
        });
        it('should clone array values', () => {
            const value = [1, 2, 3];
            expect(value).toEqual(jClone(value));
            expect(value).not.toBe(jClone(value));
        });
        it('should clone object values', () => {
            const value = { foo: 'bar' };
            expect(value).toEqual(jClone(value));
            expect(value).not.toBe(jClone(value));
        });
        it('should clone nested values', () => {
            const value = { foo: [1, '2', 3], bar: { baz: true } };
            expect(value).toEqual(jClone(value));
            expect(value).not.toBe(jClone(value));
        });
    });
});
