import { Counter } from '../../../../utils';
import { ActionTime } from '../../../Action';
import { RankedSpell } from '../../../Magic/Spell';
import { Consumable } from '../base';
import Money from '../../Money';
import {
    SpellContainerBase,
    SpellContainerBuilder,
    buildSpellContainer,
} from './builder';

abstract class SpellContainer extends Consumable implements SpellContainerBase {
    #spell: RankedSpell;
    #charges: Counter;
    #spellLevel: number;
    #casterLevel: number;

    constructor(args: SpellContainerBuilder) {
        super(args);
        const { spell, charges, spellLevel, casterLevel } =
            buildSpellContainer(args);
        this.#spell = spell;
        this.#charges = charges;
        this.#spellLevel = spellLevel;
        this.#casterLevel = casterLevel;
    }

    abstract get valueMultiplier(): number;

    get value(): Money {
        const chargeValue = Math.max(0.5, this.#charges.current);
        return Money.fromRaw(
            chargeValue *
                this.valueMultiplier *
                this.spellLevel *
                this.casterLevel,
        );
    }

    get useTime(): ActionTime {
        return this.#spell.castingTime;
    }

    get spell(): RankedSpell {
        return this.#spell;
    }

    get charges(): Counter {
        return { ...this.#charges };
    }

    get spellLevel(): number {
        return this.#spellLevel;
    }

    get casterLevel(): number {
        return this.#casterLevel;
    }

    useCharge(): boolean {
        if (this.#charges.current <= 0) {
            return false;
        }
        this.#charges.current--;
        return true;
    }
}

export { SpellContainer, SpellContainerBuilder };
