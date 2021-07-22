import StatsBonus from './Stats';
import SkillsBonus from './Skills';
import ArmorClassBonus from './ArmorClass';
import VitalNeeds from './VitalNeeds';


interface BonusBuilder {
    stats: StatsBonus;
    skills: SkillsBonus;
    armorClass: ArmorClassBonus;
    vitalNeeds: VitalNeeds;
}

export default class Bonus {
    private _stats: StatsBonus;
    private _skills: SkillsBonus;
    private _armorClass: ArmorClassBonus;
    private _vitalNeeds: VitalNeeds;

    constructor({stats, skills, armorClass, vitalNeeds}: BonusBuilder) {
        this._stats = StatsBonus.combine(stats);
        this._skills = SkillsBonus.combine(skills);
        this._armorClass = ArmorClassBonus.combine(armorClass);
        this._vitalNeeds = vitalNeeds;
        Object.freeze(this);
    }

    get stats(): StatsBonus { return StatsBonus.combine(this._stats); }
    
    get skills(): SkillsBonus { return SkillsBonus.combine(this._skills); }
    
    get armorClass(): ArmorClassBonus { return ArmorClassBonus.combine(this._armorClass); }

    get vitalNeeds(): VitalNeeds { return this._vitalNeeds; }

    static get zero(): Bonus {
        return new Bonus({
            stats: StatsBonus.zero,
            skills: SkillsBonus.zero,
            armorClass: ArmorClassBonus.zero,
            vitalNeeds: VitalNeeds.defaults,
        });
    }

    static combine(...args: Bonus[]): Bonus {
        return new Bonus({
            stats: StatsBonus.combine(...args.map(a => a._stats)),
            skills: SkillsBonus.combine(...args.map(a => a._skills)),
            armorClass: ArmorClassBonus.combine(...args.map(a => a._armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a._vitalNeeds)),
        });
    }
}

export {
    ArmorClassBonus,
    StatsBonus,
    SkillsBonus,
};