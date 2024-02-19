import { Validable, validateArray } from '@model/Validable';
import {
    DamageComponentSpec,
    DamageComponentSpecBuilder,
} from './DamageComponent';
import { DamageRollArguments } from './DamageRollArguments';
import { DamageValue } from './DamageValue';

interface DamageSpecBuilder {
    components: DamageComponentSpecBuilder[];
}

class DamageSpec implements DamageSpecBuilder, Validable {
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

    validate(): asserts this is DamageSpec {
        validateArray(this.#components, DamageComponentSpec.validate);
    }

    static validate(spec: DamageSpec): asserts spec is DamageSpec {
        spec.validate();
    }
}

export type { DamageSpecBuilder };
export { DamageSpec };
