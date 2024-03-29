import { validateEnumValue } from '@model/Assets';
import { converter, makeConverter, Scalar } from './base';

enum MassUnit {
    lb = 'lb',
    g = 'g',
    kg = 'kg',
    oz = 'oz',
}

const kgInLb = 0.45359237; // By international definition

const convertMass: converter<MassUnit> = makeConverter({
    [MassUnit.lb]: kgInLb,
    [MassUnit.g]: 1 / 1000, // 1000 g = 1 kg
    [MassUnit.kg]: 1, // Reference unit
    [MassUnit.oz]: kgInLb / 16, // 16 oz = 1 lb
});

class Mass extends Scalar<MassUnit> {
    get pounds(): number {
        return convertMass(this, MassUnit.lb).value;
    }

    static asPounds(w: Weight): Mass {
        return w instanceof Mass
            ? w
            : new Mass({ value: w as number, unit: MassUnit.lb });
    }

    validate(): void {
        super.validate();
        validateEnumValue(this.unit, MassUnit);
    }
}

type Weight = number | Mass;

export type { Weight };
export { MassUnit, convertMass, Mass };
