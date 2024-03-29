import { sum } from '../../../utils';
import { Mass, MassUnit } from '../../Units';
import { StatKey } from './keys';

function statMod(stat: number): number {
    return Math.floor(stat / 2 - 5);
}

type StatSet = { [key in StatKey]: number };

type PartialStatSet = { [key in StatKey]?: number };

function fillStatSet(base: PartialStatSet, defaultValue: number = 0): StatSet {
    return {
        STR: base.STR ?? defaultValue,
        DEX: base.DEX ?? defaultValue,
        CON: base.CON ?? defaultValue,
        INT: base.INT ?? defaultValue,
        WIS: base.WIS ?? defaultValue,
        CHA: base.CHA ?? defaultValue,
    };
}

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

function scaleStatSet(stats: StatSet, factor: number): StatSet {
    return {
        STR: Math.floor(stats.STR * factor),
        DEX: Math.floor(stats.DEX * factor),
        CON: Math.floor(stats.CON * factor),
        INT: Math.floor(stats.INT * factor),
        WIS: Math.floor(stats.WIS * factor),
        CHA: Math.floor(stats.CHA * factor),
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

export {
    StatSet,
    PartialStatSet,
    fillStatSet,
    PartialStatBlock,
    addStatSets,
    scaleStatSet,
    baseDefault,
    zeroDefault,
    statMod,
    carry,
};
