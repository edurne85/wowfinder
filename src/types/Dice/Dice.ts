import { DiceBuilder, average, make, max, min } from './helpers';

class Dice {
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

export { Dice, DiceBuilder };
