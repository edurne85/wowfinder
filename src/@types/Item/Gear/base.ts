import { ByKeyRecursive, forceDataImportKeySRecursive } from '../../../utils';
import { Bonus, BonusProvider, BonusType, MultiBonus } from '../../Character/Bonus';
import Size from '../../Character/Size';
import { Mass } from '../../Units';
import { Item } from '../base';
import { buildShape, explodeShape, Shape } from './Slot';

type Weight = number | Mass;
interface GearBuilder {
    label: string;
    shape: string[],
    size: Size,
    weight: Weight,
    bonuses?: Bonus,
}

export default class Gear extends Item implements BonusProvider {
    protected _shape: Shape;
    protected _size: Size;
    protected _bonuses: Bonus;

    constructor({
        label,
        shape,
        size,
        weight,
        bonuses = Bonus.zero(BonusType.gear),
    }: GearBuilder) {
        super({label, weight});
        this._shape = buildShape(shape);
        this._size = size;
        this._bonuses = bonuses.retyped(BonusType.gear);
    }

    static copy(gear: Gear): Gear {
        return new Gear({
            label: gear.label,
            shape: explodeShape(gear._shape),
            size: gear._size,
            weight: gear.weight,
            bonuses: gear._bonuses, // TODO make copy
        });
    }

    get shape(): Shape { return [...this._shape]; }

    get size(): Size { return this._size; }

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

    private static _imported: ByKeyRecursive<Gear> | null = null;

    static import(dir = window.Main.asset('Items/gear'), builder: (raw: any) => Gear): ByKeyRecursive<Gear> {
        return this._imported ||= forceDataImportKeySRecursive<Gear>(dir, builder);
    }
}

export type {
    Weight,
    GearBuilder,
};

export {
    Gear,
};
