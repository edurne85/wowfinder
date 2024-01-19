import { validateEnumValue } from '@model/Assets';
import { converter, makeConverter, Scalar } from './base';

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

class Length extends Scalar<LengthUnit> {
    constructor({ value, unit }: { value: number; unit: LengthUnit }) {
        super({ value, unit });
    }

    get feetInches(): string {
        if (this.value === 0) {
            return '0';
        }
        const inFeet = convertLength(this, LengthUnit.foot);
        const feet = Math.floor(+inFeet.value.toFixed(2));
        const inchesOnly = convertLength(
            new Length({
                value: inFeet.value - feet,
                unit: LengthUnit.foot,
            }),
            LengthUnit.inch,
        );
        const inches = Math.round(inchesOnly.value);
        const strFeet = feet !== 0 ? `${feet}'` : '';
        const strInches = inches !== 0 ? ` ${inches}"` : '';
        return `${strFeet}${strInches}`;
    }

    get inches(): number {
        return convertLength(this, LengthUnit.inch).value;
    }

    get fullDisplay(): string {
        const meters = Math.round(convertLength(this, LengthUnit.meter).value);
        const squares = Math.round(
            convertLength(this, LengthUnit.square).value,
        );
        return `${this.feetInches} (${meters}m) (${squares}□)`;
    }

    static tryParseLength(input: string): Length | undefined {
        const base = Scalar.tryParse(
            input,
            (value: string) => LengthUnit[value as keyof typeof LengthUnit],
        );
        return base ? new Length(base) : undefined;
    }

    validate(): void {
        super.validate();
        validateEnumValue(this.unit, LengthUnit);
    }
}

export { LengthUnit, convertLength, Length };
