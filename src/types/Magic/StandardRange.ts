import Size from '../Character/Size';
import { Length, LengthUnit } from '../Units';

enum StandardRange {
    touch = 'touch',
    short = 'short',
    medium = 'medium',
    long = 'long',
}

function rangeInFeet(range: StandardRange, size: Size, efl: number): number {
    switch (range) {
        case StandardRange.touch:
            return Math.max(0, 5 * (1 + size));
        case StandardRange.short:
            return 25 + Math.floor(efl / 2) * 5;
        case StandardRange.medium:
            return 100 + 10 * efl;
        case StandardRange.long:
            return 400 + 40 * efl;
        default:
            return 0;
    }
}

function computeRange(range: StandardRange, size: Size, efl: number): Length {
    return new Length({
        value: rangeInFeet(range, size, efl),
        unit: LengthUnit.foot,
    });
}

export { StandardRange, computeRange };
