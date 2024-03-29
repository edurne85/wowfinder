import { forceDataLoadKeyS } from '../../../utils';
import { Money } from '../../Item';
import { Skill } from '../Skill';
import { Aura, AurasList } from './Aura';
import { ClassBonuses } from './ClassBonuses';
import { ClassTier } from './ClassTier';
import { ClassFeature, FeaturesList } from './Features';
import { ClassBuilder, applyClassDefaults, preBuild } from './builder';
import { combineClassBonuses } from './combineBonuses';
import {
    CastingProgression,
    ClassLevels,
    Classes,
    SavesProgression,
    filterSkills,
    mapAuras,
    mapFeatures,
} from './helpers';

function baseHitPoints(hd: number): [number, number] {
    const base = Math.ceil((hd + 1) / 2);
    const extra = hd - base;
    return [base, extra];
}
class Class {
    #key: string;
    #tier: ClassTier;
    #maxLevel: number;
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
        this.#maxLevel = args.maxLevel;
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

    get maxLevel(): number {
        return this.#maxLevel;
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

    featuresAt(level: number): ClassFeature[] {
        return this.#features
            .filter(f => f.level === level)
            .map(f => f.feature);
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

    static multiclass(classLevels: ClassLevels): ClassBonuses {
        return combineClassBonuses(classLevels);
    }

    static #loaded: Classes | null = null;

    static load(): Classes {
        return (this.#loaded ||= forceDataLoadKeyS(
            window.Main.asset('Classes'),
            raw => new Class(preBuild(raw)),
        ));
    }
}

export type { Classes, ClassLevels, ClassBonuses };
export { ClassFeature, Class, baseHitPoints };
