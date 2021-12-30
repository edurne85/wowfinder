import JSON5 from 'json5';
import Stats, { StatSet, zeroDefault } from './Stats';
import CharPersonalDetails, { personalDefaults } from './Personal';
import Race from './Race';
import Class, { ClassBonuses, ClassFeature, ClassLevels } from './Class';
import { Speeds } from './Speeds';
import { ArmorValues, FullArmorValues } from './ArmorValues';
import Size from './Size';
import { Saves, SimpleSaves } from './Saves';
import { Resistances } from './Resistances';
import { buildGear, Gear } from '../Gear';
import { Bonus } from './Bonus';
import Armor from '../Gear/Armor';

type SkillRanks = { [key: string]: number };

interface CharacterBuilder {
    key: string,
    personal: CharPersonalDetails,
    race: string,
    classes: {cls: string, level: number}[],
    active?: boolean,
    miscHP?: number,
    baseStats: StatSet,
    skillRanks?: SkillRanks,
    resistances?: Resistances,
    gear?: Gear[],
}

type Characters = {[key:string]: Character};

const Races = Race.import();
const Classes = Class.import();

export default class Character {
    private key: string;
    private _personal: CharPersonalDetails;
    private _active: boolean;
    private _stats: Stats;
    private _race?: Race; // TODO Make non-optional once we have base definitions for all races
    private _classes: ClassLevels;
    private _miscHP: number;
    private _skillRanks: SkillRanks;
    private _armor: ArmorValues;
    private _resistances: Resistances;
    private _gear: Gear[];

    private _cachedClassBonuses: ClassBonuses | null = null;
    private _cachedGearBonuses: Bonus | null = null;

    constructor({
        key,
        personal,
        active = true,
        baseStats,
        race,
        classes = [],
        miscHP = 0,
        skillRanks = {},
        resistances,
        gear = [],
    }: CharacterBuilder) {
        this.key = key;
        this._personal = Object.assign({}, personalDefaults, personal);
        this._active = active;
        if (race in Races) {
            this._race = Races[race];
        } else {
            if (race) { // TODO Remove condition once _race is not optional
                throw new Error(`Unknown race key: ${race}`);
            }
        }
        this._classes = [];
        for (const {cls, level} of classes) {
            if (cls in Classes) {
                this._classes.push({cls: Classes[cls], level});
            } else {
                throw new Error(`Unknown class key: ${cls}`);
            }
        }
        this._stats = new Stats({
            base: baseStats,
            racial: this._race? this._race.statMods : zeroDefault,
            // TODO ? enhance
            // TODO ? misc (class auras?)
            // TODO ? temp
        });
        this._miscHP = miscHP;
        this._skillRanks = Object.assign({}, skillRanks);
        this._armor = ArmorValues.zero;
        this._resistances = new Resistances({...(resistances || {})});
        // TODO Refine gear 
        this._gear = gear.map(g => buildGear(g));

        this._cachedClassBonuses = null;
        this._combineGearBonuses();
    }

    private _invalidateCache(): void {
        this._cachedClassBonuses = null;
        this._cachedGearBonuses = null;
    }

    get fullName(): string { return this._personal.fullName; }
    
    toString(): string { return this._personal.fullName; }
    
    get active(): boolean { return this._active; }

    get personal(): CharPersonalDetails { return Object.assign({}, this._personal); }

    get stats(): Stats { return this._stats; }

    get race(): Race | null { return this._race || null; }

    get classes(): ClassLevels {
        // defensive copy:
        return this._classes.map(({cls, level}) => ({cls, level}));
    }

    get miscHP(): number { return this._miscHP; }

    get skillRanks(): SkillRanks { return Object.assign({}, this._skillRanks); }

    get speed(): Speeds {
        // TODO Implement
        return new Speeds({
            base: 30,
        });
    }

    get armor(): FullArmorValues {
        return FullArmorValues.fromBaseValues({
            base: this._armor,
            stats: this._stats,
            bab: this.classBonuses.bab,
            size: this._race?.size || Size.medium,
        });
    }

    get saves(): Saves {
        return new Saves({
            stats: this._stats,
            base: new SimpleSaves(this.classBonuses.saves),
            enhance: SimpleSaves.zero, // TODO
            gear: this.gearBonuses.saves,
            misc: SimpleSaves.zero, // TODO
            temp: SimpleSaves.zero, // TODO
        });
    }

    get resistances(): Resistances { return this._resistances; }

    get classBonuses(): ClassBonuses {
        return (this._cachedClassBonuses ||= Class.multiclass(this._classes, this._stats.totals));
    }

    private _combineGearBonuses(): Bonus {
        const combined = Bonus.combine(...(this._gear.map(g => g.bonuses))).gear;
        this._stats = this._stats.updated({gear: combined.stats.values});
        const allArmor: Armor[] = this._gear.filter(g => g instanceof Armor).map(g => g as Armor);
        const armor = Math.max(...allArmor.map(a => a.fullBonus.bonuses.armor.armorClass));
        const shield = Math.max(...allArmor.map(a => a.fullBonus.bonuses.shield.armorClass));
        this._armor = new ArmorValues({
            armor,
            shield,
            miscP: combined.armorClass,
        });
        return combined;
    }

    get gearBonuses(): Bonus {
        return (this._cachedGearBonuses ||= this._combineGearBonuses());
    }

    get classFeatures(): ClassFeature[] {
        return this.classes.map(c => c.cls.features(c.level)).flat();
    }

    addLevel(cls: Class, levels = 1): ClassLevels {
        const matches = this._classes.filter(c => c.cls.key === cls.key);
        if (matches.length > 0) {
            matches[0].level += levels;
        } else {
            this._classes.push({cls, level: levels});
        }
        this._invalidateCache();
        return this.classes;
    }

    private static _import(json: string): Character {
        const obj = JSON5.parse(json) || {};
        return new Character({...obj});
    }

    private static _importForced (dir: string): Characters {
        const byKey: Characters = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Character._import(window.Files.slurp(file));
                if (byKey[raw.key]) {
                    console.warn(`Duplicate character key ${raw.key} found.`);
                }
                byKey[raw.key] = raw;
            } catch (e) {
                console.error(e);
            }
        }
        return Object.freeze(byKey);
    }

    private static _imported: Characters | null = null;

    static import(dir = window.Main.asset('Characters')): Characters {
        return (this._imported ||= this._importForced(dir));
    }
}
