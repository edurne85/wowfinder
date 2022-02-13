import { forceDataImport } from '../utils';
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

class Adventure {
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

    static build (raw: any): Adventure {
        // TODO Validate props
        return new Adventure(raw);
    }

    private static _imported: Adventures | null = null;

    static import(dir = window.Main.asset('Adventures')): Adventures {
        return (this._imported ||= Object.values(forceDataImport<Adventure>(dir, this.build)));
    }

    static combined(adventures: Adventures): Rewards {
        return combineRewards(adventures.map((a) => a._rewards));
    }
}

export type {
    Adventures,
};
export {
    Adventure,
};