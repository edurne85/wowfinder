import { Bonus, BonusProvider, BonusType, MultiBonus } from '../../Character/Bonus';
import Size from '../../Character/Size';
import { Mass, MassUnit } from '../../Units';
import { buildShape, explodeShape, Shape } from './Slot';

type Weight = number | Mass;
interface GearBuilder {
    label: string;
    shape: string[],
    size: Size,
    weight: Weight,
    bonuses?: Bonus,
}

function asPounds(w: Weight): Mass {
    return (w instanceof Mass) ? w : new Mass({value: w as number, unit: MassUnit.lb});
}

export default class Gear implements BonusProvider {
    protected _label: string;
    protected _shape: Shape;
    protected _size: Size;
    protected _weight: Mass;
    protected _bonuses: Bonus;

    constructor({
        label,
        shape,
        size,
        weight,
        bonuses = Bonus.zero(BonusType.gear),
    }: GearBuilder) {
        this._label = label;
        this._shape = buildShape(shape);
        this._size = size;
        this._weight = asPounds(weight);
        this._bonuses = bonuses.retyped(BonusType.gear);
    }

    static copy(gear: Gear): Gear {
        return new Gear({
            label: gear._label,
            shape: explodeShape(gear._shape),
            size: gear._size,
            weight: gear._weight,
            bonuses: gear._bonuses, // TODO make copy
        });
    }

    get label(): string { return this._label; }

    get shape(): Shape { return [...this._shape]; }

    get size(): Size { return this._size; }

    get weight(): Mass { return this._weight; }

    get bonuses(): Bonus { return this._bonuses.asType(BonusType.gear); }

    get fullBonus(): MultiBonus {
        return new MultiBonus({gear: this.bonuses});
    }

    get $type(): string { return ''; }
    
    static build(raw: any): Gear {
        return new Gear({
            label: raw.label as string || '',
            shape: raw.shape as string[] || [],
            size: raw.size as Size || 0,
            weight: raw.weight || 0,
            bonuses: Bonus.build(raw.bonuses || {}),
        });
    }
}

export type {
    Weight,
    GearBuilder,
};

export {
    Gear,
};
