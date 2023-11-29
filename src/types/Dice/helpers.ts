import type { Dice } from './Dice';

interface DiceBuilder {
    sides: number;
    qtty?: number;
    fixedMod?: number;
}

function average(sides: number, qtty: number, mod: number): number {
    return mod + qtty * ((sides + 1) / 2);
}

function intAverage(sides: number, qtty: number, mod: number): number {
    return Math.round(average(sides, qtty, mod));
}

function max(sides: number, qtty: number, mod: number): number {
    return mod + qtty * sides;
}

function min(qtty: number, mod: number): number {
    return mod + qtty;
}

function make(value: number | Dice | DiceBuilder): DiceBuilder {
    return typeof value === 'number'
        ? { sides: 0, qtty: 0, fixedMod: value }
        : value;
}
type RollableValue = number | Dice | DiceBuilder;

export type { DiceBuilder, RollableValue };
export { average, intAverage, max, min, make };
