import type { JsonValue, JSerializable } from './json';
import { jClone } from './json';
import { sum, fThousands } from './numbers';

const debug = true;

export type {
    JsonValue,
    JSerializable,
};
export {
    jClone,
    sum,
    fThousands,
    debug,
};