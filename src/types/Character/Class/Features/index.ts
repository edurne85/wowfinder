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

export { ClassFeature, classFeatureUtils };
export type { ClassFeatureEntry, FeaturesList };
