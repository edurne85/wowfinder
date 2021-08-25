import { Bonus, BonusType } from '../Character/Bonus';
import Size from '../Character/Size';
import { Mass, MassUnit } from '../Units';
import { buildShape, Shape } from './Slot';

type Weight = number | Mass;
interface GearBuilder {
    shape: string[],
    size: Size,
    weight: Weight,
    bonuses: Bonus,
}

function asPounds(w: Weight): Mass {
    return (w as Mass) || new Mass({value: w as number, unit: MassUnit.lb});
}

export default class Gear {
    protected _shape: Shape;
    protected _size: Size;
    protected _weight: Mass;
    protected _bonuses: Bonus;

    constructor({shape, size, weight, bonuses}: GearBuilder) {
        this._shape = buildShape(shape);
        this._size = size;
        this._weight = asPounds(weight);
        this._bonuses = bonuses;
    }

    get shape(): Shape { return {...this._shape}; }

    get size(): Size { return this._size; }

    get weight(): Mass { return this._weight; }

    get bonuses(): Bonus { return this._bonuses.asType(BonusType.gear); }
}

export type {
    GearBuilder,
};

export {
    Gear,
};
