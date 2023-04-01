const CombatVitalStrikeFeat = {
    vitalStrike: 'vitalStrike',
    improvedVitalStrike: 'improvedVitalStrike',
    greaterVitalStrike: 'greaterVitalStrike',
} as const;

type CombatVitalStrikeFeat = keyof typeof CombatVitalStrikeFeat;

export { CombatVitalStrikeFeat };
