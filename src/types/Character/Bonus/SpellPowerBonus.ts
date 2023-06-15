import { sum } from '../../../utils';
import { CastingMode, School, SubSchool } from '../../Magic';
import {
    computedSpellPower,
    fillSpellPowerValues,
    SpellPowerValues,
    SpellPowerValuesPartial,
} from '../../Magic/SpellPower';

export default class SpellPowerBonus implements SpellPowerValues<number> {
    #data: SpellPowerValues<number>;
    constructor(data: SpellPowerValuesPartial<number>) {
        this.#data = fillSpellPowerValues<number>(data, 0);
    }

    get arcane(): number {
        return this.#data.arcane;
    }

    get divine(): number {
        return this.#data.divine;
    }

    get spontaneous(): number {
        return this.#data.spontaneous;
    }

    get abj(): number {
        return this.#data.abj;
    }

    get con(): number {
        return this.#data.con;
    }

    get div(): number {
        return this.#data.div;
    }

    get enc(): number {
        return this.#data.enc;
    }

    get evo(): number {
        return this.#data.evo;
    }

    get ill(): number {
        return this.#data.ill;
    }

    get nec(): number {
        return this.#data.nec;
    }

    get tra(): number {
        return this.#data.tra;
    }

    get uni(): number {
        return this.#data.uni;
    }

    get void(): number {
        return this.#data.void;
    }

    get banish(): number {
        return this.#data.banish;
    }

    get counter(): number {
        return this.#data.counter;
    }

    get call(): number {
        return this.#data.call;
    }

    get create(): number {
        return this.#data.create;
    }

    get heal(): number {
        return this.#data.heal;
    }

    get summon(): number {
        return this.#data.summon;
    }

    get teleport(): number {
        return this.#data.teleport;
    }

    get scry(): number {
        return this.#data.scry;
    }

    get charm(): number {
        return this.#data.charm;
    }

    get compel(): number {
        return this.#data.compel;
    }

    get figment(): number {
        return this.#data.figment;
    }

    get glamer(): number {
        return this.#data.glamer;
    }

    get phantom(): number {
        return this.#data.phantom;
    }

    get shadow(): number {
        return this.#data.shadow;
    }

    get enhancement(): number {
        return this.#data.enhancement;
    }

    get polymorph(): number {
        return this.#data.polymorph;
    }

    get isZero(): boolean {
        return Object.values(this.#data).every(v => v === 0);
    }

    computed(mode: CastingMode, school: School | SubSchool): number {
        return computedSpellPower(this, mode, school);
    }

    static #allKeys: string[] = [
        ...Object.keys(CastingMode),
        ...Object.keys(School),
        ...Object.keys(SubSchool),
    ];

    static get allKeys(): readonly string[] {
        return Object.freeze(this.#allKeys);
    }

    static build(raw: any = {}): SpellPowerBonus {
        const cured: any = {};
        for (const k of this.allKeys) {
            if (raw[k]) {
                cured[k] = raw[k] || 0;
            }
        }
        return new SpellPowerBonus({ ...cured });
    }

    static get zero(): SpellPowerBonus {
        return SpellPowerBonus.build({});
    }

    static sum(...args: SpellPowerBonus[]): SpellPowerBonus {
        const raw: SpellPowerValuesPartial<number> = {};
        for (const key of this.allKeys) {
            const k = key as keyof SpellPowerValues<number>;
            raw[k] = sum(...args.map(a => a[k]));
        }
        return new SpellPowerBonus(raw);
    }

    static max(...args: SpellPowerBonus[]): SpellPowerBonus {
        const raw: SpellPowerValuesPartial<number> = {};
        for (const key of this.allKeys) {
            const k = key as keyof SpellPowerValues<number>;
            raw[k] = Math.max(...args.map(a => a[k]));
        }
        return new SpellPowerBonus(raw);
    }
}

export { SpellPowerBonus };
