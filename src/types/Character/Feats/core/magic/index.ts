import { MagicCraftingFeat } from './magicCraft';
import { MetaMagicFeat } from './metaMagic';
import { SpellFocusFeat } from './spellFocus';

const MagicFeat = {
    combatCasting: 'combatCasting',
    eschewMaterials: 'eschewMaterials',
    improvedCounterspell: 'improvedCounterspell',
    ...MagicCraftingFeat,
    ...MetaMagicFeat,
    ...SpellFocusFeat,
} as const;

type MagicFeat = keyof typeof MagicFeat;

export { MagicFeat };
