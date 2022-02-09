import { sum } from '../../../utils';
import { CastingMode, School, SubSchool } from '../../Magic';
import {
    computedSpellPower,
    fillSpellPowerValues,
    SpellPowerValues,
    SpellPowerValuesPartial,
} from '../../Magic/SpellPower';

export default class SpellPowerBonus implements SpellPowerValues<number> {
    private _data: SpellPowerValues<number>;
    constructor(data: SpellPowerValuesPartial<number>) {
        this._data = fillSpellPowerValues<number>(data, 0);
    }

    get arcane(): number {
        return this._data.arcane;
    }

    get divine(): number {
        return this._data.divine;
    }

    get spontaneous(): number {
        return this._data.spontaneous;
    }

    get abj(): number {
        return this._data.abj;
    }

    get con(): number {
        return this._data.con;
    }

    get div(): number {
        return this._data.div;
    }

    get enc(): number {
        return this._data.enc;
    }

    get evo(): number {
        return this._data.evo;
    }

    get ill(): number {
        return this._data.ill;
    }

    get nec(): number {
        return this._data.nec;
    }

    get tra(): number {
        return this._data.tra;
    }

    get uni(): number {
        return this._data.uni;
    }

    get void(): number {
        return this._data.void;
    }

    get heal(): number {
        return this._data.heal;
    }

    computed(mode: CastingMode, school: School | SubSchool): number {
        return computedSpellPower(this, mode, school);
    }

    private static _allKeys: string[] = [
        ...Object.keys(CastingMode),
        ...Object.keys(School),
        ...Object.keys(SubSchool),
    ];

    static get allKeys(): readonly string[] {
        return Object.freeze(this._allKeys);
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
