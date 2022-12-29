import { enumTryParse } from '../../../utils';
import { ActionLength } from '../../Action/ActionLength';
import { Time } from '../../Units';

type CastingTime = ActionLength | Time | 'special';

namespace CastingTime {

    export function tryParse(input: string): CastingTime | undefined {
        if (input === 'special') {
            return 'special';
        }
        const actionLength = enumTryParse(input, ActionLength.free);
        if (actionLength) {
            return actionLength;
        }
        const time = Time.tryParseTime(input);
        if (time) {
            return time;
        }
        return undefined;
    }

    export function tryParseExtended(input: string | CastingTime): CastingTime | undefined {
        return (typeof input === 'string') ? tryParse(input) : input;
    }

    export function forceParse(input: string, defaultValue: CastingTime = 'special'): CastingTime {
        return tryParse(input) ?? defaultValue;
    }
}

export { CastingTime };