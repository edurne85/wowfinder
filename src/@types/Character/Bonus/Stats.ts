import { sum } from '../../../utils';
import { StatKey, StatSet, zeroDefault } from '../Stats';

export default class StatsBonus {
    private _values: StatSet;

    constructor(values: StatSet) {
        this._values = {...values};
        for (const stat of Object.keys(StatKey)) {
            Object.defineProperty(this, stat, {
                enumerable: true,
                configurable: false,
                get: () => this._values[stat as StatKey] || 0,
            });
        }
    }

    static get zero(): StatsBonus { return new StatsBonus(zeroDefault); }

    static combine(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(StatKey)) {
            result._values[stat as StatKey] =
                sum(...args.map(s => s._values[stat as StatKey]));
        }
        return result;
    }
}