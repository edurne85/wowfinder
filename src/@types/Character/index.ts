import JSON5 from 'json5';
import Stats from './Stats';

interface CharConstructData {
    key: string,
    fullName: string,
    active?: boolean,
    stats: Stats,
}

export default class Character {
    private key: string;
    private _fullName: string;
    private _active: boolean;
    private _stats: Stats;
    constructor({key, fullName, active = true, stats}: CharConstructData) {
        this.key = key;
        this._fullName = fullName;
        this._active = active;
        this._stats = stats;
    }

    get fullName() { return this._fullName; }
    
    get active() { return this._active; }
    
    toString() { return this._fullName; }

    private static _import(json: string): Character {
        const obj = JSON5.parse(json) || {};
        return new Character({...obj});
    }

    static import (dir: string = 'data/Characters'): {[key:string]: Character} {
        const byKey: {[key:string]: Character} = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Character._import(window.Files.slurp(file))
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
