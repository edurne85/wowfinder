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
    // TODO Make type exhaustive once weapon feats are included
    ...baseFeats,
    ...classFeatureFeats,
    ...magicFeats,
    ...combatFeats,
    ...weaponFeats,
};

export { Feat, FeatFlag, FeatSpec, feats };
