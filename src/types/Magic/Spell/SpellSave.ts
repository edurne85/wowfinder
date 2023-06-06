import { SaveType } from '../../Character/Saves';

enum SpellSaveEffect {
    negate = 'negate',
    partial = 'partial',
    half = 'half',
    special = 'special',
}

interface SpellSaveBuilder {
    effect: SpellSaveEffect;
    save: SaveType;
}

class SpellSave implements SpellSaveBuilder {
    #effect: SpellSaveEffect;
    #save: SaveType;
    constructor({ effect, save }: SpellSaveBuilder) {
        this.#effect = effect;
        this.#save = save;
    }

    get effect(): SpellSaveEffect {
        return this.#effect;
    }

    get save(): SaveType {
        return this.#save;
    }
}

export { SpellSaveEffect, SpellSave };
