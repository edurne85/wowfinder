import { ActionLength } from './ActionLength';
import { Time } from '../Units';
import { Stringifier } from '@utils/strings';

type ActionTime = ActionLength | Time | 'special';

const stringify: Stringifier<ActionTime> = (value, t) => {
    if (value === 'special') {
        return t('magic.castingTime.special');
    }
    if (value instanceof Time) {
        return value.toString();
    }
    return t(`action.${value}`);
};

const ActionTime = {
    tryParse(input: string): ActionTime | undefined {
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

    tryParseExtended(input: string | ActionTime): ActionTime | undefined {
        return typeof input === 'string' ? ActionTime.tryParse(input) : input;
    },

    parseExtended(input: string | ActionTime): ActionTime {
        const result = ActionTime.tryParseExtended(input);
        if (result) {
            return result;
        }
        throw new Error(`Invalid ActionTime: ${input}`);
    },

    forceParse(
        input: string,
        defaultValue: ActionTime = 'special',
    ): ActionTime {
        return ActionTime.tryParse(input) ?? defaultValue;
    },
    stringify,
} as const;

export { ActionTime };
