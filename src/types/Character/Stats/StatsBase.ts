import { Mass } from '../../Units';
import {
    StatSet,
    baseDefault,
    zeroDefault,
    PartialStatBlock,
    addStatSets,
    carry,
} from './helpers';

class StatsBase {
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
}

export { StatsBase };
