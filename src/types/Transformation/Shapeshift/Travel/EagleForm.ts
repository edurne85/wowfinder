import {
    FlyManeuverability,
    defaultSpeedUnit,
} from '../../../Character/Speeds';
import { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base/CharacterOverride';
import type { ShapeshiftBuilder } from '../base';
import { Shapeshift } from '../base';

class EagleForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-eagle-${rank}`,
            baseStats: base.stats.base,
            speeds: {
                ...base.speeds.export(),
                fly: 3.5 * base.speeds.base.as(defaultSpeedUnit),
                maneuverability: FlyManeuverability.perfect,
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO:
                Rules for this form are still WiP
                Natural attacks: 2 sharp claws (1d6) and weak bite (1d4)
             */
        });
    }
}

export { EagleForm };
