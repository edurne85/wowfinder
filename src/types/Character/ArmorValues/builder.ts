import Size from '../Size';
import Stats from '../Stats';
import type { ArmorValues } from './ArmorValues';

interface ArmorValuesBuilder {
    armor?: number;
    shield?: number;
    dodge?: number;
    nat?: number;
    defl?: number;
    misc?: number;
    miscP?: number;
    miscE?: number;
    temp?: number;
    tempP?: number;
    tempE?: number;
}

interface FullArmorValuesBuilder extends ArmorValuesBuilder {
    str?: number,
    dex?: number,
    bab?: number,
    size?: number,
}

interface FullFromBaseBuilder {
    base: ArmorValues,
    stats: Stats,
    bab: number,
    size: Size,
}

export type {
    ArmorValuesBuilder,
    FullArmorValuesBuilder,
    FullFromBaseBuilder,
};