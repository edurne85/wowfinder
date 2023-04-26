import { statMod } from '../Character/Stats';
import { CastingMode } from './CastingMode';

function slotsByLevelPrep(casterLevel: number, spellLevel: number): number {
    const diff = casterLevel - 2 * spellLevel + 1;
    if (diff < 0 || casterLevel <= 0) return 0;
    if (spellLevel <= 0) {
        return casterLevel > 1 ? 4 : 3;
    }
    return Math.floor((1.0 + Math.sqrt(1 + 8 * diff)) / 2.0);
}

const espSlotsCap = 6;
const espSlotsBase = 3;

function slotsByLevelEsp(casterLevel: number, spellLevel: number): number {
    if (spellLevel <= 0) {
        return 0;
    }
    const diff = casterLevel - spellLevel * 2;
    const extra = spellLevel === 1 ? 1 : 0;
    const slots = (diff >= 0 ? espSlotsBase + diff : 0) + extra;
    return Math.min(espSlotsCap, slots);
}

function slotsByLevel(
    mode: CastingMode,
    casterLevel: number,
    spellLevel: number,
): number {
    switch (mode) {
        case CastingMode.arcane:
        case CastingMode.divine:
            return slotsByLevelPrep(casterLevel, spellLevel);
        case CastingMode.spontaneous:
            return slotsByLevelEsp(casterLevel, spellLevel);
        default:
            return 0;
    }
}

function slotsByStat(stat: number, level: number): number {
    return level <= 0
        ? 0
        : Math.max(0, Math.ceil((statMod(stat) + 1 - level) / 4.0));
}

export { slotsByLevel, slotsByLevelPrep, slotsByStat };
