import { Money } from '../../Item';
import { Keyed } from '../../../utils';
import { FeaturesList } from './Features';
import { AurasList } from './Aura';
import { Skill } from '../Skills';

interface SavesProgression {
    fortitude: boolean;
    reflexes: boolean;
    will: boolean;
}

interface CastingProgression {
    arcane: number;
    divine: number;
    spontaneous: number;
}

interface ClassBase extends Keyed<string> {
    hitDie: number;
    baseAttack: number;
    saves: SavesProgression;
    casting: CastingProgression;
    startingWealth: Money;
    skillRanks: number;
    featuresList: FeaturesList;
    aurasList: AurasList;
    classSkills: Set<Skill>;
}

type Classes = { [key: string]: ClassBase };
type ClassLevels = { cls: ClassBase; level: number }[];

export type { ClassBase, Classes, ClassLevels, SavesProgression, CastingProgression };
