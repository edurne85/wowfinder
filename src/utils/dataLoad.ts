import JSON5 from 'json5';
import { Keyed, Labeled } from './types';

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

function iterateDir(
    dir: string,
    action: (raw: any) => void,
    reThrowErrors = false,
): void {
    for (const file of window.Files.getFiles(dir, 'json5')) {
        try {
            const obj = JSON5.parse(window.Files.slurp(file));
            action(obj);
        } catch (e) {
            if (reThrowErrors) {
                throw e;
            } else {
                console.error(`Error parsing ${file} within ${dir}: ${e}`);
            }
        }
    }
}

function warnDuplicateKey(
    type: string,
    key: string | number,
    context?: string,
): void {
    const contextSuffix = context ? ` in ${context}` : '';
    console.warn(
        `Duplicate ${type} element with key ${key} found${contextSuffix}.`,
    );
}
function checkDuplicateKeyS<T extends Keyed<string>>(
    collection: ByKeyRecursive<T>,
    obj: T,
    context?: string,
): void {
    if (collection[obj.key]) {
        warnDuplicateKey(typeof obj, obj.key, context);
    }
}

function checkDuplicateKeyN<T extends Keyed<number>>(
    collection: { [key: number]: T },
    obj: T,
    context?: string,
): void {
    if (collection[obj.key]) {
        warnDuplicateKey(typeof obj, obj.key, context);
    }
}

function checkDuplicateLabel<T extends Labeled>(
    collection: ByLabel<T>,
    obj: T,
    context?: string,
): void {
    const contextSuffix = context ? ` in ${context}` : '';
    if (collection[obj.label]) {
        console.warn(
            `Duplicate ${typeof obj} element with label ${
                obj.label
            } found${contextSuffix}.`,
        );
    }
}

function forceDataLoad<T>(
    dir: string,
    builder: builder<T>,
    reThrowErrors = false,
): readonly T[] {
    const data: T[] = [];
    iterateDir(
        dir,
        raw => {
            data.push(builder(raw));
        },
        reThrowErrors,
    );
    return Object.freeze(data.sort());
}

function forceDataLoadKeyS<T extends Keyed<string>>(
    dir: string,
    builder: builder<T>,
    reThrowErrors = false,
): ByKey<T> {
    const byKey: ByKey<T> = {};
    iterateDir(
        dir,
        raw => {
            const obj = builder(raw);
            checkDuplicateKeyS(byKey, obj, dir);
            byKey[obj.key] = obj;
        },
        reThrowErrors,
    );
    return Object.freeze(byKey);
}

function forceDataLoadKeySRecursive<T extends Keyed<string>>(
    dir: string,
    builder: builder<T>,
    rethrowErrors = false,
): ByKeyRecursive<T> {
    const byKey: ByKeyRecursive<T> = {
        ...forceDataLoadKeyS<T>(dir, builder, rethrowErrors),
    };
    for (const subdir of window.Files.getDirectories(dir)) {
        checkDuplicateKeyS(byKey, { key: subdir }, dir);
        const fullSubDirPath = window.Files.resolvePath(dir, subdir);
        byKey[subdir] = forceDataLoadKeySRecursive<T>(
            fullSubDirPath,
            builder,
            rethrowErrors,
        );
    }
    return byKey;
}

function forceDataLoadKeyLabel<T extends KeyedLabeled>(
    dir: string,
    builder: builder<T>,
    rethrowErrors = false,
): ByKeyLabel<T> {
    const byKeyLabel: ByKeyLabel<T> = { byKey: {}, byLabel: {} };
    iterateDir(
        dir,
        raw => {
            const obj = builder(raw);
            checkDuplicateKeyN(byKeyLabel.byKey, obj, dir);
            checkDuplicateLabel(byKeyLabel.byLabel, obj);
            byKeyLabel.byKey[obj.key] = byKeyLabel.byLabel[obj.label] = obj;
        },
        rethrowErrors,
    );
    [byKeyLabel, byKeyLabel.byKey, byKeyLabel.byLabel].map(Object.freeze);
    return byKeyLabel;
}

export type { Keyed, ByKey, ByKeyRecursive, ByKeyRecursiveEntry, builder };
export {
    forceDataLoad,
    forceDataLoadKeyS,
    forceDataLoadKeyLabel,
    forceDataLoadKeySRecursive,
};
