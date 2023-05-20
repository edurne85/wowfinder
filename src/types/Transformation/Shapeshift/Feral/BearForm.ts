import { Character } from '../../../Character';
import { CharacterOverride } from '../../../Character/base/CharacterOverride';
import type { ShapeshiftBuilder } from '../base';
import { Shapeshift } from '../base';

class BearForm extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(base: Character, rank: number): CharacterOverride {
        return new CharacterOverride({
            key: `${base.key}-bear-${rank}`,
            baseStats: {
                ...base.stats.base,
                CON: base.stats.base.CON + 2 + 2 * rank,
            },
            featChoices: [],
            size: Shapeshift.defaultSize(rank),
            naturalArmor: 2 + 2 * rank,
            /* TODO: #427 (epic)
                Natural attacks: 2 claws (1d4) and bite (1d6)
                Threat multiplier: x2
                Special abilities:
                    Demoralizing roar (Ex)
                    Maul (Ex)
                    ? Flagelo (Lacerate) (Ex)
                    Faerie fire ~ Feral (Sp)
            */
        });
    }
}

export { BearForm };
