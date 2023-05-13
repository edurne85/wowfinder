import { buildGear, Gear } from './Gear';
import Money from './Money';

interface InventoryBuilder {
    money?: number;
    gear?: Gear[];
}

export default class Inventory {
    private _gear: Gear[];
    private _money: Money;

    constructor({ money = 0, gear = [] }: InventoryBuilder) {
        this._gear = gear.map(g => buildGear(g));
        this._money = Money.fromRaw(money);
    }

    static copy(inventory: Inventory): Inventory {
        return new Inventory({
            money: inventory._money.raw,
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
        return Money.fromMoney(this._money);
    }

    get gear(): Gear[] {
        return this._gear;
    }
}

export { InventoryBuilder };
