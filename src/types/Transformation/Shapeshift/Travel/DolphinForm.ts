import { defaultSpeedUnit } from '../../../Character/Speeds';
import { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base/CharacterOverride';
import type { ShapeshiftBuilder } from '../base';
import { Shapeshift } from '../base';

class DolphinForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-dolphin-${rank}`,
            baseStats: base.stats.base,
            speeds: {
                base: 0,
                swim: 1.5 * base.speeds.base.as(defaultSpeedUnit),
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Special bonus: Hold breath (5 * CON rounds)
                Special bonus: Ignore water pressure: 100'
                Natural attacks: weak bite (1d4)
             */
        });
    }
}

export { DolphinForm };
