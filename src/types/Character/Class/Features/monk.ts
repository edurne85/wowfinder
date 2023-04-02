const MonkClassFeature = {
    bonusMonkFeat: 'bonusMonkFeat',
    flurryBlows: 'flurryBlows',
    stunningFist: 'stunningFist',
    unarmedStrike: 'unarmedStrike',
    maneuverTraining: 'maneuverTraining',
    stillMind: 'stillMind',
    kiPool: 'kiPool',
    kiStrikeMagic: 'kiStrikeMagic',
    kiStrikeSilver: 'kiStrikeSilver',
    kiStrikeLawful: 'kiStrikeLawful',
    kiStrikeAdamantine: 'kiStrikeAdamantine',
    slowFall: 'slowFall',
    highJump: 'highJump',
    purityBody: 'purityBody',
    wholenessBody: 'wholenessBody',
    improvedEvasion: 'improvedEvasion',
    diamondBody: 'diamondBody',
    abundantStep: 'abundantStep',
    diamondSoul: 'diamondSoul',
    quiveringPalm: 'quiveringPalm',
    tongueSunMoon: 'tongueSunMoon',
    emptyBody: 'emptyBody',
    perfectSelf: 'perfectSelf',
} as const;

type MonkClassFeature = keyof typeof MonkClassFeature;

const monk = {
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
} as const;

export { monk, MonkClassFeature };