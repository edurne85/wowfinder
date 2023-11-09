import { EffectiveCasterLevels } from '@model/Magic';
import { Skill } from '../Skill';
import { ClassFeature } from './Features';

interface ClassBonuses {
    hp: number;
    bab: number;
    saves: {
        fort: number;
        refl: number;
        will: number;
    };
    efl: EffectiveCasterLevels;
    skillRanks: number;
    classSkills: Set<Skill>;
    features: { [key in ClassFeature]?: number };
}

export type { ClassBonuses };
