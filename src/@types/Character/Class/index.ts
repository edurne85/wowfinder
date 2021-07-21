import JSON5 from 'json5';
import { Skill } from '../Skills';
import { StatSet, statMod } from '../Stats';
import { ClassFeature } from './Features';

interface ClassBuilder {
    key: string,
    hd: number,
    bab: number,
    fort: boolean,
    refl: boolean,
    will: boolean,
    skl: number,
    arc: number,
    div: number,
    esp: number,
    wealth: number,
    features: {level: number, feature: string}[],
    skills: string[],
}

interface ClassBonuses {
    hp: number,
    bab: number,
    saves: {
        fort: number,
        refl: number,
        will: number,
    },
    efl: {
        arc: number,
        div: number,
        esp: number,
    },
    skillRanks: number,
    classSkills: Set<Skill>,
    features: {[key in ClassFeature]?: number},
}

const helpers = {
    hdAvg: (hd: number): number => (hd+1) / 2,
    hdFirst: (hd: number): number => hd - helpers.hdAvg(hd),
    validSkills: new Set(Object.values(Skill)),
    mapFeatures: (f: {level: number, feature: string}) => ({
        level: f.level,
        feature: ClassFeature[f.feature as keyof typeof ClassFeature]
    }),
};

export default class Class {
    private key: string;
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
    private features: {level: number, feature: ClassFeature}[];
    private skills: Set<Skill>;

    constructor({
        key,
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
        this.key = key;
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
        this.features = features.map(helpers.mapFeatures);
        this.skills = new Set(
            skills
                .filter(s => helpers.validSkills.has(s as Skill))
                .map(v => Skill[v as Skill])
        );
    }

    static multiclass(classLevels: {cls: Class, level: number}[], stats: StatSet): ClassBonuses {
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
        for (const {cls, level} of classLevels) {
            result.hp += (helpers.hdAvg(cls.hd) + statMod(stats.CON)) * level;
            result.bab += cls.bab * level;
            result.saves.fort += (cls.fort ? 1/2 : 1/3) * level;
            goodSaves.fort ||= cls.fort;
            result.saves.refl += (cls.refl ? 1/2 : 1/3) * level;
            goodSaves.refl ||= cls.refl;
            result.saves.will += (cls.will ? 1/2 : 1/3) * level;
            goodSaves.will ||= cls.will;
            result.efl.arc += cls.arc * level;
            result.efl.div += cls.div * level;
            result.efl.esp += cls.esp * level;
            result.skillRanks += (cls.skl + statMod(stats.INT)) * level;
            for (const f of cls.features.filter(f => f.level <= level)) {
                result.features[f.feature] ||= 0;
                result.features[f.feature]! += 1;
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

    private static _import(json: string): Class {
        const obj = JSON5.parse(json) || {};
        return new Class({...obj});
    }

    static import  (dir: string = 'data/Classes'): {[key:string]: Class} {
        const byKey: {[key:string]: Class} = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Class._import(window.Files.slurp(file));
                if (byKey[raw.key]) {
                    console.warn(`Duplicate class key ${raw.key} found.`);
                }
                byKey[raw.key] = raw;
            } catch (e) {
                console.error(e);
            }
        }
        return Object.freeze(byKey);
    }
}