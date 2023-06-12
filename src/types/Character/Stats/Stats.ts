import { Mass } from '../../Units';
import {
    StatSet,
    baseDefault,
    zeroDefault,
    PartialStatBlock,
    addStatSets,
    statMod,
    carry,
} from './helpers';

class Stats {
    #base: StatSet;
    #racial: StatSet;
    #enhance: StatSet;
    #gear: StatSet;
    #misc: StatSet;
    #temp: StatSet;

    constructor({
        base = baseDefault,
        racial = zeroDefault,
        enhance = zeroDefault,
        gear = zeroDefault,
        misc = zeroDefault,
        temp = zeroDefault,
    }: PartialStatBlock) {
        this.#base = base;
        this.#racial = racial;
        this.#enhance = enhance;
        this.#gear = gear;
        this.#misc = misc;
        this.#temp = temp;
    }

    get totals(): StatSet {
        return addStatSets(
            this.#base,
            this.#racial,
            this.#enhance,
            this.#gear,
            this.#misc,
            this.#temp,
        );
    }

    get active(): StatSet {
        return addStatSets(this.#base, this.#racial, this.#enhance);
    }

    get totalMods(): StatSet {
        const totals = this.totals;
        return {
            STR: statMod(totals.STR),
            DEX: statMod(totals.DEX),
            CON: statMod(totals.CON),
            INT: statMod(totals.INT),
            WIS: statMod(totals.WIS),
            CHA: statMod(totals.CHA),
        };
    }

    get base(): StatSet {
        return Object.assign({}, this.#base);
    }

    get racial(): StatSet {
        return Object.assign({}, this.#racial);
    }

    get enhance(): StatSet {
        return Object.assign({}, this.#enhance);
    }

    get gear(): StatSet {
        return Object.assign({}, this.#gear);
    }

    get misc(): StatSet {
        return Object.assign({}, this.#misc);
    }

    get temp(): StatSet {
        return Object.assign({}, this.#temp);
    }

    get carry(): Mass {
        return carry(this.totals.STR);
    }

    updated({
        base,
        racial,
        enhance,
        gear,
        misc,
        temp,
    }: PartialStatBlock): Stats {
        return new Stats({
            base: base || this.base,
            racial: racial || this.racial,
            enhance: enhance || this.enhance,
            gear: gear || this.gear,
            misc: misc || this.misc,
            temp: temp || this.temp,
        });
    }
}

export { Stats };
