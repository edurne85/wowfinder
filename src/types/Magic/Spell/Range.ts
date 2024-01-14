import { validateEnumValue } from '@model/Assets';
import Size from '../../Character/Size';
import { Length, LengthUnit } from '../../Units';
import { ValidatorContainer } from '@model/Validable';

enum StandardRange {
    self = 'self',
    touch = 'touch',
    close = 'close',
    medium = 'medium',
    long = 'long',
}

function rangeInFeet(range: StandardRange, size: Size, efl: number): number {
    switch (range) {
        case StandardRange.self:
            return 0;
        case StandardRange.touch:
            return Math.max(0, 5 * (1 + size));
        case StandardRange.close:
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

const SpellRange: ValidatorContainer<SpellRange> = {
    tryParse(input: string): SpellRange | undefined {
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
    },

    forceParse(
        input: string,
        defaultValue: SpellRange = 'special',
    ): SpellRange {
        return SpellRange.tryParse(input) ?? defaultValue;
    },

    validate(value: unknown): asserts value is SpellRange {
        if (value === 'special') {
            return;
        }
        if (value instanceof Length) {
            value.validate();
            return;
        }
        validateEnumValue(value, StandardRange);
    },
} as const;

export { StandardRange, computeRange, SpellRange };
