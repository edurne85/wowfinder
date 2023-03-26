import { sum } from '../../../utils';
import { DamageType } from '../../DamageType';
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
    };
}

export default class ResistBonus {
    private _values: ResistanceSet;

    constructor(data: ResistancePartialSet) {
        this._values = fill(data);
    }

    get values(): ResistanceSet {
        return { ...this._values };
    }

    static get zero(): ResistBonus { return new ResistBonus({}); }

    static sum(...args: ResistBonus[]): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result._values[type as DamageType] =
                sum(...args.map(r => r._values[type as DamageType]));
        }
        return result;
    }

    static max(...args: ResistBonus[]): ResistBonus {
        const result = this.zero;
        for (const type of Object.keys(DamageType)) {
            result._values[type as DamageType] =
                Math.max(...args.map(r => r._values[type as DamageType]));
        }
        return result;
    }

    static build(raw: any = {}): ResistBonus {
        return new ResistBonus(Object.assign({}, this.zero._values, raw));
    }
}

export {
    fill as fillResistBonus,
};