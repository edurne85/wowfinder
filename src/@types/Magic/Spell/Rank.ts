import { ISpellBuilderBase, SpellBase } from './base';

interface SpellRankBuilder extends ISpellBuilderBase {
    rank?: number;
    level: number;
}

class SpellRank extends SpellBase implements SpellRankBuilder {
    #rank: number;
    #level: number;

    constructor({
        rank,
        level,
        ...rest
    }: SpellRankBuilder) {
        super(rest);
        this.#rank = rank ?? 0;
        this.#level = level;
    }

    get rank(): number {
        return this.#rank;
    }

    get level(): number {
        return this.#level;
    }
}

export { SpellRankBuilder, SpellRank };
