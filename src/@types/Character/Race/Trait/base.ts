import JSON5 from 'json5';
import { Bonus, BonusType, SkillsBonus, StatsBonus } from '../../Bonus';
import Senses from '../../Bonus/Senses';
import VitalNeeds from '../../Bonus/VitalNeeds';

enum QualityGroup {
    type = 'type',
    size = 'size',
    speed = 'speed',
    stat = 'stat',
    lang = 'lang',
}

type TraitSpec = Record<string, unknown>;
function stringifySpec (spec: TraitSpec): string {
    return Array.isArray(spec)
        ? (spec as unknown[]).join(', ')
        : JSON5.stringify(spec);
}

type TraitProcessor = (spec: TraitSpec) => Bonus;

function functionLike(str = ''): [string, string] {
    const matches = str.match(/^(\w+)\(.*\)$/) || ['', '', ''];
    return matches.length > 2 ? [matches[1], matches[2]] : [str, ''];
}

const traits: {[key: string]: RaceTrait} = {};

interface RaceTraitBuilder {
    key: string;
    rp: number;
    qualityGroup?: QualityGroup;
    processor: TraitProcessor;
}

class RaceTrait {
    private _key: string;
    private _rp: number;
    private _qGroup: QualityGroup | null;
    private processor: TraitProcessor;

    static parse(full: string): Bonus {
        const [name, spec] = functionLike(full);
        const traitSpec = JSON5.parse(spec);
        if (name in traits) {
            return traits[name].apply(traitSpec);
        } else {
            throw new Error(`Unknown race trait ${name}`);
        }
    }

    constructor({key, rp, qualityGroup, processor}: RaceTraitBuilder) {
        this._key = key;
        this._rp = rp;
        this._qGroup = qualityGroup || null;
        this.processor = processor;
        if (key in traits) {
            console.warn(`Duplicate racial trait key: ${key}`);
        }
        traits[key] = this;
    }

    toString(): string { return this._key; }

    get rp(): number { return this._rp; }

    get qualityGroup(): QualityGroup | null { return this._qGroup; }

    apply(spec: TraitSpec): Bonus {
        return this.processor(spec);
    }
}

interface RaceTraitInstanceBuilder {
    trait: RaceTrait;
    spec: TraitSpec;
}

class RaceTraitInstance {
    private _fullName: string;
    private _bonus: Bonus;

    constructor({trait, spec}: RaceTraitInstanceBuilder) {
        this._fullName = `${trait}(${stringifySpec(spec)})`;
        this._bonus = trait.apply(spec);
    }

    toString(): string { return this._fullName; }

    get bonus(): Bonus { return this._bonus; }
}

function defineTrait({key, rp, processor}: RaceTraitBuilder): RaceTrait {
    traits[key] = new RaceTrait({key, rp, processor});
    return traits[key];
}

function complain(expect: string, spec: TraitSpec): Error {
    return new Error(`Invalid trait definition. Expected: ${expect}; received: ${JSON5.stringify(spec)}.`);
}

interface BonusBuilder {
    hp?: number;
    stats?: StatsBonus;
    skills?: SkillsBonus;
    armorClass?: number;
    vitalNeeds?: VitalNeeds;
    senses?: Senses;
}

function makeRacialBonus({
    hp = 0,
    stats = StatsBonus.zero,
    skills = SkillsBonus.zero,
    armorClass = 0,
    vitalNeeds = VitalNeeds.defaults,
    senses = Senses.defaults,
}: BonusBuilder): Bonus {
    return new Bonus({type: BonusType.racial, hp, stats, skills, armorClass, vitalNeeds, senses});
}

export {
    QualityGroup,
    TraitSpec,
    TraitProcessor,
    RaceTrait,
    RaceTraitInstance, // TODO Consider removal
    traits,
    defineTrait,
    complain,
    makeRacialBonus,
};