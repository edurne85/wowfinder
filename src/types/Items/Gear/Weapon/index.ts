/* eslint-disable */
import { DamageSpec, DamageType, makeFullDamageTypes } from '../../../Damage';
import { Bonus, BonusType } from '../../../Character/Bonus';
import Size from '../../../Character/Size';
import { buildDamage, Damage } from '../../../Damage/Damage';
import { Length, LengthUnit } from '../../../Units';
import Gear, { GearBuilder, Weight } from '../base';
import WeaponFlags from './Flags';
import WeaponGroup from './Group';
import WeaponProficiency from './Proficiency';
import WeaponRank from './Rank';
import { StatKey } from '../../../Character/Stats';

type Range = number | Length;
function asFeet(r: Range): Length {
    return (
        (r as Length) ||
        new Length({ value: r as number, unit: LengthUnit.foot })
    );
}

interface WeaponDamageBuilder {
    types: DamageType[];
    baseRoll: {
        sides: number;
        count?: number;
        fixedMod?: number;
    };
    modStat?: StatKey; // TODO: add support for variants like finesse
}

function buildWeaponDamage(...specs: WeaponDamageBuilder[]): DamageSpec {
    return new DamageSpec({
        components: specs.map(s => ({
            types: makeFullDamageTypes(...s.types),
            diceCount: s.baseRoll.count || 1,
            diceSides: s.baseRoll.sides,
            fixedMod: s.baseRoll.fixedMod || 0,
            modStat: s.modStat,
        })),
    });
}

interface WeaponBuilder extends GearBuilder {
    /** @deprecated use damage instead */
    baseDamage: Damage;
    /** @deprecated use damage instead */
    bonusDamage?: Damage;
    damage?: WeaponDamageBuilder[];
    intrinsic?: number;
    groups: Set<WeaponGroup>;
    rank: WeaponRank;
    proficiency: WeaponProficiency;
    flags: Set<WeaponFlags>;
    criticalRange?: number;
    criticalMultiplier?: number;
    range?: Range;
}

/** @deprecated Use members in types/Item instead */
export default class Weapon extends Gear {
    private _baseDamage: Damage;
    private _bonusDamage: Damage;
    #damage?: DamageSpec;
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
        damage,
        intrinsic = 0,
        groups,
        rank,
        proficiency,
        flags = new Set(),
        criticalRange = 20,
        criticalMultiplier = 2,
        range = 0,
    }: WeaponBuilder) {
        super({ label, shape, size, weight, bonuses });
        this._baseDamage = baseDamage;
        this._bonusDamage = bonusDamage;
        if (damage) {
            this.#damage = buildWeaponDamage(...damage);
        }
        this._intrinsic = intrinsic;
        this._groups = new Set(groups);
        this._rank = rank;
        this._proficiency = proficiency;
        this._flags = new Set(flags);
        this._critRange = criticalRange;
        this._critMult = criticalMultiplier;
        this._range = asFeet(range);
    }

    /** @deprecated use damage instead */
    get baseDamage(): Damage {
        return this._baseDamage;
    }

    /** @deprecated use damage instead */
    get hasBonusDamage(): boolean {
        return Object.keys(this._bonusDamage).length > 0;
    }

    /** @deprecated use damage instead */
    get bonusDamage(): Damage {
        return this._bonusDamage;
    }

    get intrinsic(): number {
        return this._intrinsic;
    }

    get damage(): DamageSpec | undefined {
        return this.#damage;
    }

    get groups(): Set<WeaponGroup> {
        return new Set(this._groups);
    }

    get rank(): WeaponRank {
        return this._rank;
    }

    get proficiency(): WeaponProficiency {
        return this._proficiency;
    }

    get flags(): Set<WeaponFlags> {
        return new Set(this._flags);
    }

    get criticalRange(): number {
        return this._critRange;
    }

    get criticalMultiplier(): number {
        return this._critMult;
    }

    get ranged(): boolean {
        return this._range.value > 0;
    }

    private get meleeRange(): Length {
        const s =
            (this._size as number) +
            (this._flags.has(WeaponFlags.reach) ? 1 : 0);
        const value = Math.floor(5 * Math.pow(2, s));
        return new Length({ value, unit: LengthUnit.foot });
    }

    get range(): Length {
        return this.ranged ? this._range : this.meleeRange;
    }

    get $type(): string {
        return 'Weapon';
    }

    static build(raw: any = {}): Weapon {
        return new Weapon({
            label: (raw.label as string) || '',
            shape: (raw.shape as string[]) || [],
            size: (raw.size as Size) || 0,
            weight: (raw.weight as Weight) || 0,
            bonuses: Bonus.build(raw.bonuses || {}),
            baseDamage: buildDamage(raw.baseDamage),
            bonusDamage: buildDamage(raw.bonusDamage || {}),
            damage: raw.damage,
            intrinsic: (raw.intrinsic as number) || 0,
            groups: (raw.groups as Set<WeaponGroup>) || [],
            rank: (raw.rank as WeaponRank) || WeaponRank.simple,
            proficiency:
                (raw.proficiency as WeaponProficiency) ||
                WeaponProficiency.unarmed,
            flags: (raw.flags as Set<WeaponFlags>) || [],
            criticalRange: (raw.criticalRange as number) || 20,
            // If we are given a 0 multiplier, we don't want to override it!
            criticalMultiplier: Object.keys(raw).includes('criticalMultiplier')
                ? raw.criticalMultiplier
                : 2,
        });
    }
}

export { WeaponGroup, WeaponRank, WeaponProficiency, WeaponFlags, Weapon };
