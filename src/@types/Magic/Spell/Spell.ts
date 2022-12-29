import { TFunction } from 'i18next';
import { forceDataImportKeyS } from '../../../utils';
import { fullParseSchool, School, SubSchool } from '../School';
import { ISpellBuilderBase, SpellBase } from './base';
import { SpellRank, SpellRankBuilder } from './Rank';

interface SpellBuilder extends ISpellBuilderBase {
    key: string;
    ranks: SpellRankBuilder[];
    sch?: SubSchool | School | string;
}

type Spells = { [key: string]: Spell };

class Spell extends SpellBase implements SpellBuilder {
    #key: string;
    #ranks: SpellRank[];
    #subSchool?: SubSchool;
    #school: School;

    constructor({ key, ranks, sch: schoolBuilder, ...rest }: SpellBuilder) {
        super(rest);
        this.#key = key;
        this.#ranks = ranks.map(rank => new SpellRank(rank));
        for (const rank of this.#ranks) {
            const rankAssert = (condition: boolean, message: string): void => {
                if (!condition) {
                    throw new Error(
                        `Invalid spell definition for ${this.#key}:${
                            rank.rank
                        }: ${message}`
                    );
                }
            };
            rankAssert(
                !!rank.castingTime || !!this.castingTime,
                'Missing casting time'
            );
            rankAssert(!!rank.range || !!this.range, 'Missing range');
            // rankAssert(!!rank.area || !!this.area, 'Missing area');
            rankAssert(!!rank.duration || !!this.duration, 'Missing duration');
        }
        const schoolParsed = fullParseSchool(schoolBuilder || '');
        if (!schoolParsed) {
            throw new Error(`Invalid school: ${schoolBuilder}`);
        }
        this.#school = schoolParsed.school;
        this.#subSchool = schoolParsed.subSchool;
    }

    get key(): string {
        return this.#key;
    }

    getFullName(t: TFunction<'translation'>): string {
        return t(this.#key);
    }

    get ranks(): SpellRankBuilder[] {
        return [...this.#ranks];
    }

    get school(): School {
        return this.#school;
    }

    get subschool(): SubSchool | undefined {
        return this.#subSchool;
    }

    get sch(): SubSchool | School | string {
        return this.#subSchool || this.#school;
    }

    static build(raw: any): Spell {
        // TODO Add validations?
        return new Spell(raw);
    }

    static #imported: Spells | null = null;

    static import(dir = window.Main.asset('Spells')): Spells {
        return (this.#imported ||= forceDataImportKeyS<Spell>(dir, this.build));
    }
}

export type { SpellBuilder, Spells };

export { Spell };
