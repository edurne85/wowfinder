import { Money, asMoney } from './Money';
import { Item, ItemBuilder } from './base';
import { Rarity, rarityMultipliers } from './Rarity';
import { Mass } from '../Units';

interface GoodBuilder extends ItemBuilder {
    label: string;
    iLevel: number;
}

interface RawGoodBuilder {
    key?: string;
    iLevel?: number;
    rarity?: Rarity | string;
}

abstract class Good extends Item {
    #iLevel: number;

    constructor(args: GoodBuilder) {
        super(args);
        this.#iLevel = args.iLevel;
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

class Ore extends Good {
    get valueMultiplier(): number {
        return 10;
    }

    get weight(): Mass {
        return Mass.asPounds(2);
    }

    static build(raw: any): Ore {
        return new Ore(Good.generate('ore', raw));
    }
}

export { Good, Ore };
