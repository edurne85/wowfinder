export enum ClassFeature {
    // Barbarian
    rage = 'rage',
    ragePower = 'ragePower',
    damageReduction = 'damageReduction',
    greaterRage = 'greaterRage',
    indomitableWill = 'indomitableWill',
    tirelessRage = 'tirelessRage',
    mightyRage = 'mightyRage',
    // Bard
    bardicKnowledge = 'bardicKnowledge',
    bardicPerformance = 'bardicPerformance',
    countersong = 'countersong',
    distraction = 'distraction',
    fascinate = 'fascinate',
    inspireCourage = 'inspireCourage',
    versatilePerformance = 'versatilePerformance',
    wellVersed = 'wellVersed',
    inspireCompetence = 'inspireCompetence',
    loreMaster = 'loreMaster',
    suggestion = 'suggestion',
    dirgeDoom = 'dirgeDoom',
    inspireGreatness = 'inspireGreatness',
    jackTrades = 'jackTrades',
    soothingPerformance = 'soothingPerformance',
    frighteningTune = 'frighteningTune',
    inspireHeroics = 'inspireHeroics',
    massSuggestion = 'massSuggestion',
    deadlyPerformance = 'deadlyPerformance',
    // Cleric
    deityAura = 'deityAura',
    channel = 'channel',
    domains = 'domains',
    // Cleric - WowFinder specific
    attonementMelee = 'attonementMelee',
    attonementRanged = 'attonementRanged',
    attonementSpell = 'attonementSpell',
    spiritShield = 'spiritShield',
    // Druid
    natureBond = 'natureBond',
    natureSense = 'natureSense',
    wildEmpathy = 'wildEmpathy',
    woodlandStride = 'woodlandStride',
    tracklessSteps = 'tracklessSteps',
    resistNatureLure = 'resistNatureLure',
    venomInmunity = 'venomInmunity',
    thousandFaces = 'thousandFaces',
    // Druid - WowFinder specific
    bearForm = 'bearForm',
    catForm = 'catForm',
    moonkinForm = 'moonkinForm',
    treeLifeForm = 'treeLifeForm',
    cheetahForm = 'cheetahForm',
    dolphinForm = 'dolphinForm',
    crowForm = 'crowForm',
    greatStagForm = 'greatStagForm',
    eagleForm = 'eagleForm',
    rejuvenation = 'rejuvenation',
    tranquility = 'tranquility',
    regrowth = 'regrowth',
    giftWild = 'giftWild',
    rebirth = 'rebirth',
    swiftmend = 'swiftmend',
    // Fighter
    bonusCombatFeat = 'bonusCombatFeat',
    bravery = 'bravery',
    armorTraining = 'armorTraining',
    weaponTraining = 'weaponTraining',
    armorMastery = 'armorMastery',
    weaponMastery = 'weaponMastery',
    // Barbarian + Fighter - Wowfinder specific
    tauntAttack = 'tauntAttack',
    tauntTarget = 'tauntTarget',
    tauntArea = 'tauntArea',
    sunderArmor = 'sunderArmor',
    // Mage
    arcaneBond = 'arcaneBond',
    arcaneSchool = 'arcaneSchool',
    bloodline = 'bloodline',
    featScribeScroll = 'featScribeScroll',
    featSchewMaterials = 'featSchewMaterials',
    bloodlineFeat = 'bloodlineFeat',
    bloodlinePower = 'bloodlinePower',
    bloodlineSpell = 'bloodlineSpell',
    evocation = 'evocation',
    bonusArcaneFeat = 'bonusArcaneFeat',
    // Monk
    bonusMonkFeat = 'bonusMonkFeat',
    flurryBlows = 'flurryBlows',
    stunningFist = 'stunningFist',
    unarmedStrike = 'unarmedStrike',
    maneuverTraining = 'maneuverTraining',
    stillMind = 'stillMind',
    kiPool = 'kiPool',
    kiStrikeMagic = 'kiStrikeMagic',
    kiStrikeSilver = 'kiStrikeSilver',
    kiStrikeLawful = 'kiStrikeLawful',
    kiStrikeAdamantine = 'kiStrikeAdamantine',
    slowFall = 'slowFall',
    highJump = 'highJump',
    purityBody = 'purityBody',
    wholenessBody = 'wholenessBody',
    improvedEvasion = 'improvedEvasion',
    diamondBody = 'diamondBody',
    abundantStep = 'abundantStep',
    diamondSoul = 'diamondSoul',
    quiveringPalm = 'quiveringPalm',
    tongueSunMoon = 'tongueSunMoon',
    emptyBody = 'emptyBody',
    perfectSelf = 'perfectSelf',
    // Barbarian + Monk
    fastMovement = 'fastMovement',
    // Druid + Monk
    timelessBody = 'timelessBody',
    // Oracle
    mystery = 'mystery',
    oracleCurse = 'oracleCurse',
    revelation = 'revelation',
    mysterySpell = 'mysterySpell',
    finalRevelation = 'finalRevelation',
    // Rogue
    sneak = 'sneak',
    trapfinding = 'trapfinding',
    rogueTalent = 'rogueTalent',
    advancedTalents = 'advancedTalents',
    masterStrike = 'masterStrike',

    // Generic / Multiple
    evasion = 'evasion',
    trapSense = 'trapSense',
    uncannyDodge = 'uncannyDodge',
    improvedUncannyDodge = 'improvedUncannyDodge',

    // TODO (WiP)
}

export const barbarian = {
    trapSense: (eLevel: number): number => Math.floor(eLevel / 3),
    damageReduction: (eLevel: number): number => Math.floor((eLevel - 4) / 3),
    fastMovement: (): number => 10,
};
export const bard = {
    inspireCourage: function (eLevel: number): number {
        let result = 1;
        if (eLevel >= 5) {
            result += 1;
            eLevel -= 5;
        }
        while (eLevel >= 6) {
            result += 1;
            eLevel -= 6;
        }
        return result;
    },
    inspireCompetence: function (eLevel: number): number {
        let result = 0;
        if (eLevel >= 3) {
            result += 2;
            eLevel -= 3;
        }
        while (eLevel >= 4) {
            result += 1;
            eLevel -= 4;
        }
        return result;
    },
    loreMaster: function (eLevel: number): number {
        let result = 0;
        if (eLevel >= 5) {
            result += 1;
            eLevel -= 5;
        }
        while (eLevel >= 6) {
            result += 1;
            eLevel -= 6;
        }
        return result;
    }
};
export const cleric = {
    channel: (eLevel: number): number => Math.floor((eLevel + 1) / 2),
};
export const fighter = {
    weaponTrainingBonuses: function (eLevel: number): number[] {
        const result: number[] = [];
        let count = 0;
        if (eLevel >= 5) {
            count += 1;
            result.push(count);
            eLevel -= 5;
        }
        while (eLevel >= 4) {
            count += 1;
            result.push(count);
            eLevel -= 4;
        }
        return result.reverse();
    }
};
export const monk = {
    flurryBlowsMods: function (eLevel: number): number[] {
        const result = [];
        let base = eLevel - 2;
        result.push(base, base);
        while (eLevel > 5) {
            eLevel -= 5;
            base -= 5;
            result.push(base);
            if (eLevel >= 3) {
                result.push(base);
            }
        }
        return result;
    },
    fastMovement: (eLevel: number): number => Math.floor(eLevel / 3) * 10,
    slowFall: function (eLevel: number, baseHeight: number): number {
        if (eLevel >= 4) {
            baseHeight -= Math.floor(eLevel / 2) * 10;
        }
        if (eLevel >= 20) {
            baseHeight = 0;
        }
        return Math.max(baseHeight, 0);
    }
};
