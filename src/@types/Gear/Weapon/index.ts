import Size from '../../Character/Size';
import { Damage } from '../../Damage';
import { Length, LengthUnit } from '../../Units';
import Gear, { GearBuilder } from '../base';
import WeaponFlags from './Flags';
import WeaponGroup from './Group';
import WeaponProficiency from './Proficiency';
import WeaponRank from './Rank';

interface WeaponBuilder extends GearBuilder {
    baseDamage: Damage;
    groups: Set<WeaponGroup>;
    rank: WeaponRank;
    proficiency: WeaponProficiency;
    flags: Set<WeaponFlags>;
    criticalRange?: number;
    criticalMultiplier?: number;
    range?: Length;
}

const defaultRange = new Length({value: 0, unit: LengthUnit.foot});

export default class Weapon extends Gear {
    private _baseDamage: Damage;
    private _groups: Set<WeaponGroup>;
    private _rank: WeaponRank;
    private _proficiency: WeaponProficiency;
    private _flags: Set<WeaponFlags>;
    private _critRange: number;
    private _critMult: number;
    private _range: Length;

    constructor({
        shape,
        size = Size.medium,
        weight,
        bonuses,
        baseDamage,
        groups,
        rank,
        proficiency,
        flags = new Set(),
        criticalRange = 20,
        criticalMultiplier = 2,
        range = defaultRange,
    }: WeaponBuilder) {
        super({shape, size, weight, bonuses});
        this._baseDamage = baseDamage;
        this._groups = new Set(groups);
        this._rank = rank;
        this._proficiency = proficiency;
        this._flags = new Set(flags);
        this._critRange = criticalRange;
        this._critMult = criticalMultiplier;
        this._range = range;
    }

    get baseDamage(): Damage { return this._baseDamage; }

    get groups(): Set<WeaponGroup> { return new Set(this._groups); }

    get rank(): WeaponRank { return this._rank; }

    get proficiency(): WeaponProficiency { return this._proficiency; }

    get flags(): Set<WeaponFlags> { return new Set(this._flags); }

    get criticalRange(): number { return this._critRange; }

    get criticalMultiplier(): number { return this._critMult; }

    get ranged(): boolean { return this._range.value > 0; }

    private get meleeRange(): Length {
        const s = (this._size as number) + (this._flags.has(WeaponFlags.reach) ? 1 : 0);
        const value = Math.floor(5 * Math.pow(2, s));
        return new Length({value, unit: LengthUnit.foot});
    }
    get range(): Length {
        return this.ranged ? this._range : this.meleeRange;
    }
}

export {
    WeaponGroup,
    WeaponRank,
    WeaponProficiency,
    WeaponFlags,
    Weapon,
}