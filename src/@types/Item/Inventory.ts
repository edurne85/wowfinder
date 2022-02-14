import { buildItem, Gear, Item } from '.';
import Money from './Money';

interface InventoryBuilder {
    money?: number;
    gear?: Gear[];
}

const needsPreffix = (val: any): boolean =>
    typeof val === 'string' && !/^gear\./.test(val);
const addPreffix = (val: any): any => (needsPreffix(val) ? `gear.${val}` : val);
const isGear = (i: Item): boolean => i instanceof Gear;
const asGear = (i: Item): Gear => i as Gear;

class Inventory {
    #gear: Gear[];
    #money: Money;

    constructor({ money = 0, gear = [] }: InventoryBuilder) {
        this.#gear = gear
            .map(addPreffix)
            .map(buildItem)
            .filter(isGear)
            .map(asGear);
        this.#money = Money.fromRaw(money);
    }

    static copy(inventory: Inventory): Inventory {
        return new Inventory({
            money: inventory.#money.raw,
            gear: inventory.gear,
        });
    }

    static get defaultBuilder(): InventoryBuilder {
        return {
            money: 0,
            gear: [],
        };
    }

    static get empty(): Inventory {
        return new Inventory(Inventory.defaultBuilder);
    }

    get money(): Money {
        return Money.fromMoney(this.#money);
    }

    get gear(): Gear[] {
        return this.#gear;
    }
}

export type { InventoryBuilder };
export { Inventory };
