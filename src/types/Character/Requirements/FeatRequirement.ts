import { Character } from '..';
import { Feat } from '../Feats/Feat';
import { FeatSpec } from '../Feats/FeatSpec';
import { Requirement } from './base';

class FeatRequirement implements Requirement<Iterable<FeatSpec>> {
    #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(/* value: Iterable<Feat> */): boolean {
        // TODO #435: Implement
        // Depends on actually supporting feats on characters
        return true;
    }
}

class CharacterFeatRequirement implements Requirement<Character> {
    #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(/* value: Character */): boolean {
        // TODO #435: see parent
        return true;
    }
}

export { FeatRequirement, CharacterFeatRequirement };
