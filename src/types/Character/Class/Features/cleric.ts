const ClericClassFeature = {
    deityAura: 'deityAura',
    channel: 'channel',
    domains: 'domains',
    attonementMelee: 'attonementMelee',
    attonementRanged: 'attonementRanged',
    attonementSpell: 'attonementSpell',
    spiritShield: 'spiritShield',
} as const;

type ClericClassFeature = keyof typeof ClericClassFeature;

const cleric = {
    channel: (eLevel: number): number => Math.floor((eLevel + 1) / 2),
} as const;

export { cleric, ClericClassFeature };
