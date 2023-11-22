import { Time, TimeUnit } from '../../Units';
import { ActionTime } from '../ActionTime';
import type { TFunction } from 'i18next';
import { ActionLength } from '../ActionLength';

const t = ((key: string): string => key) as TFunction<'translation'>;

describe('ActionTime', () => {
    describe('stringify', () => {
        it('should stringify special', () => {
            expect(ActionTime.stringify('special', t)).toBe(
                'magic.castingTime.special',
            );
        });
        describe('should stringify Time objects', () => {
            const testTimes = [
                { value: 1, unit: TimeUnit.day },
                { value: 2, unit: TimeUnit.hour },
                { value: 3, unit: TimeUnit.min },
                { value: 4, unit: TimeUnit.sec },
                { value: 5, unit: TimeUnit.turn },
                { value: 6, unit: TimeUnit.year },
            ] as const;
            testTimes.forEach(testTime => {
                it(`should stringify ${testTime.value} ${testTime.unit}`, () => {
                    const time = new Time(testTime);
                    expect(ActionTime.stringify(new Time(time), t)).toBe(
                        new Time(time).toString(),
                    );
                });
            });
        });
        describe('should stringify ActionLength entries', () => {
            Object.values(ActionLength).forEach(actionLength => {
                it(`should stringify ${actionLength}`, () => {
                    expect(ActionTime.stringify(actionLength, t)).toBe(
                        `action.${actionLength}`,
                    );
                });
            });
        });
    });
    describe('tryParse', () => {
        it('should parse special', () => {
            expect(ActionTime.tryParse('special')).toBe('special');
        });
        describe('should parse Time objects', () => {
            const testTimes = [
                { value: 1, unit: TimeUnit.day },
                { value: 2, unit: TimeUnit.hour },
                { value: 3, unit: TimeUnit.min },
                { value: 4, unit: TimeUnit.sec },
                { value: 5, unit: TimeUnit.turn },
                { value: 6, unit: TimeUnit.year },
            ].map(entry => new Time(entry));
            testTimes.forEach(time => {
                const timeString = time.toString();
                it(`should parse ${timeString}`, () => {
                    expect(ActionTime.tryParse(timeString)).toEqual(time);
                });
            });
        });
        describe('should parse ActionLength entries', () => {
            Object.values(ActionLength).forEach(actionLength => {
                it(`should parse ${actionLength}`, () => {
                    expect(ActionTime.tryParse(actionLength)).toBe(
                        actionLength,
                    );
                });
            });
        });
        describe('should return undefined for invalid input', () => {
            const invalidInputs = ['foo', 'bar', 'baz', 'qux'];
            invalidInputs.forEach(invalidInput => {
                it(`should return undefined for ${invalidInput}`, () => {
                    expect(ActionTime.tryParse(invalidInput)).toBeUndefined();
                });
            });
        });
    });
    describe('tryParseExtended', () => {
        it('should return the input if it is an ActionTime', () => {
            expect(ActionTime.tryParseExtended('special')).toBe('special');
            expect(ActionTime.tryParseExtended(ActionLength.standard)).toBe(
                ActionLength.standard,
            );
            const timeObject = new Time({ value: 1, unit: TimeUnit.day });
            expect(ActionTime.tryParseExtended(timeObject)).toBe(timeObject);
        });
        describe('should defer to tryParse if the input is a string', () => {
            const strings = ['special', '1 day', 'standard', 'foo'] as const;
            strings.forEach(string => {
                it(`should defer to tryParse for ${string}`, () => {
                    const tryParseSpy = jest.spyOn(ActionTime, 'tryParse');
                    ActionTime.tryParseExtended(string);
                    expect(tryParseSpy).toHaveBeenCalledWith(string);
                });
            });
        });
    });
    describe('parseExtended', () => {
        describe('should defer to tryParseExtended if the input is a string', () => {
            const values = [
                ...Object.values(ActionLength),
                'special',
                '1 day',
                'standard',
            ] as const;
            values.forEach(value => {
                it(`should defer to tryParseExtended for ${value}`, () => {
                    const tryParseSpy = jest.spyOn(ActionTime, 'tryParse');
                    ActionTime.parseExtended(value);
                    expect(tryParseSpy).toHaveBeenCalledWith(value);
                });
            });
        });
        describe('should throw an error if the input is invalid', () => {
            const invalidInputs = ['foo', 'bar', 'baz', 'qux'];
            invalidInputs.forEach(invalidInput => {
                it(`should throw an error for ${invalidInput}`, () => {
                    expect(() =>
                        ActionTime.parseExtended(invalidInput),
                    ).toThrow(`Invalid ActionTime: ${invalidInput}`);
                });
            });
        });
    });
    describe('forceParse', () => {
        describe('should defer to tryParse if the input is a string', () => {
            const strings = ['special', '1 day', 'standard', 'foo'] as const;
            strings.forEach(string => {
                it(`should defer to tryParse for ${string}`, () => {
                    const tryParseSpy = jest.spyOn(ActionTime, 'tryParse');
                    ActionTime.forceParse(string);
                    expect(tryParseSpy).toHaveBeenCalledWith(string);
                });
            });
        });
        describe('should return the default value if the input is invalid', () => {
            const invalidInputs = ['foo', 'bar', 'baz', 'qux'];
            invalidInputs.forEach(invalidInput => {
                it(`should return the default value for ${invalidInput}`, () => {
                    expect(ActionTime.forceParse(invalidInput)).toBe('special');
                });
            });
        });
    });
});
