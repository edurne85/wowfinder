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

export default class Adventure {
    private _title: string;
    private _date: string;
    private _rewards: Rewards;

    constructor({title, date, rewards}: {title: string, date: string, rewards: Rewards}) {
        this._title = title;
        this._date = date;
        this._rewards = rewards;
    }

    get title() { return this._title; }
    get date() { return this._date; }
    get rewards() { return this._rewards; }

    // String representation suitable for sorting (by date, then title)
    toString() { return `[${this._date}] ${this._title}`; }

    private static _import (json: string): Adventure {
        const obj = JSON5.parse(json) || {};
        return new Adventure({...obj});
    }

    static import(dir: string = 'data/Adventures') {
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

    static combined(adventures: readonly Adventure[]): Rewards {
        return combineRewards(adventures.map((a) => a._rewards));
    }
}