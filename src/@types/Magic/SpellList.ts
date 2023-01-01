import { forceDataImportKeyS } from '../../utils';
import { Spell } from './Spell';

interface SpellListEntry {
    level: number;
    spell: Spell;
    rank: number;
}

type SpellListEntryBuilder = SpellListEntry | `(${number})${string}:${number}}`;

function buildSpellListEntry(entry: SpellListEntryBuilder): SpellListEntry {
    if (typeof entry === 'string') {
        const match = entry.match(/^\((\d+)\)(.+):(\d+)$/);
        if (!match) {
            throw new Error(`Invalid spell list entry: ${entry}`);
        }
        const [, sLevel, key, sRank] = match;
        const spell = Spell.import()[key];
        const level = Number(sLevel);
        const rank = Number(sRank);
        if (!spell) {
            throw new Error(`Invalid spell key: ${key}`);
        }
        if (!spell.ranks.find((r) => r.rank === rank)) {
            throw new Error(`Invalid spell rank: ${key}: ${rank}`);
        }
        return {
            level,
            spell,
            rank,
        };
    }
    return entry;
}

interface SpellListBuilder {
    key: string;
    spells: SpellListEntryBuilder[];
}

type SpellLists = { [key: string]: SpellList };

class SpellList {
    #key: string;
    #spells: SpellListEntry[];

    constructor({ key, spells }: SpellListBuilder) {
        this.#key = key;
        this.#spells = spells.map(buildSpellListEntry);
    }

    get key(): string {
        return this.#key;
    }

    get spells(): SpellListEntry[] {
        return [...this.#spells];
    }

    static build(raw: any): SpellList {
        return new SpellList(raw);
    }

    static #imported: SpellLists | null = null;

    static import(dir = window.Main.asset('SpellLists')): SpellLists {
        return (this.#imported ||= forceDataImportKeyS<SpellList>(dir, this.build));
    }
}

export type { SpellListBuilder, SpellListEntryBuilder, SpellListEntry, SpellLists };
export { SpellList, buildSpellListEntry };
