import { Resistances } from '../Resistances';
import Size from '../Size';
import { baseDefault } from '../Stats';
import { CharacterBase } from './base';
import type { CharacterOverrideBuilder } from './builder';

class CharacterOverride extends CharacterBase {
    /* TODO: #433
        Support natural attacks
        Support natural armor
        Support special abilities
        Support skill bonuses
     */

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
