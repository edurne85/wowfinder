import { CastingMode } from '.';

interface EffectiveCasterLevels {
    arc: number;
    div: number;
    esp: number;
}

const zeroCasterLevel: EffectiveCasterLevels = {
    arc: 0,
    div: 0,
    esp: 0,
};

function levelByMode(efl: EffectiveCasterLevels, mode: CastingMode): number {
    switch (mode) {
        case CastingMode.arcane:
            return efl.arc;
        case CastingMode.divine:
            return efl.div;
        case CastingMode.spontaneous:
            return efl.esp;
        default:
            return 0;
    }
}

export type { EffectiveCasterLevels };
export { zeroCasterLevel, levelByMode };
