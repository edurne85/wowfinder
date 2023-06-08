import { Skill } from '../../Character/Skill';
import { ItemCollectionBuilder } from './ItemCollection';

interface RecipeBuilder {
    skill: Skill;
    dc: number;
    materials: ItemCollectionBuilder;
    time: string;
    output: ItemCollectionBuilder;
}

export type { RecipeBuilder };
