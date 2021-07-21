import JSON5 from 'json5';
import type { Rewards } from './Rewards';

function jclone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function combineRewards(rewards: Rewards[]): Rewards {
    const result: Rewards = {};
    for (const r of rewards) {
        for (const c of Object.keys(r)) {
            if (result[c]) {
                for (const f of Object.keys(r[c])) {
                    result[c][f] ||= 0;
                    result[c][f] += r[c][f];
                }
            } else {
                result[c] = jclone(r[c]);
            }
        }
    }
    return Object.freeze(result);
}

type Adventures = readonly Adventure[];

export default class Adventure {
    private _title: string;
    private _date: string;
    private _rewards: Rewards;

    constructor({title, date, rewards}: {title: string, date: string, rewards: Rewards}) {
        this._title = title;
        this._date = date;
        this._rewards = rewards;
    }

    get title(): string { return this._title; }
    get date(): string { return this._date; }
    get rewards(): Rewards { return this._rewards; }

    // String representation suitable for sorting (by date, then title)
    toString(): string { return `[${this._date}] ${this._title}`; }

    private static _import (json: string): Adventure {
        const obj = JSON5.parse(json) || {};
        return new Adventure({...obj});
    }

    private static _importForced(dir: string): Adventures {
        const adventures: Adventure[] = [];
        for (const file of window.Files.getFiles(dir, 'json5')) {
            try {
                adventures.push(Adventure._import(window.Files.slurp(file)));
            } catch (e) {
                console.error(e);
            }
        }
        return Object.freeze(adventures.sort());
    }

    private static _imported: Adventures | null = null;

    static import(dir = 'data/Adventures'): Adventures {
        return (this._imported ||= this._importForced(dir));
    }

    static combined(adventures: Adventures): Rewards {
        return combineRewards(adventures.map((a) => a._rewards));
    }
}