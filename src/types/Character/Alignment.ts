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
}

export default Alignment;

enum AlignmentDescriptor {
    chaotic = 'chaotic',
    evil = 'evil',
    good = 'good',
    lawful = 'lawful',
}

function combineAlignmentDescriptors(
    ...descriptors: AlignmentDescriptor[]
): Alignment {
    const uniques = [...new Set(descriptors)];
    const isGood = uniques.includes(AlignmentDescriptor.good);
    const isEvil = uniques.includes(AlignmentDescriptor.evil);
    const morals: 'G' | 'N' | 'E' =
        isGood && !isEvil ? 'G' : isEvil && !isGood ? 'E' : 'N';
    const isLawful = uniques.includes(AlignmentDescriptor.lawful);
    const isChaotic = uniques.includes(AlignmentDescriptor.chaotic);
    const ethics: 'L' | 'N' | 'C' =
        isLawful && !isChaotic ? 'L' : isChaotic && !isLawful ? 'C' : 'N';
    return Alignment[`${ethics}${morals}`];
}

const playableAlignments = [
    Alignment.LG,
    Alignment.LN,
    Alignment.NG,
    Alignment.NN,
    Alignment.CG,
    Alignment.CN,
];

const isGood = (alignment: Alignment): boolean => /G/.test(alignment);
const isEvil = (alignment: Alignment): boolean => /E/.test(alignment);
const isChaotic = (alignment: Alignment): boolean => /C/.test(alignment);
const isLawful = (alignment: Alignment): boolean => /L/.test(alignment);
const isNeutral = (alignment: Alignment): boolean => /N/.test(alignment);

export {
    Alignment,
    AlignmentDescriptor,
    isGood,
    isEvil,
    isChaotic,
    isLawful,
    isNeutral,
    combineAlignmentDescriptors,
    playableAlignments,
};
