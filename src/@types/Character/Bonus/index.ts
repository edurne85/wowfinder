import StatsBonus from './Stats';
import SkillsBonus from './Skills';
import ArmorClassBonus from './ArmorClass';

interface BonusBuilder {
    stats: StatsBonus;
    skills: SkillsBonus;
    armorClass: ArmorClassBonus;
}

export default class Bonus {
    private _stats: StatsBonus;
    private _skills: SkillsBonus;
    private _armorClass: ArmorClassBonus;

    constructor({stats, skills, armorClass}: BonusBuilder) {
        this._stats = StatsBonus.combine(stats);
        this._skills = SkillsBonus.combine(skills);
        this._armorClass = ArmorClassBonus.combine(armorClass);
    }

    get stats(): StatsBonus { return StatsBonus.combine(this._stats); }
    get skills(): SkillsBonus { return SkillsBonus.combine(this._skills); }
    get armorClass(): ArmorClassBonus { return ArmorClassBonus.combine(this._armorClass); }

    static get zero(): Bonus {
        return new Bonus({
            stats: StatsBonus.zero,
            skills: SkillsBonus.zero,
            armorClass: ArmorClassBonus.zero,
        });
    }

    static combine(...args: Bonus[]): Bonus {
        return new Bonus({
            stats: StatsBonus.combine(...args.map(a => a._stats)),
            skills: SkillsBonus.combine(...args.map(a => a._skills)),
            armorClass: ArmorClassBonus.combine(...args.map(a => a._armorClass)),
        });
    }
}

export {
    ArmorClassBonus,
    StatsBonus,
    SkillsBonus,
};