import { Requirement } from './base';
import {
    PartialStatSet,
    StatKeys,
    StatSet,
    zeroDefault
} from '../Stats';
import { Character } from '..';
import { FunctionBasedRequirement } from '.';

class MinStatsRequirement implements StatSet, Requirement<StatSet> {
    #min: StatSet;
    constructor(min: PartialStatSet) {
        this.#min = Object.assign({}, zeroDefault, min);
    }

    get STR(): number {
        return this.#min.STR;
    }

    get DEX(): number {
        return this.#min.DEX;
    }

    get CON(): number {
        return this.#min.CON;
    }

    get INT(): number {
        return this.#min.INT;
    }

    get WIS(): number {
        return this.#min.WIS;
    }

    get CHA(): number {
        return this.#min.CHA;
    }

    test(value: PartialStatSet): boolean {
        return StatKeys.every(
            k => (value[k] || zeroDefault[k]) >= this.#min[k]
        );
    }
}
class MaxStatsRequirement implements StatSet, Requirement<StatSet> {
    #max: StatSet;
    constructor(max: PartialStatSet) {
        this.#max = Object.assign({}, zeroDefault, max);
    }

    get STR(): number {
        return this.#max.STR;
    }

    get DEX(): number {
        return this.#max.DEX;
    }

    get CON(): number {
        return this.#max.CON;
    }

    get INT(): number {
        return this.#max.INT;
    }

    get WIS(): number {
        return this.#max.WIS;
    }

    get CHA(): number {
        return this.#max.CHA;
    }

    test(value: PartialStatSet): boolean {
        const keys = Object.keys(this.#max);
        return StatKeys.every(
            k => !keys.includes(k) ||
                (value[k] || zeroDefault[k]) <= this.#max[k]
        );
    }
}

function characterStatsRequirement<T extends Requirement<StatSet>>(req: T): Requirement<Character> {
    return new FunctionBasedRequirement<Character>(
        (char: Character) => req.test(char.stats.active),
    );
}

export {
    MinStatsRequirement,
    MaxStatsRequirement,
    characterStatsRequirement,
};