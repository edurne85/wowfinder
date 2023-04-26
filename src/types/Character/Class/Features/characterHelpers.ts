import type { Character } from '../../../Character';
import { ClassFeature } from '.';

type ClassFeaturesCondensed = { feature: ClassFeature; count: number }[];

function getClassFeatures(char: Character): ClassFeature[] {
    return char.classes.map(c => c.cls.features(c.level)).flat();
}

function getClassFeaturesCondensed(char: Character): ClassFeaturesCondensed {
    const counts: { [key: string]: number } = {};
    const features = getClassFeatures(char);
    for (const f of features) {
        if (!(f in counts)) {
            counts[f] = 0;
        }
        counts[f]++;
    }
    return Object.keys(counts).map(k => ({
        feature: k as ClassFeature,
        count: counts[k],
    }));
}

export { getClassFeaturesCondensed };
export type { ClassFeaturesCondensed };
