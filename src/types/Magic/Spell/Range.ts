import Size from '../../Character/Size';
import { Length, LengthUnit } from '../../Units';

enum StandardRange {
    self = 'self',
    touch = 'touch',
    short = 'short',
    medium = 'medium',
    long = 'long',
}

function rangeInFeet(range: StandardRange, size: Size, efl: number): number {
    switch (range) {
        case StandardRange.self:
            return 0;
        case StandardRange.touch:
            return Math.max(0, 5 * (1 + size));
        case StandardRange.short:
            return 25 + Math.floor(efl / 2) * 5;
        case StandardRange.medium:
            return 100 + 10 * efl;
        case StandardRange.long:
            return 400 + 40 * efl;
    }
}

function computeRange(range: StandardRange, size: Size, efl: number): Length {
    return new Length({
        value: rangeInFeet(range, size, efl),
        unit: LengthUnit.foot,
    });
}

type SpellRange = StandardRange | Length | 'special';

namespace SpellRange {
    export function tryParse(input: string): SpellRange | undefined {
        if (input === 'special') {
            return 'special';
        }
        const standardRange =
            StandardRange[input as keyof typeof StandardRange];
        if (standardRange) {
            return standardRange;
        }
        const length = Length.tryParseLength(input);
        if (length) {
            return length;
        }
        return undefined;
    }

    export function forceParse(input: string, defaultValue: SpellRange = 'special'): SpellRange {
        return tryParse(input) ?? defaultValue;
    }
}

export { StandardRange, computeRange, SpellRange };