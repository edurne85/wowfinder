import { BaseFeat } from './base';
import { ClassFeatureFeat } from './classFeature';
import { CombatFeat } from './combat';
import { MagicFeat } from './magic';

const CoreFeat = {
    ...BaseFeat,
    ...ClassFeatureFeat,
    ...MagicFeat,
    ...CombatFeat,
} as const;

type CoreFeat = keyof typeof CoreFeat;

export { CoreFeat };
