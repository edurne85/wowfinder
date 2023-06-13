import { Bonus, StatsBonus, ResistBonus } from '../../types/Character/Bonus';

interface BonusViewArgs {
    bonus: Bonus;
}

interface StatsBonusViewArgs {
    statsBonus: StatsBonus;
}

interface ResistBonusViewArgs {
    resistBonus: ResistBonus;
}

export { BonusViewArgs, StatsBonusViewArgs, ResistBonusViewArgs };
