import {
    EffectiveCasterLevels,
    zeroCasterLevel,
    levelByMode,
} from './EffectiveCasterLevels';
import type { Expanded } from '../../utils';
import { Stats, StatSet, zeroDefault } from '../Character/Stats';
import {
    CastingMode,
    CastingModeValues,
    CastingModeValuesPartial,
    castingStats,
    fillCastingModeValues,
} from './CastingMode';

import {
    allSubSchoolsByParent,
    fillSchoolValues,
    fillSubSchoolValues,
    School,
    SchoolValues,
    SchoolValuesPartial,
    SubSchool,
    SubSchoolValues,
    SubSchoolValuesPartial,
} from './School';

type SpellPowerValues<T> = CastingModeValues<T> &
    SchoolValues<T> &
    SubSchoolValues<T>;
type SpellPowerValuesPartial<T> = CastingModeValuesPartial<T> &
    SchoolValuesPartial<T> &
    SubSchoolValuesPartial<T>;

type ComputedSubSchools = Expanded<SubSchoolValuesPartial<number>, number>;
type FullComputedSchools = Expanded<
    SchoolValues<ComputedSubSchools>,
    ComputedSubSchools
>;
type FullComputedSpellPower = CastingModeValues<FullComputedSchools>;
type PartialComputedSchools = SchoolValuesPartial<ComputedSubSchools>;
type PartialComputedSpellPower =
    CastingModeValuesPartial<PartialComputedSchools>;

function fillSpellPowerValues<T>(
    values: SpellPowerValuesPartial<T>,
    defaultValue: T,
): SpellPowerValues<T> {
    return {
        ...fillCastingModeValues<T>(values, defaultValue),
        ...fillSchoolValues<T>(values, defaultValue),
        ...fillSubSchoolValues<T>(values, defaultValue),
    };
}

function computedSpellPower(
    data: SpellPowerValues<number>,
    mode: CastingMode,
    school: School | SubSchool,
    stats?: StatSet,
    efl: EffectiveCasterLevels = zeroCasterLevel,
): number {
    const smods = new Stats({ base: stats || zeroDefault });
    const smod = smods.totalMods[castingStats[mode]];
    return data[mode] + data[school] + smod + levelByMode(efl, mode);
}

function fullComputedSpellPower(
    data: SpellPowerValues<number>,
    stats?: StatSet,
    efl: EffectiveCasterLevels = zeroCasterLevel,
): FullComputedSpellPower {
    const res: PartialComputedSpellPower = {};
    for (const mode of Object.keys(CastingMode)) {
        const m = mode as CastingMode;
        res[m] = {};
        for (const school of Object.keys(School)) {
            const s = school as School;
            res[m]![s] = {
                '': computedSpellPower(data, m, s, stats, efl),
            };
            for (const subSchool of allSubSchoolsByParent[s]) {
                const ss = subSchool as SubSchool;
                res[m]![s]![ss] = computedSpellPower(data, m, ss, stats, efl);
            }
        }
    }
    return res as FullComputedSpellPower;
}

const zeroSpellPower = fullComputedSpellPower(fillSpellPowerValues({}, 0));

export type {
    SpellPowerValues,
    SpellPowerValuesPartial,
    FullComputedSpellPower,
    FullComputedSchools,
    ComputedSubSchools,
};
export {
    fillSpellPowerValues,
    computedSpellPower,
    fullComputedSpellPower,
    zeroSpellPower,
};
