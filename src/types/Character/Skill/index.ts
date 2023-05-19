import { Skill } from './Skill';

type FullSkillSetGeneric<T> = { [key in Skill]: T };
type SkillSetGeneric<T> = Partial<FullSkillSetGeneric<T>>;
type SkillSet = SkillSetGeneric<number>;

export { Skills } from './Skills';

export { Skill };
export type { SkillSetGeneric, FullSkillSetGeneric, SkillSet };
