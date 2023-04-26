enum PhysicalDamageType {
    bludgeoning = 'bludgeoning',
    slashing = 'slashing',
    piercing = 'piercing',
}

enum EnergyType {
    arcane = 'arcane',
    fire = 'fire',
    cold = 'cold',
    nature = 'nature',
    shadow = 'shadow',
    holy = 'holy',
}

const DamageType = { ...PhysicalDamageType, ...EnergyType };
type DamageType = PhysicalDamageType | EnergyType;

export { PhysicalDamageType, EnergyType, DamageType };
