import { ActionLength, ActionTime } from '../../../Action';
import { ItemBuilder } from '../../base';
import { Consumable } from '../base';
import Money from '../../Money';

interface CraftableConsumableBuilder extends ItemBuilder {
    dc?: number;
}

abstract class CraftableConsumable extends Consumable {
    #dc: number;
    constructor({ dc = 1, ...rest }: CraftableConsumableBuilder) {
        super(rest);
        this.#dc = dc;
    }

    protected abstract get skillValueMultiplier(): number;

    get useTime(): ActionTime {
        return ActionLength.standard;
    }

    get value(): Money {
        return Money.fromRaw(this.#dc * this.#dc * this.skillValueMultiplier);
    }

    get dc(): number {
        return this.#dc;
    }
}

export { CraftableConsumable, CraftableConsumableBuilder };
