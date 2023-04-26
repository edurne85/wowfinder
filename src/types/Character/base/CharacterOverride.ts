import { Resistances } from '../Resistances';
import Size from '../Size';
import { baseDefault } from '../Stats';
import { CharacterBase } from './base';
import type { CharacterOverrideBuilder } from './builder';

class CharacterOverride extends CharacterBase {
    // TODO: Support natural attacks
    // TODO: Support natural armor
    // TODO: Support special abilities
    // TODO: Support skill bonuses

    constructor({ ...rest }: CharacterOverrideBuilder) {
        super({ ...rest, builderType: 'full' });
    }

    static get zero(): CharacterOverride {
        return new CharacterOverride({
            key: '',
            featChoices: [],
            baseStats: baseDefault,
            baseResistances: Resistances.zero,
            size: Size.medium,
        });
    }
}

export { CharacterOverride };
