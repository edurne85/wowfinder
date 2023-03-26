import { Bonus, BonusType, StatsBonus } from '../Bonus';
import ResistBonus, { fillResistBonus } from '../Bonus/ResistBonus';

type AuraBonus = (rank: number) => Bonus;

enum Aura {
    commanding = 'commanding',
    arcane = 'arcane',
    wild = 'wild',
    bear = 'bear',
    cat = 'cat',
    moon = 'moon',
    root = 'root',
    mysterious = 'mysterious',
    fortitude = 'fortitude',
}

const auraBonuses: { [key in Aura]: AuraBonus } = {
    [Aura.commanding]: (rank: number) => new Bonus({
        // Commanding Shout (fgt)
        type: BonusType.aura,
        stats: new StatsBonus({
            CON: rank * 6,
        }),
        resistances: new ResistBonus(fillResistBonus({}, rank * 2)),
    }),
    [Aura.arcane]: (rank: number) => new Bonus({
        // Arcane brillance (mag)
        type: BonusType.aura,
        stats: new StatsBonus({
            INT: rank * 6,
            CHA: rank * 6,
        }),
    }),
    [Aura.wild]: (rank: number) => new Bonus({
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
    [Aura.bear]: (rank: number) => new Bonus({
        type: BonusType.aura,
        stats: new StatsBonus({
            STR: rank * 6,
            CON: rank * 6,
        }),
    }),
    [Aura.cat]: (rank: number) => new Bonus({
        type: BonusType.aura,
        stats: new StatsBonus({
            DEX: rank * 6,
        }),
        // TODO: + (15 * rank)' base speed
    }),
    [Aura.moon]: (rank: number) => new Bonus({
        // TODO Pending testing & review!
        type: BonusType.aura,
        stats: new StatsBonus({
            CHA: rank * 6,
        }),
        // TODO + (6 * rank) hit (touch)
    }),
    [Aura.root]: (rank: number) => new Bonus({
        // TODO Pending testing & review!
        type: BonusType.aura,
        stats: new StatsBonus({
            WIS: rank * 6,
        }),
        resistances: new ResistBonus({
            bludgeoning: rank * 4,
            slashing: rank * 4,
            piercing: rank * 4,
        }),
    }),
    [Aura.mysterious]: (rank: number) => new Bonus({
        // Misterious Fortitude (ora)
        type: BonusType.aura,
        stats: new StatsBonus({
            CON: rank * 6,
            CHA: rank * 6,
        }),
    }),
    [Aura.fortitude]: (rank: number) => new Bonus({
        // Power Word: Fortitude (clr)
        type: BonusType.aura,
        stats: new StatsBonus({
            CON: rank * 6,
            WIS: rank * 6,
        }),
    }),
};
export type {
    AuraBonus,
};

export {
    auraBonuses,
    Aura,
};