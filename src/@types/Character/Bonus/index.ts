import StatsBonus from './Stats';
import SkillsBonus from './Skills';
import VitalNeeds from './VitalNeeds';
import Senses from './Senses';
import { sum } from '../../../utils';

enum BonusType {
    armor = 'armor',
    gear = 'gear',
    racial = 'racial',
    shield = 'shield',
    complement = 'complement',
    enhancement = 'enhancement',
    deflection = 'deflection',
    dodge = 'dodge',
    natural = 'natural',
    temporal = 'temporal',
}

const stackables: BonusType[] = [
    BonusType.gear, BonusType.dodge, BonusType.temporal,
];

function stackable(type: BonusType): boolean {
    return stackables.includes(type);
}

type partialBonuses = {[key in BonusType]?: Bonus};
type fullBonuses = {[key in BonusType]: Bonus};

interface BonusBuilder {
    type: BonusType;
    hp: number,
    stats: StatsBonus;
    skills: SkillsBonus;
    armorClass: number;
    vitalNeeds: VitalNeeds;
    senses: Senses;
}

class Bonus {
    private _type: BonusType;
    private _hp: number;
    private _stats: StatsBonus;
    private _skills: SkillsBonus;
    private _armorClass: number;
    private _vitalNeeds: VitalNeeds;
    private _senses: Senses;

    constructor({type, hp, stats, skills, armorClass, vitalNeeds, senses}: BonusBuilder) {
        this._type = type;
        this._hp = hp;
        this._stats = StatsBonus.sum(stats);
        this._skills = SkillsBonus.sum(skills);
        this._armorClass = armorClass;
        this._vitalNeeds = vitalNeeds;
        this._senses = senses;
        Object.freeze(this);
    }

    get type(): BonusType { return this._type; }

    get hp(): number { return this._hp; }

    get stats(): StatsBonus { return StatsBonus.sum(this._stats); }
    
    get skills(): SkillsBonus { return SkillsBonus.sum(this._skills); }
    
    get armorClass(): number { return this._armorClass; }

    get vitalNeeds(): VitalNeeds { return this._vitalNeeds; }

    get senses(): Senses { return this._senses; }

    static zero(type: BonusType): Bonus {
        return new Bonus({
            type,
            hp: 0,
            stats: StatsBonus.zero,
            skills: SkillsBonus.zero,
            armorClass: 0,
            vitalNeeds: VitalNeeds.defaults,
            senses: Senses.defaults,
        });
    }

    static sum(type: BonusType, ...args: Bonus[]): Bonus {
        return new Bonus({
            type,
            hp: sum(...args.map(a => a._hp)),
            stats: StatsBonus.sum(...args.map(a => a._stats)),
            skills: SkillsBonus.sum(...args.map(a => a._skills)),
            armorClass: sum(...args.map(a => a._armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a._vitalNeeds)),
            senses: Senses.combine(...args.map(a => a._senses)),
        });
    }

    static max(type: BonusType, ...args: Bonus[]): Bonus {
        return new Bonus({
            type,
            hp: Math.max(...args.map(a => a._hp)),
            stats: StatsBonus.max(...args.map(a => a._stats)),
            skills: SkillsBonus.max(...args.map(a => a._skills)),
            armorClass: Math.max(...args.map(a => a._armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a._vitalNeeds)),
            senses: Senses.combine(...args.map(a => a._senses)),
        });
    }

    private _asType(t: BonusType): Bonus {
        return this.type === t ? this : Bonus.zero(t);
    }

    static combine(...args: Bonus[]): fullBonuses {
        const result: partialBonuses = {};
        for (const type of Object.keys(BonusType)) {
            const t = type as BonusType;
            result[t] = stackable(t)
                ? Bonus.sum(t, ...args.map(b => b._asType(t)))
                : Bonus.max(t, ...args.map(b => b._asType(t)));
        }
        return result as fullBonuses;
    }
}

class MultiBonus {
    private _bonuses: partialBonuses;

    constructor(bonuses: partialBonuses) {
        this._bonuses = Object.assign({}, bonuses);
    }

    static get zero(): fullBonuses {
        const b: partialBonuses = {};
        for (const type of Object.keys(BonusType)) {
            const t = type as BonusType;
            b[t] = Bonus.zero(t);
        }
        return b as fullBonuses;
    }

    get bonuses(): fullBonuses {
        return Object.assign(MultiBonus.zero, this._bonuses);
    }

    private static _combine(...bonuses: partialBonuses[]): fullBonuses {
        return Bonus.combine(...bonuses.reduce((acc: Bonus[], val) => acc.concat(Object.values(val)), []));
    }

    static combine(...bonuses: MultiBonus[]): fullBonuses {
        return MultiBonus._combine(
            ...bonuses
                .map(b => b._bonuses)
                .reduce(
                    (acc: partialBonuses[], val) => acc.concat(val), []
                ));
    }
}

export {
    BonusType,
    Bonus,
    MultiBonus,
    StatsBonus,
    SkillsBonus,
};