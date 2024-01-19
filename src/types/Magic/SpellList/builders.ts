import { Spell } from '../Spell/Spell';
import type {
    SpellListEntryBuilder,
    SpellListEntry,
    SpellListLevelBuilder,
    SpellListLevel,
} from './helpers';

function buildSpellListEntry({
    spell: key,
    rank,
}: SpellListEntryBuilder): SpellListEntry {
    let spell: Spell;
    if (typeof key === 'string') {
        spell = Spell.load()[key];
        if (!spell) {
            throw new Error(`Invalid spell key: ${key}`);
        }
    } else {
        spell = key;
    }
    rank ||= 1;
    return {
        spell,
        rank,
    };
}

function buildSpellListLevel(entries: SpellListLevelBuilder): SpellListLevel {
    return entries.map(buildSpellListEntry);
}

export { buildSpellListEntry, buildSpellListLevel };
