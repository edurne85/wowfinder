import {
    Bonus,
    StatsBonus,
    ResistBonus,
    SkillsBonus,
} from '../../types/Character/Bonus';

interface BonusViewArgs {
    bonus: Bonus;
}

interface StatsBonusViewArgs {
    statsBonus: StatsBonus;
}

interface ResistBonusViewArgs {
    resistBonus: ResistBonus;
}

interface SkillsBonusViewArgs {
    skillBonus: SkillsBonus;
}

export {
    BonusViewArgs,
    StatsBonusViewArgs,
    ResistBonusViewArgs,
    SkillsBonusViewArgs,
};
