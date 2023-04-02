import { Skill } from '../Skills';
import { ClassFeature } from './Features';

interface ClassBonuses {
    hp: number;
    bab: number;
    saves: {
        fort: number;
        refl: number;
        will: number;
    };
    efl: {
        arc: number;
        div: number;
        esp: number;
    };
    skillRanks: number;
    classSkills: Set<Skill>;
    features: { [key in ClassFeature]?: number };
}

export type { ClassBonuses };
