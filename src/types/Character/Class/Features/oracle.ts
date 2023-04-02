const OracleClassFeature = {
    mystery: 'mystery',
    oracleCurse: 'oracleCurse',
    revelation: 'revelation',
    mysterySpell: 'mysterySpell',
    finalRevelation: 'finalRevelation',
} as const;

type OracleClassFeature = keyof typeof OracleClassFeature;

const oracle = {} as const;

export { oracle, OracleClassFeature };
