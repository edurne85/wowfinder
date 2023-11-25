import { StatKey, statMod } from '../../Character/Stats';
import type { StatSet } from '../../Character/Stats';
import type { DamageComponentSpecBuilder } from '../DamageComponent';
import type { FullDamageTypes } from '../DamageType';
import type { DamageRollArguments } from '../DamageRollArguments';

const mockDamageTypes: FullDamageTypes = {
    bludgeoning: true,
    slashing: false,
    piercing: false,
    arcane: false,
    fire: true,
    cold: false,
    nature: false,
    shadow: false,
    holy: false,
    psychic: true,
};

const damageComponentSpecBuilder: DamageComponentSpecBuilder = {
    // 2d6+3 + STR
    // Min roll (assume STR bonus is -1): 4
    // Max roll (assume STR bonus is -1): 14
    types: mockDamageTypes,
    diceCount: 2,
    diceSides: 6,
    fixedMod: 3,
    modStat: StatKey.STR,
};
const stats: StatSet = {
    [StatKey.STR]: 8,
    [StatKey.DEX]: 12,
    [StatKey.CON]: 14,
    [StatKey.INT]: 10,
    [StatKey.WIS]: 13,
    [StatKey.CHA]: 15,
};

const statsBadFinnesse: StatSet = {
    [StatKey.STR]: 12,
    [StatKey.DEX]: 8,
    [StatKey.CON]: 14,
    [StatKey.INT]: 10,
    [StatKey.WIS]: 13,
    [StatKey.CHA]: 15,
};

const rollArgsSimple: DamageRollArguments = {
    stats,
    casterLevel: 0,
    spellPower: 0,
};

const rollArgsFinesseSpell: DamageRollArguments = {
    stats,
    casterLevel: 0,
    spellPower: 0,
    feats: ['weaponFinesse'],
};

const rollArgsBadFinnese: DamageRollArguments = {
    stats: statsBadFinnesse,
    casterLevel: 0,
    spellPower: 0,
    feats: ['weaponFinesse'],
};

const minRoll = (spec: DamageComponentSpecBuilder, stats: StatSet): number =>
    spec.diceCount +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);
const maxRoll = (spec: DamageComponentSpecBuilder, stats: StatSet): number =>
    spec.diceCount * spec.diceSides +
    (spec.fixedMod ?? 0) +
    (spec.modStat ? statMod(stats[spec.modStat]) : 0);

export {
    mockDamageTypes,
    damageComponentSpecBuilder,
    stats,
    statsBadFinnesse,
    rollArgsSimple,
    rollArgsFinesseSpell,
    rollArgsBadFinnese,
    minRoll,
    maxRoll,
};
