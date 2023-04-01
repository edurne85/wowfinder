const CombatPowerFeat = {
    cleave: 'cleave',
    greatCleave: 'greatCleave',
    powerAttack: 'powerAttack',
} as const;

type CombatPowerFeat = keyof typeof CombatPowerFeat;

export { CombatPowerFeat };
