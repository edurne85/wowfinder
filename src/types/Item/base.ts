import { Asset, validateEnumValue } from '@model/Assets';
import {
    builder,
    ByKeyRecursive,
    forceDataLoadKeySRecursive,
} from '../../utils';
import { Mass } from '../Units';
import { Rarity } from './Rarity';
import { ValidationError } from '@model/Validable';
import Money from './Money';

interface ItemBuilder {
    rarity?: Rarity;
    label: string;
}

abstract class Item implements Asset {
    #label: string;
    #rarity: Rarity;
    constructor({ label, rarity = Rarity.common }: ItemBuilder) {
        this.#label = label;
        this.#rarity = rarity;
    }

    get label(): string {
        return this.#label;
    }

    get key(): string {
        return this.#label.split('.').reverse()[0];
    }

    get rarity(): Rarity {
        return this.#rarity;
    }

    abstract get weight(): Mass;

    abstract get value(): Money;

    validate(): void {
        validateEnumValue(this.#rarity, Rarity);
        if (this.weight instanceof Mass) {
            this.weight.validate();
        } else {
            throw new ValidationError(this, 'Weight is required');
        }
        const value = this.value;
        if (value instanceof Money) {
            value.validate();
        } else {
            throw new ValidationError(this, 'Value is required');
        }
    }

    static preBuild(raw: any): ItemBuilder {
        return {
            label: (raw.label as string) || '',
            rarity: (raw.rarity as Rarity) || Rarity.common,
        };
    }

    static #loaded: ByKeyRecursive<Item> | null = null;

    static load(build: builder<Item>): ByKeyRecursive<Item> {
        return (this.#loaded ||= forceDataLoadKeySRecursive<Item>(
            window.Main.asset('Items'),
            build,
        ));
    }
}

export type { ItemBuilder };
export { Item };
