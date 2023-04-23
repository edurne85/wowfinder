import { Resistances } from './Resistances';
import { StatSet } from './Stats';
import { CharacterBaseBuilder, CharacterBaseExport } from './builder';
import { FeatChoice, exportFeatchChoices, parseFeatChoices } from './helpers';
import CharPersonalDetails, {
    jsonExport as personalDetailsJsonExport,
    jsonImport as personalDetailsJsonImport,
} from './Personal';

abstract class CharacterBase {
    #key: string;
    #personal: CharPersonalDetails;
    #featChoices: FeatChoice[];
    #miscHP: number;
    #baseStats: StatSet;
    #baseResistances: Resistances;
    // TODO: Size

    constructor({
        key, personal, featChoices, miscHP, baseStats, baseResistances }: CharacterBaseBuilder) {
        this.#key = key;
        this.#personal = personalDetailsJsonImport(personal);
        this.#featChoices = parseFeatChoices([...featChoices]);
        this.#miscHP = miscHP ?? 0;
        this.#baseStats = baseStats;
        this.#baseResistances = baseResistances ?? Resistances.zero;
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

    get miscHP(): number {
        return this.#miscHP;
    }

    get baseStats(): StatSet {
        return this.#baseStats;
    }

    get baseResistances(): Resistances {
        return this.#baseResistances;
    }

    export(): CharacterBaseExport {
        return {
            key: this.#key,
            personal: personalDetailsJsonExport(this.#personal),
            featChoices: exportFeatchChoices(...this.#featChoices),
            miscHP: this.#miscHP,
            baseStats: this.#baseStats,
            baseResistances: this.#baseResistances.export(),
        };
    }
}

export { CharacterBase };

