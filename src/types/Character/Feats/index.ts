import {
    baseFeats,
    classFeatureFeats,
    combatFeats,
    magicFeats,
    weaponFeats,
} from './builder';
import { Feat } from './Feat';
import { FeatFlag } from './FeatFlag';
import { FeatSpec } from './FeatSpec';

const feats: { [key in Feat]: FeatSpec } = {
    ...baseFeats,
    ...classFeatureFeats,
    ...magicFeats,
    ...combatFeats,
    ...weaponFeats,
};

export { Feat, FeatFlag, FeatSpec, feats };
