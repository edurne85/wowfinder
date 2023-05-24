const CombatMobilityFeat = {
    dodge: 'dodge',
} as const;

type CombatMobilityFeat = keyof typeof CombatMobilityFeat;

export { CombatMobilityFeat };
