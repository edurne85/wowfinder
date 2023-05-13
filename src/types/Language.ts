enum Languages {
    // Baseline: by default for most races
    common = 'common',

    // General: available to at least one playable race
    darnassian = 'darnassian', // Night elves
    draconic = 'draconic',
    draenei = 'draenei',
    dwarven = 'dwarven',
    eredun = 'eredun', // Replaces Demonic and Abyssal from PFCRB
    gilnean = 'gilnean', // Dialect of Common
    gnoll = 'gnoll',
    gnomish = 'gnomish',
    goblin = 'goblin',
    naaru = 'naaru', // Replaces Celestial from PFCRB
    nerglish = 'nerglish', // Murloc
    orcish = 'orcish',
    pandaren = 'pandaren',
    ravenspeech = 'ravenspeech', // Arakkoa
    sylvan = 'sylvan', // Replaces Druidric from PFCRB, not a secret language
    taurahe = 'taurahe',
    thalassian = 'thalassian', // High elves
    ursine = 'ursine', // Furbolg
    worgen = 'worgen',
    zandali = 'zandali',
}

const defaultLang = [Languages.common];

export default Languages;
export { defaultLang };
