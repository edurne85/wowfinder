import { ByKeyRecursive, forceDataLoadKeySRecursive } from '../../../utils';
import {
    Bonus,
    BonusProvider,
    BonusType,
    MultiBonus,
} from '../../Character/Bonus';
import Size from '../../Character/Size';
import { Mass, Weight } from '../../Units';
import Money from '../Money';
import { Item, ItemBuilder } from '../base';
import { buildShape, explodeShape, Shape } from './Slot';
import { validateGear } from './validation';

interface GearBuilder extends ItemBuilder {
    shape: string[];
    size: Size;
    bonuses?: Bonus;
    weight: Weight;
}

class Gear extends Item implements BonusProvider {
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
            bonuses: gear.#bonuses, // TODO #430: make copy
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

    get value(): Money {
        return Money.zero;
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

    validate(): void {
        super.validate();
        validateGear(this);
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

    static #loaded: ByKeyRecursive<Gear> | null = null;

    static load(builder: (raw: any) => Gear): ByKeyRecursive<Gear> {
        return (this.#loaded ||= forceDataLoadKeySRecursive<Gear>(
            window.Main.asset('Items/gear'),
            builder,
        ));
    }
}

export type { Weight, GearBuilder };

export { Gear };
