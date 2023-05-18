import { DamageType, DamageTypes } from '../../types/Damage';

const typeColors = {
    [DamageType.bludgeoning]: '#999',
    [DamageType.slashing]: '#999',
    [DamageType.piercing]: '#999',
    [DamageType.arcane]: '#3cc',
    [DamageType.fire]: '#f00',
    [DamageType.cold]: '#339',
    [DamageType.nature]: '#393',
    [DamageType.shadow]: '#909',
    [DamageType.holy]: '#ff9',
    [DamageType.psychic]: '#c6f',
};
const defaultColor = '#333';

const typeColorsPriority = [
    DamageType.arcane,
    DamageType.fire,
    DamageType.cold,
    DamageType.nature,
    DamageType.shadow,
    DamageType.holy,
    DamageType.psychic,
    DamageType.bludgeoning,
    DamageType.slashing,
    DamageType.piercing,
];

function colorByType(type: string): string {
    return typeColors[type as DamageType] || defaultColor;
}

function colorByTypes({ types }: { types: DamageTypes }): string {
    const type = typeColorsPriority.find(type => types[type]);
    return type ? colorByType(type) : defaultColor;
}

export { colorByTypes };
