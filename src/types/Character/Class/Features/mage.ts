const MageClassFeature = {
    arcaneBond: 'arcaneBond',
    arcaneSchool: 'arcaneSchool',
    bloodline: 'bloodline',
    featScribeScroll: 'featScribeScroll',
    featSchewMaterials: 'featSchewMaterials',
    bloodlineFeat: 'bloodlineFeat',
    bloodlinePower: 'bloodlinePower',
    bloodlineSpell: 'bloodlineSpell',
    evocation: 'evocation',
    bonusArcaneFeat: 'bonusArcaneFeat',
} as const;

type MageClassFeature = keyof typeof MageClassFeature;

const mage = {} as const;

export { mage, MageClassFeature };
