import { defaultSpeedUnit } from '../../Character/Speeds';
import { Character } from '../../Character';
import { CharacterOverride } from '../../Character/base/CharacterOverride';
import type { ShapeshiftBuilder } from './base';
import { Shapeshift } from './base';

class CheetahForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-cheetah-${rank}`,
            baseStats: base.stats.base,
            speeds: {
                ...base.speeds,
                base: 2 * base.speeds.base.as(defaultSpeedUnit),
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
        });
    }
}

export { CheetahForm };
