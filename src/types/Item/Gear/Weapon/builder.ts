import { StatKey } from '@model/Character/Stats';
import { DamageSpec, DamageType, makeFullDamageTypes } from '@model/Damage';
import { Gear, GearBuilder } from '../base';
import WeaponFlags from './Flags';
import WeaponGroup from './Group';
import WeaponProficiency from './Proficiency';
import WeaponRank from './Rank';
import { Range } from './helpers';

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

function preBuildWeapon(raw: any): WeaponBuilder {
    return {
        ...Gear.preBuild(raw),
        intrinsic: (raw.intrinsic as number) || 0,
        damage: raw.damage,
        groups: (raw.groups as Set<WeaponGroup>) || [],
        rank: (raw.rank as WeaponRank) || WeaponRank.simple,
        proficiency:
            (raw.proficiency as WeaponProficiency) || WeaponProficiency.unarmed,
        flags: (raw.flags as Set<WeaponFlags>) || [],
        criticalRange: (raw.criticalRange as number) || 20,
        criticalMultiplier: raw.criticalMultiplier ?? 2,
        range: (raw.range as Range) || 0,
    };
}

export { buildWeaponDamage, preBuildWeapon };
export type { WeaponBuilder, WeaponDamageBuilder };
