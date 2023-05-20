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
import { Speeds } from '../Speeds';

abstract class CharacterBase {
    #key: string;
    #featChoices: FeatChoice[];
    #miscHP?: number;
    #baseStats: StatSet;
    #baseResistances: Resistances;
    #size: Size;
    #speeds: Speeds;
    #naturalArmor: number;

    constructor(builder: CharacterBaseBuilder) {
        this.#key = builder.key;
        this.#featChoices = parseFeatChoices([...(builder.featChoices || [])]);
        this.#miscHP = builder.miscHP ?? 0;
        this.#baseStats = builder.baseStats;
        this.#baseResistances = builder.baseResistances
            ? new Resistances(builder.baseResistances)
            : Resistances.zero;
        if (builder.builderType === 'race') {
            const race = checkRace(builder.race);
            this.#size = race.size;
            this.#speeds = race.speeds;
            this.#naturalArmor = race.naturalArmor;
        } else {
            this.#size = parseSize(builder.size) || Size.medium;
            this.#speeds = builder.speeds
                ? new Speeds(builder.speeds)
                : Speeds.default;
            this.#naturalArmor = builder.naturalArmor ?? 0;
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

    get speeds(): Speeds {
        return this.#speeds;
    }

    get naturalArmor(): number {
        return this.#naturalArmor;
    }

    export(): CharacterBaseExport {
        return {
            key: this.#key,
            featChoices: exportFeatchChoices(...this.#featChoices),
            miscHP: this.#miscHP ?? null,
            baseStats: this.#baseStats,
            baseResistances: this.#baseResistances.export(),
            size: this.#size,
            naturalArmor: this.#naturalArmor,
        };
    }
}

export { CharacterBase };
