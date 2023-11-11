import { assertDefined, assertNonNull } from '../assertions';

describe('utils/assertions.ts', () => {
    describe('assertDefined', () => {
        it('should throw an error if the value is undefined', () => {
            expect(() => assertDefined(undefined)).toThrow(
                'Value is undefined',
            );
        });

        it('should not throw an error if the value is defined', () => {
            expect(() => assertDefined('hello')).not.toThrow();
        });
    });

    describe('assertNonNull', () => {
        it('should throw an error if the value is null', () => {
            expect(() => assertNonNull(null)).toThrow('Value is null');
        });

        it('should not throw an error if the value is defined', () => {
            expect(() => assertNonNull('hello')).not.toThrow();
        });
    });
});
