function assertDefined<T>(
    val: T | undefined,
    message: string
): asserts val is T {
    if (val === undefined) {
        throw new Error(message);
    }
}

export { assertDefined };
