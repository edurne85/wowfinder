import { StatKey, StatSet } from '../Character/Stats';
import Dice from '../Dice';
import { DamageComponentBaseBuilder, DamageComponentBase } from './base';

interface DamageComponentValueBuilder extends DamageComponentBaseBuilder {
    total: number;
}

class DamageComponentValue
    extends DamageComponentBase
    implements DamageComponentValueBuilder
{
    #total: number;
    constructor({ types, total }: DamageComponentValueBuilder) {
        super({ types });
        this.#total = total;
    }

    get total(): number {
        return this.#total;
    }

    multiply(multiplier: number): DamageComponentValue {
        return new DamageComponentValue({
            types: this.types,
            total: this.total * multiplier,
        });
    }
}

interface DamageComponentSpecBuilder extends DamageComponentBaseBuilder {
    diceCount: number;
    diceSides: number;
    fixedMod?: number;
    modStat?: StatKey;
}

class DamageComponentSpec
    extends DamageComponentBase
    implements DamageComponentSpecBuilder
{
    #dice: Dice;
    #modStat?: StatKey;

    constructor({
        types,
        diceCount,
        diceSides,
        fixedMod = 0,
        modStat,
    }: DamageComponentSpecBuilder) {
        super({ types });
        this.#dice = new Dice({
            qtty: diceCount,
            sides: diceSides,
            fixedMod,
        });
        this.#modStat = modStat;
    }

    get diceCount(): number {
        return this.#dice.qtty;
    }

    get diceSides(): number {
        return this.#dice.sides;
    }

    get fixedMod(): number {
        return this.#dice.fixedMod;
    }

    get modStat(): StatKey | undefined {
        return this.#modStat;
    }

    get dice(): Dice {
        return this.#dice;
    }

    roll(stats: StatSet): DamageComponentValue {
        const mod = this.#modStat ? stats[this.#modStat] : 0;
        return new DamageComponentValue({
            types: this.types,
            total: this.#dice.roll(mod),
        });
    }
}

export type { DamageComponentValueBuilder, DamageComponentSpecBuilder };

export { DamageComponentValue, DamageComponentSpec };
