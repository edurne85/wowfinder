import { Mass } from '../../../Units';
import { ActionLength, ActionTime } from '../../../Action';
import { SpellContainer } from './base';

class SpellPotion extends SpellContainer {
    get useTime(): ActionTime {
        return ActionLength.standard;
    }

    get valueMultiplier(): number {
        return 5000;
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    static build(raw: any = {}): SpellPotion {
        return new SpellPotion(SpellContainer.generate('potion', raw));
    }
}

export { SpellPotion };
