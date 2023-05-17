import {
    DamageTypes,
    FullDamageTypes,
    buildFullDamageTypes,
} from '../DamageType';

interface DamageComponentBaseBuilder {
    types: DamageTypes;
}

abstract class DamageComponentBase {
    #types: FullDamageTypes;
    constructor({ types }: DamageComponentBaseBuilder) {
        this.#types = buildFullDamageTypes(types);
    }

    get types(): FullDamageTypes {
        return { ...this.#types };
    }
}

export type { DamageComponentBaseBuilder };
export { DamageComponentBase };
