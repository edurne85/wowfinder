import {
    Bonus,
    StatsBonus,
    ResistBonus,
    SkillsBonus,
    SavesBonus,
} from '@model/Character/Bonus';

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

interface SavesBonusViewArgs {
    savesBonus: SavesBonus;
}

export {
    BonusViewArgs,
    StatsBonusViewArgs,
    ResistBonusViewArgs,
    SkillsBonusViewArgs,
    SavesBonusViewArgs,
};
