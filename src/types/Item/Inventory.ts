import { JsonValue, sum } from '../../utils';
import { buildItem, Gear, Item } from '.';
import { convertMass, MassUnit } from '../Units/Mass';
import Money from './Money';

interface InventoryBuilder {
    money?: number;
    gear?: Gear[];
    carried?: Item[];
    owned?: Item[];
}

const needsPreffix = (val: any): boolean =>
    typeof val === 'string' && !/^gear\./.test(val);
const addPreffix = (val: any): any => (needsPreffix(val) ? `gear.${val}` : val);
const isGear = (i: Item): boolean => i instanceof Gear;
const asGear = (i: Item): Gear => i as Gear;

class Inventory {
    #gear: Gear[];
    #carried: Item[];
    #owned: Item[];
    #money: Money;

    constructor({
        money = 0,
        gear = [],
        carried = [],
        owned = [],
    }: InventoryBuilder) {
        this.#gear = gear
            .map(addPreffix)
            .map(buildItem)
            .filter(isGear)
            .map(asGear);
        this.#carried = carried.map(buildItem);
        this.#owned = owned.map(buildItem);
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

    get carried(): Item[] {
        return this.#carried;
    }

    get owned(): Item[] {
        return this.#owned;
    }

    get load(): number {
        const items = [...this.#gear, ...this.#carried];
        return sum(...items.map(g => convertMass(g.weight, MassUnit.lb).value));
    }

    export(): JsonValue {
        return {
            money: this.#money.raw,
            gear: this.#gear.map(g => g.key),
            carried: this.#carried.map(c => c.key),
            owned: this.#owned.map(o => o.key),
        };
    }
}

export type { InventoryBuilder };
export { Inventory };
