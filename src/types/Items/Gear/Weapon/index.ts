import { Bonus, BonusType } from '../../../Character/Bonus';
import Size from '../../../Character/Size';
import { buildDamage, Damage } from '../../../Damage';
import { Length, LengthUnit } from '../../../Units';
import Gear, { GearBuilder, Weight } from '../base';
import WeaponFlags from './Flags';
import WeaponGroup from './Group';
import WeaponProficiency from './Proficiency';
import WeaponRank from './Rank';

type Range = number | Length;
function asFeet(r: Range): Length {
    return (r as Length) || new Length({ value: r as number, unit: LengthUnit.foot });
}

interface WeaponBuilder extends GearBuilder {
    baseDamage: Damage;
    bonusDamage?: Damage;
    intrinsic?: number;
    groups: Set<WeaponGroup>;
    rank: WeaponRank;
    proficiency: WeaponProficiency;
    flags: Set<WeaponFlags>;
    criticalRange?: number;
    criticalMultiplier?: number;
    range?: Range;
}

export default class Weapon extends Gear {
    private _baseDamage: Damage;
    private _bonusDamage: Damage;
    private _intrinsic: number;
    private _groups: Set<WeaponGroup>;
    private _rank: WeaponRank;
    private _proficiency: WeaponProficiency;
    private _flags: Set<WeaponFlags>;
    private _critRange: number;
    private _critMult: number;
    private _range: Length;

    constructor({
        label,
        shape,
        size = Size.medium,
        weight,
        bonuses = Bonus.zero(BonusType.gear),
        baseDamage,
        bonusDamage = {},
        intrinsic = 0,
        groups,
        rank,
        proficiency,
        flags = new Set(),
        criticalRange = 20,
        criticalMultiplier = 2,
        range = 0,
    }: WeaponBuilder) {
        super({label, shape, size, weight, bonuses});
        this._baseDamage = baseDamage;
        this._bonusDamage = bonusDamage;
        this._intrinsic = intrinsic;
        this._groups = new Set(groups);
        this._rank = rank;
        this._proficiency = proficiency;
        this._flags = new Set(flags);
        this._critRange = criticalRange;
        this._critMult = criticalMultiplier;
        this._range = asFeet(range);
    }

    get baseDamage(): Damage { return this._baseDamage; }

    get hasBonusDamage(): boolean {
        return Object.keys(this._bonusDamage).length > 0;
    }

    get bonusDamage(): Damage { return this._bonusDamage; }

    get intrinsic(): number { return this._intrinsic; }

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

    get $type(): string { return 'Weapon'; }

    static build(raw: any = {}): Weapon {
        return new Weapon({
            label: raw.label as string || '',
            shape: raw.shape as string[] || [],
            size: raw.size as Size || 0,
            weight: raw.weight as Weight || 0,
            bonuses: Bonus.build(raw.bonuses || {}),
            baseDamage: buildDamage(raw.baseDamage),
            bonusDamage: buildDamage(raw.bonusDamage || {}),
            intrinsic: raw.intrinsic as number || 0,
            groups: raw.groups as Set<WeaponGroup> || [],
            rank: raw.rank as WeaponRank || WeaponRank.simple,
            proficiency: raw.proficiency as WeaponProficiency || WeaponProficiency.unarmed,
            flags: raw.flags as Set<WeaponFlags> || [],
            criticalRange: raw.criticalRange as number || 20,
            // If we are given a 0 multiplier, we don't want to override it!
            criticalMultiplier: Object.keys(raw).includes('criticalMultiplier') ? raw.criticalMultiplier : 2,
        });
    }
}

export {
    WeaponGroup,
    WeaponRank,
    WeaponProficiency,
    WeaponFlags,
    Weapon,
};