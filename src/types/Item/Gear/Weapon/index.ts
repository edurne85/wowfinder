import { StatKey } from '../../../Character/Stats';
import { DamageSpec, DamageType, makeFullDamageTypes } from '../../../Damage';
import { Length, LengthUnit } from '../../../Units';
import { Gear, GearBuilder } from '../base';
import WeaponFlags from './Flags';
import WeaponGroup from './Group';
import WeaponProficiency from './Proficiency';
import WeaponRank from './Rank';

type Range = number | Length;
function asFeet(r: Range): Length {
    return typeof r === 'number'
        ? new Length({ value: r as number, unit: LengthUnit.foot })
        : (r as Length);
}

interface WeaponDamageBuilder {
    types: DamageType[];
    baseRoll: {
        sides: number;
        count?: number;
        fixedMod?: number;
    };
    modStat?: StatKey; // TODO #431: add support for variants like finesse
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
    damage: WeaponDamageBuilder[];
    intrinsic?: number;
    groups: Set<WeaponGroup>;
    rank: WeaponRank;
    proficiency: WeaponProficiency;
    flags: Set<WeaponFlags>;
    criticalRange?: number;
    criticalMultiplier?: number;
    range?: Range;
}

class Weapon extends Gear {
    #damage: DamageSpec;
    private _intrinsic: number;
    private _groups: Set<WeaponGroup>;
    private _rank: WeaponRank;
    private _proficiency: WeaponProficiency;
    private _flags: Set<WeaponFlags>;
    private _critRange: number;
    private _critMult: number;
    private _range: Length;

    constructor({
        damage,
        intrinsic = 0,
        groups,
        rank,
        proficiency,
        flags = new Set(),
        criticalRange = 20,
        criticalMultiplier = 2,
        range = 0,
        ...args
    }: WeaponBuilder) {
        super(args);
        this.#damage = buildWeaponDamage(...damage);
        this._intrinsic = intrinsic;
        this._groups = new Set(groups);
        this._rank = rank;
        this._proficiency = proficiency;
        this._flags = new Set(flags);
        this._critRange = criticalRange;
        this._critMult = criticalMultiplier;
        this._range = asFeet(range);
    }

    get intrinsic(): number {
        return this._intrinsic;
    }

    get damage(): DamageSpec {
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
            (this.size as number) +
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

    static preBuild(raw: any): WeaponBuilder {
        return {
            ...Gear.preBuild(raw),
            intrinsic: (raw.intrinsic as number) || 0,
            damage: raw.damage,
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
            range: (raw.range as Range) || 0,
        };
    }

    static build(raw: any = {}): Weapon {
        return new Weapon(Weapon.preBuild(raw));
    }
}

export { WeaponGroup, WeaponRank, WeaponProficiency, WeaponFlags, Weapon };
