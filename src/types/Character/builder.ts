import { JsonValue } from '../../utils';
import { InventoryBuilder, InventoryExport } from '../Item/Inventory';
import { FeatChoice, FeatChoiceExport } from './helpers';
import { CharPersonalDetailsBuilder } from './Personal';
import { Resistances, ResistancesExport } from './Resistances';
import { StatSet } from './Stats';

type SkillRanks = { [key: string]: number };

interface CharacterBuilder {
    key: string;
    personal: CharPersonalDetailsBuilder;
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

interface CharacterExport {
    [key: string]: JsonValue;
    key: string;
    personal: CharPersonalDetailsBuilder;
    race: string;
    classes: { cls: string; level: number }[];
    feats: FeatChoiceExport[];
    active: boolean;
    miscHP: number;
    baseStats: StatSet;
    skillRanks: SkillRanks;
    resistances: ResistancesExport;
    inventory: InventoryExport;
}

export type { SkillRanks, CharacterBuilder, CharacterExport };
