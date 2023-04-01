import { ActionLength } from '../../Action/ActionLength';
import { Time } from '../../Units';

type CastingTime = ActionLength | Time | 'special';

const CastingTime = {
    tryParse(input: string): CastingTime | undefined {
        if (input === 'special') {
            return 'special';
        }
        if (input in ActionLength) {
            return ActionLength[input as keyof typeof ActionLength];
        }
        const time = Time.tryParseTime(input);
        if (time) {
            return time;
        }
        return undefined;
    },

    tryParseExtended(input: string | CastingTime): CastingTime | undefined {
        return typeof input === 'string' ? CastingTime.tryParse(input) : input;
    },

    forceParse(
        input: string,
        defaultValue: CastingTime = 'special'
    ): CastingTime {
        return CastingTime.tryParse(input) ?? defaultValue;
    },
} as const;

export { CastingTime };
