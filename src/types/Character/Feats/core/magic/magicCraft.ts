const MagicCraftingFeat = {
    scribeScroll: 'scribeScroll',
    brewPotion: 'brewPotion',
    craftWondrousItem: 'craftWondrousItem',
    craftArmsArmor: 'craftArmsArmor',
    craftWand: 'craftWand',
    craftRing: 'craftRing',
    craftRod: 'craftRod',
    craftStaff: 'craftStaff',
} as const;

type MagicCraftingFeat = keyof typeof MagicCraftingFeat;

export { MagicCraftingFeat };
