import { JsonValue } from '../../utils';
import { DamageType } from '../Damage';

enum ResistanceCategory {
    enhance = 'enhance',
    gear = 'gear',
    misc = 'misc',
    temp = 'temp',
}

type ResistanceBreakdown = { [key in ResistanceCategory]: number } & {
    readonly total: number;
};
type ResistanceBreakdownBuilder = { [key in ResistanceCategory]?: number };

class ResistanceBreakdownImpl
    implements ResistanceBreakdown, ResistanceBreakdownBuilder
{
    private _enh: number;
    private _gear: number;
    private _misc: number;
    private _temp: number;
    constructor({
        enhance = 0,
        gear = 0,
        misc = 0,
        temp = 0,
    }: ResistanceBreakdownBuilder) {
        this._enh = enhance;
        this._gear = gear;
        this._misc = misc;
        this._temp = temp;
    }

    get enhance(): number {
        return this._enh;
    }

    get gear(): number {
        return this._gear;
    }

    get misc(): number {
        return this._misc;
    }

    get temp(): number {
        return this._temp;
    }

    get total(): number {
        return this._enh + this._gear + this._misc + this._temp;
    }

    static get zero(): ResistanceBreakdownImpl {
        return new ResistanceBreakdownImpl({
            enhance: 0,
            gear: 0,
            misc: 0,
            temp: 0,
        });
    }
}

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

type CategorizedResistancesBase = {
    [key in ResistanceCategory]: ResistanceSet;
};

type CategorizedResistancesBuilder = {
    [key in ResistanceCategory]?: ResistancePartialSet;
};

class CategorizedResistances
    implements CategorizedResistancesBase, CategorizedResistancesBuilder
{
    private _enh: ResistanceSet;
    private _gear: ResistanceSet;
    private _misc: ResistanceSet;
    private _temp: ResistanceSet;

    constructor({ enhance, gear, misc, temp }: CategorizedResistancesBuilder) {
        this._enh = new ResistanceSetImpl(enhance || {});
        this._gear = new ResistanceSetImpl(gear || {});
        this._misc = new ResistanceSetImpl(misc || {});
        this._temp = new ResistanceSetImpl(temp || {});
    }

    get enhance(): ResistanceSet {
        return this._enh;
    }

    get gear(): ResistanceSet {
        return this._gear;
    }

    get misc(): ResistanceSet {
        return this._misc;
    }

    get temp(): ResistanceSet {
        return this._temp;
    }

    byType(type: DamageType): ResistanceBreakdown {
        return new ResistanceBreakdownImpl({
            enhance: this._enh[type],
            gear: this._gear[type],
            misc: this._misc[type],
            temp: this._temp[type],
        });
    }
}

type ResistancesBuilder = { [key in DamageType]?: ResistanceBreakdown };

type ResistancesExport = {
    [key: string]: ResistanceBreakdown & { [key: string]: JsonValue };
};

type FullResistances = { [key in DamageType]: ResistanceBreakdown };

class Resistances implements FullResistances, ResistancesBuilder {
    private _data: FullResistances;
    constructor(data: ResistancesBuilder) {
        this._data = {
            [DamageType.bludgeoning]:
                data.bludgeoning || ResistanceBreakdownImpl.zero,
            [DamageType.slashing]:
                data.slashing || ResistanceBreakdownImpl.zero,
            [DamageType.piercing]:
                data.piercing || ResistanceBreakdownImpl.zero,
            [DamageType.arcane]: data.arcane || ResistanceBreakdownImpl.zero,
            [DamageType.fire]: data.fire || ResistanceBreakdownImpl.zero,
            [DamageType.cold]: data.cold || ResistanceBreakdownImpl.zero,
            [DamageType.nature]: data.nature || ResistanceBreakdownImpl.zero,
            [DamageType.shadow]: data.shadow || ResistanceBreakdownImpl.zero,
            [DamageType.holy]: data.holy || ResistanceBreakdownImpl.zero,
            [DamageType.psychic]: data.psychic || ResistanceBreakdownImpl.zero,
        };
    }

    byType(type: DamageType): ResistanceBreakdown {
        return new ResistanceBreakdownImpl(this._data[type]);
    }

    byCategory(category: ResistanceCategory): ResistanceSet {
        return new ResistanceSetImpl({
            bludgeoning: this._data.bludgeoning[category],
            slashing: this._data.slashing[category],
            piercing: this._data.piercing[category],
            arcane: this._data.arcane[category],
            fire: this._data.fire[category],
            cold: this._data.cold[category],
            nature: this._data.nature[category],
            shadow: this._data.shadow[category],
            holy: this._data.holy[category],
        });
    }

    get bludgeoning(): ResistanceBreakdown {
        return this.byType(DamageType.bludgeoning);
    }

    get slashing(): ResistanceBreakdown {
        return this.byType(DamageType.slashing);
    }

    get piercing(): ResistanceBreakdown {
        return this.byType(DamageType.piercing);
    }

    get arcane(): ResistanceBreakdown {
        return this.byType(DamageType.arcane);
    }

    get fire(): ResistanceBreakdown {
        return this.byType(DamageType.fire);
    }

    get cold(): ResistanceBreakdown {
        return this.byType(DamageType.cold);
    }

    get nature(): ResistanceBreakdown {
        return this.byType(DamageType.nature);
    }

    get shadow(): ResistanceBreakdown {
        return this.byType(DamageType.shadow);
    }

    get holy(): ResistanceBreakdown {
        return this.byType(DamageType.holy);
    }

    get psychic(): ResistanceBreakdown {
        return this.byType(DamageType.psychic);
    }

    get categorized(): CategorizedResistances {
        return new CategorizedResistances({
            enhance: this.byCategory(ResistanceCategory.enhance),
            gear: this.byCategory(ResistanceCategory.gear),
            misc: this.byCategory(ResistanceCategory.misc),
            temp: this.byCategory(ResistanceCategory.temp),
        });
    }

    static fromCategorized(source: CategorizedResistancesBuilder): Resistances {
        const curated = new CategorizedResistances(source);
        return new Resistances({
            bludgeoning: curated.byType(DamageType.bludgeoning),
            slashing: curated.byType(DamageType.slashing),
            piercing: curated.byType(DamageType.piercing),
            arcane: curated.byType(DamageType.arcane),
            fire: curated.byType(DamageType.fire),
            cold: curated.byType(DamageType.cold),
            nature: curated.byType(DamageType.nature),
            shadow: curated.byType(DamageType.shadow),
            holy: curated.byType(DamageType.holy),
        });
    }

    static get zero(): Resistances {
        return new Resistances({
            bludgeoning: ResistanceBreakdownImpl.zero,
            slashing: ResistanceBreakdownImpl.zero,
            piercing: ResistanceBreakdownImpl.zero,
            arcane: ResistanceBreakdownImpl.zero,
            fire: ResistanceBreakdownImpl.zero,
            cold: ResistanceBreakdownImpl.zero,
            nature: ResistanceBreakdownImpl.zero,
            shadow: ResistanceBreakdownImpl.zero,
            holy: ResistanceBreakdownImpl.zero,
        });
    }

    updatedByType(data: ResistancesBuilder): Resistances {
        return new Resistances(
            Object.assign({}, this, data) as ResistancesBuilder,
        );
    }

    updatedByCategory(data: CategorizedResistancesBuilder): Resistances {
        const { enhance, gear, misc, temp } = this.categorized;
        const curated = Object.assign({}, { enhance, gear, misc, temp }, data);
        return Resistances.fromCategorized(
            curated as CategorizedResistancesBuilder,
        );
    }

    export(): ResistancesExport {
        return {
            bludgeoning: this.bludgeoning,
            slashing: this.slashing,
            piercing: this.piercing,
            arcane: this.arcane,
            fire: this.fire,
            cold: this.cold,
            nature: this.nature,
            shadow: this.shadow,
            holy: this.holy,
        };
    }
}

export type { ResistancePartialSet, ResistanceSet, ResistancesExport };
export { ResistanceBreakdown, Resistances };
