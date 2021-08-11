import { sum } from '../../utils';

class Scalar<T> {
    private _value: number;
    private _unit: T;
    constructor({value, unit}: {value: number, unit: T}) {
        this._value = value;
        this._unit = unit;
    }

    get value(): number { return this._value; }
    
    get unit(): T { return this._unit; }

    toString(): string {
        return `${this._value} ${this._unit}`;
    }
}

type converter<T> = (magnitude: Scalar<T>, to: T) => Scalar<T>;

function makeConverter<T extends string>(conversions: {[keys in T]: number} ): converter<T> {
    return (magnitude: Scalar<T>, to: T): Scalar<T> => {
        return new Scalar({
            value: magnitude.value * conversions[magnitude.unit] / conversions[to],
            unit: to,
        });
    };
}

function add<T extends string>(unit: T, convert: converter<T>, ...magnitudes: Scalar<T>[]): Scalar<T> {
    return new Scalar({
        value: sum(...magnitudes.map(m => convert(m, unit).value)),
        unit,
    });
}

export {
    converter,
    makeConverter,
    Scalar,
    add,
};