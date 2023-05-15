import JSON5 from 'json5';

interface Keyed<T> {
    key: T;
}

interface Labeled {
    label: string;
}

interface KeyedLabeled extends Keyed<number>, Labeled {}

type ByKey<T extends Keyed<string>> = { [key: string]: T };
type ByKeyRecursive<T extends Keyed<string>> = {
    [key: string]: T | ByKeyRecursive<T>;
};
type ByKeyRecursiveEntry<T extends Keyed<string>> = T | ByKeyRecursive<T>;
type ByLabel<T extends Labeled> = { [label: string]: T };
type ByKeyLabel<T extends KeyedLabeled> = {
    byKey: { [key: number]: T };
    byLabel: ByLabel<T>;
};
type builder<T> = (raw: any) => T;

function iterateDir(dir: string, action: (raw: any) => void): void {
    for (const file of window.Files.getFiles(dir, 'json5')) {
        try {
            const obj = JSON5.parse(window.Files.slurp(file));
            action(obj);
        } catch (e) {
            console.error(e);
        }
    }
}

function warnDuplicateKey(type: string, key: string | number): void {
    console.warn(`Duplicate ${type} element with key ${key} found.`);
}
function checkDuplicateKeyS<T extends Keyed<string>>(
    collection: ByKeyRecursive<T>,
    obj: T,
): void {
    if (collection[obj.key]) {
        warnDuplicateKey(typeof obj, obj.key);
    }
}

function checkDuplicateKeyN<T extends Keyed<number>>(
    collection: { [key: number]: T },
    obj: T,
): void {
    if (collection[obj.key]) {
        warnDuplicateKey(typeof obj, obj.key);
    }
}

function checkDuplicateLabel<T extends Labeled>(
    collection: ByLabel<T>,
    obj: T,
): void {
    if (collection[obj.label]) {
        console.warn(
            `Duplicate ${typeof obj} element with label ${obj.label} found.`,
        );
    }
}

function forceDataImport<T>(dir: string, builder: builder<T>): readonly T[] {
    const data: T[] = [];
    iterateDir(dir, raw => {
        data.push(builder(raw));
    });
    return Object.freeze(data.sort());
}

function forceDataImportKeyS<T extends Keyed<string>>(
    dir: string,
    builder: builder<T>,
): ByKey<T> {
    const byKey: ByKey<T> = {};
    iterateDir(dir, raw => {
        const obj = builder(raw);
        checkDuplicateKeyS(byKey, obj);
        byKey[obj.key] = obj;
    });
    return Object.freeze(byKey);
}

function forceDataImportKeySRecursive<T extends Keyed<string>>(
    dir: string,
    builder: builder<T>,
): ByKeyRecursive<T> {
    const byKey: ByKeyRecursive<T> = {
        ...forceDataImportKeyS<T>(dir, builder),
    };
    for (const subdir of window.Files.getDirectories(dir)) {
        checkDuplicateKeyS(byKey, { key: subdir });
        const fullSubDirPath = window.Files.resolvePath(dir, subdir);
        byKey[subdir] = forceDataImportKeySRecursive<T>(
            fullSubDirPath,
            builder,
        );
    }
    return byKey;
}

function forceDataImportKeyLabel<T extends KeyedLabeled>(
    dir: string,
    builder: builder<T>,
): ByKeyLabel<T> {
    const byKeyLabel: ByKeyLabel<T> = { byKey: {}, byLabel: {} };
    iterateDir(dir, raw => {
        const obj = builder(raw);
        checkDuplicateKeyN(byKeyLabel.byKey, obj);
        checkDuplicateLabel(byKeyLabel.byLabel, obj);
        byKeyLabel.byKey[obj.key] = byKeyLabel.byLabel[obj.label] = obj;
    });
    [byKeyLabel, byKeyLabel.byKey, byKeyLabel.byLabel].map(Object.freeze);
    return byKeyLabel;
}

export type { Keyed, ByKey, ByKeyRecursive, ByKeyRecursiveEntry, builder };
export {
    forceDataImport,
    forceDataImportKeyS,
    forceDataImportKeyLabel,
    forceDataImportKeySRecursive,
};
