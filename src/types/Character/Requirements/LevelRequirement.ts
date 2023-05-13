import { Requirement } from '.';
import { Character } from '..';
import { sum } from '../../../utils';

abstract class LevelRequirementBase implements Requirement<Character> {
    #level: number;
    constructor(level: number) {
        this.#level = level;
    }

    get level(): number {
        return this.#level;
    }

    abstract test(value: Character): boolean;
}

class CharacterLevelRequirement extends LevelRequirementBase {
    test(value: Character): boolean {
        return sum(...value.classes.map(entry => entry.level)) >= this.level;
    }
}

class CasterLevelRequirement extends LevelRequirementBase {
    test(value: Character): boolean {
        const efl = value.classBonuses.efl;
        return efl.arc + efl.div + efl.esp >= this.level;
    }
}

class AttackBonusRequirement extends LevelRequirementBase {
    test(value: Character): boolean {
        return value.classBonuses.bab >= this.level;
    }
}

export {
    CharacterLevelRequirement,
    CasterLevelRequirement,
    AttackBonusRequirement,
};
