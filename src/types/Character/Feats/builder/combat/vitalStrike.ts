import { CombatVitalStrikeFeat } from '../../core/combat/vitalStrike';
import { Feat } from '../../Feat';
import { FeatSpec } from '../../FeatSpec';
import { build, req } from '../helpers';

const combatVitalStrikeFeats: { [key in CombatVitalStrikeFeat]: FeatSpec } = {
    vitalStrike: build.combat(Feat.vitalStrike, req.level.bab(1)),
    improvedVitalStrike: build.combat(
        Feat.improvedVitalStrike,
        ...req.feats('vitalStrike'),
        req.level.bab(11),
    ),
    greaterVitalStrike: build.combat(
        Feat.greaterVitalStrike,
        ...req.feats('improvedVitalStrike'),
        req.level.bab(16),
    ),
};

export { combatVitalStrikeFeats };
