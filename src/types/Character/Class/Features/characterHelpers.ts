import type { Character } from '../../../Character';
import { ClassFeature, CondensedClassFeatures } from '.';

function getClassFeatures(char: Character): ClassFeature[] {
    return char.classes.map(c => c.cls.features(c.level)).flat();
}

function getClassFeaturesCondensed(char: Character): CondensedClassFeatures {
    return new CondensedClassFeatures(getClassFeatures(char));
}

export { getClassFeatures, getClassFeaturesCondensed };
