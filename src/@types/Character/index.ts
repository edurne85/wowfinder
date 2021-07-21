import JSON5 from 'json5';
import Stats from './Stats';
import CharPersonalDetails, { personalDefaults } from './Personal';

interface CharConstructData {
    key: string,
    personal: CharPersonalDetails,
    active?: boolean,
    stats: Stats,
}

export default class Character {
    private key: string;
    private _personal: CharPersonalDetails;
    private _active: boolean;
    private _stats: Stats;
    constructor({key, personal, active = true, stats}: CharConstructData) {
        this.key = key;
        this._personal = Object.assign({}, personalDefaults, personal);
        this._active = active;
        this._stats = stats;
    }

    get fullName(): string { return this._personal.fullName; }
    
    get active(): boolean { return this._active; }
    
    toString(): string { return this._personal.fullName; }

    private static _import(json: string): Character {
        const obj = JSON5.parse(json) || {};
        return new Character({...obj});
    }

    static import (dir: string = 'data/Characters'): {[key:string]: Character} {
        const byKey: {[key:string]: Character} = {};
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
}
