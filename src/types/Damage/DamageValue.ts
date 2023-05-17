import {
    DamageComponentValue,
    DamageComponentValueBuilder,
} from './DamageComponent';

interface DamageValueBuilder {
    components: DamageComponentValueBuilder[];
}

class DamageValue implements DamageValueBuilder {
    #components: DamageComponentValue[];
    constructor({ components }: DamageValueBuilder) {
        this.#components = components.map(c => new DamageComponentValue(c));
    }

    get components(): DamageComponentValue[] {
        return [...this.#components];
    }
}

export type { DamageValueBuilder };
export { DamageValue };
