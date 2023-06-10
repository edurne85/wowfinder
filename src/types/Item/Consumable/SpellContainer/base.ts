import { Consumable } from '../base';
import Money from '../../Money';
import {
    SpellContainerBuilder,
    SpellContainerRawBuilder,
    buildSpellContainer,
    spellContainerPreBuild,
} from './helpers';
import { SpellContainerBaseBuilder } from './builder';

abstract class SpellContainer extends SpellContainerBaseBuilder {
    constructor(args: SpellContainerBuilder) {
        super(buildSpellContainer(args));
    }

    abstract get valueMultiplier(): number;

    get value(): Money {
        const chargeValue = Math.max(0.5, this.charges.current);
        return Money.fromRaw(
            chargeValue *
                this.valueMultiplier *
                this.spellLevel *
                this.casterLevel,
        );
    }

    protected static generate(
        infix: string,
        raw: SpellContainerRawBuilder,
    ): SpellContainerBuilder {
        return {
            ...Consumable.generate(infix, raw),
            ...spellContainerPreBuild(raw),
        };
    }
}

export { SpellContainer, SpellContainerBuilder };
