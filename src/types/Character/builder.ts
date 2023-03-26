import { InventoryBuilder } from '../Item/Inventory';
import { FeatChoice } from './helpers';
import CharPersonalDetails from './Personal';
import { Resistances } from './Resistances';
import { StatSet } from './Stats';

type SkillRanks = { [key: string]: number };

interface CharacterBuilder {
    key: string;
    personal: CharPersonalDetails;
    race: string;
    classes: { cls: string; level: number }[];
    feats: Iterable<FeatChoice>;
    active?: boolean;
    miscHP?: number;
    baseStats: StatSet;
    skillRanks?: SkillRanks;
    resistances?: Resistances;
    inventory?: InventoryBuilder;
}

export type { SkillRanks, CharacterBuilder };
