import { forceDataImportKeyS } from '../../../utils';
import { Money } from '../../Item';
import { Skill } from '../Skills';
import { StatSet } from '../Stats';
import type { Aura, AurasList } from './Aura';
import {
    CastingProgression,
    ClassBase,
    Classes,
    ClassLevels,
    SavesProgression,
} from './base';
import { applyClassDefaults, ClassBuilder, preBuild } from './builder';
import { ClassBonuses } from './ClassBonuses';
import { ClassTier } from './ClassTier';
import { combineClassBonuses } from './combineBonuses';
import type { ClassFeature, FeaturesList } from './Features';
import { filterSkills, mapAuras, mapFeatures } from './helpers';

class Class implements ClassBase {
    #key: string;
    #tier: ClassTier;
    #hd: number;
    #bab: number;
    #saves: SavesProgression;
    #skl: number;
    #casting: CastingProgression;
    #wealth: number;
    #features: FeaturesList;
    #auras: AurasList;
    #skills: Set<Skill>;

    constructor(rawArgs: ClassBuilder) {
        const args = applyClassDefaults(rawArgs);
        this.#key = args.key;
        this.#tier = args.tier;
        this.#hd = args.hd;
        this.#bab = args.bab;
        this.#saves = {
            fortitude: args.fort,
            reflexes: args.refl,
            will: args.will,
        };
        this.#skl = args.skl;
        this.#casting = {
            arcane: args.arc,
            divine: args.div,
            spontaneous: args.esp,
        };
        this.#wealth = args.wealth;
        this.#features = mapFeatures(args.features);
        this.#auras = mapAuras(args.features);
        this.#skills = filterSkills(args.skills);
    }

    get key(): string {
        return this.#key;
    }

    get tier(): ClassTier {
        return this.#tier;
    }

    get hitDie(): number {
        return this.#hd;
    }

    get baseAttack(): number {
        return this.#bab;
    }

    get saves(): SavesProgression {
        return { ...this.#saves };
    }

    get skillRanks(): number {
        return this.#skl;
    }

    get classSkills(): Set<Skill> {
        return new Set(this.#skills);
    }

    get casting(): CastingProgression {
        return { ...this.#casting };
    }

    get featuresList(): FeaturesList {
        return [...this.#features];
    }

    features(level: number): ClassFeature[] {
        return this.#features.filter(f => f.level <= level).map(f => f.feature);
    }

    get aurasList(): AurasList {
        return [...this.#auras];
    }

    auras(level: number): Aura[] {
        return this.#auras.filter(a => a.level <= level).map(a => a.aura);
    }

    get startingWealth(): Money {
        return Money.fromRaw(this.#wealth);
    }

    static multiclass(classLevels: ClassLevels, stats: StatSet): ClassBonuses {
        return combineClassBonuses(classLevels, stats);
    }

    private static _imported: Classes | null = null;

    static import(dir = window.Main.asset('Classes')): Classes {
        return (this._imported ||= forceDataImportKeyS(
            dir,
            raw => new Class(preBuild(raw))
        ));
    }
}

export type { Classes, ClassLevels, ClassBonuses };
export { ClassFeature, Class };
