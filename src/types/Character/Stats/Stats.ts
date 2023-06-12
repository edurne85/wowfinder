import { Mass } from '../../Units';
import { StatsBase } from './StatsBase';
import {
    StatSet,
    PartialStatBlock,
    addStatSets,
    statMod,
    carry,
} from './helpers';

class Stats extends StatsBase {
    get active(): StatSet {
        return addStatSets(this.base, this.racial, this.enhance);
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
