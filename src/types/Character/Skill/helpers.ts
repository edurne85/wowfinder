import { StatKey } from '../Stats';
import { Skill } from './Skill';
import { SkillSpec } from './SkillSpec';
import { SkillTotalBuilder } from './builders';

const classTrainedBonus = 3;

type TotalArguments = SkillTotalBuilder & { spec: SkillSpec };

function computeSkillTotal({
    spec,
    stats,
    ranks = {},
    byClass = [],
    acp = 0,
    size = 0,
}: TotalArguments): number | null {
    const isClass = byClass.includes(spec.key);
    const tRanks = ranks[spec.key] || 0;
    const isTrained = tRanks > 0;
    const trainedBonus = isClass && isTrained ? classTrainedBonus : 0;
    if (spec.trainedOnly && !isTrained && !isClass) {
        return null;
    }
    const primary = stats[spec.primary];
    const secondary: number | null = spec.secondary
        ? stats[spec.secondary]
        : null;
    const statBonus: number =
        secondary == null ? primary : Math.max(primary, secondary);

    // TODO #434: Racial, Gear, Misc, Temp
    return (
        statBonus +
        tRanks +
        trainedBonus +
        spec.acp * acp +
        spec.sizeModFactor * size
    );
}

function mkSkill(
    key: Skill,
    primary: StatKey,
    secondary: StatKey | null = null,
    trainedOnly = false,
    sizeModFactor = 0,
): SkillSpec {
    return new SkillSpec({
        key,
        primary,
        secondary,
        trainedOnly,
        sizeModFactor,
    });
}

export { computeSkillTotal, mkSkill, classTrainedBonus };
