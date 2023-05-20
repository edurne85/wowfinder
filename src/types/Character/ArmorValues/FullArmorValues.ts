import { sizeCombatMod } from '../Size';
import { ArmorValues } from './ArmorValues';
import { FullArmorValuesBuilder, FullFromBaseBuilder } from './builder';

class FullArmorValues extends ArmorValues {
    private _str: number;
    private _dex: number;
    private _bab: number;
    private _size: number;

    constructor({
        str = 0,
        dex = 0,
        bab = 0,
        size = 0,
        ...rest
    }: FullArmorValuesBuilder) {
        super(rest);
        this._str = str;
        this._dex = dex;
        this._bab = bab;
        this._size = size;
    }

    static fromBaseValues({
        base,
        stats,
        bab,
        size,
    }: FullFromBaseBuilder): FullArmorValues {
        const mods = stats.totalMods;
        return new FullArmorValues({
            ...base,
            str: mods.STR,
            dex: mods.DEX,
            bab,
            size: sizeCombatMod(size),
        });
    }

    get str(): number {
        return this._str;
    }

    get dex(): number {
        return this._dex;
    }

    get bab(): number {
        return this._bab;
    }

    get size(): number {
        return this._size;
    }

    get touch(): FullArmorValues {
        return new FullArmorValues({
            armor: 0,
            shield: 0,
            dodge: this.dodge,
            nat: 0,
            defl: this.defl,
            misc: this.misc + this.miscE,
            miscP: 0,
            miscE: 0,
            temp: this.temp + this.tempE,
            tempP: 0,
            tempE: 0,
            dex: this.dex,
            size: this.size,
        });
    }

    get flatFooted(): FullArmorValues {
        return new FullArmorValues({
            armor: this.armor,
            shield: this.shield,
            dodge: 0,
            nat: this.nat,
            defl: this.defl,
            misc: this.misc + this.miscP,
            miscP: 0,
            miscE: 0,
            temp: this.temp + this.tempP,
            tempP: 0,
            tempE: 0,
            dex: 0,
            size: this.size,
        });
    }

    get total(): number {
        return (
            10 +
            this.armor +
            this.shield +
            this.nat +
            this.dodge +
            this.defl +
            this.dex +
            this.size +
            this.misc +
            this.miscP +
            this.miscE +
            this.temp +
            this.tempP +
            this.tempE
        );
    }

    get cmd(): number {
        return (
            10 +
            this.bab +
            this.str +
            this.dex +
            this.size +
            this.dodge +
            this.defl +
            this.misc +
            this.miscE +
            this.temp +
            this.tempE
        );
    }

    get cmdFlatFooted(): number {
        return 10 + this.bab + this.str + this.size + this.misc + this.temp;
    }
}

export { FullArmorValues };
