import { Validable } from '@model/Validable';
import type { DiceBuilder } from './helpers';
import { average, make, max, min } from './helpers';

class Dice implements Validable {
    #sides: number;
    #qtty: number;
    #mod: number;

    constructor({ sides, qtty = 1, fixedMod = 0 }: DiceBuilder) {
        this.#sides = sides;
        this.#qtty = qtty;
        this.#mod = fixedMod;
    }

    get sides(): number {
        return this.#sides;
    }

    get qtty(): number {
        return this.#qtty;
    }

    get fixedMod(): number {
        return this.#mod;
    }

    toString(): string {
        const m = Math.abs(this.#mod);
        const modSuffix =
            this.#mod > 0 ? ` + ${m}` : this.#mod < 0 ? ` - ${m}` : '';
        return `${this.#qtty}d${this.#sides}${modSuffix}`;
    }

    private static rollDie(sides: number): number {
        return Math.floor(Math.random() * sides + 1);
    }

    roll(mod = 0): number {
        let total = mod + this.#mod;
        for (let i = 0; i < this.#qtty; i++) {
            total += Dice.rollDie(this.#sides);
        }
        return total;
    }

    get average(): number {
        return average(this.#sides, this.#qtty, this.#mod);
    }

    get max(): number {
        return max(this.#sides, this.#qtty, this.#mod);
    }

    get min(): number {
        return min(this.#qtty, this.#mod);
    }

    validate(): void {
        if (this.#sides < 1) {
            throw new Error('Dice sides must be greater than 0');
        }
        if (this.#qtty < 1) {
            throw new Error('Dice quantity must be greater than 0');
        }
        if (Number.isNaN(this.#mod)) {
            throw new Error('Dice modifier must be a number');
        }
    }

    static build(raw: any): Dice {
        const cured = Object.assign(
            {
                sides: 6,
                qtty: 1,
                fixedMod: 0,
            },
            raw,
        );
        return new Dice(cured);
    }

    static make(value: number | Dice | DiceBuilder): Dice {
        return new Dice(make(value));
    }
}

export { Dice };
