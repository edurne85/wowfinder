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
        this.#factions = Faction.load();
        this.#chars = Character.load();
        this.#adventures = Adventure.load();
        this.#rewards = Adventure.combined(this.#adventures);
        this.#classes = Class.load();
        this.#races = Race.load();
        this.#items = Item.load(undefined, buildItem);
        this.#spells = Spell.load();
        this.#spellLists = SpellList.load();
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

    static #loaded: FullData | null = null;
    static load(): FullData {
        return (this.#loaded ||= new FullData());
    }
}

export { FullData };
