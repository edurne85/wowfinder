import { Adventure, Adventures } from './Adventure';
import { Character, Characters } from './Character';
import { Class, Classes } from './Character/Class';
import { Faction, Factions } from './Faction';
import { buildItem, Item } from './Item';
import { SpellList, SpellLists } from './Magic';
import { Spell, Spells } from './Magic/Spell';
import { RewardsByCharacter, RewardsByFaction } from './Rewards';
import { ByKeyRecursive, debugOutput } from '../utils';
import { Race, Races } from './Character/Race';

class FullData {
    #factions: Factions;
    #chars: Characters;
    #adventures: Adventures;
    #rewards: RewardsByCharacter;
    #classes: Classes;
    #races: Races;
    #items: ByKeyRecursive<Item>;
    #spells: Spells;
    #spellLists: SpellLists;
    private constructor(reThrowErrors = false) {
        this.#factions = Faction.load();
        this.#chars = Character.load();
        this.#adventures = Adventure.load();
        this.#rewards = Adventure.combined(this.#adventures);
        this.#classes = Class.load();
        this.#races = Race.load();
        this.#items = Item.load(buildItem, reThrowErrors);
        this.#spells = Spell.load(reThrowErrors);
        this.#spellLists = SpellList.load(reThrowErrors);
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

    get rewards(): RewardsByCharacter {
        return this.#rewards;
    }

    get rewardsByFaction(): RewardsByFaction {
        const byChar = this.rewards;
        const byFaction: RewardsByFaction = {};
        for (const f in this.factions.byLabel) {
            byFaction[f] = {};
            for (const c in byChar) {
                byFaction[f][c] = byChar[c][f];
            }
        }
        debugOutput('rewardsByFaction', { byChar, byFaction });
        return byFaction;
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
    static load(reThrowErrors = false): FullData {
        return (this.#loaded ||= new FullData(reThrowErrors));
    }
}

export { FullData };
