import { Mass } from '../../../Units';
import { ActionLength, ActionTime } from '../../../Action';
import { SpellContainer } from './base';

class Potion extends SpellContainer {
    get useTime(): ActionTime {
        return ActionLength.standard;
    }

    get valueMultiplier(): number {
        return 5000;
    }

    get weight(): Mass {
        return Mass.asPounds(1);
    }
}

export { Potion };
