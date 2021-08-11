import { sum } from '../../utils';

enum StatKey {
    STR = 'STR',
    DEX = 'DEX',
    CON = 'CON',
    INT = 'INT',
    WIS = 'WIS',
    CHA = 'CHA',
}

const StatKeys: StatKey[] = [
    StatKey.STR,
    StatKey.DEX,
    StatKey.CON,
    StatKey.INT,
    StatKey.WIS,
    StatKey.CHA,
];

enum StatGroup {
    physical = 'physical',
    mental = 'mental',
}

type StatPhysical = StatKey.STR | StatKey.DEX | StatKey.CON;

type StatMental = StatKey.INT | StatKey.WIS | StatKey.CHA;

function inGroup(stat: StatKey, group: StatGroup): boolean {
    return (stat as StatPhysical && group === StatGroup.physical)
        || (stat as StatMental && group === StatGroup.mental);
}

const statMod = (value: number): number =>  Math.floor(value / 2 - 5);

type StatSet = {[key in StatKey]: number};

type PartialStatSet = {[key in StatKey]?: number};

function addStatSets(...args: StatSet[]): StatSet {
    return {
        STR: sum(...args.map(s => s.STR)),
        DEX: sum(...args.map(s => s.DEX)),
        CON: sum(...args.map(s => s.CON)),
        INT: sum(...args.map(s => s.INT)),
        WIS: sum(...args.map(s => s.WIS)),
        CHA: sum(...args.map(s => s.CHA)),
    };
}

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
    private _base: StatSet;
    private _racial: StatSet;
    private _enhance: StatSet;
    private _gear: StatSet;
    private _misc: StatSet;
    private _temp: StatSet;

    constructor({
        base = baseDefault,
        racial = zeroDefault,
        enhance = zeroDefault,
        gear = zeroDefault,
        misc = zeroDefault,
        temp = zeroDefault,
    }: StatBlock) {
        this._base = base;
        this._racial = racial;
        this._enhance = enhance;
        this._gear = gear;
        this._misc = misc;
        this._temp = temp;
    }

    get totals(): StatSet {
        return addStatSets(this._base, this._racial, this._enhance, this._gear, this._misc, this._temp);
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

    get base(): StatSet { return Object.assign({}, this._base); }

    get racial(): StatSet { return Object.assign({}, this._racial); }

    get enhance(): StatSet { return Object.assign({}, this._enhance); }

    get gear(): StatSet { return Object.assign({}, this._gear); }

    get misc(): StatSet { return Object.assign({}, this._misc); }

    get temp(): StatSet { return Object.assign({}, this._temp); }
}

export {
    StatKey,
    StatKeys,
    StatGroup,
    StatPhysical,
    StatMental,
    inGroup,
    StatSet,
    PartialStatSet,
    statMod,
    baseDefault,
    zeroDefault,
};