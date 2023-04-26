import { JsonValue } from '../../utils';
import { InventoryBuilder, InventoryExport } from '../Item/Inventory';
import { FeatChoice, FeatChoiceExport } from './helpers';
import { CharPersonalDetailsBuilder } from './Personal';
import { Resistances, ResistancesExport } from './Resistances';
import Size from './Size';
import { StatSet } from './Stats';

type SkillRanks = { [key: string]: number };

interface CharacterBaseBuilder {
    key: string;
    personal: CharPersonalDetailsBuilder;
    featChoices: Iterable<FeatChoice>;
    miscHP?: number;
    baseStats: StatSet;
    baseResistances?: Resistances;
    size?: number;
}

interface CharacterBuilder extends CharacterBaseBuilder {
    race: string;
    classes: { cls: string; level: number }[];
    active?: boolean;
    skillRanks?: SkillRanks;
    inventory?: InventoryBuilder;
}

type CharacterOverrideBuilder = CharacterBaseBuilder;

interface OverridableCharacterBaseBuilder extends CharacterBaseBuilder {
    override?: CharacterOverrideBuilder;
}

interface CharacterBaseExport {
    key: string;
    personal: CharPersonalDetailsBuilder;
    featChoices: FeatChoiceExport[];
    miscHP: number | null;
    baseStats: StatSet;
    baseResistances: ResistancesExport;
    size: Size | null;
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

type CharacterOverrideExport = CharacterBaseExport;

interface OverridableCharacterBaseExport extends CharacterBaseExport {
    override: CharacterOverrideExport;
}

export type {
    SkillRanks,
    CharacterBaseBuilder,
    CharacterBuilder,
    CharacterOverrideBuilder,
    OverridableCharacterBaseBuilder,
    CharacterBaseExport,
    CharacterExport,
    CharacterOverrideExport,
    OverridableCharacterBaseExport,
};
