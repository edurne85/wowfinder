import { Money, asMoney } from '../Money';
import { Item, ItemBuilder } from '../base';
import { Rarity, rarityMultipliers } from '../Rarity';
import { ValidationError } from '@model/Validable';

interface GoodBuilder extends ItemBuilder {
    label: string;
    iLevel: number;
}

interface RawGoodBuilder extends Partial<Omit<ItemBuilder, 'rarity'>> {
    key?: string;
    iLevel?: number;
    rarity?: Rarity | string;
}

abstract class Good extends Item {
    #iLevel: number;

    constructor(args: GoodBuilder) {
        super(args);
        this.#iLevel = args.iLevel;
        this.validate();
    }

    get iLevel(): number {
        return this.#iLevel;
    }

    abstract get valueMultiplier(): number;
    get value(): Money {
        return asMoney(
            this.valueMultiplier *
                rarityMultipliers[this.rarity] *
                this.#iLevel ** 2,
        );
    }

    validate(): void {
        super.validate();
        if (Number.isNaN(this.#iLevel)) {
            throw new ValidationError(this, 'Item level must be a number');
        }
    }

    static preBuild(raw: any): GoodBuilder {
        return {
            ...Item.preBuild(raw),
            iLevel: (raw.iLevel as number) || 0,
            rarity: (raw.rarity as Rarity) || Rarity.common,
        };
    }

    protected static generate(infix: string, raw: RawGoodBuilder): GoodBuilder {
        return {
            ...Good.preBuild(raw),
            label: `good.${infix}.${raw.key || ''}`,
        };
    }
}

export { Good, GoodBuilder, RawGoodBuilder };
