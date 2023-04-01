import { SpellFocusFeat } from '../../core/magic/spellFocus';
import { Feat } from '../../Feat';
import { FeatSpec } from '../../FeatSpec';
import { allOf, req } from '../helpers';
import { build } from './helpers';

const spellFocusFeats: { [key in SpellFocusFeat]: FeatSpec } = {
    spellFocusAbjuration: build.focus(Feat.spellFocusAbjuration),
    greaterSpellFocusAbjuration: build.focus(
        Feat.greaterSpellFocusAbjuration,
        Feat.spellFocusAbjuration
    ),
    spellFocusConjuration: build.focus(Feat.spellFocusConjuration),
    greaterSpellFocusConjuration: build.focus(
        Feat.greaterSpellFocusConjuration,
        Feat.spellFocusConjuration
    ),
    augmentSummoning: build.magic(
        Feat.augmentSummoning,
        allOf(...req.feats(Feat.spellFocusConjuration))
    ),
    spellFocusDivination: build.focus(Feat.spellFocusDivination),
    greaterSpellFocusDivination: build.focus(
        Feat.greaterSpellFocusDivination,
        Feat.spellFocusDivination
    ),
    spellFocusEnchantment: build.focus(Feat.spellFocusEnchantment),
    greaterSpellFocusEnchantment: build.focus(
        Feat.greaterSpellFocusEnchantment,
        Feat.spellFocusEnchantment
    ),
    spellFocusEvocation: build.focus(Feat.spellFocusEvocation),
    greaterSpellFocusEvocation: build.focus(
        Feat.greaterSpellFocusEvocation,
        Feat.spellFocusEvocation
    ),
    spellFocusIllusion: build.focus(Feat.spellFocusIllusion),
    greaterSpellFocusIllusion: build.focus(
        Feat.greaterSpellFocusIllusion,
        Feat.spellFocusIllusion
    ),
    spellFocusNecromancy: build.focus(Feat.spellFocusNecromancy),
    greaterSpellFocusNecromancy: build.focus(
        Feat.greaterSpellFocusNecromancy,
        Feat.spellFocusNecromancy
    ),
    spellFocusTransmutation: build.focus(Feat.spellFocusTransmutation),
    greaterSpellFocusTransmutation: build.focus(
        Feat.greaterSpellFocusTransmutation,
        Feat.spellFocusTransmutation
    ),
};

export { spellFocusFeats };
