import { Dice, RollableValue } from '../../../Dice';
import { ActionLength, ActionTime } from '../../../Action';
import { Consumable } from '../base';
import { Mass } from '../../../Units';
import { ItemBuilder as CraftableConsumableBuilder } from '../../base';
import { CraftableConsumable } from './base';

interface PotionRestoreValues {
    health: number;
    spells: number;
    sanity: number;
}

interface PotionBuilder extends CraftableConsumableBuilder {
    health?: RollableValue;
    spells?: RollableValue;
    sanity?: RollableValue;
}

class Potion extends CraftableConsumable {
    #health: Dice;
    #spells: Dice;
    #sanity: Dice;
    constructor({ health, spells, sanity, ...rest }: PotionBuilder) {
        super(rest);
        this.#health = Dice.make(health || 0);
        this.#spells = Dice.make(spells || 0);
        this.#sanity = Dice.make(sanity || 0);
    }

    get useTime(): ActionTime {
        return ActionLength.move;
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    protected get skillValueMultiplier(): number {
        return 20;
    }

    get health(): Dice {
        return this.#health;
    }

    get spells(): Dice {
        return this.#spells;
    }

    get sanity(): Dice {
        return this.#sanity;
    }

    roll(): PotionRestoreValues {
        return {
            health: this.#health.roll(),
            spells: this.#spells.roll(),
            sanity: this.#sanity.roll(),
        };
    }

    static build(raw: any = {}): Potion {
        return new Potion({
            ...Consumable.generate('potion', raw),
            health: raw.health,
            spells: raw.spells,
            sanity: raw.sanity,
        });
    }
}

export { Potion };
