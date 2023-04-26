import CharPersonalDetails, { personalDefaultsBuilder } from './Personal';
import { Resistances } from './Resistances';
import Size from './Size';
import { StatSet, baseDefault } from './Stats';
import { CharacterBase } from './base';
import type { CharacterOverrideBuilder, OverridableCharacterBaseBuilder } from './builder';
import { FeatChoice } from './helpers';

class CharacterOverride extends CharacterBase{
    constructor({...rest}: CharacterOverrideBuilder) {
        super({...rest});
    }

    static get zero(): CharacterOverride {
        return new CharacterOverride({
            key: '',
            personal: personalDefaultsBuilder,
            featChoices: [],
            baseStats: baseDefault,
            baseResistances: Resistances.zero,
        });
    }
}

function asCharacterOverrideBuilder(override: CharacterOverride): CharacterOverrideBuilder {
    return {
        key: override.key,
        personal: {
            ...override.personal,
            height: override.personal.height.inches,
            weight: override.personal.weight.pounds,
            age: override.personal.age.fullYears,
        },
        featChoices: override.feats,
        baseStats: override.baseStats,
        baseResistances: override.baseResistances,
    };
}

abstract class OverridableCharacterBase extends CharacterBase {
    #override: CharacterOverride;

    constructor({
        override = asCharacterOverrideBuilder(CharacterOverride.zero),
        ...rest
    }: OverridableCharacterBaseBuilder) {
        super(rest);
        this.#override = new CharacterOverride(override);
    }

    get override(): CharacterOverride {
        return this.#override;
    }

    get key(): string {
        return this.#override.key || super.key;
    }

    get personal(): CharPersonalDetails {
        return Object.assign({}, super.personal, this.#override.personal);
    }

    get fullName(): string {
        return this.#override.fullName || super.fullName;
    }

    get feats(): FeatChoice[] {
        return this.#override.feats || super.feats;
    }

    get miscHP(): number | undefined {
        return this.#override.miscHP ?? super.miscHP;
    }

    get baseStats(): StatSet {
        return Object.assign({}, super.baseStats, this.#override.baseStats);
    }
    
    get baseResistances(): Resistances {
        return Object.assign({}, super.baseResistances, this.#override.baseResistances);
    }

    get size(): Size | undefined {
        return this.#override.size || super.size;
    }
}

export { CharacterOverride, OverridableCharacterBase };
