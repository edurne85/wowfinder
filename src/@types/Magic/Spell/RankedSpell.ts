import { TFunction } from 'i18next';
import { assertDefined, Optional, toRoman } from '../../../utils';
import { fullParseSchool, School, SubSchool } from '../School';
import { SpellBase, SpellBaseBuilder } from './base';
import { CastingTime } from './CastingTime';
import { SpellDuration } from './Duration';
import { SpellRange } from './Range';
import { SpellBuilder } from './Spell';

type RankedSpellBuilder = Omit<
    Optional<Required<SpellBaseBuilder & SpellBuilder>, 'area'>,
    'ranks'
> & { rank: number };

class RankedSpell extends SpellBase implements RankedSpellBuilder {
    #key: string;
    #rank: number;
    #subSchool?: SubSchool;
    #school: School;

    constructor({ key, rank, sch, ...rest }: RankedSpellBuilder) {
        super(rest);
        this.#key = key;
        this.#rank = rank;
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

    get rank(): number {
        return this.#rank;
    }

    get castingTime(): CastingTime {
        const res = super.castingTime;
        assertDefined(
            res,
            `Missing casting time for ${this.key}:${this.#rank}`
        );
        return res;
    }

    get range(): SpellRange {
        const res = super.range;
        assertDefined(res, `Missing range for ${this.key}:${this.#rank}`);
        return res;
    }

    get duration(): SpellDuration {
        const res = super.duration;
        assertDefined(res, `Missing duration for ${this.key}:${this.#rank}`);
        return res;
    }

    get sch(): SubSchool | School | string {
        return this.#subSchool || this.#school;
    }

    getFullName(t: TFunction<'translation'>): string {
        return `${t(this.key)} - ${toRoman(this.#rank)}`;
    }

    getDescription(t: TFunction<'translation'>): string {
        return `${t(`spells.${this.key}.description`)}\n\n${t(`spells.${this.key}.${this.#rank}`)}`;
    }
}

export type { RankedSpellBuilder };
export { RankedSpell };
