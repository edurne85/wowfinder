type JsonValue =
    | null
    | boolean
    | number
    | string
    | JsonValue[]
    | { [k: string]: JsonValue };
interface JSerializable {
    toJson(): JsonValue;
}

interface Exportable<T extends JsonValue> {
    export(): T;
}

function jClone(obj: JsonValue): JsonValue {
    return JSON.parse(JSON.stringify(obj));
}

export type { JsonValue, JSerializable, Exportable };
export { jClone };
