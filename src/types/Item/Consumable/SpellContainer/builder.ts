import { ItemBuilder } from '../../base';
import { Counter } from '../../../../utils';
import { RankedSpell } from '../../../Magic/Spell';
import { Consumable } from '../base';
import { SpellContainerBase } from './helpers';
import { ActionTime } from '../../../Action';

type SpellContainerBaseBuilderArgs = ItemBuilder & SpellContainerBase;

abstract class SpellContainerBaseBuilder
    extends Consumable
    implements SpellContainerBase
{
    #spell: RankedSpell;
    #charges: Counter;
    #spellLevel: number;
    #casterLevel: number;
    constructor({
        spell,
        charges,
        spellLevel,
        casterLevel,
        ...rest
    }: SpellContainerBaseBuilderArgs) {
        super(rest);
        this.#spell = spell;
        this.#charges = charges;
        this.#spellLevel = spellLevel;
        this.#casterLevel = casterLevel;
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

export { SpellContainerBaseBuilder };
