import { StatKey, statMod } from '../Character/Stats';
import { DamageRollArguments } from './DamageRollArguments';

enum SpecialDamageModifier {
    SpellPower = 'SpellPower',
    Finesse = 'Finesse',
}

type DamageModifier = StatKey | SpecialDamageModifier;

function computeModifier(
    modifier: DamageModifier,
    { stats, casterLevel, feats = [] }: DamageRollArguments,
    multiplier = 1,
): number {
    let base: number;
    switch (modifier) {
        case SpecialDamageModifier.SpellPower:
            base = casterLevel;
            break;
        case SpecialDamageModifier.Finesse:
            base = statMod(
                feats.includes('weaponFinesse')
                    ? Math.max(stats.DEX, stats.STR)
                    : stats.STR,
            );
            break;
        default:
            base = statMod(stats[modifier]);
    }
    return base * multiplier;
}

export { DamageModifier, SpecialDamageModifier, computeModifier };
