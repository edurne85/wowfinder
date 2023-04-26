import { Resistances } from '../Resistances';
import { StatSet } from '../Stats';
import { CharacterBaseBuilder, CharacterBaseExport } from './builder';
import {
    FeatChoice,
    checkRace,
    exportFeatchChoices,
    parseFeatChoices,
} from '../helpers';
import Size, { parseSize } from '../Size';

abstract class CharacterBase {
    #key: string;
    #featChoices: FeatChoice[];
    #miscHP?: number;
    #baseStats: StatSet;
    #baseResistances: Resistances;
    #size: Size;
    // TODO Base speed

    constructor(builder: CharacterBaseBuilder) {
        this.#key = builder.key;
        this.#featChoices = parseFeatChoices([...builder.featChoices]);
        this.#miscHP = builder.miscHP ?? 0;
        this.#baseStats = builder.baseStats;
        this.#baseResistances = builder.baseResistances ?? Resistances.zero;
        if (builder.builderType === 'race') {
            const race = checkRace(builder.race);
            this.#size = race.size;
        } else {
            this.#size = parseSize(builder.size) || Size.medium;
        }
    }

    get key(): string {
        return this.#key;
    }

    get feats(): FeatChoice[] {
        return this.#featChoices;
    }

    get miscHP(): number | undefined {
        return this.#miscHP;
    }

    get baseStats(): StatSet {
        return this.#baseStats;
    }

    get baseResistances(): Resistances {
        return this.#baseResistances;
    }

    get size(): Size {
        return this.#size;
    }

    export(): CharacterBaseExport {
        return {
            key: this.#key,
            featChoices: exportFeatchChoices(...this.#featChoices),
            miscHP: this.#miscHP ?? null,
            baseStats: this.#baseStats,
            baseResistances: this.#baseResistances.export(),
            size: this.#size,
        };
    }
}

export { CharacterBase };
