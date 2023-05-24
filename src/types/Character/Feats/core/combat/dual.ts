const CombatDualWieldFeat = {
    twoWeaponFighting: 'twoWeaponFighting',
    doubleSlice: 'doubleSlice',
    twoWeaponRend: 'twoWeaponRend',
    improvedTwoWeaponFighting: 'improvedTwoWeaponFighting',
    greaterTwoWeaponFighting: 'greaterTwoWeaponFighting',
    twoWeaponDefense: 'twoWeaponDefense',
} as const;

type CombatDualWieldFeat = keyof typeof CombatDualWieldFeat;

export { CombatDualWieldFeat };
