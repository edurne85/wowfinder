// TODO Deprecate once gear is fully supported

import Size, { sizeCombatMod } from './Size';
import Stats from './Stats';

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

type FullArmorValuesBuilder = ArmorValuesBuilder & {
    str?: number,
    dex?: number,
    bab?: number,
    size?: number,
};

type FullFromBaseBuilder = {
    base: ArmorValues,
    stats: Stats,
    bab: number,
    size: Size,
};

class ArmorValues {
    private _armor: number;
    private _shield: number;
    private _dodge: number;
    private _nat: number;
    private _defl: number;
    private _misc: number;
    private _miscP: number; // Misc bonus - Physical (not touch)
    private _miscE: number; // Misc bonus - Evasion (not ff)
    private _temp: number;
    private _tempP: number; // Temp bonus - Physical (not touch)
    private _tempE: number; // Temp bonus - Evasion (not ff)

    constructor({
        armor = 0,
        shield = 0,
        dodge = 0,
        nat = 0,
        defl = 0,
        misc = 0,
        miscP = 0,
        miscE = 0,
        temp = 0,
        tempP = 0,
        tempE = 0,
    }: ArmorValuesBuilder) {
        this._armor = armor;
        this._shield = shield;
        this._dodge = dodge;
        this._nat = nat;
        this._defl = defl;
        this._misc = misc;
        this._miscP = miscP;
        this._miscE = miscE;
        this._temp = temp;
        this._tempP = tempP;
        this._tempE = tempE;
    }

    get armor(): number { return this._armor; }

    get shield(): number { return this._shield; }

    get dodge(): number { return this._dodge; }

    get nat(): number { return this._nat; }

    get defl(): number { return this._defl; }

    get misc(): number { return this._misc; }

    get miscP(): number { return this._miscP; }

    get miscE(): number { return this._miscE; }

    get miscAll(): number { return this.misc + this.miscP + this.miscE; }

    get temp(): number { return this._temp; }

    get tempP(): number { return this._tempP; }

    get tempE(): number { return this._tempE; }

    get tempAll(): number { return this.temp + this.tempP + this.tempE; }

    static get zero(): ArmorValues { return new ArmorValues({}); }
}

class FullArmorValues extends ArmorValues {
    private _str: number;
    private _dex: number;
    private _bab: number;
    private _size: number;

    constructor({
        armor = 0,
        shield = 0,
        dodge = 0,
        nat = 0,
        defl = 0,
        misc = 0,
        miscP = 0,
        miscE = 0,
        temp = 0,
        tempP = 0,
        tempE = 0,
        str = 0,
        dex = 0,
        bab = 0,
        size = 0,
    }: FullArmorValuesBuilder) {
        super({armor, shield, dodge, nat, defl, misc, miscP, miscE, temp, tempP, tempE});
        this._str = str;
        this._dex = dex;
        this._bab = bab;
        this._size = size;
    }

    static fromBaseValues({base, stats, bab, size}: FullFromBaseBuilder): FullArmorValues {
        const {
            armor,
            shield,
            dodge,
            nat,
            defl,
            misc,
            miscP,
            miscE,
            temp,
            tempP,
            tempE,
        } = base;
        const mods = stats.totalMods;
        return new FullArmorValues({
            armor,
            shield,
            dodge,
            nat,
            defl,
            misc,
            miscP,
            miscE,
            temp,
            tempP,
            tempE,
            str: mods.STR,
            dex: mods.DEX,
            bab,
            size: sizeCombatMod(size),
        });
    }

    get str(): number { return this._str; }

    get dex(): number { return this._dex; }

    get bab(): number { return this._bab; }

    get size(): number { return this._size; }

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
            defl: this.defl, // TODO Verify!
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
        return 10 + this.armor + this.shield + this.nat +
            this.dodge + this.defl + this.dex + this.size +
            this.misc + this.miscP + this.miscE +
            this.temp + this.tempP + this.tempE;
    }

    get cmd(): number {
        return 10 + this.bab + this.str + this.dex +
            this.size + this.dodge + this.defl +
            this.misc + this.miscE +
            this.temp + this.tempE;
    }

    get cmdFlatFooted(): number {
        return 10 + this.bab + this.str + this.size +
            this.misc + this.temp;
    }
}

export {
    ArmorValues,
    FullArmorValues,
};