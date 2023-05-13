import { Exportable, forceDataImportKeyS, JsonValue, sum } from '../../utils';
import { Armor } from '../Item';
import { Inventory } from '../Item/Inventory';
import {
    CastingMode,
    computedSpellPower,
    FullComputedSpellPower,
    fullComputedSpellPower,
    School,
    SubSchool,
} from '../Magic';
import { ArmorValues, FullArmorValues } from './ArmorValues';
import {
    CharacterBuilder,
    CharacterExport,
    CharacterOverride,
    PersonalCharacterBase,
    SkillRanks,
} from './base';
import { Bonus } from './Bonus';
import { Class, ClassBonuses, ClassFeature, ClassLevels } from './Class';
import { Aura } from './Class/Aura';
import {
    ClassAurasCondensed,
    getAuraBonuses,
    getClassAurasCondensed,
} from './Class/Aura/characterHelpers';
import { CondensedClassFeatures } from './Class/Features';
import {
    getClassFeatures,
    getClassFeaturesCondensed,
} from './Class/Features/characterHelpers';
import { Feat, feats } from './Feats';
import { buildStats, checkClass, checkRace } from './helpers';
import Race from './Race';
import { Resistances } from './Resistances';
import { Saves, SimpleSaves } from './Saves';
import Size from './Size';
import Stats from './Stats';

type Characters = { [key: string]: Character };

class Character extends PersonalCharacterBase implements Exportable<JsonValue> {
    #active: boolean;
    #race: Race;
    #classes: ClassLevels;
    #skillRanks: SkillRanks;
    #armor: ArmorValues;
    #resistances: Resistances;
    #inventory: Inventory;

    #cachedClassBonuses: ClassBonuses | null = null;
    #cachedGearBonuses: Bonus | null = null;

    constructor({
        active = true,
        classes = [],
        skillRanks = {},
        inventory = Inventory.defaultBuilder,
        ...rest
    }: CharacterBuilder) {
        super({
            ...rest,
            builderType: 'race',
        });
        this.#race = checkRace(rest.race);
        this.#active = active;
        this.#classes = [];
        for (const { cls, level } of classes) {
            this.#classes.push({ cls: checkClass(cls), level });
        }
        const auras = this.auraBonuses;
        this.#skillRanks = Object.assign({}, skillRanks);
        this.#armor = ArmorValues.zero;
        this.#resistances = Resistances.fromCategorized({
            misc: auras.resistances.values,
        });
        // TODO Refine inventory / gear
        this.#inventory = new Inventory(inventory);

        this.#forceResetCache();
    }

    setOverride(override: CharacterOverride): void {
        super.setOverride(override);
        this.#forceResetCache();
    }

    clearOverride(): void {
        super.clearOverride();
        this.#forceResetCache();
    }

    #invalidateCache(): void {
        this.#cachedClassBonuses = null;
        this.#cachedGearBonuses = null;
    }

    #forceResetCache(): void {
        this.#cachedClassBonuses = Class.multiclass(
            this.#classes,
            this.stats.totals,
        );
        this.#cachedGearBonuses = this.#combineGearBonuses();
    }

    get active(): boolean {
        return this.#active;
    }

    get stats(): Stats {
        return buildStats({
            base: this.baseStats,
            race: this.#race,
            auras: this.auraBonuses,
            gear: this.gearBonuses,
        });
    }

    get race(): Race | null {
        return this.#race || null;
    }

    get classes(): ClassLevels {
        return this.#classes.map(({ cls, level }) => ({ cls, level }));
    }

    get skillRanks(): SkillRanks {
        return Object.assign({}, this.#skillRanks);
    }

    get armor(): FullArmorValues {
        return FullArmorValues.fromBaseValues({
            base: this.#armor.export(),
            stats: this.stats,
            bab: this.classBonuses.bab,
            size: this.#race?.size || Size.medium,
        });
    }

    get saves(): Saves {
        return new Saves({
            stats: this.stats,
            base: new SimpleSaves(this.classBonuses.saves),
            enhance: SimpleSaves.zero, // TODO
            gear: new SimpleSaves(this.gearBonuses.saves),
            misc: SimpleSaves.zero, // TODO
            temp: SimpleSaves.zero, // TODO
        });
    }

    get resistances(): Resistances {
        return this.#resistances;
    }

    get inventory(): Inventory {
        return this.#inventory;
    }

    get classBonuses(): ClassBonuses {
        return (this.#cachedClassBonuses ||= Class.multiclass(
            this.#classes,
            this.stats.totals,
        ));
    }

    get allFeats(): Feat[] {
        return this.feats.map(entry => entry.feat);
    }

    get validFeats(): Feat[] {
        return this.feats
            .filter(entry => {
                const levelReq =
                    (entry.class
                        ? sum(
                              ...this.#classes
                                  .filter(c => entry.class === c.cls)
                                  .map(c => c.level),
                          )
                        : sum(...this.classes.map(entry => entry.level))) >=
                    entry.level;
                return (
                    entry.level === 0 ||
                    (levelReq && feats[entry.feat].requirements.test(this))
                );
            })
            .map(entry => entry.feat);
    }

    #combineGearBonuses(): Bonus {
        const combined = Bonus.combine(
            ...this.#inventory.gear.map(g => g.bonuses),
        ).gear;
        // this.#stats = this.stats.updated({ gear: combined.stats.values });
        this.#resistances = this.#resistances.updatedByCategory({
            gear: combined.resistances.values,
        });
        const allArmor: Armor[] = this.#inventory.gear
            .filter(g => g instanceof Armor)
            .map(g => g as Armor);
        this.#armor = new ArmorValues({
            armor: Math.max(
                ...allArmor.map(a => a.fullBonus.bonuses.armor.armorClass),
            ),
            shield: Math.max(
                ...allArmor.map(a => a.fullBonus.bonuses.shield.armorClass),
            ),
            nat: this.naturalArmor,
            miscP: combined.armorClass,
        });
        return combined;
    }

    get gearBonuses(): Bonus {
        return (this.#cachedGearBonuses ||= this.#combineGearBonuses());
    }

    get classFeatures(): ClassFeature[] {
        return getClassFeatures(this);
    }

    get classFeaturesCondensed(): CondensedClassFeatures {
        return getClassFeaturesCondensed(this);
    }

    get classAuras(): Aura[] {
        return this.classes.map(c => c.cls.auras(c.level)).flat();
    }

    get classAurasCondensed(): ClassAurasCondensed {
        return getClassAurasCondensed(this);
    }

    get auraBonuses(): Bonus {
        return getAuraBonuses(this);
    }

    spellPower(mode: CastingMode, school: School | SubSchool): number {
        return computedSpellPower(
            this.gearBonuses.spellPower,
            mode,
            school,
            this.stats.totals,
            this.classBonuses.efl,
        );
    }

    get fullSpellPower(): FullComputedSpellPower {
        return fullComputedSpellPower(
            this.gearBonuses.spellPower,
            this.stats.totals,
            this.classBonuses.efl,
        );
    }

    addLevel(cls: Class, levels = 1): ClassLevels {
        const matches = this.#classes.filter(c => c.cls.key === cls.key);
        if (matches.length > 0) {
            matches[0].level += levels;
        } else {
            this.#classes.push({ cls, level: levels });
        }
        this.#invalidateCache();
        return this.classes;
    }

    export(): CharacterExport {
        return {
            ...super.export(),
            race: this.#race?.key || '',
            classes: this.#classes.map(c => ({
                cls: c.cls.key,
                level: c.level,
            })),
            active: this.#active,
            skillRanks: this.#skillRanks,
            resistances: this.#resistances.export(),
            inventory: this.#inventory.export(),
        };
    }

    static build(raw: any): Character {
        // TODO Validate props (https://github.com/edurne85/wowfinder/issues/281)
        return new Character(raw);
    }

    static #imported: Characters | null = null;

    static import(dir = window.Main.asset('Characters')): Characters {
        return (this.#imported ||= forceDataImportKeyS<Character>(
            dir,
            this.build,
        ));
    }
}

export type { Characters, CharacterBuilder, CharacterExport };
export { Character };
