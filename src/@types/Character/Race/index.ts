import { forceDataImportKeyS } from '../../../utils';
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

    static build(raw: any): Race {
        // TODO Validate props
        return new Race(raw);
    }

    private static _imported: Races | null = null;

    static import(dir = window.Main.asset('Races')): Races {
        return this._imported ||= forceDataImportKeyS(dir, this.build);
    }
}