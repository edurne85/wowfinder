import { ActionLength } from './ActionLength';
import { Time } from '../Units';

type ActionTime = ActionLength | Time | 'special';

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
} as const;

export { ActionTime };
