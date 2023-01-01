export type Validator<T> = (value: T) => boolean;

export { assertDefined } from './assertions';
export {
    forceDataImport,
    forceDataImportKeyLabel,
    forceDataImportKeyS,
    forceDataImportKeySRecursive,
} from './dataImport';
export type {
    builder,
    ByKey,
    ByKeyRecursive,
    ByKeyRecursiveEntry,
    Keyed,
} from './dataImport';
export { debug, debugOutput, debugTrace } from './debug';
export type { Expanded } from './Expanded';
export { jClone } from './json';
export type { JSerializable, JsonValue } from './json';
export { fThousands, sum, toRoman } from './numbers';
export { capitalizeFirstLetter, parseIfNeeded } from './strings';
export type { Parser, TryParser } from './strings';
export type { Optional, ReactChildren } from './types';
