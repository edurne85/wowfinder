const DruidClassFeature = {
    natureBond: 'natureBond',
    natureSense: 'natureSense',
    wildEmpathy: 'wildEmpathy',
    woodlandStride: 'woodlandStride',
    tracklessSteps: 'tracklessSteps',
    resistNatureLure: 'resistNatureLure',
    venomInmunity: 'venomInmunity',
    thousandFaces: 'thousandFaces',
    bearForm: 'bearForm',
    catForm: 'catForm',
    moonkinForm: 'moonkinForm',
    treeLifeForm: 'treeLifeForm',
    cheetahForm: 'cheetahForm',
    dolphinForm: 'dolphinForm',
    crowForm: 'crowForm',
    greatStagForm: 'greatStagForm',
    eagleForm: 'eagleForm',
    rejuvenation: 'rejuvenation',
    tranquility: 'tranquility',
    regrowth: 'regrowth',
    giftWild: 'giftWild',
    rebirth: 'rebirth',
    swiftmend: 'swiftmend',
} as const;

type DruidClassFeature = keyof typeof DruidClassFeature;

const druid = {} as const;

export { druid, DruidClassFeature };
