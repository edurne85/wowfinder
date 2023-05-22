import { assertDefined } from '../assertions';

describe('assertDefined', () => {
    it('should throw an error if the value is undefined', () => {
        expect(() => assertDefined(undefined)).toThrowError(
            'Value is undefined',
        );
    });

    it('should not throw an error if the value is defined', () => {
        expect(() => assertDefined('hello')).not.toThrow();
    });
});
