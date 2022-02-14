import { builder, ByKeyRecursive, forceDataImportKeySRecursive } from '../../utils';
import { Mass, MassUnit } from '../Units';

type Weight = number | Mass;
interface ItemBuilder {
    label: string;
    weight: Weight,
}

function asPounds(w: Weight): Mass {
    return (w instanceof Mass) ? w : new Mass({value: w as number, unit: MassUnit.lb});
}

abstract class Item {
    #label: string;
    #weight: Mass;
    constructor({label, weight}: ItemBuilder) {
        this.#label = label;
        this.#weight = asPounds(weight);
    }

    get label(): string { return this.#label; }

    get key(): string { return this.#label.split('.').reverse()[0]; }

    get weight(): Mass { return this.#weight; }

    static #imported: ByKeyRecursive<Item> | null = null;

    static import(dir = window.Main.asset('Items'), build: builder<Item>): ByKeyRecursive<Item> {
        return this.#imported ||= forceDataImportKeySRecursive<Item>(dir, build);
    }
}

export {
    Item,
};