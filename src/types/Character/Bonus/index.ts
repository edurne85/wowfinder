import StatsBonus from './Stats';
import SkillsBonus from './Skills';
import { VitalNeeds } from './VitalNeeds';
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
    enchant = 'enchant',
}

const stackables: BonusType[] = [
    BonusType.gear,
    BonusType.dodge,
    BonusType.temporal,
    BonusType.enchant,
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
    #type: BonusType;
    #hp: number;
    #stats: StatsBonus;
    #skills: SkillsBonus;
    #saves: SavesBonus;
    #resistances: ResistBonus;
    #armorClass: number;
    #vitalNeeds: VitalNeeds;
    #senses: Senses;
    #spellPower: SpellPowerBonus;

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
        this.#type = type;
        this.#hp = hp;
        this.#stats = StatsBonus.sum(stats);
        this.#skills = SkillsBonus.sum(skills);
        this.#saves = SavesBonus.sum(saves);
        this.#resistances = ResistBonus.sum(resistances);
        this.#armorClass = armorClass;
        this.#vitalNeeds = vitalNeeds;
        this.#senses = senses;
        this.#spellPower = spellPower;
        Object.freeze(this);
    }

    get type(): BonusType {
        return this.#type;
    }

    get hp(): number {
        return this.#hp;
    }

    get stats(): StatsBonus {
        return StatsBonus.sum(this.#stats);
    }

    get skills(): SkillsBonus {
        return SkillsBonus.sum(this.#skills);
    }

    get saves(): SavesBonus {
        return SavesBonus.sum(this.#saves);
    }

    get resistances(): ResistBonus {
        return ResistBonus.sum(this.#resistances);
    }

    get armorClass(): number {
        return this.#armorClass;
    }

    get vitalNeeds(): VitalNeeds {
        return this.#vitalNeeds;
    }

    get senses(): Senses {
        return this.#senses;
    }

    get spellPower(): SpellPowerBonus {
        return this.#spellPower;
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
            hp: sum(...args.map(a => a.#hp)),
            stats: StatsBonus.sum(...args.map(a => a.#stats)),
            skills: SkillsBonus.sum(...args.map(a => a.#skills)),
            saves: SavesBonus.sum(...args.map(a => a.#saves)),
            resistances: ResistBonus.sum(...args.map(a => a.#resistances)),
            armorClass: sum(...args.map(a => a.#armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a.#vitalNeeds)),
            senses: Senses.combine(...args.map(a => a.#senses)),
            spellPower: SpellPowerBonus.sum(...args.map(a => a.#spellPower)),
        });
    }

    static max(type: BonusType, ...args: Bonus[]): Bonus {
        return new Bonus({
            type,
            hp: Math.max(...args.map(a => a.#hp)),
            stats: StatsBonus.max(...args.map(a => a.#stats)),
            skills: SkillsBonus.max(...args.map(a => a.#skills)),
            saves: SavesBonus.max(...args.map(a => a.#saves)),
            resistances: ResistBonus.max(...args.map(a => a.#resistances)),
            armorClass: Math.max(...args.map(a => a.#armorClass)),
            vitalNeeds: VitalNeeds.combine(...args.map(a => a.#vitalNeeds)),
            senses: Senses.combine(...args.map(a => a.#senses)),
            spellPower: SpellPowerBonus.max(...args.map(a => a.#spellPower)),
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
    #bonuses: PartialBonuses;

    constructor(bonuses: PartialBonuses) {
        this.#bonuses = Object.assign({}, bonuses);
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
        return Object.assign(MultiBonus.zero, this.#bonuses);
    }

    static #combine(...bonuses: PartialBonuses[]): FullBonuses {
        return Bonus.combine(
            ...bonuses.reduce(
                (acc: Bonus[], val) => acc.concat(Object.values(val)),
                [],
            ),
        );
    }

    static combine(...bonuses: MultiBonus[]): FullBonuses {
        return MultiBonus.#combine(
            ...bonuses
                .map(b => b.#bonuses)
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
