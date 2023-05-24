import { barbarian, BarbarianClassFeature } from './barbarian';
import { bard, BardClassFeature } from './bard';
import { cleric, ClericClassFeature } from './cleric';
import { druid, DruidClassFeature } from './druid';
import { fighter, FighterClassFeature } from './fighter';
import { mage, MageClassFeature } from './mage';
import { monk, MonkClassFeature } from './monk';
import { oracle, OracleClassFeature } from './oracle';
import { rogue, RogueClassFeature } from './rogue';
import { shared, SharedClassFeature } from './shared';

const ClassFeature = {
    ...BarbarianClassFeature,
    ...BardClassFeature,
    ...ClericClassFeature,
    ...DruidClassFeature,
    ...FighterClassFeature,
    ...MageClassFeature,
    ...MonkClassFeature,
    ...OracleClassFeature,
    ...RogueClassFeature,
    ...SharedClassFeature,
} as const;

type ClassFeature = keyof typeof ClassFeature;

const classFeatureUtils = {
    barbarian,
    bard,
    cleric,
    druid,
    fighter,
    mage,
    monk,
    oracle,
    rogue,
    shared,
};

type ClassFeatureEntry = {
    level: number;
    feature: string;
};

type FeaturesList = {
    level: number;
    feature: ClassFeature;
}[];

type ClassFeaturesCondensed = { feature: ClassFeature; count: number }[];
class CondensedClassFeatures {
    #raw: ClassFeaturesCondensed;
    constructor(features: ClassFeature[]) {
        const counts: { [key: string]: number } = {};
        for (const f of features) {
            if (!(f in counts)) {
                counts[f] = 0;
            }
            counts[f]++;
        }
        this.#raw = Object.keys(counts).map(k => ({
            feature: k as ClassFeature,
            count: counts[k],
        }));
    }

    count(feature: string): number {
        const match = this.#raw.find(f => f.feature === feature);
        return match?.count || 0;
    }

    get list(): ClassFeaturesCondensed {
        return [...this.#raw];
    }
}

export { ClassFeature, CondensedClassFeatures, classFeatureUtils };
export type { ClassFeatureEntry, FeaturesList };
