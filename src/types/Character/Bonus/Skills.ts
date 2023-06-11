import { Skill, SkillSet } from '../Skill';
import { sum } from '../../../utils';

export default class SkillsBonus {
    #values: SkillSet;

    constructor(values: SkillSet) {
        this.#values = { ...values };
        for (const skill of Object.keys(Skill)) {
            Object.defineProperty(this, skill, {
                enumerable: true,
                configurable: false,
                get: () => this.#values[skill as Skill] || 0,
            });
        }
    }

    value(skill: Skill): number {
        return this.#values[skill] || 0;
    }

    static get zero(): SkillsBonus {
        return new SkillsBonus({});
    }

    static sum(...args: SkillsBonus[]): SkillsBonus {
        const result: SkillSet = {};
        for (const skill of Object.keys(Skill)) {
            const value = sum(...args.map(s => s.#values[skill as Skill] || 0));
            if (value) {
                result[skill as Skill] = value;
            }
        }
        return new SkillsBonus(result);
    }

    static max(...args: SkillsBonus[]): SkillsBonus {
        const result: SkillSet = {};
        for (const skill of Object.keys(Skill)) {
            const value = Math.max(
                ...args.map(s => s.#values[skill as Skill] || 0),
            );
            if (value) {
                result[skill as Skill] = value;
            }
        }
        return new SkillsBonus(result);
    }

    static build(raw: any = {}): SkillsBonus {
        const cured: any = {};
        for (const k of Object.keys(Skill)) {
            if (raw[k]) {
                cured[k] = raw[k] || 0;
            }
        }
        return new SkillsBonus({ ...cured });
    }
}
