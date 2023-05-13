import { ArmorValuesBuilder } from './builder';

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

    get armor(): number {
        return this._armor;
    }

    get shield(): number {
        return this._shield;
    }

    get dodge(): number {
        return this._dodge;
    }

    get nat(): number {
        return this._nat;
    }

    get defl(): number {
        return this._defl;
    }

    get misc(): number {
        return this._misc;
    }

    get miscP(): number {
        return this._miscP;
    }

    get miscE(): number {
        return this._miscE;
    }

    get miscAll(): number {
        return this.misc + this.miscP + this.miscE;
    }

    get temp(): number {
        return this._temp;
    }

    get tempP(): number {
        return this._tempP;
    }

    get tempE(): number {
        return this._tempE;
    }

    get tempAll(): number {
        return this.temp + this.tempP + this.tempE;
    }

    export(): ArmorValuesBuilder {
        return {
            armor: this.armor,
            shield: this.shield,
            dodge: this.dodge,
            nat: this.nat,
            defl: this.defl,
            misc: this.misc,
            miscP: this.miscP,
            miscE: this.miscE,
            temp: this.temp,
            tempP: this.tempP,
            tempE: this.tempE,
        };
    }

    static get zero(): ArmorValues {
        return new ArmorValues({});
    }
}

export { ArmorValues };
