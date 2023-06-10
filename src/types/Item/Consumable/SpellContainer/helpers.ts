import { Item, ItemBuilder } from '../../base';
import { Counter, Labeled } from '../../../../utils';
import { RankedSpell, Spell } from '../../../Magic/Spell';

interface SpellContainerBuilder extends ItemBuilder {
    spell: string;
    spellRank: number;
    spellLevel: number;
    casterLevel: number;
    charges?: number;
}

interface SpellContainerRawBuilder extends Partial<SpellContainerBuilder> {
    key?: string;
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
    label,
    ...rest
}: SpellContainerBuilder): Labeled<SpellContainerBase> {
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
        label,
    };
}

function spellContainerPreBuild(raw: any): SpellContainerBuilder {
    return {
        ...Item.preBuild(raw),
        spell: raw.spell as string,
        spellRank: raw.spellRank as number,
        spellLevel: raw.spellLevel as number,
        casterLevel: raw.casterLevel as number,
        charges: raw.charges as number,
    };
}

export {
    SpellContainerBuilder,
    SpellContainerRawBuilder,
    SpellContainerBase,
    buildSpellContainer,
    spellContainerPreBuild,
};
