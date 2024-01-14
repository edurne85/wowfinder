import { forceDataLoadKeyS } from '../../utils';
import { Spell } from './Spell';

interface SpellListEntry {
    spell: Spell;
    rank: number;
}

interface SpellListEntryBuilder {
    spell: string | Spell;
    rank?: number; // default 1
}

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

type SpellListLevel = SpellListEntry[];

type SpellListLevelBuilder = SpellListEntryBuilder[];

function buildSpellListLevel(entries: SpellListLevelBuilder): SpellListLevel {
    return entries.map(buildSpellListEntry);
}

type SpellListLevels = { [key: number]: SpellListLevel };

type SpellListLevelsBuilder = { [key: number]: SpellListLevelBuilder };

interface SpellListBuilder {
    key: string;
    spells: SpellListLevelsBuilder;
}

type SpellLists = { [key: string]: SpellList };

class SpellList implements SpellListBuilder {
    #key: string;
    #spells: SpellListLevels;

    constructor({ key, spells }: SpellListBuilder) {
        this.#key = key;
        this.#spells = Object.fromEntries(
            Object.entries(spells).map(([level, entries]) => [
                level,
                buildSpellListLevel(entries),
            ]),
        );
    }

    get key(): string {
        return this.#key;
    }

    get spells(): SpellListLevels {
        const res: SpellListLevels = {};
        for (const [level, entries] of Object.entries(this.#spells)) {
            const l = Number(level);
            if (isNaN(l)) {
                throw new Error(`Invalid spell list level: ${level}`);
            }
            res[l] = [...entries];
        }
        return res;
    }

    static build(raw: any): SpellList {
        return new SpellList(raw);
    }

    static #loaded: SpellLists | null = null;

    static load(): SpellLists {
        return (this.#loaded ||= forceDataLoadKeyS<SpellList>(
            window.Main.asset('SpellLists'),
            this.build,
        ));
    }
}

export type { SpellListBuilder, SpellLists, SpellListEntry };
export { SpellList };
