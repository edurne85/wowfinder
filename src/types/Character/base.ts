import { Resistances } from './Resistances';
import { StatSet } from './Stats';
import { CharacterBaseBuilder, CharacterBaseExport } from './builder';
import { FeatChoice, exportFeatchChoices, parseFeatChoices } from './helpers';
import CharPersonalDetails, {
    jsonExport as personalDetailsJsonExport,
    jsonImport as personalDetailsJsonImport,
} from './Personal';
import Size, { parseSize } from './Size';

abstract class CharacterBase {
    #key: string;
    #personal: CharPersonalDetails;
    #featChoices: FeatChoice[];
    #miscHP?: number;
    #baseStats: StatSet;
    #baseResistances: Resistances;
    #size?: Size;

    constructor({
        key,
        personal,
        featChoices,
        miscHP,
        baseStats,
        baseResistances,
        size,
    }: CharacterBaseBuilder) {
        this.#key = key;
        this.#personal = personalDetailsJsonImport(personal);
        this.#featChoices = parseFeatChoices([...featChoices]);
        this.#miscHP = miscHP ?? 0;
        this.#baseStats = baseStats;
        this.#baseResistances = baseResistances ?? Resistances.zero;
        this.#size = parseSize(size);
    }

    get key(): string {
        return this.#key;
    }

    get personal(): CharPersonalDetails {
        return Object.assign({}, this.#personal);
    }

    get fullName(): string {
        return this.#personal.fullName;
    }

    toString(): string {
        return this.#personal.fullName;
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

    get size(): Size | undefined {
        return this.#size;
    }
    
    export(): CharacterBaseExport {
        return {
            key: this.#key,
            personal: personalDetailsJsonExport(this.#personal),
            featChoices: exportFeatchChoices(...this.#featChoices),
            miscHP: this.#miscHP ?? null,
            baseStats: this.#baseStats,
            baseResistances: this.#baseResistances.export(),
            size: this.#size ?? null,
        };
    }
}

export { CharacterBase };

