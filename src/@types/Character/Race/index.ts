import JSON5 from 'json5';
import { Stats } from 'original-fs';
import Language from '../../Language';
import Alignment from '../Alignment';
import Size from '../Size';
import { SkillSet } from '../Skills';
import { StatSet } from '../Stats';
import { RacialTrait } from './Traits';

interface RaceBuilder {
    key: string;
    size: Size;
    statMods: StatSet;
    skillMods: SkillSet;
    initialLangs: Language[];
    additionalLangs: Language[];
    traits: RacialTrait[];
    commonAligns: Alignment[];
}

type Races = {[key:string]: Race};

export default class Race {
    private key: string;
    private _size: Size;
    private _stats: StatSet;
    private _skills: SkillSet;
    private _initial: Language[];
    private _additional: Language[];
    private _traits: RacialTrait[];

    constructor({
        key,
        size,
        statMods,
        skillMods,
        initialLangs,
        additionalLangs,
        traits,
    }: RaceBuilder) {
        this.key = key;
        this._size = size;
        Object.freeze(this._stats = statMods);
        Object.freeze(this._skills = skillMods);
        Object.freeze(this._initial = [...initialLangs]);
        Object.freeze(this._additional = [...additionalLangs]);
        Object.freeze(this._traits = [...traits]);
        Object.freeze(this);
    }

    get size(): Size { return this._size; }

    get statMods(): StatSet { return this._stats; }

    get skillMods(): SkillSet { return this._skills; }
    
    get initialLanguages(): Language[] { return [...this._initial]; }

    get additionalLanguages(): Language[] { return [...this._additional]; }

    get traits(): RacialTrait[] { return [...this._traits]; }

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