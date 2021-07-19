enum StatKey {
    STR = 'STR',
    DEX = 'DEX',
    CON = 'CON',
    INT = 'INT',
    WIS = 'WIS',
    CHA = 'CHA',
}

const statMod = (value: number): number =>  Math.floor(value / 2 - 5);

type StatSet = {[key in StatKey]: number};

const sum = (...args: number[]): number => args.reduce((acc, curr) => acc + curr);

function addStatSets(...args: StatSet[]): StatSet {
    return {
        STR: sum(...args.map(s => s.STR)),
        DEX: sum(...args.map(s => s.DEX)),
        CON: sum(...args.map(s => s.CON)),
        INT: sum(...args.map(s => s.INT)),
        WIS: sum(...args.map(s => s.WIS)),
        CHA: sum(...args.map(s => s.CHA)),
    }
};

const baseDefault: StatSet = {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
};
const zeroDefault: StatSet = {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0,
};
type StatBlock = {
    base: StatSet,
    racial: StatSet,
    enhance: StatSet,
    gear: StatSet,
    misc: StatSet,
    temp: StatSet,
};
export default class Stats {
    private base: StatSet;
    private racial: StatSet;
    private enhance: StatSet;
    private gear: StatSet;
    private misc: StatSet;
    private temp: StatSet;

    constructor({
        base = baseDefault,
        racial = zeroDefault,
        enhance = zeroDefault,
        gear = zeroDefault,
        misc = zeroDefault,
        temp = zeroDefault,
    }: StatBlock) {
        this.base = base;
        this.racial = racial;
        this.enhance = enhance;
        this.gear = gear;
        this.misc = misc;
        this.temp = temp;
    }

    get totals(): StatSet {
        return addStatSets(this.base, this.racial, this.enhance, this.gear, this.misc, this.temp);
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
        }
    }
}

export {
    StatKey,
    StatSet,
    statMod,
    baseDefault,
    zeroDefault,
}