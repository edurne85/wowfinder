const BarbarianClassFeature = {
    rage: 'rage',
    ragePower: 'ragePower',
    damageReduction: 'damageReduction',
    greaterRage: 'greaterRage',
    indomitableWill: 'indomitableWill',
    tirelessRage: 'tirelessRage',
    mightyRage: 'mightyRage',
} as const;

type BarbarianClassFeature = keyof typeof BarbarianClassFeature;

const barbarian = {
    trapSense: (eLevel: number): number => Math.floor(eLevel / 3),
    damageReduction: (eLevel: number): number => Math.floor((eLevel - 4) / 3),
    fastMovement: (): number => 10,
} as const;

export { BarbarianClassFeature, barbarian };
