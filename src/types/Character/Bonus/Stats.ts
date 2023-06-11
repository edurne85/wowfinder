import { sum } from '../../../utils';
import { PartialStatSet, StatKey, StatSet, zeroDefault } from '../Stats';

export default class StatsBonus {
    #values: StatSet;

    constructor(values: PartialStatSet) {
        this.#values = Object.assign({}, zeroDefault, values);
        for (const stat of Object.keys(StatKey)) {
            Object.defineProperty(this, stat, {
                enumerable: true,
                configurable: false,
                get: () => this.#values[stat as StatKey] || 0,
            });
        }
    }

    get values(): StatSet {
        return { ...this.#values };
    }

    static get zero(): StatsBonus {
        return new StatsBonus(zeroDefault);
    }

    static sum(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(StatKey)) {
            result.#values[stat as StatKey] = sum(
                ...args.map(s => s.#values[stat as StatKey]),
            );
        }
        return result;
    }

    static max(...args: StatsBonus[]): StatsBonus {
        const result = this.zero;
        for (const stat of Object.keys(StatKey)) {
            result.#values[stat as StatKey] = Math.max(
                ...args.map(s => s.#values[stat as StatKey]),
            );
        }
        return result;
    }

    static build(raw: any = {}): StatsBonus {
        const cured: any = {};
        for (const k of Object.keys(StatKey)) {
            if (raw[k]) {
                cured[k] = raw[k] || 0;
            }
        }
        return new StatsBonus({ ...cured });
    }
}
