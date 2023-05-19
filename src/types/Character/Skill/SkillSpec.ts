import { Skill } from './Skill';
import { StatKey } from '../Stats';
import { SkillSpecBuilder, SkillTotalBuilder } from './builders';
import { computeSkillTotal } from './helpers';

class SkillSpec {
    #key: Skill;
    #primary: StatKey;
    #secondary: StatKey | null;
    #trainedOnly: boolean;
    #sizeModFactor: number;

    constructor({
        key,
        primary,
        secondary = null,
        trainedOnly = false,
        sizeModFactor = 0,
    }: SkillSpecBuilder) {
        this.#key = key;
        this.#primary = primary;
        this.#secondary = secondary;
        this.#trainedOnly = trainedOnly;
        this.#sizeModFactor = sizeModFactor;
        Object.freeze(this);
    }

    get key(): Skill {
        return this.#key;
    }

    get primary(): StatKey {
        return this.#primary;
    }

    get secondary(): StatKey | null {
        return this.#secondary;
    }

    get trainedOnly(): boolean {
        return this.#trainedOnly;
    }

    get acp(): number {
        return this.#primary === StatKey.STR || this.#primary === StatKey.DEX
            ? 1
            : 0;
    }

    get sizeModFactor(): number {
        return this.#sizeModFactor;
    }

    total(args: SkillTotalBuilder): number | null {
        return computeSkillTotal({
            spec: this,
            ...args,
        });
    }
}

export { SkillSpec };
