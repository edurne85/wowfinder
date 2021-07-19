export enum ClassFeature {
    // Barbarian
    rage = 'rage',
    ragePower = 'ragePower',
    uncannyDodge = 'uncannyDodge',
    trapSense = 'trapSense',
    improvedUncannyDodge = 'improvedUncannyDodge',
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
    timelessBody = 'timelessBody',
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
    weaponMastery = 'weaponMastery',
    // Barbarian + Fighter - Wowfinder specific
    tauntAttack = 'tauntAttack',
    tauntTarget = 'tauntTarget',
    tauntArea = 'tauntArea',
    sunderArmor = 'sunderArmor',
    // Monk
    bonusMonkFeat = 'bonusMonkFeat',
    flurryBlows = 'flurryBlows',
    stunningFist = 'stunningFist',
    unarmedStrike = 'unarmedStrike',
    evasion = 'evasion',
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
    // Barbarian + Monk
    fastMovement = 'fastMovement',
    // TODO (WiP)
};

export const barbarian = {
    trapSense: (eLevel: number): number => Math.floor(eLevel / 3),
    damageReduction: (eLevel: number): number => Math.floor((eLevel - 4) / 3),
};
export const bard = {
    inspireCourage: function(eLevel: number): number {
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
    inspireCompetence: function(eLevel: number): number {
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
    loreMaster: function(eLevel: number): number {
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
    weaponTrainingBonuses: function(eLevel: number): number[] {
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
    flurryBlowsMods: function(eLevel: number): number[] {
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
    slowFall: function(eLevel: number, baseHeight: number): number {
        if (eLevel >= 4) {
            baseHeight -= Math.floor(eLevel / 2) * 10;
        }
        if (eLevel >= 20) {
            baseHeight = 0;
        }
        return Math.max(baseHeight, 0);
    }
};
