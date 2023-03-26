interface DiceBuilder {
    sides: number;
    qtty?: number;
    fixedMod?: number;
}

export default class Dice {
    private _sides: number;
    private _qtty: number;
    private _mod: number;

    constructor({sides, qtty = 1, fixedMod = 0}: DiceBuilder) {
        this._sides = sides;
        this._qtty = qtty;
        this._mod = fixedMod;
    }

    get sides(): number { return this._sides; }

    get qtty(): number { return this._qtty; }

    get fixedMod(): number { return this._mod; }

    toString(): string {
        const m = Math.abs(this._mod);
        const modSuffix = this._mod > 0 ? ` + ${m}` : this._mod < 0 ? ` - ${m}` : '';
        return `${this._qtty}d${this._sides}${modSuffix}`;
    }

    private static rollDie(sides: number): number {
        return Math.floor(Math.random() * sides + 1);
    }

    roll(mod = 0): number {
        let total = mod + this._mod;
        for (let i = 0; i < this._qtty; i++) {
            total += Dice.rollDie(this._sides);
        }
        return total;
    }

    static build(raw: any): Dice {
        const cured = Object.assign({
            sides: 6,
            qtty: 1,
            fixedMod: 0,
        }, raw);
        return new Dice(cured);
    }
}