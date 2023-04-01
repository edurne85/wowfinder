import { CombatBaseFeat } from './base';
import { CombatDualWieldFeat } from './dual';
import { CombatMobilityFeat } from './mobility';
import { CombatPowerFeat } from './power';
import { CombatShieldFeat } from './shield';
import { CombatVitalStrikeFeat } from './vitalStrike';

const CombatFeat = {
    ...CombatBaseFeat,
    ...CombatMobilityFeat,
    ...CombatPowerFeat,
    ...CombatVitalStrikeFeat,
    ...CombatShieldFeat,
    ...CombatDualWieldFeat,
} as const;

export type CombatFeat = keyof typeof CombatFeat;

export { CombatFeat };
