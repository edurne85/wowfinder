import { CombatFeat } from '../../core/combat';
import { FeatSpec } from '../../FeatSpec';
import { combatBaseFeats } from './base';
import { combatDualWieldFeats } from './dual';
import { combatMobilityFeats } from './mobility';
import { combatPowerFeats } from './power';
import { combatShieldFeats } from './shield';
import { combatVitalStrikeFeats } from './vitalStrike';

const combatFeats: { [key in CombatFeat]: FeatSpec } = {
    ...combatBaseFeats,
    ...{
        // Combat expertise feats
        // TODO #443
    },
    ...{
        // Critical feats
        // TODO #443
    },
    ...combatMobilityFeats,
    ...{
        // Unarmed combat feats
        // TODO #443
    },
    ...{
        // Shooting feats
        // TODO #443
    },
    ...combatPowerFeats,
    ...{
        // Mounted combat feats
        // TODO #443
    },
    ...combatShieldFeats,
    ...combatDualWieldFeats,
    ...combatVitalStrikeFeats,
};

export { combatFeats };
