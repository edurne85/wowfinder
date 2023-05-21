import { DamageType } from '../../Damage';

type ResistancePartialSet = { [key in DamageType]?: number };

type ResistanceSet = { [key in DamageType]: number };

class ResistanceSetImpl implements ResistanceSet {
    private _data: ResistanceSet;

    constructor(source: ResistancePartialSet) {
        const curated: ResistancePartialSet = {};
        for (const t of Object.keys(DamageType)) {
            curated[t as DamageType] = source[t as DamageType] || 0;
        }
        this._data = curated as ResistanceSet;
    }

    get bludgeoning(): number {
        return this._data.bludgeoning;
    }

    get slashing(): number {
        return this._data.slashing;
    }

    get piercing(): number {
        return this._data.piercing;
    }

    get arcane(): number {
        return this._data.arcane;
    }

    get fire(): number {
        return this._data.fire;
    }

    get cold(): number {
        return this._data.cold;
    }

    get nature(): number {
        return this._data.nature;
    }

    get shadow(): number {
        return this._data.shadow;
    }

    get holy(): number {
        return this._data.holy;
    }

    get psychic(): number {
        return this._data.psychic;
    }
}

export type { ResistancePartialSet, ResistanceSet };
export { ResistanceSetImpl };
