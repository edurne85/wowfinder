import { converter, makeConverter, scalar } from './base';

enum LengthUnit {
    yard = 'yard',
    foot = 'foot',
    square = 'square',
    meter = 'meter',
    inch = 'inch',
    cm = 'cm',
}

const metersInYard = 0.9144; // By international definition

const convertLength: converter<LengthUnit> = makeConverter({
    [LengthUnit.yard]: metersInYard,
    [LengthUnit.foot]: metersInYard / 3, // 1 yard = 3 foot
    [LengthUnit.square]: (metersInYard / 3) * 5, // 1 square = 5 foot
    [LengthUnit.meter]: 1, // Reference unit
    [LengthUnit.inch]: metersInYard / (3 * 12), // 12 inch = 1 foot
    [LengthUnit.cm]: 1 / 100, // 100 cm = 1 m
});

type Length = scalar<LengthUnit>;

export {
    LengthUnit,
    convertLength,
    Length,
};
