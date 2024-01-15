import { Spell } from '../Spell';

interface SpellListEntry {
    spell: Spell;
    rank: number;
}

interface SpellListEntryBuilder {
    spell: string | Spell;
    rank?: number; // default 1
}

type SpellListLevel = SpellListEntry[];

type SpellListLevelBuilder = SpellListEntryBuilder[];

type SpellListLevels = { [key: number]: SpellListLevel };

type SpellListLevelsBuilder = { [key: number]: SpellListLevelBuilder };

interface SpellListBuilder {
    key: string;
    spells: SpellListLevelsBuilder;
}

export type {
    SpellListEntry,
    SpellListEntryBuilder,
    SpellListLevel,
    SpellListLevelBuilder,
    SpellListLevels,
    SpellListLevelsBuilder,
    SpellListBuilder,
};
