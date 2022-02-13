import { Adventure, Adventures } from './@types/Adventure';
import { Character, Characters } from './@types/Character';
import { Class, Classes } from './@types/Character/Class';
import { Faction, Factions } from './@types/Faction';
import { Gear, buildGear } from './@types/Items/Gear';
import { Rewards } from './@types/Rewards';
import { ByKeyRecursive } from './utils';

class FullData {
    #factions: Factions;
    #chars: Characters;
    #adventures: Adventures;
    #rewards: Rewards;
    #classes: Classes;
    #gear: ByKeyRecursive<Gear>;
    private constructor() {
        this.#factions = Faction.import();
        this.#chars = Character.import();
        this.#adventures = Adventure.import();
        this.#rewards = Adventure.combined(this.#adventures);
        this.#classes = Class.import();
        this.#gear = Gear.import(undefined, buildGear);
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

    get gear(): ByKeyRecursive<Gear> {
        return this.#gear;
    }

    static #imported: FullData | null = null;
    static import(): FullData {
        return this.#imported ||= new FullData();
    }
}

export {
    FullData,
};