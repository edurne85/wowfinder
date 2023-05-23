export type Validator<T> = (value: T) => boolean;

export { assertDefined, assertNonNull } from './assertions';
export {
    forceDataLoad,
    forceDataLoadKeyLabel,
    forceDataLoadKeyS,
    forceDataLoadKeySRecursive,
} from './dataLoad';
export { exportByChars, exportByCharsAsJsonAssets } from './dataExport';
export type {
    builder,
    ByKey,
    ByKeyRecursive,
    ByKeyRecursiveEntry,
    Keyed,
} from './dataLoad';
export {
    debug,
    debugOutput,
    debugTrace,
    reportWiP,
    reportNotImplemented,
} from './debug';
export type { Expanded } from './Expanded';
export { jClone } from './json';
export type { JSerializable, JsonValue, Exportable } from './json';
export { fThousands, sum, toRoman } from './numbers';
export { capitalizeFirstLetter, parseIfNeeded } from './strings';
export type { Parser, TryParser } from './strings';
export type { Optional } from './types';
