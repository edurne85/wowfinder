import { Adventure, Adventures } from './@types/Adventure';
import { Character, Characters } from './@types/Character';
import { Class, Classes } from './@types/Character/Class';
import { Faction, Factions } from './@types/Faction';
import { buildItem, Item } from './@types/Item';
import { SpellList, SpellLists } from './@types/Magic';
import { Spell, Spells } from './@types/Magic/Spell';
import { Rewards } from './@types/Rewards';
import { ByKeyRecursive } from './utils';

class FullData {
    #factions: Factions;
    #chars: Characters;
    #adventures: Adventures;
    #rewards: Rewards;
    #classes: Classes;
    #items: ByKeyRecursive<Item>;
    #spells: Spells;
    #spellLists: SpellLists;
    private constructor() {
        this.#factions = Faction.import();
        this.#chars = Character.import();
        this.#adventures = Adventure.import();
        this.#rewards = Adventure.combined(this.#adventures);
        this.#classes = Class.import();
        this.#items = Item.import(undefined, buildItem);
        this.#spells = Spell.import();
        this.#spellLists = SpellList.import();
    }

    get factions(): Factions {
        return this.#factions;
    }

    get chars(): Characters {
        return this.#chars;
    }

    get adventures(): Adventures {
        return this.#adventures;
    }

    get rewards(): Rewards {
        return this.#rewards;
    }

    get classes(): Classes {
        return this.#classes;
    }

    get items(): ByKeyRecursive<Item> {
        return this.#items;
    }

    get spells(): Spells {
        return this.#spells;
    }

    get spellLists(): SpellLists {
        return this.#spellLists;
    }

    static #imported: FullData | null = null;
    static import(): FullData {
        return this.#imported ||= new FullData();
    }
}

export {
    FullData,
};