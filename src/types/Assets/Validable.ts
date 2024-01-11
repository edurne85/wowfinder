interface Validable {
    validate(): boolean;
}

function validateEnumValue<T>(
    value: T,
    enumObject: Record<string, T>,
): boolean {
    return Object.values(enumObject).includes(value);
}

type Validator<T> = (value: T) => boolean;

function getEnumValidator<T>(enumObject: Record<string, T>): Validator<T> {
    return (value: T) => validateEnumValue(value, enumObject);
}

function validateEnumValues<T>(
    values: Iterable<T>,
    enumObject: Record<string, T>,
): boolean {
    return [...values].every(getEnumValidator(enumObject));
}

export type { Validable };
export { validateEnumValue, getEnumValidator, validateEnumValues };
