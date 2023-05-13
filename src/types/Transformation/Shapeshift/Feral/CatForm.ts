import { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base/CharacterOverride';
import type { ShapeshiftBuilder } from '../base';
import { Shapeshift } from '../base';

class CatForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-cat-${rank}`,
            baseStats: {
                ...base.stats.base,
                DEX: base.stats.base.DEX + 2 + 2 * rank,
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            /* TODO:
                Stealth: +8 +4 * rank
                Natural attacks: 2 sharp claws (1d6) and weak bite (1d4)
                Threat multiplier: x½
                Combo points
                Special abilities: TBD / Pending rules review
            */
        });
    }
}

export { CatForm };
