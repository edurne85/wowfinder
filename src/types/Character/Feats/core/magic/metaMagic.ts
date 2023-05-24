const MetaMagicFeat = {
    empowerSpell: 'empowerSpell',
    enlargeSpell: 'enlargeSpell',
    extendSpell: 'extendSpell',
    heightenSpell: 'heightenSpell',
    maximizeSpell: 'maximizeSpell',
    quickenSpell: 'quickenSpell',
    silentSpell: 'silentSpell',
    stillSpell: 'stillSpell',
    widenSpell: 'widenSpell',
} as const;

type MetaMagicFeat = keyof typeof MetaMagicFeat;

export { MetaMagicFeat };
