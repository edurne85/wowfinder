import JSON5 from 'json5';
import Language from '../../Language';
import Alignment from '../Alignment';
import Size from '../Size';
import { SkillSet } from '../Skills';
import { StatSet } from '../Stats';

interface RaceBuilder {
    key: string;
    size: Size;
    statMods: StatSet;
    skillMods: SkillSet;
    bonusSkillRanks?: number; // Per level
    bonusStartingFeats?: number;
    initialLangs: Language[];
    additionalLangs: Language[];
    commonAligns: Alignment[];
}

type Races = {[key:string]: Race};

export default class Race {
    private _key: string;
    private _size: Size;
    private _stats: StatSet;
    private _skills: SkillSet;
    private _bonusSkills: number;
    private _bonusFeats: number;
    private _initial: Language[];
    private _additional: Language[];

    constructor({
        key,
        size,
        statMods,
        skillMods,
        bonusSkillRanks = 0,
        bonusStartingFeats = 0,
        initialLangs,
        additionalLangs,
    }: RaceBuilder) {
        this._key = key;
        this._size = size;
        Object.freeze(this._stats = statMods);
        Object.freeze(this._skills = skillMods);
        this._bonusSkills = bonusSkillRanks || 0;
        this._bonusFeats = bonusStartingFeats || 0;
        Object.freeze(this._initial = [...initialLangs]);
        Object.freeze(this._additional = [...additionalLangs]);
        Object.freeze(this);
    }

    get key(): string { return this._key; }

    get size(): Size { return this._size; }

    get statMods(): StatSet { return this._stats; }

    get skillMods(): SkillSet { return this._skills; }

    get bonusSkillRanksPerLevel(): number { return this._bonusSkills; }

    get bonusFeats(): number { return this._bonusFeats; }
    
    get initialLanguages(): Language[] { return [...this._initial]; }

    get additionalLanguages(): Language[] { return [...this._additional]; }

    private static _import(json: string): Race {
        const obj = JSON5.parse(json) || {};
        return new Race({...obj});
    }

    private static _importForced  (dir: string): Races {
        const byKey: {[key:string]: Race} = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Race._import(window.Files.slurp(file));
                if (byKey[raw.key]) {
                    console.warn(`Duplicate race key ${raw.key} found.`);
                }
                byKey[raw.key] = raw;
            } catch (e) {
                console.error(e);
            }
        }
        return Object.freeze(byKey);
    }

    private static _imported: Races | null = null;

    static import(dir = 'data/Races'): Races {
        return (this._imported ||= this._importForced(dir));
    }
}