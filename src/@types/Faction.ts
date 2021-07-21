import JSON5 from 'json5';

enum Reputation {
    hated = 'hated',
    hostile = 'hostile',
    unfriendly = 'undfriendly',
    neutral = 'neutral',
    friendly = 'friendly',
    honored = 'honored',
    revered = 'revered',
    exalted = 'exalted',
}

type Rep = Reputation;

const initialHatedScore = -42000;

const threshholds: {[key in Rep]: number} = {
    hated: -42000,
    hostile: -6000,
    undfriendly: -3000,
    neutral: 0,
    friendly: 3000,
    honored: 9000,
    revered: 21000,
    exalted: 42000,
};

const sortedDown = ([...Object.keys(threshholds)] as Rep[])
    .sort((a: Rep, b: Rep): number => threshholds[b] - threshholds[a]);
const lastRep = sortedDown[sortedDown.length - 1];

function reputationByScore(score: number): Rep {
    for (const k of sortedDown) {
        if (score >= threshholds[k]) {
            return k;
        }
    }
    return lastRep;
}

type Factions = {byKey: {[key:number]: Faction}, byLabel: {[label:string]: Faction}};

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
    
    private static _importForced (dir = 'data/Factions'): Factions {
        const byKey: {[key:number]: Faction} = {};
        const byLabel: {[label:string]: Faction} = {};
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                const raw = Faction._import(window.Files.slurp(file));
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

    private static _imported: Factions | null = null;

    static import(dir = 'data/Characters'): Factions {
        return (this._imported ||= this._importForced(dir));
    }
}

export {
    Reputation,
    reputationByScore,
    initialHatedScore,
};