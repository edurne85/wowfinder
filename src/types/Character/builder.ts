import { JsonValue } from '../../utils';
import { InventoryBuilder, InventoryExport } from '../Item/Inventory';
import { FeatChoice, FeatChoiceExport } from './helpers';
import { CharPersonalDetailsBuilder } from './Personal';
import { Resistances, ResistancesExport } from './Resistances';
import { StatSet } from './Stats';

type SkillRanks = { [key: string]: number };

interface CharacterBaseBuilder {
    key: string;
    personal: CharPersonalDetailsBuilder;
    featChoices: Iterable<FeatChoice>;
    miscHP?: number;
    baseStats: StatSet;
    baseResistances?: Resistances;
}

interface CharacterBuilder extends CharacterBaseBuilder {
    race: string;
    classes: { cls: string; level: number }[];
    active?: boolean;
    skillRanks?: SkillRanks;
    inventory?: InventoryBuilder;
}

interface CharacterBaseExport {
    key: string;
    personal: CharPersonalDetailsBuilder;
    featChoices: FeatChoiceExport[];
    miscHP: number;
    baseStats: StatSet;
    baseResistances: ResistancesExport;
}
interface CharacterExport extends CharacterBaseExport {
    [key: string]: JsonValue;
    race: string;
    classes: { cls: string; level: number }[];
    active: boolean;
    skillRanks: SkillRanks;
    resistances: ResistancesExport;
    inventory: InventoryExport;
}

export type { SkillRanks, CharacterBuilder, CharacterBaseBuilder, CharacterExport, CharacterBaseExport };
