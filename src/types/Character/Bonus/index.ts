import StatsBonus from './Stats';
import SkillsBonus from './Skills';
import VitalNeeds from './VitalNeeds';
import Senses from './Senses';
import { sum } from '../../../utils';
import SavesBonus from './Saves';
import ResistBonus from './ResistBonus';
import SpellPowerBonus from './SpellPowerBonus';

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
    aura = 'aura',
}

const stackables: BonusType[] = [
    BonusType.gear,
    BonusType.dodge,
    BonusType.temporal,
];

function stackable(type: BonusType): boolean {
    return stackables.includes(type);
}

type PartialBonuses = { [key in BonusType]?: Bonus };
type FullBonuses = { [key in BonusType]: Bonus };

interface BonusBuilder {
    type: BonusType;
    hp?: number;
    stats?: StatsBonus;
    skills?: SkillsBonus;
    saves?: SavesBonus;
    resistances?: ResistBonus;
    armorClass?: number;
    vitalNeeds?: VitalNeeds;
    senses?: Senses;
    spellPower?: SpellPowerBonus;
    // TODO #448: Speed
}

class Bonus {
    private _type: BonusType;
    private _hp: number;
    private _stats: StatsBonus;
    private _skills: SkillsBonus;
    private _saves: SavesBonus;
    private _resistances: ResistBonus;
    private _armorClass: number;
    private _vitalNeeds: VitalNeeds;
    private _senses: Senses;
    private _spellPower: SpellPowerBonus;

    constructor({
        type,
        hp = 0,
        stats = StatsBonus.zero,
        skills = SkillsBonus.zero,
        saves = SavesBonus.zero,
        resistances = ResistBonus.zero,
        armorClass = 0,
        vitalNeeds = VitalNeeds.defaults,
        senses = Senses.defaults,
        spellPower = SpellPowerBonus.zero,
    }: BonusBuilder) {
        this._type = type;
        this._hp = hp;
        this._stats = StatsBonus.sum(stats);
        this._skills = SkillsBonus.sum(skills);
        this._saves = SavesBonus.sum(saves);
        this._resistances = ResistBonus.sum(resistances);
        this._armorClass = armorClass;
        this._vitalNeeds = vitalNeeds;
        this._senses = senses;
        this._spellPower = spellPower;
        Object.freeze(this);
    }

    get type(): BonusType {
        return this._type;
    }

    get hp(): number {
        return this._hp;
    }

    get stats(): StatsBonus {
        return StatsBonus.sum(this._stats);
    }

    get skills(): SkillsBonus {
        return SkillsBonus.sum(this._skills);
    }

    get saves(): SavesBonus {
        return SavesBonus.sum(this._saves);
    }

    get resistances(): ResistBonus {
        return ResistBonus.sum(this._resistances);
    }

    get armorClass(): number {
        return this._armorClass;
    }

    get vitalNeeds(): VitalNeeds {
        return this._vitalNeeds;
    }

    get senses(): Senses {
        return this._senses;
    }

    get spellPower(): SpellPowerBonus {
        return this._spellPower;
    }

    static zero(type: BonusType): Bonus {
        return new Bonus({
            type,
            hp: 0,
            stats: StatsBonus.zero,
            skills: SkillsBonus.zero,
            saves: SavesBonus.zero,
            resistances: ResistBonus.zero,
            armorClass: 0,
            vitalNeeds: VitalNeeds.defaults,
            senses: Senses.defaults,
            spellPower: SpellPowerBonus.zero,
        });
    }

    static sum(type: BonusType, ...args: Bonus[]): Bonus {
        return new Bonus({
            type,
            hp: sum(...args.map(a => a._hp)),
            stats: StatsBonus.sum(...args.map(a => a._stats)),
            skills: SkillsBonus.sum(...args.map(a => a._skills)),
            saves: SavesBonus.sum(...args.map(a => a._saves)),
            resistances: ResistBonus.sum(...args.map(a => a._resistances)),
            armorClass: sum(...args.map(a => a._armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a._vitalNeeds)),
            senses: Senses.combine(...args.map(a => a._senses)),
            spellPower: SpellPowerBonus.sum(...args.map(a => a._spellPower)),
        });
    }

    static max(type: BonusType, ...args: Bonus[]): Bonus {
        return new Bonus({
            type,
            hp: Math.max(...args.map(a => a._hp)),
            stats: StatsBonus.max(...args.map(a => a._stats)),
            skills: SkillsBonus.max(...args.map(a => a._skills)),
            saves: SavesBonus.max(...args.map(a => a._saves)),
            resistances: ResistBonus.max(...args.map(a => a._resistances)),
            armorClass: Math.max(...args.map(a => a._armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a._vitalNeeds)),
            senses: Senses.combine(...args.map(a => a._senses)),
            spellPower: SpellPowerBonus.max(...args.map(a => a._spellPower)),
        });
    }

    asType(t: BonusType): Bonus {
        return this.type === t ? this : Bonus.zero(t);
    }

    static combine(...args: Bonus[]): FullBonuses {
        const result: PartialBonuses = {};
        for (const type of Object.keys(BonusType)) {
            const t = type as BonusType;
            result[t] = stackable(t)
                ? Bonus.sum(t, ...args.map(b => b.asType(t)))
                : Bonus.max(t, ...args.map(b => b.asType(t)));
        }
        return result as FullBonuses;
    }

    retyped(type: BonusType): Bonus {
        const {
            hp,
            stats,
            skills,
            saves,
            resistances,
            armorClass,
            vitalNeeds,
            senses,
            spellPower,
        } = this;
        return new Bonus({
            type,
            hp,
            stats,
            skills,
            saves,
            resistances,
            armorClass,
            vitalNeeds,
            senses,
            spellPower,
        });
    }

    static build(raw: any = {}): Bonus {
        return new Bonus({
            type: (raw.type as BonusType) || BonusType.temporal,
            hp: (raw.hp as number) || 0,
            stats: StatsBonus.build(raw.stats),
            skills: SkillsBonus.build(raw.skills),
            saves: SavesBonus.build(raw.saves),
            resistances: ResistBonus.build(raw.resistances),
            armorClass: (raw.armorClass as number) || 0,
            vitalNeeds: VitalNeeds.build(raw.vitalNeeds),
            senses: Senses.build(raw.senses),
            spellPower: SpellPowerBonus.build(raw.spellPower),
        });
    }
}

class MultiBonus {
    private _bonuses: PartialBonuses;

    constructor(bonuses: PartialBonuses) {
        this._bonuses = Object.assign({}, bonuses);
    }

    static get zero(): FullBonuses {
        const b: PartialBonuses = {};
        for (const type of Object.keys(BonusType)) {
            const t = type as BonusType;
            b[t] = Bonus.zero(t);
        }
        return b as FullBonuses;
    }

    get bonuses(): FullBonuses {
        return Object.assign(MultiBonus.zero, this._bonuses);
    }

    private static _combine(...bonuses: PartialBonuses[]): FullBonuses {
        return Bonus.combine(
            ...bonuses.reduce(
                (acc: Bonus[], val) => acc.concat(Object.values(val)),
                [],
            ),
        );
    }

    static combine(...bonuses: MultiBonus[]): FullBonuses {
        return MultiBonus._combine(
            ...bonuses
                .map(b => b._bonuses)
                .reduce((acc: PartialBonuses[], val) => acc.concat(val), []),
        );
    }
}

interface BonusProvider {
    get fullBonus(): MultiBonus;
}

export type { BonusProvider };

export {
    BonusBuilder,
    BonusType,
    Bonus,
    MultiBonus,
    StatsBonus,
    SkillsBonus,
    VitalNeeds,
    Senses,
    SavesBonus,
    ResistBonus,
    SpellPowerBonus,
};
