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
    });
});
