const SpellFocusFeat = {
    spellFocusAbjuration: 'spellFocusAbjuration',
    greaterSpellFocusAbjuration: 'greaterSpellFocusAbjuration',
    spellFocusConjuration: 'spellFocusConjuration',
    greaterSpellFocusConjuration: 'greaterSpellFocusConjuration',
    augmentSummoning: 'augmentSummoning',
    spellFocusDivination: 'spellFocusDivination',
    greaterSpellFocusDivination: 'greaterSpellFocusDivination',
    spellFocusEnchantment: 'spellFocusEnchantment',
    greaterSpellFocusEnchantment: 'greaterSpellFocusEnchantment',
    spellFocusEvocation: 'spellFocusEvocation',
    greaterSpellFocusEvocation: 'greaterSpellFocusEvocation',
    spellFocusIllusion: 'spellFocusIllusion',
    greaterSpellFocusIllusion: 'greaterSpellFocusIllusion',
    spellFocusNecromancy: 'spellFocusNecromancy',
    greaterSpellFocusNecromancy: 'greaterSpellFocusNecromancy',
    spellFocusTransmutation: 'spellFocusTransmutation',
    greaterSpellFocusTransmutation: 'greaterSpellFocusTransmutation',
} as const;

type SpellFocusFeat = keyof typeof SpellFocusFeat;

export { SpellFocusFeat };
