import { Skill, SkillSet } from '../Skills';
import { sum } from '../../../utils';

export default class SkillsBonus {
    private _values: SkillSet;

    constructor(values: SkillSet) {
        this._values = { ...values };
        for (const skill of Object.keys(Skill)) {
            Object.defineProperty(this, skill, {
                enumerable: true,
                configurable: false,
                get: () => this._values[skill as Skill] || 0,
            });
        }
    }

    value(skill: Skill): number {
        return this._values[skill] || 0;
    }

    static get zero(): SkillsBonus {
        return new SkillsBonus({});
    }

    static sum(...args: SkillsBonus[]): SkillsBonus {
        const result: SkillSet = {};
        for (const skill of Object.keys(Skill)) {
            const value = sum(...args.map(s => s._values[skill as Skill] || 0));
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
                ...args.map(s => s._values[skill as Skill] || 0),
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
