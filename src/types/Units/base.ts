import { TFunction } from 'i18next';
import { sum, TryParser } from '@utils';
import { Validable } from '@model/Assets';
import { ValidationError } from '@model/Validable';

class Scalar<T> implements Validable {
    private _value: number;
    private _unit: T;
    constructor({ value, unit }: { value: number; unit: T }) {
        this._value = value;
        this._unit = unit;
    }

    get value(): number {
        return this._value;
    }

    get unit(): T {
        return this._unit;
    }

    toString(): string;

    toString(t: TFunction<'translation'>): string;

    toString(t?: TFunction<'translation'>): string {
        const unit = t ? t(`units.${this._unit}`) : this._unit;
        return `${this._value} ${unit}`;
    }

    static tryParse<T>(
        input: string,
        unitParser: TryParser<T>,
    ): Scalar<T> | undefined {
        const match = input.match(/(\d+\.?\d*)\s*(\w+)/);
        if (!match) {
            return undefined;
        }
        const unit = unitParser(match[2]);
        if (!unit) {
            return undefined;
        }
        return new Scalar({
            value: +match[1],
            unit,
        });
    }

    validate(): void {
        if (Number.isNaN(this._value)) {
            throw new ValidationError(this, 'Invalid value');
        }
        if (!this._unit) {
            throw new ValidationError(this, 'Invalid unit');
        }
    }
}

type converter<T> = (magnitude: Scalar<T>, to: T) => Scalar<T>;

function makeConverter<T extends string>(conversions: {
    [keys in T]: number;
}): converter<T> {
    return (magnitude: Scalar<T>, to: T): Scalar<T> => {
        return new Scalar({
            value:
                (magnitude.value * conversions[magnitude.unit]) /
                conversions[to],
            unit: to,
        });
    };
}

function add<T extends string>(
    unit: T,
    convert: converter<T>,
    ...magnitudes: Scalar<T>[]
): Scalar<T> {
    return new Scalar({
        value: sum(...magnitudes.map(m => convert(m, unit).value)),
        unit,
    });
}

export { converter, makeConverter, Scalar, add };
