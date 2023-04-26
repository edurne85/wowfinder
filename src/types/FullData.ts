import { Adventure, Adventures } from './Adventure';
import { Character, Characters } from './Character';
import { Class, Classes } from './Character/Class';
import { Faction, Factions } from './Faction';
import { buildItem, Item } from './Item';
import { SpellList, SpellLists } from './Magic';
import { Spell, Spells } from './Magic/Spell';
import { Rewards } from './Rewards';
import { ByKeyRecursive } from '../utils';
import { Race, Races } from './Character/Race';

class FullData {
    #factions: Factions;
    #chars: Characters;
    #adventures: Adventures;
    #rewards: Rewards;
    #classes: Classes;
    #races: Races;
    #items: ByKeyRecursive<Item>;
    #spells: Spells;
    #spellLists: SpellLists;
    private constructor() {
        this.#factions = Faction.import();
        this.#chars = Character.import();
        this.#adventures = Adventure.import();
        this.#rewards = Adventure.combined(this.#adventures);
        this.#classes = Class.import();
        this.#races = Race.import();
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

    get races(): Races {
        return this.#races;
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
        return (this.#imported ||= new FullData());
    }
}

export { FullData };
