function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

type Parser<T> = (input: string) => T;

type TryParser<T> = (input: string) => T | undefined;

function parseIfNeeded<T>(value: T | string, parser: (input: string) => T): T {
    return typeof value === 'string' ? parser(value) : value;
}

export { capitalizeFirstLetter, parseIfNeeded };
export type { Parser, TryParser };
