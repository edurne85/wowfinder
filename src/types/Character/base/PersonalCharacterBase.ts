import CharPersonalDetails, {
    jsonExport as personalDetailsJsonExport,
    jsonImport as personalDetailsJsonImport,
} from '../Personal';
import { OverridableCharacterBase } from './OverridableCharacterBase';
import {
    CharacterPersonalExport,
    PersonalCharacterBaseBuilder,
} from './builder';

abstract class PersonalCharacterBase extends OverridableCharacterBase {
    #personal: CharPersonalDetails;
    constructor({ personal, ...rest }: PersonalCharacterBaseBuilder) {
        super(rest);
        this.#personal = personalDetailsJsonImport(personal);
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

    export(): CharacterPersonalExport {
        return {
            ...super.export(),
            personal: personalDetailsJsonExport(this.#personal),
        };
    }
}

export { PersonalCharacterBase };
