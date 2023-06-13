import { sum } from '../../../utils';
import { DamageType } from '../../Damage';
import type { ResistancePartialSet, ResistanceSet } from '../Resistances';

function fill(data: ResistancePartialSet, filler = 0): ResistanceSet {
    return {
        bludgeoning: data.bludgeoning || filler,
        slashing: data.slashing || filler,
        piercing: data.piercing || filler,
        arcane: data.arcane || filler,
        fire: data.fire || filler,
        cold: data.cold || filler,
        nature: data.nature || filler,
        shadow: data.shadow || filler,
        holy: data.holy || filler,
        psychic: data.psychic || filler,
    };
}

export default class ResistBonus {
    #values: ResistanceSet;

    constructor(data: ResistancePartialSet) {
        this.#values = fill(data);
    }

    get values(): ResistanceSet {
        return { ...this.#values };
    }

    get isZero(): boolean {
        return Object.values(this.#values).every(v => v === 0);
    }

    static get zero(): ResistBonus {
        return new ResistBonus({});
    }

    static sum(...args: ResistBonus[]): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result.#values[type as DamageType] = sum(
                ...args.map(r => r.#values[type as DamageType]),
            );
        }
        return result;
    }

    static max(...args: ResistBonus[]): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result.#values[type as DamageType] = Math.max(
                ...args.map(r => r.#values[type as DamageType]),
            );
        }
        return result;
    }

    static build(raw: any = {}): ResistBonus {
        return new ResistBonus(Object.assign({}, this.zero.#values, raw));
    }
}

export { fill as fillResistBonus };
