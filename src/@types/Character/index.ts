import { forceDataImportKeyS } from '../../utils';
import Stats, { StatSet, zeroDefault } from './Stats';
import CharPersonalDetails, { jsonImport as personalDetailsJsonImport } from './Personal';
import Race from './Race';
import Class, { ClassBonuses, ClassFeature, ClassLevels } from './Class';
import { Speeds } from './Speeds';
import { ArmorValues, FullArmorValues } from './ArmorValues';
import Size from './Size';
import { Saves, SimpleSaves } from './Saves';
import { Resistances } from './Resistances';
import { Bonus, BonusType } from './Bonus';
import Armor from '../Items/Gear/Armor';
import Inventory, { InventoryBuilder } from '../Items/Inventory';
import { Aura, auraBonuses } from './Class/Auras';

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
    inventory?: InventoryBuilder,
}

type Characters = {[key:string]: Character};

const Races = Race.import();
const Classes = Class.import();

export default class Character {
    private _key: string;
    private _personal: CharPersonalDetails;
    private _active: boolean;
    private _stats: Stats;
    private _race?: Race; // TODO Make non-optional once we have base definitions for all races
    private _classes: ClassLevels;
    private _miscHP: number;
    private _skillRanks: SkillRanks;
    private _armor: ArmorValues;
    private _resistances: Resistances;
    private _inventory: Inventory;
    // private _gear: Gear[];

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
        // resistances,
        inventory = Inventory.defaultBuilder,
    }: CharacterBuilder) {
        this._key = key;
        this._personal = personalDetailsJsonImport(personal);
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
        const auraBonuses = this.auraBonuses;
        this._stats = new Stats({
            base: baseStats,
            racial: this._race? this._race.statMods : zeroDefault,
            // TODO ? enhance
            misc: auraBonuses.stats.values,
            // TODO ? temp
        });
        this._miscHP = miscHP;
        this._skillRanks = Object.assign({}, skillRanks);
        this._armor = ArmorValues.zero;
        // this._resistances = new Resistances({...(resistances || {})});
        this._resistances = Resistances.fromCategorized({
            misc: auraBonuses.resistances.values,
        });
        // TODO Refine inventory / gear
        this._inventory = new Inventory(inventory);

        this._cachedClassBonuses = null;
        this._cachedGearBonuses = this._combineGearBonuses();
    }

    private _invalidateCache(): void {
        this._cachedClassBonuses = null;
        this._cachedGearBonuses = null;
    }

    get key(): string { return this._key; }

    get fullName(): string { return this._personal.fullName; }
    
    toString(): string { return this._personal.fullName; }
    
    get active(): boolean { return this._active; }

    get personal(): CharPersonalDetails { return Object.assign({}, this._personal); }

    get stats(): Stats { return this._stats; }

    get race(): Race | null { return this._race || null; }

    get classes(): ClassLevels {
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
            gear: new SimpleSaves(this.gearBonuses.saves),
            misc: SimpleSaves.zero, // TODO
            temp: SimpleSaves.zero, // TODO
        });
    }

    get resistances(): Resistances { return this._resistances; }

    get inventory(): Inventory { return this._inventory; }

    get classBonuses(): ClassBonuses {
        return (this._cachedClassBonuses ||= Class.multiclass(this._classes, this._stats.totals));
    }

    private _combineGearBonuses(): Bonus {
        const combined = Bonus.combine(...(this._inventory.gear.map(g => g.bonuses))).gear;
        this._stats = this._stats.updated({gear: combined.stats.values});
        this._resistances = this._resistances.updatedByCategory({gear: combined.resistances.values});
        const allArmor: Armor[] = this._inventory.gear.filter(g => g instanceof Armor).map(g => g as Armor);
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

    get classFeaturesCondensed(): {feature: ClassFeature, count: number}[] {
        const counts: {[key: string]: number} = {};
        const features = this.classFeatures;
        for (const f of features) {
            if (!(f in counts)) {
                counts[f] = 0;
            }
            counts[f]++;
        }
        return Object.keys(counts).map(k => ({feature: k as ClassFeature, count: counts[k]}));
    }

    get classAuras(): Aura[] {
        return this.classes.map(c => c.cls.auras(c.level)).flat();
    }

    get classAurasCondensed(): {aura: Aura, count: number}[] {
        const counts: {[key: string]: number} = {};
        const auras = this.classAuras;
        for (const a of auras) {
            if (!(a in counts)) {
                counts[a] = 0;
            }
            counts[a]++;
        }
        return Object.keys(counts).map(k => ({aura: k as Aura, count: counts[k]}));
    }

    get auraBonuses(): Bonus {
        return Bonus.sum(BonusType.aura, ...this.classAurasCondensed.map(({aura, count}) => auraBonuses[aura](count)));
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

    static build(raw: any): Character {
        // TODO Validate props
        return new Character(raw);
    }

    private static _imported: Characters | null = null;

    static import(dir = window.Main.asset('Characters')): Characters {
        return (this._imported ||= forceDataImportKeyS<Character>(dir, this.build));
    }
}
