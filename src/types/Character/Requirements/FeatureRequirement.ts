import { Requirement } from '.';
import { Character } from '..';
import { ClassFeature } from '../Class';

class ClassFeatureRequirement extends Requirement<Character> {
    #feature: ClassFeature;
    constructor(feature: ClassFeature) {
        super();
        this.#feature = feature;
    }

    test(value: Character): boolean {
        return (
            value.classFeaturesCondensed.filter(
                entry => entry.feature === this.#feature && entry.count > 0,
            ).length > 0
        );
    }
}

export { ClassFeatureRequirement };
