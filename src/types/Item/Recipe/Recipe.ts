import { Time } from '../../Units';
import { Quantified, assertDefined } from '../../../utils';
import { Skill } from '../../Character/Skill';
import { Item } from '../base';
import { ItemCollection } from './ItemCollection';
import type { RecipeBuilder } from './RecipeBuilder';

function parseTime(time: string): Time {
    const parsedTime = Time.tryParseTime(time);
    assertDefined(parsedTime, `Invalid time: ${time}`);
    return parsedTime;
}

class Recipe {
    #skill: Skill;
    #dc: number;
    #materials: Quantified<Item>[];
    #time: Time;
    #output: Quantified<Item>[];
    constructor({ skill, dc, materials, time, output }: RecipeBuilder) {
        this.#skill = skill;
        this.#dc = dc;
        this.#materials = new ItemCollection(materials).items;
        this.#time = parseTime(time);
        this.#output = new ItemCollection(output).items;
    }

    get skill(): Skill {
        return this.#skill;
    }

    get dc(): number {
        return this.#dc;
    }

    get materials(): Quantified<Item>[] {
        return this.#materials;
    }

    get time(): Time {
        return this.#time;
    }

    get output(): Quantified<Item>[] {
        return this.#output;
    }
}

export { Recipe };
