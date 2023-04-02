import { forceDataImportKeyS } from '../../../utils';
import { Skill } from '../Skills';
import { StatSet, statMod } from '../Stats';
import type { Aura } from './Auras';
import { ClassTier } from './ClassTier';
import { ClassFeature } from './Features';

type featureEntry = {
    level: number;
    feature: string
};

type auraEntry = {
    level: number;
    aura: Aura
};

type rawFeaturesEntry = featureEntry | auraEntry;

interface ClassBuilder {
    key: string;
    tier?: ClassTier;
    hd: number;
    bab: number;
    fort: boolean;
    refl: boolean;
    will: boolean;
    skl: number;
    arc: number;
    div: number;
    esp: number;
    wealth: number;
    features: rawFeaturesEntry[];
    skills: string[];
}

interface ClassBonuses {
    hp: number;
    bab: number;
    saves: {
        fort: number;
        refl: number;
        will: number;
    };
    efl: {
        arc: number;
        div: number;
        esp: number;
    };
    skillRanks: number;
    classSkills: Set<Skill>;
    features: { [key in ClassFeature]?: number };
}

type FeaturesList = {
    level: number;
    feature: ClassFeature;
}[];

type AurasList = {
    level: number;
    aura: Aura;
}[];

const helpers = {
    hdAvg: (hd: number): number => Math.ceil((hd + 1) / 2),
    hdFirst: (hd: number): number => hd - helpers.hdAvg(hd),
    validSkills: new Set(Object.values(Skill)),
    mapFeatures: (list: { level: number; feature?: string }[]): FeaturesList =>
        list
            .filter(entry => entry.feature as ClassFeature)
            .map(f => ({
                level: f.level,
                feature: ClassFeature[f.feature as keyof typeof ClassFeature],
            })),
    mapAuras: (list: { level: number; aura?: Aura }[]): AurasList =>
        list
            .filter(entry => entry.aura as Aura)
            .map(entry => ({ level: entry.level, aura: entry.aura as Aura })),
};

type Classes = { [key: string]: Class };
type ClassLevels = { cls: Class; level: number }[];

class Class {
    private _key: string;
    private _tier: ClassTier;
    private hd: number;
    private bab: number;
    private fort: boolean;
    private refl: boolean;
    private will: boolean;
    private skl: number;
    private arc: number;
    private div: number;
    private esp: number;
    private wealth: number;
    private _features: FeaturesList;
    private _auras: AurasList;
    private skills: Set<Skill>;

    constructor({
        key,
        tier = ClassTier.base,
        hd,
        bab,
        fort = false,
        refl = false,
        will = false,
        skl = 0,
        arc = 0,
        div = 0,
        esp = 0,
        wealth = 0,
        features = [],
        skills = [],
    }: ClassBuilder) {
        this._key = key;
        this._tier = tier;
        this.hd = hd;
        this.bab = bab;
        this.fort = !!fort;
        this.refl = !!refl;
        this.will = !!will;
        this.skl = skl || 0;
        this.arc = arc || 0;
        this.div = div || 0;
        this.esp = esp || 0;
        this.wealth = wealth || 0;
        this._features = helpers.mapFeatures(features);
        this._auras = helpers.mapAuras(features);
        this.skills = new Set(
            skills
                .filter(s => helpers.validSkills.has(s as Skill))
                .map(v => Skill[v as Skill])
        );
    }

    get key(): string {
        return this._key;
    }

    get tier(): ClassTier {
        return this._tier;
    }

    features(level: number): ClassFeature[] {
        return this._features.filter(f => f.level <= level).map(f => f.feature);
    }

    auras(level: number): Aura[] {
        return this._auras.filter(a => a.level <= level).map(a => a.aura);
    }

    static multiclass(classLevels: ClassLevels, stats: StatSet): ClassBonuses {
        const goodSaves = {
            fort: false,
            refl: false,
            will: false,
        };
        const result: ClassBonuses = {
            hp: 0,
            bab: 0,
            saves: {
                fort: 0,
                refl: 0,
                will: 0,
            },
            efl: {
                arc: 0,
                div: 0,
                esp: 0,
            },
            skillRanks: 0,
            features: {},
            classSkills: new Set<Skill>(),
        };
        if (classLevels.length > 0) {
            result.hp += helpers.hdFirst(classLevels[0].cls.hd);
        }
        for (const { cls, level } of classLevels) {
            result.hp += (helpers.hdAvg(cls.hd) + statMod(stats.CON)) * level;
            result.bab += cls.bab * level;
            result.saves.fort += (cls.fort ? 1 / 2 : 1 / 3) * level;
            goodSaves.fort ||= cls.fort;
            result.saves.refl += (cls.refl ? 1 / 2 : 1 / 3) * level;
            goodSaves.refl ||= cls.refl;
            result.saves.will += (cls.will ? 1 / 2 : 1 / 3) * level;
            goodSaves.will ||= cls.will;
            result.efl.arc += cls.arc * level;
            result.efl.div += cls.div * level;
            result.efl.esp += cls.esp * level;
            result.skillRanks += (cls.skl + statMod(stats.INT)) * level;
            for (const f of cls._features.filter(f => f.level <= level)) {
                result.features[f.feature] =
                    (result.features[f.feature] || 0) + 1;
            }
            cls.skills.forEach((value: Skill) => result.classSkills.add(value));
        }
        if (goodSaves.fort) {
            result.saves.fort += 2;
        }
        if (goodSaves.refl) {
            result.saves.refl += 2;
        }
        if (goodSaves.will) {
            result.saves.will += 2;
        }
        result.bab = Math.floor(result.bab);
        result.hp = Math.floor(result.hp);
        result.saves.fort = Math.floor(result.saves.fort);
        result.saves.refl = Math.floor(result.saves.refl);
        result.saves.will = Math.floor(result.saves.will);
        result.efl.arc = Math.floor(result.efl.arc);
        result.efl.div = Math.floor(result.efl.div);
        result.efl.esp = Math.floor(result.efl.esp);
        return result;
    }

    static build(raw: any): Class {
        // TODO Validate props
        return new Class(raw);
    }

    private static _imported: Classes | null = null;

    static import(dir = window.Main.asset('Classes')): Classes {
        return (this._imported ||= forceDataImportKeyS(dir, this.build));
    }
}

export type { Classes, ClassLevels, ClassBonuses };
export { ClassFeature, Class };
