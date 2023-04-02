const RogueClassFeature = {
    sneak: 'sneak',
    trapfinding: 'trapfinding',
    rogueTalent: 'rogueTalent',
    advancedTalents: 'advancedTalents',
    masterStrike: 'masterStrike',
} as const;

type RogueClassFeature = keyof typeof RogueClassFeature;

const rogue = {} as const;

export { rogue, RogueClassFeature };
