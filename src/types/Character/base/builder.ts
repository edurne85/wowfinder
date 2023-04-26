import { JsonValue } from '../../../utils';
import { InventoryBuilder, InventoryExport } from '../../Item/Inventory';
import { FeatChoice, FeatChoiceExport } from '../helpers';
import { CharPersonalDetailsBuilder } from '../Personal';
import Race from '../Race';
import { Resistances, ResistancesExport } from '../Resistances';
import Size from '../Size';
import { StatSet } from '../Stats';

type SkillRanks = { [key: string]: number };

interface CharacterBaseCoreBuilder {
    key: string;
    featChoices: Iterable<FeatChoice>;
    miscHP?: number;
    baseStats: StatSet;
    baseResistances?: Resistances;
}

interface CharacterBaseRaceBuilder extends CharacterBaseCoreBuilder {
    builderType: 'race';
    race: Race | string;
}

interface CharacterBaseFullBuilder extends CharacterBaseCoreBuilder {
    builderType: 'full';
    size: number;
}
type CharacterBaseBuilder = CharacterBaseFullBuilder | CharacterBaseRaceBuilder;
interface CharacterBuilder extends CharacterBaseCoreBuilder {
    race: string;
    personal: CharPersonalDetailsBuilder;
    classes: { cls: string; level: number }[];
    active?: boolean;
    skillRanks?: SkillRanks;
    inventory?: InventoryBuilder;
}

type CharacterOverrideBuilder = Omit<CharacterBaseFullBuilder, 'builderType'>;

type OverridableCharacterBaseBuilder = CharacterBaseBuilder & {
    override?: CharacterOverrideBuilder;
};

type PersonalCharacterBaseBuilder = OverridableCharacterBaseBuilder & {
    personal: CharPersonalDetailsBuilder;
};

interface CharacterBaseExport {
    key: string;
    featChoices: FeatChoiceExport[];
    miscHP: number | null;
    baseStats: StatSet;
    baseResistances: ResistancesExport;
    size: Size | null;
}
interface CharacterPersonalExport extends CharacterBaseExport {
    personal: CharPersonalDetailsBuilder;
}
interface CharacterExport extends CharacterPersonalExport {
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
    CharacterBaseCoreBuilder,
    CharacterBaseRaceBuilder,
    CharacterBaseFullBuilder,
    CharacterBaseBuilder,
    CharacterBuilder,
    CharacterOverrideBuilder,
    OverridableCharacterBaseBuilder,
    PersonalCharacterBaseBuilder,
    CharacterBaseExport,
    CharacterPersonalExport,
    CharacterExport,
    CharacterOverrideExport,
    OverridableCharacterBaseExport,
};
