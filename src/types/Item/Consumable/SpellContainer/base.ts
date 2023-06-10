import { Consumable } from '../base';
import Money from '../../Money';
import {
    SpellContainerBuilder,
    SpellContainerRawBuilder,
    buildSpellContainer,
} from './helpers';
import { SpellContainerBaseBuilder } from './builder';
import { assertDefined } from '../../../../utils';
import { Spell } from '../../../Magic';

abstract class SpellContainer extends SpellContainerBaseBuilder {
    constructor(args: SpellContainerBuilder) {
        super(buildSpellContainer(args));
    }

    abstract get valueMultiplier(): number;

    get value(): Money {
        const chargeValue = Math.max(0.5, this.charges.current);
        return Money.fromRaw(
            chargeValue *
                this.valueMultiplier *
                this.spellLevel *
                this.casterLevel,
        );
    }

    protected static generate(
        infix: string,
        raw: SpellContainerRawBuilder,
    ): SpellContainerBuilder {
        assertDefined(raw.spell, 'SpellContainer requires a spell');
        const spell = Spell.load()[raw.spell];
        assertDefined(raw.spell, 'SpellContainer requires a valid spell');
        const spellRank = raw.spellRank || 1;
        const spellLevel = raw.spellLevel || 0;
        const casterLevel = raw.casterLevel || 0;
        const affix = `spell.${infix}(${spell.key}[${spellRank}])@(${spellLevel})(${casterLevel})`;
        return {
            ...Consumable.generate(affix, raw),
            spell: raw.spell,
            spellRank,
            spellLevel,
            casterLevel,
        };
    }
}

export { SpellContainer, SpellContainerBuilder };
