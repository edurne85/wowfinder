import { Mass } from '../../../Units';
import { ActionTime } from '../../../Action';
import { SpellContainer, SpellContainerBuilder } from './base';

class Wand extends SpellContainer {
    constructor(args: SpellContainerBuilder) {
        args.charges ??= 50;
        super(args);
    }

    get useTime(): ActionTime {
        return this.spell.castingTime;
    }

    get valueMultiplier(): number {
        return 1500;
    }

    get weight(): Mass {
        return Mass.asPounds(1);
    }
}

export { Wand };
