interface SpellRankBuilder {
    key: string;
    rank?: number;
    // TODO Implement
}

class SpellRank {
    private _key: string;
    private _rank: number;

    constructor({ key, rank = 1 }: SpellRankBuilder) {
        this._key = key;
        this._rank = rank;
    }
}

export type { SpellRankBuilder };

export { SpellRank };
