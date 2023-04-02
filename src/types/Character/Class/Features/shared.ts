const SharedClassFeature = {
    tauntAttack: 'tauntAttack',
    tauntTarget: 'tauntTarget',
    tauntArea: 'tauntArea',
    sunderArmor: 'sunderArmor',
    fastMovement: 'fastMovement',
    timelessBody: 'timelessBody',
    evasion: 'evasion',
    trapSense: 'trapSense',
    uncannyDodge: 'uncannyDodge',
    improvedUncannyDodge: 'improvedUncannyDodge',
} as const;

type SharedClassFeature = keyof typeof SharedClassFeature;

const shared = {
} as const;

export { shared, SharedClassFeature };