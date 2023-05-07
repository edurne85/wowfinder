import { convertSpeed, LengthUnit, Speed, SpeedUnit, TimeUnit } from '../Units';

enum FlyManeuverability {
    clumsy = 'clumsy',
    poor = 'poor',
    average = 'average',
    good = 'good',
    perfect = 'perfect',
}

function flyManeuverabilityBonus(maneuverability: FlyManeuverability): number {
    switch (maneuverability) {
        case FlyManeuverability.clumsy:
            return -8;
        case FlyManeuverability.poor:
            return -4;
        case FlyManeuverability.average:
            return 0;
        case FlyManeuverability.good:
            return 4;
        case FlyManeuverability.perfect:
            return 8;
    }
}

const ManeuverabilitySortedValues = Object.keys(FlyManeuverability).sort(
    (a, b) =>
        flyManeuverabilityBonus(a as FlyManeuverability) -
        flyManeuverabilityBonus(b as FlyManeuverability),
);

type SpeedValue = number | Speed; // number taken as feet/turn

const defaultSpeedUnit = new SpeedUnit({
    length: LengthUnit.foot,
    time: TimeUnit.turn,
});

interface SpeedBuilder {
    base: SpeedValue;
    fly?: SpeedValue;
    swim?: SpeedValue;
    burrow?: SpeedValue;
    climb?: SpeedValue;
    misc?: SpeedValue;
    encumberance?: boolean;
    maneuverability?: FlyManeuverability;
}

const asFeet: (value: SpeedValue) => number = value =>
    value === 0
        ? 0
        : (value as number) ||
          convertSpeed(value as Speed, defaultSpeedUnit).value;

const encumbered: (value: number) => number = value =>
    value - (value >= 30 ? 10 : 5);

const wrap: (value: number) => Speed = value =>
    new Speed({ value, unit: defaultSpeedUnit });

class Speeds {
    private _base: number;
    private _fly: number;
    private _swim: number;
    private _burrow: number;
    private _climb: number;
    private _misc: number;
    private _encumberance: boolean;
    private _maneuverablity: FlyManeuverability;

    constructor({
        base,
        fly = 0,
        swim = 0,
        burrow = 0,
        climb = 0,
        misc = 0,
        encumberance = true,
        maneuverability = FlyManeuverability.average,
    }: SpeedBuilder) {
        this._base = asFeet(base);
        this._fly = asFeet(fly);
        this._swim = asFeet(swim);
        this._burrow = asFeet(burrow);
        this._climb = asFeet(climb);
        this._misc = asFeet(misc);
        this._encumberance = encumberance;
        this._maneuverablity = maneuverability;
    }

    get base(): Speed {
        return wrap(this._base);
    }

    get fly(): { speed: Speed; maneuverability: FlyManeuverability } {
        return {
            speed: wrap(this._fly),
            maneuverability: this._maneuverablity,
        };
    }

    get swim(): Speed {
        return wrap(this._swim);
    }

    get burrow(): Speed {
        return wrap(this._burrow);
    }

    get climb(): Speed {
        return wrap(this._climb);
    }

    get misc(): Speed {
        return wrap(this._misc);
    }

    get encumbered(): Speed {
        return wrap(this._encumberance ? encumbered(this._base) : this._base);
    }

    static get zero(): Speeds {
        return new Speeds({ base: 0 });
    }

    static get default(): Speeds {
        return new Speeds({ base: 30 });
    }
}

export {
    Speeds,
    FlyManeuverability,
    ManeuverabilitySortedValues,
    flyManeuverabilityBonus,
};
export type { SpeedBuilder };
