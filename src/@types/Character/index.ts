import JSON5 from 'json5';
import Stats, { StatSet, zeroDefault } from './Stats';
import CharPersonalDetails, { personalDefaults } from './Personal';
import Race from './Race';
import Class, { ClassBonuses, ClassLevels } from './Class';
import { Speeds } from './Speeds';
import { ArmorValues, FullArmorValues } from './ArmorValues';
import Size from './Size';

interface CharacterBuilder {
    key: string,
    personal: CharPersonalDetails,
    race: string,
    classes: {cls: string, level: number}[],
    active?: boolean,
    miscHP?: number,
    baseStats: StatSet,
    armor?: ArmorValues,
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
    private _armor: ArmorValues;

    constructor({
        key,
        personal,
        active = true,
        baseStats,
        race,
        classes = [],
        miscHP = 0,
        armor = new ArmorValues({}),
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
            enhance: zeroDefault,
            gear: zeroDefault, // TODO
            misc: zeroDefault, // TODO: Class auras?
            temp: zeroDefault,
        });
        this._miscHP = miscHP;
        this._armor = new ArmorValues(armor);
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
            size: this._race?.size || Size.medium,
        });
    }

    get classBonuses(): ClassBonuses {
        return Class.multiclass(this._classes, this._stats.totals);
    }

    addLevel(cls: Class, levels = 1): ClassLevels {
        const matches = this._classes.filter(c => c.cls.key === cls.key);
        if (matches.length > 0) {
            matches[0].level += levels;
        } else {
            this._classes.push({cls, level: levels});
        }
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

    static import(dir = 'data/Characters'): Characters {
        return (this._imported ||= this._importForced(dir));
    }
}
