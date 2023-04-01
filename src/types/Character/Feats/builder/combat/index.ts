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
        // TODO
    },
    ...{
        // Critical feats
        // TODO
    },
    ...combatMobilityFeats,
    ...{
        // Unarmed combat feats
        // TODO
    },
    ...{
        // Shooting feats
        // TODO
    },
    ...combatPowerFeats,
    ...{
        // Mounted combat feats
        // TODO
    },
    ...combatShieldFeats,
    ...combatDualWieldFeats,
    ...combatVitalStrikeFeats,
};

export { combatFeats };
