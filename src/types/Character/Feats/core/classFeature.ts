const ClassFeatureFeat = {
    extraKi: 'extraKi',
    // TODO Define corresponding class features to enable these feats:
    // extraLayOnHands: 'extraLayOnHands',
    // extraMercy: 'extraMercy',
    // extraPerform: 'extraPerform',
    extraRage: 'extraRage',
    // improvedFamiliar: 'improvedFamiliar',
    channelAlignment: 'channelAlignment',
    commandUndead: 'commandUndead',
    elementalChannel: 'elementalChannel',
    extraChannel: 'extraChannel',
    improvedChannel: 'improvedChannel',
    selectiveChannel: 'selectiveChannel',
    turnUndead: 'turnUndead',
    channelSmite: 'channelSmite',
} as const;

type ClassFeatureFeat = keyof typeof ClassFeatureFeat;

export { ClassFeatureFeat };
