import Stats from './Stats';

interface SaveBreakdownBuilder {
    base: number;
    stat: number;
    enhance: number;
    gear: number;
    misc: number;
    temp: number;
}

class SaveBreakdown {
    private _base: number;
    private _stat: number;
    private _enhance: number;
    private _gear: number;
    private _misc: number;
    private _temp: number;
    constructor({base, stat, enhance, gear, misc, temp}: SaveBreakdownBuilder) {
        this._base = base;
        this._stat = stat;
        this._enhance = enhance;
        this._gear = gear;
        this._misc = misc;
        this._temp = temp;
    }

    get total(): number { return this._stat + this._base + this._enhance + this._gear + this._misc + this._temp; }

    get base(): number { return this._base; }

    get stat(): number { return this._stat; }
    
    get enhance(): number { return this._enhance; }
    
    get gear(): number { return this._gear; }
    
    get misc(): number { return this._misc; }
    
    get temp(): number { return this._temp; }
}

interface SimpleSaves {
    fort: number;
    refl: number;
    will: number;
}

const zero: SimpleSaves = {
    fort: 0,
    refl: 0,
    will: 0,
};

interface SavesBuilder {
    stats: Stats;
    base?: SimpleSaves;
    enhance?: SimpleSaves;
    gear?: SimpleSaves;
    misc?: SimpleSaves;
    temp?: SimpleSaves;
}

class Saves {
    private _stats: Stats;
    private _base: SimpleSaves;
    private _ehn: SimpleSaves;
    private _gear: SimpleSaves;
    private _misc: SimpleSaves;
    private _temp: SimpleSaves;
    constructor({stats, base = zero, enhance = zero, gear = zero, misc = zero, temp = zero}: SavesBuilder) {
        this._stats = new Stats(stats);
        this._base = Object.assign({}, base);
        this._ehn = Object.assign({}, enhance);
        this._gear = Object.assign({}, gear);
        this._misc = Object.assign({}, misc);
        this._temp = Object.assign({}, temp);
    }

    get base(): SimpleSaves { return Object.assign({}, this._base); }

    get enhance(): SimpleSaves { return Object.assign({}, this._ehn); }

    get gear(): SimpleSaves { return Object.assign({}, this._gear); }

    get misc(): SimpleSaves { return Object.assign({}, this._misc); }

    get temp(): SimpleSaves { return Object.assign({}, this._temp); }

    get fort(): SaveBreakdown {
        return new SaveBreakdown({
            base: this._base.fort,
            stat: this._stats.totalMods.CON,
            enhance: this._ehn.fort,
            gear: this._gear.fort,
            misc: this._misc.fort,
            temp: this._temp.fort,
        });
    }

    get refl(): SaveBreakdown {
        return new SaveBreakdown({
            base: this._base.refl,
            stat: this._stats.totalMods.DEX,
            enhance: this._ehn.refl,
            gear: this._gear.refl,
            misc: this._misc.refl,
            temp: this._temp.refl,
        });
    }

    get will(): SaveBreakdown {
        return new SaveBreakdown({
            base: this._base.will,
            stat: this._stats.totalMods.WIS,
            enhance: this._ehn.will,
            gear: this._gear.will,
            misc: this._misc.will,
            temp: this._temp.will,
        });
    }
}

export {
    Saves,
    SaveBreakdown,
};