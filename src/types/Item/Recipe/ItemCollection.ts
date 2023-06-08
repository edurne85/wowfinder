import { Quantified } from '../../../utils';
import { Item } from '../base';
import { buildItem } from '../builders';

type ArrayOr<T> = T | T[];

type ItemCollectionBuilder = ArrayOr<Quantified<Item | string> | Item | string>;

function asArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

function asItem(value: Item | string): Item {
    return value instanceof Item ? value : buildItem(value);
}

class ItemCollection {
    #items: Quantified<Item>[];
    constructor(items: ItemCollectionBuilder) {
        this.#items = [];
        asArray(items).forEach(entry => {
            const isRaw = typeof entry === 'string' || entry instanceof Item;
            const q: Quantified<Item> = {
                item: asItem(isRaw ? entry : entry.item),
                qtty: isRaw ? 1 : entry.qtty,
            };
            Object.freeze(q);
            this.#items.push(q);
        });
    }

    get items(): Quantified<Item>[] {
        return [...this.#items];
    }
}

export type { ItemCollectionBuilder };
export { ItemCollection };
