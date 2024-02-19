import { Length, LengthUnit } from '@model/Units';

type Range = number | Length;
function asFeet(r: Range): Length {
    return typeof r === 'number'
        ? new Length({ value: r as number, unit: LengthUnit.foot })
        : (r as Length);
}

export type { Range };
export { asFeet };
