import type { Dice } from './Dice';

interface DiceBuilder {
    sides: number;
    qtty?: number;
    fixedMod?: number;
}

function average(sides: number, qtty: number, mod: number): number {
    return mod + qtty * ((sides + 1) / 2) + (sides === 1 ? 0 : 0.5);
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

export { DiceBuilder, RollableValue, average, max, min, make };
