import { ByKeyRecursive, forceDataImportKeySRecursive } from '../../../utils';
import {
    Bonus,
    BonusProvider,
    BonusType,
    MultiBonus,
} from '../../Character/Bonus';
import Size from '../../Character/Size';
import { Mass } from '../../Units';
import { Item, ItemBuilder } from '../base';
import { buildShape, explodeShape, Shape } from './Slot';

type Weight = number | Mass;
interface GearBuilder extends ItemBuilder {
    shape: string[];
    size: Size;
    bonuses?: Bonus;
    weight: Weight;
}

export default class Gear extends Item implements BonusProvider {
    #shape: Shape;
    #size: Size;
    #bonuses: Bonus;
    #weight: Mass;

    constructor({
        shape,
        size,
        weight,
        bonuses = Bonus.zero(BonusType.gear),
        ...args
    }: GearBuilder) {
        super(args);
        this.#shape = buildShape(shape);
        this.#size = size;
        this.#bonuses = bonuses.retyped(BonusType.gear);
        this.#weight = Mass.asPounds(weight);
    }

    static copy(gear: Gear): Gear {
        return new Gear({
            label: gear.label,
            shape: explodeShape(gear.#shape),
            size: gear.#size,
            weight: gear.#weight,
            bonuses: gear.#bonuses, // TODO make copy
        });
    }

    get shape(): Shape {
        return [...this.#shape];
    }

    get size(): Size {
        return this.#size;
    }

    get bonuses(): Bonus {
        return this.#bonuses.asType(BonusType.gear);
    }

    get weight(): Mass {
        return this.#weight;
    }

    get fullBonus(): MultiBonus {
        return new MultiBonus({ gear: this.bonuses });
    }

    get $type(): string {
        return '';
    }

    static preBuild(raw: any): GearBuilder {
        return {
            ...Item.preBuild(raw),
            shape: (raw.shape as string[]) || [],
            size: (raw.size as Size) || 0,
            weight: raw.weight || 0,
            bonuses: Bonus.build(raw.bonuses || {}),
        };
    }

    static build(raw: any): Gear {
        return new Gear(Gear.preBuild(raw));
    }

    private static _imported: ByKeyRecursive<Gear> | null = null;

    static import(
        dir = window.Main.asset('Items/gear'),
        builder: (raw: any) => Gear,
    ): ByKeyRecursive<Gear> {
        return (this._imported ||= forceDataImportKeySRecursive<Gear>(
            dir,
            builder,
        ));
    }
}

export type { Weight, GearBuilder };

export { Gear };
