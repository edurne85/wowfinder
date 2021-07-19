import JSON5 from 'json5';

export default class Faction {
    private _key: number;
    private _label: string;
    private _name: string;

    constructor({key, label, name}: {key: number, label: string, name: string}) {
        this._key = key;
        this._label = label;
        this._name = name;
        Object.freeze(this);
    }

    get key(): number { return this._key; }
    
    get label(): string { return this._label; }
    
    get name(): string { return this._name; }
    
    toString(): string { return this.name; }

    private static _import (json: string): Faction {
        const obj = JSON5.parse(json) || {};
        return new Faction({
            key: (parseInt(obj.key) || 0),
            label: (obj.label || '') + '',
            name: (obj.name || '') + '',
        });
    }
    
    static import (dir: string = 'data/Factions'): {byKey: {[key:number]: Faction}, byLabel: {[label:string]: Faction}} {
        const byKey: {[key:number]: Faction} = {};
        const byLabel: {[label:string]: Faction} = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Faction._import(window.Files.slurp(file))
                if (byKey[raw.key]) {
                    console.warn(`Duplicate faction key ${raw.key} found.`);
                }
                if (byLabel[raw.label]) {
                    console.warn (`Duplicate faction label ${raw.label} found.`);
                }
                byKey[raw.key] = byLabel[raw.label] = raw;
            } catch (e) {
                console.error(e);
            }
        }
        const res = {byKey, byLabel};
        [byKey, byLabel, res].map(Object.freeze);
        return res;
    }
}