import { Validator } from '../../utils';

interface BaseChoiceBuilder {
    label: string;
}

interface ChoiceBuilder extends BaseChoiceBuilder {
    validator: Validator<any>;
}

class Choice {
    #label: string;
    #validator: Validator<any>;

    constructor({label, validator}: ChoiceBuilder) {
        this.#label = label;
        this.#validator = validator;
    }

    get label(): string {
        return this.#label;
    }

    validate(value: any): boolean {
        return this.#validator(value);
    }
}

interface ChoiceSelectionBuilder {
    choice: Choice;
    value: any;
}
class ChoiceSelection {
    #choice: Choice;
    #value: any;

    constructor ({choice, value}: ChoiceSelectionBuilder) {
        if (!choice.validate(value)) {
            throw new Error(`Invalid value for choice ${choice.label}`);
        }
        this.#choice = choice;
        this.#value = value;
    }

    get label(): string {
        return this.#choice.label;
    }

    get value(): any {
        return this.#value;
    }
}

export type {
    BaseChoiceBuilder,
};

export {
    Choice,
    ChoiceSelection,
};