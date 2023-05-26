import {
    DamageComponentSpec,
    DamageComponentSpecBuilder,
} from './DamageComponent';
import { DamageRollArguments } from './DamageRollArguments';
import { DamageValue } from './DamageValue';

interface DamageSpecBuilder {
    components: DamageComponentSpecBuilder[];
}

class DamageSpec implements DamageSpecBuilder {
    #components: DamageComponentSpec[];
    constructor({ components }: DamageSpecBuilder) {
        this.#components = components.map(c => new DamageComponentSpec(c));
    }

    get components(): DamageComponentSpec[] {
        return [...this.#components];
    }

    roll(args: DamageRollArguments): DamageValue {
        return new DamageValue({
            components: this.#components.map(c => c.roll(args)),
        });
    }
}

export type { DamageSpecBuilder };
export { DamageSpec };
