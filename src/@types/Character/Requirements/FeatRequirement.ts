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
        // TODO Implement
        // Depends on actually supporting feats on characters
        return false;
    }
}

class CharacterFeatRequirement implements Requirement<Character> {
    #feat: Feat;
    constructor(feat: Feat) {
        this.#feat = feat;
    }

    test(/* value: Character */): boolean {
        return false;
    }
}

export {
    FeatRequirement,
    CharacterFeatRequirement
};