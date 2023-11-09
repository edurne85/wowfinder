import { CharacterOverride } from '../../Character/base/CharacterOverride';
import { Character } from '../../Character';
import { Transformation } from '../base';
import { sum } from '@utils/numbers';

const druidClasses = ['drd'];

interface ShapeshiftBuilder {
    rank: number;
}
abstract class Shapeshift implements Transformation {
    #rank: number;

    protected constructor({ rank }: ShapeshiftBuilder) {
        this.#rank = rank;
    }

    get rank(): number {
        return this.#rank;
    }

    abstract compute(base: Character, rank: number): CharacterOverride;

    apply(base: Character): Character {
        base.setOverride(this.compute(base, this.#rank));
        return base;
    }

    static defaultSize(rank: number): number {
        return rank < 3 ? 0 : (rank - 1) / 2;
    }

    static effectiveDruidLevel(base: Character): number {
        return sum(
            ...base.classes
                .filter(c => druidClasses.includes(c.cls.key))
                .map(c => c.level),
        );
    }
}

export { Shapeshift };
export type { ShapeshiftBuilder };
