const BardClassFeature = {
    bardicKnowledge: 'bardicKnowledge',
    bardicPerformance: 'bardicPerformance',
    countersong: 'countersong',
    distraction: 'distraction',
    fascinate: 'fascinate',
    inspireCourage: 'inspireCourage',
    versatilePerformance: 'versatilePerformance',
    wellVersed: 'wellVersed',
    inspireCompetence: 'inspireCompetence',
    loreMaster: 'loreMaster',
    suggestion: 'suggestion',
    dirgeDoom: 'dirgeDoom',
    inspireGreatness: 'inspireGreatness',
    jackTrades: 'jackTrades',
    soothingPerformance: 'soothingPerformance',
    frighteningTune: 'frighteningTune',
    inspireHeroics: 'inspireHeroics',
    massSuggestion: 'massSuggestion',
    deadlyPerformance: 'deadlyPerformance',

} as const;

type BardClassFeature = keyof typeof BardClassFeature;

const bard = {
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
} as const;

export { BardClassFeature, bard };