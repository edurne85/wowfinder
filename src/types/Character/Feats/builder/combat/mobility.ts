import { StatKey } from '../../../Stats';
import { CombatMobilityFeat } from '../../core/combat/mobility';
import { Feat } from '../../Feat';
import { FeatSpec } from '../../FeatSpec';
import { build, req } from '../helpers';

const combatMobilityFeats: { [key in CombatMobilityFeat]: FeatSpec } = {
    dodge: build.combat(Feat.dodge, req.stat(StatKey.DEX, 13)),
    // TODO: mobility, spring attack, wind stance, lightning stance
};

export { combatMobilityFeats };
