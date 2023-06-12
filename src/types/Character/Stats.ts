import { sum } from '../../utils';
import { Mass, MassUnit } from '../Units';

enum StatPhysical {
    STR = 'STR',
    DEX = 'DEX',
    CON = 'CON',
}

enum StatMental {
    INT = 'INT',
    WIS = 'WIS',
    CHA = 'CHA',
}

const StatKey = {
    ...StatPhysical,
    ...StatMental,
} as const;

type StatKey = (typeof StatKey)[keyof typeof StatKey];

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

const statGroups = {
    [StatGroup.physical]: Object.keys(StatPhysical),
    [StatGroup.mental]: Object.keys(StatMental),
};

function inGroup(stat: StatKey, group: StatGroup): boolean {
    return statGroups[group].includes(stat);
}

const statMod = (value: number): number => Math.floor(value / 2 - 5);

type StatSet = { [key in StatKey]: number };

type PartialStatSet = { [key in StatKey]?: number };

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

type PartialStatBlock = {
    base?: StatSet;
    racial?: StatSet;
    enhance?: StatSet;
    gear?: StatSet;
    misc?: StatSet;
    temp?: StatSet;
};

function carry(str: number): Mass {
    if (str <= 0) {
        return new Mass({ value: 0, unit: MassUnit.lb });
    }
    let mult = 1;
    while (str > 20) {
        mult *= 4;
        str -= 10;
    }
    const base = [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 115, 130, 150, 175, 200, 230,
        260, 300, 350, 400,
    ];
    return new Mass({
        value: Math.floor(base[str - 1] * mult),
        unit: MassUnit.lb,
    });
}

export default class Stats {
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
    carry,
};
