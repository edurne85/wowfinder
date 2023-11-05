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

enum SpecialDamageType {
    psychic = 'psychic',
}

const DamageType = {
    ...PhysicalDamageType,
    ...EnergyType,
    ...SpecialDamageType,
};
type DamageType = PhysicalDamageType | EnergyType | SpecialDamageType;

type DamageTypes = { [key in DamageType]?: boolean };
type FullDamageTypes = { [key in DamageType]: boolean };

function makeFullDamageTypes(...types: DamageType[]): FullDamageTypes {
    const res: DamageTypes = {};
    Object.keys(DamageType)
        .map(t => t as DamageType)
        .forEach(type => {
            res[type] = types.includes(type);
        });
    return res as FullDamageTypes;
}

const HybridTypes = {
    frostfire: makeFullDamageTypes(EnergyType.fire, EnergyType.cold),
    void: makeFullDamageTypes(EnergyType.shadow, SpecialDamageType.psychic),
    lunar: makeFullDamageTypes(EnergyType.shadow, EnergyType.arcane),
    solar: makeFullDamageTypes(EnergyType.holy, EnergyType.fire),
    astral: makeFullDamageTypes(
        EnergyType.arcane,
        EnergyType.fire,
        EnergyType.nature,
    ),
};

type HybridTypes = keyof typeof HybridTypes;

function buildFullDamageTypes(builder: DamageTypes): FullDamageTypes {
    const res: DamageTypes = {};
    Object.keys(DamageType)
        .map(t => t as DamageType)
        .forEach(type => {
            res[type] = builder[type] ?? false;
        });
    return res as FullDamageTypes;
}

export type { DamageTypes, FullDamageTypes };

export {
    PhysicalDamageType,
    EnergyType,
    DamageType,
    SpecialDamageType,
    HybridTypes,
    buildFullDamageTypes,
    makeFullDamageTypes,
};
