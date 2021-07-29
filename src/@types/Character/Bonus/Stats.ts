import { sum } from '../../../utils';
import { PartialStatSet, StatKey, StatSet, zeroDefault } from '../Stats';

export default class StatsBonus {
    private _values: StatSet;

    constructor(values: PartialStatSet) {
        this._values = Object.assign({}, zeroDefault, values);
        for (const stat of Object.keys(StatKey)) {
            Object.defineProperty(this, stat, {
                enumerable: true,
                configurable: false,
                get: () => this._values[stat as StatKey] || 0,
            });
        }
    }

    static get zero(): StatsBonus { return new StatsBonus(zeroDefault); }

    static sum(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(StatKey)) {
            result._values[stat as StatKey] =
                sum(...args.map(s => s._values[stat as StatKey]));
        }
        return result;
    }

    static max(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(StatKey)) {
            result._values[stat as StatKey] =
                Math.max(...args.map(s => s._values[stat as StatKey]));
        }
        return result;
    }
}