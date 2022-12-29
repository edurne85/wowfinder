import { CastingMode } from '../CastingMode';
import { ISpellBuilderBase, SpellBase } from './base';

interface SpellLevelEntryBuilder {
    level: number;
    castingMode: CastingMode | string;
}

class SpellLevelEntry implements SpellLevelEntryBuilder {
    #castingMode: CastingMode;
    #level: number;
    constructor({ level, castingMode }: SpellLevelEntryBuilder) {
        this.#level = level;
        if (typeof castingMode === 'string') {
            if (castingMode in CastingMode) {
                castingMode = CastingMode[castingMode as keyof typeof CastingMode] as CastingMode;
            } else {
                throw new Error(`Invalid casting mode: ${castingMode}`);
            }
        }
        this.#castingMode = castingMode as CastingMode;
    }

    get level(): number {
        return this.#level;
    }

    get castingMode(): CastingMode {
        return this.#castingMode;
    }
}

interface SpellRankBuilder extends ISpellBuilderBase {
    rank?: number;
    levels: SpellLevelEntryBuilder[];
}

class SpellRank extends SpellBase implements SpellRankBuilder {
    #rank: number;
    #levels: SpellLevelEntry[];

    constructor({
        rank,
        levels,
        ...rest
    }: SpellRankBuilder) {
        super(rest);
        this.#rank = rank ?? 0;
        this.#levels = levels.map(l => new SpellLevelEntry(l));
    }

    get rank(): number {
        return this.#rank;
    }

    get levels(): SpellLevelEntryBuilder[] {
        return [...this.#levels];
    }
}

export type { SpellRankBuilder, SpellLevelEntryBuilder };

export { SpellRank };
