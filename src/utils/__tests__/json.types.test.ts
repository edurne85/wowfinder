import { JsonValue } from '../json';
import { expectAssignable, expectNotAssignable } from 'tsd';

describe('utils/json.ts', () => {
    describe('JsonValue', () => {
        it('should allow null values', () => {
            const value: JsonValue = null;
            expectAssignable<JsonValue>(value);
            expect(value).toBeNull();
        });

        it('should allow boolean values', () => {
            const value: JsonValue = true;
            expectAssignable<JsonValue>(value);
            expect(value).toBe(true);
        });

        it('should allow number values', () => {
            const value: JsonValue = 42;
            expectAssignable<JsonValue>(value);
            expect(value).toBe(42);
        });

        it('should allow string values', () => {
            const value: JsonValue = 'hello';
            expectAssignable<JsonValue>(value);
            expect(value).toBe('hello');
        });

        it('should allow array values', () => {
            const value: JsonValue = [1, 2, 3];
            expectAssignable<JsonValue>(value);
            expect(value).toEqual([1, 2, 3]);
        });

        it('should allow object values', () => {
            const value: JsonValue = { foo: 'bar' };
            expectAssignable<JsonValue>(value);
            expect(value).toEqual({ foo: 'bar' });
        });

        it('should allow nested values', () => {
            const value: JsonValue = { foo: [1, '2', 3], bar: { baz: true } };
            expectAssignable<JsonValue>(value);
        });

        it('should not allow function values', () => {
            expectNotAssignable<JsonValue>(() => {});
        });

        it('should not allow symbol values', () => {
            expectNotAssignable<JsonValue>(Symbol('foo'));
        });

        it('should not allow bigint values', () => {
            expectNotAssignable<JsonValue>(42n);
        });

        it('should not allow undefined values', () => {
            expectNotAssignable<JsonValue>(undefined);
        });

        it('should not allow Date values', () => {
            expectNotAssignable<JsonValue>(new Date());
        });

        it('should not allow RegExp values', () => {
            expectNotAssignable<JsonValue>(/foo/);
        });

        it('should not allow nested invalid values', () => {
            expectNotAssignable<JsonValue>({ foo: () => {} });
        });
    });
});
