import { Exportable, forceDataLoadKeyS, JsonValue } from '../utils';
import type { RewardsByCharacter } from './Rewards';

function jclone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function combineRewards(rewards: RewardsByCharacter[]): RewardsByCharacter {
    const result: RewardsByCharacter = {};
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

type Adventures = { [key: string]: Adventure };

type AdventureBuilder = {
    key: string;
    title: string;
    date: string;
    rewards: RewardsByCharacter;
};

type AdventureExport = AdventureBuilder & { [key: string]: JsonValue };

class Adventure implements Exportable<AdventureExport> {
    private _key: string;
    private _title: string;
    private _date: string;
    private _rewards: RewardsByCharacter;

    constructor({ key, title, date, rewards }: AdventureBuilder) {
        this._key = key;
        this._title = title;
        this._date = date;
        this._rewards = rewards;
    }

    get key(): string {
        return this._key;
    }

    get title(): string {
        return this._title;
    }

    get date(): string {
        return this._date;
    }

    get rewards(): RewardsByCharacter {
        return this._rewards;
    }

    // String representation suitable for sorting (by date, then title)
    toString(): string {
        return `[${this._date}] ${this._title}`;
    }

    static build(raw: any): Adventure {
        // TODO #426: Validate props
        return new Adventure(raw);
    }

    static #loaded: Adventures | null = null;

    static load(): Adventures {
        return (this.#loaded ||= forceDataLoadKeyS<Adventure>(
            window.Main.asset('Adventures'),
            this.build,
        ));
    }

    static combined(adventures: Adventures): RewardsByCharacter {
        return combineRewards(
            Object.keys(adventures).map(k => adventures[k].rewards),
        );
    }

    export(): AdventureExport {
        return {
            key: this._key,
            title: this._title,
            date: this._date,
            rewards: this._rewards,
        };
    }
}

export type { Adventures, AdventureBuilder, AdventureExport };
export { Adventure };
