enum Alignment {
    LG = 'LG',
    LN = 'LN',
    LE = 'LE',
    NG = 'NG',
    NN = 'NN',
    NE = 'NE',
    CG = 'CG',
    CN = 'CN',
    CE = 'CE',
};

export default Alignment;

const isGood = (alignment: Alignment): boolean  => /G/.test(alignment);
const isEvil = (alignment: Alignment): boolean  => /E/.test(alignment);
const isChaotic = (alignment: Alignment): boolean  => /C/.test(alignment);
const isLawful = (alignment: Alignment): boolean  => /L/.test(alignment);
const isNeutral = (alignment: Alignment): boolean  => /N/.test(alignment);

export {
    isGood,
    isEvil,
    isChaotic,
    isLawful,
    isNeutral,
};