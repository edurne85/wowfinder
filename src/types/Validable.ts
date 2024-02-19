interface Validable {
    validate(): void;
}

class ValidationError<T> extends Error {
    value: T;
    constructor(value: T, message: string) {
        super(`Validation error for ${value}: ${message}`);
        this.name = 'ValidationError';
        this.value = value;
    }
}

class EnumValidationError<T> extends ValidationError<T> {
    enumObject: Record<string, T>;
    constructor(value: T, enumObject: Record<string, T>) {
        super(value, `Acceptable values: ${Object.values(enumObject)}`);
        this.name = 'EnumValidationError';
        this.enumObject = enumObject;
    }
}

function joinErrors(errors: Error[]): string {
    return errors.map(e => e.message).join('\n');
}

class CompoundValidationError<T> extends ValidationError<T> {
    errors: Error[];
    constructor(value: T, message: string, ...errors: Error[]) {
        super(
            value,
            `Compound validation error: ${message}.\nInternal errors:[${joinErrors(
                errors,
            )}]`,
        );
        this.name = 'CompoundValidationError';
        this.errors = errors;
    }
}

function validateEnumValue<T>(
    value: T,
    enumObject: Record<string, T>,
): asserts value is T {
    if (!Object.values(enumObject).includes(value)) {
        throw new EnumValidationError(value, enumObject);
    }
}

type Validator<T> = (value: T) => asserts value is T;

function getEnumValidator<T>(enumObject: Record<string, T>): Validator<T> {
    return (value: T) => validateEnumValue(value, enumObject);
}

function validateEnumValues<T>(
    values: Iterable<T>,
    enumObject: Record<string, T>,
): asserts values is Iterable<T> {
    const validate = getEnumValidator(enumObject);
    [...values].forEach(validate);
}

function validateCollection<T>(
    values: Iterable<T>,
    validate: Validator<T>,
): asserts values is Iterable<T> {
    const errors: Error[] = [];
    for (const value of values) {
        try {
            validate(value);
        } catch (e: any) {
            errors.push(e);
        }
    }
    if (errors.length > 0) {
        throw new CompoundValidationError(
            values,
            'Array validation failed',
            ...errors,
        );
    }
}

function validateArray<T>(
    values: T[],
    validate: Validator<T>,
): asserts values is T[] {
    if (!Array.isArray(values)) {
        throw new ValidationError(values, 'Must be an array');
    }
    validateCollection(values, validate);
}

function validateNumber(value: any): asserts value is number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        throw new ValidationError(value, 'Must be a number');
    }
}

function validateNonNegativeNumber(value: any): asserts value is number {
    validateNumber(value);
    if (value < 0) {
        throw new ValidationError(value, 'Must be non-negative');
    }
}

type ValidatorContainer<T> = {
    [key: string]: any;
    validate: Validator<T>;
};

export type { Validable };
export {
    ValidationError,
    EnumValidationError,
    CompoundValidationError,
    ValidatorContainer,
    validateEnumValue,
    getEnumValidator,
    validateEnumValues,
    validateCollection,
    validateArray,
    validateNumber,
    validateNonNegativeNumber,
};
