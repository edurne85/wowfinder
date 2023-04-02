const FighterClassFeature = {
    bonusCombatFeat: 'bonusCombatFeat',
    bravery: 'bravery',
    armorTraining: 'armorTraining',
    weaponTraining: 'weaponTraining',
    armorMastery: 'armorMastery',
    weaponMastery: 'weaponMastery',
} as const;

type FighterClassFeature = keyof typeof FighterClassFeature;

const fighter = {
    // TODO: Review (updated since fighter class revamp?)
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
    },
} as const;

export { fighter, FighterClassFeature };
