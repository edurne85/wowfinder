function assertDefined<T>(
    val: T | undefined,
    message?: string,
): asserts val is T {
    if (val === undefined) {
        throw new Error(message || 'Failed assertion: Value is undefined');
    }
}

function assertNonNull<T>(val: T | null, message?: string): asserts val is T {
    if (val === null) {
        throw new Error(message || 'Failed assertion: Value is null');
    }
}

export { assertDefined, assertNonNull };
