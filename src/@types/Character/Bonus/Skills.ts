import { Skill, SkillSet } from '../Skills';
import { sum } from '../../../utils';

export default class SkillsBonus {
    private _values: SkillSet;

    constructor(values: SkillSet) {
        this._values = {...values};
        for (const skill of Object.keys(Skill)) {
            Object.defineProperty(this, skill, {
                enumerable: true,
                configurable: false,
                get: () => this._values[skill as Skill] || 0,
            });
        }
    }

    static get zero(): SkillsBonus { return new SkillsBonus({}); }

    static sum(...args: SkillsBonus[]): SkillsBonus {
        const result: SkillSet = {};
        for (const skill of Object.keys(Skill)) {
            const value = sum(...args.map(s => (s._values[skill as Skill] || 0)));
            if (value) {
                result[skill as Skill] = value;
            }
        }
        return new SkillsBonus(result);
    }

    static max(...args: SkillsBonus[]): SkillsBonus {
        const result: SkillSet = {};
        for (const skill of Object.keys(Skill)) {
            const value = Math.max(...args.map(s => (s._values[skill as Skill] || 0)));
            if (value) {
                result[skill as Skill] = value;
            }
        }
        return new SkillsBonus(result);
    }
}
