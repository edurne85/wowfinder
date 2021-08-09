import { sum } from '../../utils';

type scalar<T extends string> = { value: number, unit: T};

type converter<T extends string> = (magnitude: scalar<T>, to: T) => scalar<T>;

function makeConverter<T extends string>(conversions: {[keys in T]: number} ): converter<T> {
    return (magnitude: scalar<T>, to: T): scalar<T> => {
        return {
            value: magnitude.value * conversions[magnitude.unit] / conversions[to],
            unit: to,
        };
    };
}

function add<T extends string>(unit: T, convert: converter<T>, ...magnitudes: scalar<T>[]): scalar<T> {
    return {
        value: sum(...magnitudes.map(m => convert(m, unit).value)),
        unit,
    };
    
}

export {
    converter,
    makeConverter,
    scalar,
    add,
};