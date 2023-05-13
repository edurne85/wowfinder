import { StatKey } from '../Character/Stats';

enum CastingMode {
    arcane = 'arcane',
    divine = 'divine',
    spontaneous = 'spontaneous',
}

const castingStats = {
    [CastingMode.arcane]: StatKey.INT,
    [CastingMode.divine]: StatKey.WIS,
    [CastingMode.spontaneous]: StatKey.CHA,
};

type CastingModeValues<T> = {
    [key in CastingMode]: T;
};
type CastingModeValuesPartial<T> = {
    [key in CastingMode]?: T;
};

function fillCastingModeValues<T>(
    values: CastingModeValuesPartial<T>,
    defaultValue: T,
): CastingModeValues<T> {
    const full: CastingModeValuesPartial<T> = {};
    const givenKeys = Object.keys(values);
    for (const k of Object.keys(CastingMode)) {
        const c = k as CastingMode;
        full[c] = givenKeys.includes(k) ? values[c] : defaultValue;
    }
    return full as CastingModeValues<T>;
}

export type { CastingModeValues, CastingModeValuesPartial };
export { CastingMode, castingStats, fillCastingModeValues };
