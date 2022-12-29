export type Validator<T> = (value: T) => boolean;

export type { JsonValue, JSerializable } from './json';

export { jClone } from './json';

export { sum, fThousands } from './numbers';

export { debug, debugOutput, debugTrace } from './debug';

export { capitalizeFirstLetter, enumTryParse, parseIfNeeded } from './strings';

export type { Parser, TryParser } from './strings';

export type { Keyed, ByKey, ByKeyRecursive, ByKeyRecursiveEntry, builder } from './dataImport';

export {
    forceDataImport,
    forceDataImportKeyS,
    forceDataImportKeyLabel,
    forceDataImportKeySRecursive,
} from './dataImport';

export type { Expanded } from './Expanded';

export type ReactChildren = React.ReactNode | Iterable<React.ReactNode>;
