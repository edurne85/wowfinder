import { Bonus, BonusType, ResistBonus, StatsBonus } from '../../Bonus';
import { fillResistBonus } from '../../Bonus/ResistBonus';
import { Aura, AuraBonus } from './base';

const auraBonuses: { [key in Aura]: AuraBonus } = {
    [Aura.commanding]: (rank: number) =>
        new Bonus({
            // Commanding Shout (fgt)
            type: BonusType.aura,
            stats: new StatsBonus({
                CON: rank * 6,
            }),
            resistances: new ResistBonus(fillResistBonus({}, rank * 2)),
        }),
    [Aura.furious]: (rank: number) =>
        new Bonus({
            // Furious Howl (brb)
            type: BonusType.aura,
            stats: new StatsBonus({
                STR: rank * 4,
            }),
            resistances: new ResistBonus(fillResistBonus({}, rank * 4)),
        }),
    [Aura.arcane]: (rank: number) =>
        new Bonus({
            // Arcane brillance (mag)
            type: BonusType.aura,
            stats: new StatsBonus({
                INT: rank * 6,
                CHA: rank * 6,
            }),
        }),
    [Aura.wild]: (rank: number) =>
        new Bonus({
            // Gift of the wild (drd)
            type: BonusType.aura,
            stats: new StatsBonus({
                STR: rank * 2,
                DEX: rank * 2,
                CON: rank * 2,
                INT: rank * 2,
                WIS: rank * 2,
                CHA: rank * 2,
            }),
            resistances: new ResistBonus(fillResistBonus({}, rank * 1)),
        }),
    [Aura.mysterious]: (rank: number) =>
        new Bonus({
            // Misterious Fortitude (ora)
            type: BonusType.aura,
            stats: new StatsBonus({
                CON: rank * 6,
                CHA: rank * 6,
            }),
        }),
    [Aura.fortitude]: (rank: number) =>
        new Bonus({
            // Power Word: Fortitude (clr)
            type: BonusType.aura,
            stats: new StatsBonus({
                CON: rank * 6,
                WIS: rank * 6,
            }),
        }),
};

export { auraBonuses };
