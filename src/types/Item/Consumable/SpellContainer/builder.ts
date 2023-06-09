import { ItemBuilder } from '../../base';
import { Counter } from '../../../../utils';
import { RankedSpell, Spell } from '../../../Magic/Spell';

interface SpellContainerBuilder extends ItemBuilder {
    spell: string;
    spellRank: number;
    spellLevel: number;
    casterLevel: number;
    charges?: number;
}

interface SpellContainerBase {
    readonly spell: RankedSpell;
    readonly charges: Counter;
    readonly spellLevel: number;
    readonly casterLevel: number;
}

function buildSpellContainer({
    spell,
    spellRank,
    spellLevel,
    casterLevel,
    charges = 1,
    ...rest
}: SpellContainerBuilder): SpellContainerBase {
    return {
        ...rest,
        spell: Spell.byKey(spell, spellRank),
        spellLevel,
        casterLevel,
        charges: {
            current: charges,
            max: charges,
            min: 0,
            initial: charges,
        },
    };
}

export { SpellContainerBuilder, SpellContainerBase, buildSpellContainer };
