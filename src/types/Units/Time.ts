import { validateEnumValue } from '@model/Assets';
import { converter, makeConverter, Scalar } from './base';

enum TimeUnit {
    sec = 's',
    turn = 't',
    min = 'm',
    hour = 'h',
    day = 'd',
    year = 'y',
}

const convertTime: converter<TimeUnit> = makeConverter({
    [TimeUnit.sec]: 1, // Reference unit
    [TimeUnit.turn]: 6, // 1t = 6s; 10t = 1m
    [TimeUnit.min]: 60, // 1m = 60s;
    [TimeUnit.hour]: 60 * 60, // 1h = 60m
    [TimeUnit.day]: 60 * 60 * 24, // 1d = 24h
    [TimeUnit.year]: 60 * 60 * 24 * 365, // 1y = 365d
});

class Time extends Scalar<TimeUnit> {
    constructor({ value, unit }: { value: number; unit: TimeUnit }) {
        super({ value, unit });
    }

    get fullYears(): number {
        return Math.floor(convertTime(this, TimeUnit.year).value);
    }

    static tryParseTime(input: string): Time | undefined {
        const base = Scalar.tryParse<TimeUnit>(
            input,
            unit => TimeUnit[unit as keyof typeof TimeUnit] || unit,
        );
        return base ? new Time(base) : undefined;
    }

    static parseTime(input: string): Time {
        const parsed = Time.tryParseTime(input);
        if (!parsed) {
            throw new Error(`Unable to parse time from input: ${input}`);
        }
        return parsed;
    }

    validate(): boolean {
        return super.validate() && validateEnumValue(this.unit, TimeUnit);
    }
}

export { TimeUnit, convertTime, Time };
