import { TFunction } from 'i18next';
import { forceDataLoadKeyS } from '../../../utils';
import { fullParseSchool, School, SubSchool } from '../School';
import { SpellBaseBuilder, SpellBase } from './base';
import { SpellRank, SpellRankBuilder } from './Rank';
import { RankedSpell, RankedSpellBuilder } from './RankedSpell';

interface SpellBuilder extends SpellBaseBuilder {
    key: string;
    ranks: SpellRankBuilder[];
    sch?: SubSchool | School | string;
}

type Spells = { [key: string]: Spell };

function getFirstDefined<T>(
    failMessage: string,
    ...args: (T | undefined)[]
): T {
    for (const arg of args) {
        if (arg !== undefined) {
            return arg;
        }
    }
    throw new Error(failMessage);
}

class Spell extends SpellBase implements SpellBuilder {
    #key: string;
    #ranks: SpellRank[];
    #subSchool?: SubSchool;
    #school: School;

    constructor({ key, ranks, sch, ...rest }: SpellBuilder) {
        super(rest);
        this.#key = key;
        this.#ranks = ranks.map(rank => new SpellRank(rank));
        for (const rank of this.#ranks) {
            const rankAssert = (condition: boolean, message: string): void => {
                if (!condition) {
                    throw new Error(
                        `Invalid spell definition for ${this.#key}:${rank.rank}: ${message}`,
                    );
                }
            };
            rankAssert(
                !!rank.castingTime || !!this.castingTime,
                'Missing casting time',
            );
            rankAssert(!!rank.range || !!this.range, 'Missing range');
            // rankAssert(!!rank.area || !!this.area, 'Missing area');
            rankAssert(!!rank.duration || !!this.duration, 'Missing duration');
        }
        const schoolParsed = fullParseSchool(sch || '');
        if (!schoolParsed) {
            throw new Error(`Invalid school: ${sch}`);
        }
        this.#school = schoolParsed.school;
        this.#subSchool = schoolParsed.subSchool;
    }

    get key(): string {
        return this.#key;
    }

    getFullName(t: TFunction<'translation'>): string {
        return t(`spells.${this.key}.name`);
    }

    getDescription(t: TFunction<'translation'>): string {
        return t(`spells.${this.key}.description`);
    }

    get ranks(): SpellRank[] {
        return [...this.#ranks];
    }

    get school(): School {
        return this.#school;
    }

    get subschool(): SubSchool | undefined {
        return this.#subSchool;
    }

    get sch(): SubSchool | School {
        return this.#subSchool || this.#school;
    }

    getRank(rank: number): RankedSpell {
        const rankObj = this.#ranks.find(r => r.rank === rank);
        if (!rankObj) {
            throw new Error(`Invalid rank ${rank} for ${this.#key}`);
        }
        const getProp = <T>(prop: keyof SpellRank & keyof Spell): T => {
            return getFirstDefined<T>(
                `Missing ${prop} for ${this.#key}:${rank}`,
                rankObj[prop] as T,
                this[prop] as T,
            );
        };
        const builder = {
            key: this.#key,
            rank,
            area: rankObj.area || this.area,
            castingTime: getProp('castingTime'),
            components: getProp('components'),
            descriptors: getProp('descriptors'),
            duration: getProp('duration'),
            range: getProp('range'),
            flags: getProp('flags'),
            sch: this.sch,
        } satisfies RankedSpellBuilder;
        return new RankedSpell(builder);
    }

    get fullRanks(): RankedSpell[] {
        return this.#ranks.map(rank => this.getRank(rank.rank));
    }

    static build(raw: any): Spell {
        return new Spell(raw);
    }

    static #loaded: Spells | null = null;

    static load(dir = window.Main.asset('Spells')): Spells {
        return (this.#loaded ||= forceDataLoadKeyS<Spell>(dir, this.build));
    }

    static byKey(key: string): Spell;
    static byKey(key: string, rank: number): RankedSpell;
    static byKey(key: string, rank?: number): Spell | RankedSpell {
        const spell = this.load()[key];
        if (!spell) {
            throw new Error(`Invalid spell key: ${key}`);
        }
        return rank === undefined ? spell : spell.getRank(rank);
    }
}

export type { SpellBuilder, Spells };

export { Spell };
