import JSON5 from 'json5';
import Stats, { StatSet, zeroDefault } from './Stats';
import CharPersonalDetails, { personalDefaults } from './Personal';
import Race from './Race';

interface CharConstructData {
    key: string,
    personal: CharPersonalDetails,
    active?: boolean,
    baseStats: StatSet,
}

type Characters = {[key:string]: Character};

export default class Character {
    private key: string;
    private _personal: CharPersonalDetails;
    private _active: boolean;
    private _stats: Stats;
    // private _race: Race;

    constructor({key, personal, active = true, baseStats}: CharConstructData) {
        this.key = key;
        this._personal = Object.assign({}, personalDefaults, personal);
        this._active = active;
        this._stats = new Stats({
            base: baseStats,
            racial: zeroDefault, // TODO
            enhance: zeroDefault,
            gear: zeroDefault, // TODO
            misc: zeroDefault, // TODO: Class auras?
            temp: zeroDefault,
        });
    }

    get fullName(): string { return this._personal.fullName; }
    
    get active(): boolean { return this._active; }
    
    toString(): string { return this._personal.fullName; }

    private static _import(json: string): Character {
        const obj = JSON5.parse(json) || {};
        return new Character({...obj});
    }

    private static _importForced (dir: string): Characters {
        const byKey: Characters = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Character._import(window.Files.slurp(file));
                if (byKey[raw.key]) {
                    console.warn(`Duplicate character key ${raw.key} found.`);
                }
                byKey[raw.key] = raw;
            } catch (e) {
                console.error(e);
            }
        }
        return Object.freeze(byKey);
    }

    private static _imported: Characters | null = null;

    static import(dir = 'data/Characters'): Characters {
        return (this._imported ||= this._importForced(dir));
    }
}
