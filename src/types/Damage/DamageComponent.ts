import {
    Validable,
    ValidationError,
    validateEnumValue,
} from '@model/Validable';
import { StatKey } from '../Character/Stats';
import { Dice } from '../Dice';
import { DamageModifier, computeModifier } from './DamageModifier';
import { DamageRollArguments } from './DamageRollArguments';
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
    implements DamageComponentSpecBuilder, Validable
{
    #dice: Dice;
    #mod?: DamageModifier;

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
        this.#mod = modStat;
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

    get mod(): DamageModifier | undefined {
        return this.#mod;
    }

    get dice(): Dice {
        return this.#dice;
    }

    validate(): asserts this is DamageComponentSpec {
        if (this.#mod) {
            validateEnumValue<DamageModifier>(this.#mod, DamageModifier);
        }
        if (!this.#dice || !(this.#dice instanceof Dice)) {
            throw new ValidationError(this, 'Invalid dice');
        }
        this.#dice.validate();
    }

    static validate(
        spec: DamageComponentSpec,
    ): asserts spec is DamageComponentSpec {
        spec.validate();
    }

    roll(args: DamageRollArguments): DamageComponentValue {
        const mod = this.#mod ? computeModifier(this.#mod, args) : 0;
        return new DamageComponentValue({
            types: this.types,
            total: this.#dice.roll(mod),
        });
    }
}

export type { DamageComponentValueBuilder, DamageComponentSpecBuilder };

export { DamageComponentValue, DamageComponentSpec };
