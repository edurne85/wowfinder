import { Skill } from '../Skills';
import { Aura, AurasList } from './Aura';
import { ClassFeature, FeaturesList } from './Features';
import type { Class } from './index';

interface SavesProgression {
    fortitude: boolean;
    reflexes: boolean;
    will: boolean;
}

interface CastingProgression {
    arcane: number;
    divine: number;
    spontaneous: number;
}

type Classes = { [key: string]: Class };
type ClassLevels = { cls: Class; level: number }[];

const validSkills = new Set(Object.values(Skill));

function hdAverage(hd: number): number {
    return Math.ceil((hd + 1) / 2);
}

function hdFirst(hd: number): number {
    return hd - hdAverage(hd);
}

function mapFeatures(
    list: { level: number; feature?: string }[]
): FeaturesList {
    return list
        .filter(entry => entry.feature as ClassFeature)
        .map(f => ({
            level: f.level,
            feature: ClassFeature[f.feature as keyof typeof ClassFeature],
        }));
}

function mapAuras(list: { level: number; aura?: Aura }[]): AurasList {
    return list
        .filter(entry => entry.aura as Aura)
        .map(entry => ({ level: entry.level, aura: entry.aura as Aura }));
}

function filterSkills(raw: string[]): Set<Skill> {
    return new Set(
        raw.filter(s => validSkills.has(s as Skill)).map(v => Skill[v as Skill])
    );
}

export { validSkills, hdAverage, hdFirst, mapFeatures, mapAuras, filterSkills };
export type { Classes, ClassLevels, SavesProgression, CastingProgression };

