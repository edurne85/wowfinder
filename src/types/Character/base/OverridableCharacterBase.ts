import { Resistances } from '../Resistances';
import Size from '../Size';
import { StatSet } from '../Stats';
import { FeatChoice } from '../helpers';
import { CharacterOverride } from './CharacterOverride';
import { CharacterBase } from './base';
import {
    CharacterOverrideBuilder,
    OverridableCharacterBaseBuilder,
} from './builder';

function asCharacterOverrideBuilder(
    override: CharacterOverride,
): CharacterOverrideBuilder {
    return {
        key: override.key,
        featChoices: override.feats,
        baseStats: override.baseStats,
        baseResistances: override.baseResistances,
        size: override.size,
    };
}
abstract class OverridableCharacterBase extends CharacterBase {
    #override: CharacterOverride;

    constructor({
        override = asCharacterOverrideBuilder(CharacterOverride.zero),
        ...rest
    }: OverridableCharacterBaseBuilder) {
        super({ ...rest });
        this.#override = new CharacterOverride(override);
    }

    get override(): CharacterOverride {
        return this.#override;
    }

    get key(): string {
        return this.#override.key || super.key;
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
        return Object.assign(
            {},
            super.baseResistances,
            this.#override.baseResistances,
        );
    }

    get size(): Size {
        return this.#override.size || super.size;
    }

    setOverride(override: CharacterOverride): void {
        this.#override = override;
    }

    clearOverride(): void {
        this.#override = CharacterOverride.zero;
    }
}

export { OverridableCharacterBase };
