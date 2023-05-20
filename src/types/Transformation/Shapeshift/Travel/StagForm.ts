import { defaultSpeedUnit } from '../../../Character/Speeds';
import { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base/CharacterOverride';
import type { ShapeshiftBuilder } from '../base';
import { Shapeshift } from '../base';

class StagForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-stag-${rank}`,
            baseStats: base.stats.base,
            speeds: {
                ...base.speeds.export(),
                base: 2 * base.speeds.base.as(defaultSpeedUnit),
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO: #427 (epic)
                Rules for this form are still WiP
                Bonus: running endurance
                Bonus: enhanced carrying capacity (up to 2 passengers)
                Natural attacks: 2 horns (1d4) and bite (1d6)
             */
        });
    }
}

export { StagForm };
