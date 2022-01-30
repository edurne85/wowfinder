import { DamageType } from '../DamageType';

interface ResistanceBreakdownBuilder {
    enhance?: number;
    gear?: number;
    misc?: number;
    temp?: number;
}

class ResistanceBreakdown {
    private _enh: number;
    private _gear: number;
    private _misc: number;
    private _temp: number;
    constructor({enhance = 0, gear = 0, misc = 0, temp = 0}: ResistanceBreakdownBuilder) {
        this._enh = enhance;
        this._gear = gear;
        this._misc = misc;
        this._temp = temp;
    }

    get enhance(): number { return this._enh; }

    get gear(): number { return this._gear; }

    get misc(): number { return this._misc; }

    get temp(): number { return this._temp; }

    get total(): number { return this._enh + this._gear + this._misc + this._temp; }

    static get zero(): ResistanceBreakdown {
        return new ResistanceBreakdown({enhance: 0, gear: 0, misc: 0, temp: 0});
    }
}

type ResistancePartialSet = {[key in DamageType]?: number};
type ResistanceSet = {[key in DamageType]: number};

type ResistancesBuilder = {[key in DamageType]?: ResistanceBreakdown};
type FullResistances = {[key in DamageType]: ResistanceBreakdown};

class Resistances {
    private _data: FullResistances;
    constructor(data: ResistancesBuilder) {
        this._data = {
            [DamageType.bludgeoning]: data.bludgeoning || ResistanceBreakdown.zero,
            [DamageType.slashing]: data.slashing || ResistanceBreakdown.zero,
            [DamageType.piercing]: data.piercing || ResistanceBreakdown.zero,
            [DamageType.arcane]: data.arcane || ResistanceBreakdown.zero,
            [DamageType.fire]: data.fire || ResistanceBreakdown.zero,
            [DamageType.cold]: data.cold || ResistanceBreakdown.zero,
            [DamageType.nature]: data.nature || ResistanceBreakdown.zero,
            [DamageType.shadow]: data.shadow || ResistanceBreakdown.zero,
            [DamageType.holy]: data.holy || ResistanceBreakdown.zero,
        };
    }

    byType(type: DamageType): ResistanceBreakdown {
        return new ResistanceBreakdown(this._data[type]);
    }

    get bludgeoning(): ResistanceBreakdown { return this.byType(DamageType.bludgeoning); }

    get slashing(): ResistanceBreakdown { return this.byType(DamageType.slashing); }

    get piercing(): ResistanceBreakdown { return this.byType(DamageType.piercing); }

    get arcane(): ResistanceBreakdown { return this.byType(DamageType.arcane); }

    get fire(): ResistanceBreakdown { return this.byType(DamageType.fire); }

    get cold(): ResistanceBreakdown { return this.byType(DamageType.cold); }

    get nature(): ResistanceBreakdown { return this.byType(DamageType.nature); }

    get shadow(): ResistanceBreakdown { return this.byType(DamageType.shadow); }

    get holy(): ResistanceBreakdown { return this.byType(DamageType.holy); }
}

export type {
    ResistancePartialSet,
    ResistanceSet,
};
export {
    ResistanceBreakdown,
    Resistances,
};