import { StatKey, StatSet } from './Stats';

enum Skill {
    acrobatics = 'acrobatics',
    appraise = 'appraise',
    athletics = 'athletics',
    bluff = 'bluff',
    alchemy = 'alchemy',
    blacksmithing = 'blacksmithing',
    cooking = 'cooking',
    inscription = 'inscription',
    jewelcrafting = 'jewelcrafting',
    leatherworking = 'leatherworking',
    tailoring = 'tailoring',
    technology = 'technology',
    woodworking = 'woodworking',
    diplomacy = 'diplomacy',
    disarm = 'disarm',
    disguise = 'disguise',
    escape = 'escape',
    handleAnimal = 'handleAnimal',
    heal = 'heal',
    intimidate = 'intimidate',
    linguistics = 'linguistics',
    arcane = 'arcane',
    dungeons = 'dungeons',
    engineering = 'engineering',
    geography = 'geography',
    history = 'history',
    nature = 'nature',
    nobility = 'nobility',
    planes = 'planes',
    religion = 'religion',
    perception = 'perception',
    act = 'act',
    comedy = 'comedy',
    dance = 'dance',
    keyboard = 'keyboard',
    percussion = 'percussion',
    sing = 'sing',
    speech = 'speech',
    string = 'string',
    wind = 'wind',
    butchery = 'butchery',
    enchanting = 'enchanting',
    fishing = 'fishing',
    herbalism = 'herbalism',
    lumbering = 'lumbering',
    mining = 'mining',
    skinning = 'skinning',
    ride = 'ride',
    senseMotive = 'senseMotive',
    sleight = 'sleight',
    stealth = 'stealth',
}

const classTrainedBonus = 3;

interface SkillSpecBuilder {
    key: Skill;
    primary: StatKey;
    secondary: StatKey | null;
    trainedOnly: boolean;
    sizeModFactor: number;
}

interface SkillTotalBuilder {
    stats: StatSet;
    ranks: { [key in Skill]?: number };
    byClass: Skill[];
    acp: number;
    size: number;
}

class SkillSpec {
    private _key: Skill;
    private _primary: StatKey;
    private _secondary: StatKey | null;
    private _trainedOnly: boolean;
    private _sizeModFactor: number;

    constructor({
        key,
        primary,
        secondary = null,
        trainedOnly = false,
        sizeModFactor = 0,
    }: SkillSpecBuilder) {
        this._key = key;
        this._primary = primary;
        this._secondary = secondary;
        this._trainedOnly = trainedOnly;
        this._sizeModFactor = sizeModFactor;
        Object.freeze(this);
    }

    get primary(): StatKey {
        return this._primary;
    }

    get secondary(): StatKey | null {
        return this._secondary;
    }

    get trainedOnly(): boolean {
        return this._trainedOnly;
    }

    get acp(): number {
        return this._primary === StatKey.STR || this._primary === StatKey.DEX
            ? 1
            : 0;
    }

    get sizeModFactor(): number {
        return this._sizeModFactor;
    }

    total({
        stats,
        ranks = {},
        byClass = [],
        acp = 0,
        size = 0,
    }: SkillTotalBuilder): number | null {
        const isClass = byClass.includes(this._key);
        const tRanks = ranks[this._key] || 0;
        const isTrained = tRanks > 0;
        const trainedBonus = isClass && isTrained ? classTrainedBonus : 0;
        if (this._trainedOnly && !isTrained && !isClass) {
            return null;
        }
        const primary = stats[this._primary];
        const secondary: number | null = this._secondary
            ? stats[this._secondary]
            : null;
        const statBonus: number =
            secondary == null ? primary : Math.max(primary, secondary);

        // TODO: Racial, Gear, Misc, Temp
        return (
            statBonus +
            tRanks +
            trainedBonus +
            this.acp * acp +
            this._sizeModFactor * size
        );
    }
}

function mkSkill(
    key: Skill,
    primary: StatKey,
    secondary: StatKey | null = null,
    trainedOnly = false,
    sizeModFactor = 0,
): SkillSpec {
    return new SkillSpec({
        key,
        primary,
        secondary,
        trainedOnly,
        sizeModFactor,
    });
}
const Skills: { [key in Skill]: SkillSpec } = {
    acrobatics: mkSkill(Skill.acrobatics, StatKey.DEX, null, false, -2),
    athletics: mkSkill(Skill.athletics, StatKey.STR),
    appraise: mkSkill(Skill.appraise, StatKey.INT),
    bluff: mkSkill(Skill.bluff, StatKey.CHA),
    alchemy: mkSkill(Skill.alchemy, StatKey.INT, StatKey.DEX, true),
    blacksmithing: mkSkill(Skill.blacksmithing, StatKey.INT, StatKey.DEX, true),
    cooking: mkSkill(Skill.cooking, StatKey.INT, StatKey.DEX, true),
    inscription: mkSkill(Skill.inscription, StatKey.INT, StatKey.DEX, true),
    jewelcrafting: mkSkill(Skill.jewelcrafting, StatKey.INT, StatKey.DEX, true),
    leatherworking: mkSkill(
        Skill.leatherworking,
        StatKey.INT,
        StatKey.DEX,
        true,
    ),
    tailoring: mkSkill(Skill.tailoring, StatKey.INT, StatKey.DEX, true),
    technology: mkSkill(Skill.technology, StatKey.INT, StatKey.DEX, true),
    woodworking: mkSkill(Skill.woodworking, StatKey.INT, StatKey.DEX, true),
    diplomacy: mkSkill(Skill.diplomacy, StatKey.CHA),
    disarm: mkSkill(Skill.disarm, StatKey.DEX, null, true),
    disguise: mkSkill(Skill.disguise, StatKey.CHA),
    escape: mkSkill(Skill.escape, StatKey.DEX, null, false, -2),
    handleAnimal: mkSkill(Skill.handleAnimal, StatKey.CHA),
    heal: mkSkill(Skill.heal, StatKey.WIS),
    intimidate: mkSkill(Skill.intimidate, StatKey.CHA, StatKey.STR, false, 2),
    linguistics: mkSkill(Skill.linguistics, StatKey.INT, null, true),
    arcane: mkSkill(Skill.arcane, StatKey.INT, StatKey.WIS, true),
    dungeons: mkSkill(Skill.dungeons, StatKey.INT, StatKey.WIS, true),
    engineering: mkSkill(Skill.engineering, StatKey.INT, StatKey.WIS, true),
    geography: mkSkill(Skill.geography, StatKey.INT, StatKey.WIS, true),
    history: mkSkill(Skill.history, StatKey.INT, StatKey.WIS, true),
    nature: mkSkill(Skill.nature, StatKey.INT, StatKey.WIS, true),
    nobility: mkSkill(Skill.nobility, StatKey.INT, StatKey.WIS, true),
    planes: mkSkill(Skill.planes, StatKey.INT, StatKey.WIS, true),
    religion: mkSkill(Skill.religion, StatKey.INT, StatKey.WIS, true),
    perception: mkSkill(Skill.perception, StatKey.WIS),
    act: mkSkill(Skill.act, StatKey.CHA),
    comedy: mkSkill(Skill.comedy, StatKey.CHA),
    dance: mkSkill(Skill.dance, StatKey.CHA),
    keyboard: mkSkill(Skill.keyboard, StatKey.CHA),
    percussion: mkSkill(Skill.percussion, StatKey.CHA),
    sing: mkSkill(Skill.sing, StatKey.CHA),
    speech: mkSkill(Skill.speech, StatKey.CHA),
    string: mkSkill(Skill.string, StatKey.CHA),
    wind: mkSkill(Skill.wind, StatKey.CHA),
    butchery: mkSkill(Skill.butchery, StatKey.WIS, StatKey.INT, true),
    enchanting: mkSkill(Skill.enchanting, StatKey.WIS, StatKey.INT, true),
    fishing: mkSkill(Skill.fishing, StatKey.WIS, StatKey.INT, true),
    herbalism: mkSkill(Skill.herbalism, StatKey.WIS, StatKey.INT, true),
    lumbering: mkSkill(Skill.lumbering, StatKey.WIS, StatKey.INT, true),
    mining: mkSkill(Skill.mining, StatKey.WIS, StatKey.INT, true),
    skinning: mkSkill(Skill.skinning, StatKey.WIS, StatKey.INT, true),
    ride: mkSkill(Skill.ride, StatKey.DEX),
    senseMotive: mkSkill(Skill.senseMotive, StatKey.WIS),
    sleight: mkSkill(Skill.sleight, StatKey.DEX, null, true),
    stealth: mkSkill(Skill.stealth, StatKey.DEX, null, false, -4),
};

type SkillSet = { [key in Skill]?: number };

export default Skills;
export { Skill, SkillSet, classTrainedBonus };
