import JSON5 from 'json5';
import { baseName, filesAndDirs, extname, DeepRecord } from './helpers';
import { Resource } from 'i18next';
import { debugError, tryOrFallback } from '../utils/debug';

type Slurper = (fspath: string) => any;

function jsonSlurp(fspath: string): DeepRecord {
    return tryOrFallback(
        () => Object.assign({}, JSON5.parse(window.Files.slurp(fspath))),
        {},
    );
}
function textSlurp(fspath: string): string {
    return tryOrFallback(() => window.Files.slurp(fspath), '');
}

const customSlurpers: Record<string, Slurper> = {
    json5: jsonSlurp,
} as const;

const defaultSlurper: Slurper = textSlurp;

function getSlurper(ext: string): Slurper {
    return customSlurpers[ext] ?? defaultSlurper;
}

const defaultExtensions = ['json5', 'txt', 'md', 'html'] as const;

function slurpByExtension(fspath: string): Resource | string | null {
    const extension = extname(fspath);
    if (extension) {
        if (window.Files.isFile(fspath)) {
            return getSlurper(extension)(fspath);
        } else {
            debugError(`No file found at ${fspath}; ${extension} expected.`);
        }
    } else {
        for (const ext of defaultExtensions) {
            const suffixedPath = `${fspath}.${ext}`;
            if (window.Files.isFile(suffixedPath)) {
                return getSlurper(ext)(suffixedPath);
            }
        }
    }
    return null;
}

function slurpRecursive(fspath: string): DeepRecord | string {
    const res: DeepRecord = {};
    if (window.Files.isDirectory(fspath)) {
        for (const subPath of filesAndDirs(fspath)) {
            const base = baseName(subPath);
            const fullPath = window.Files.resolvePath(fspath, subPath);
            Object.assign(res, { [base]: {} }, res);
            const slurped = slurpRecursive(fullPath);
            if (typeof slurped === 'string') {
                res[base] = slurped;
            } else {
                Object.assign(res[base], slurped);
            }
        }
    }
    const slurped = slurpByExtension(fspath);
    if (slurped) {
        if (typeof slurped === 'string') {
            return slurped;
        } else {
            Object.assign(res, slurped, res);
        }
    }
    return res;
}

export { slurpRecursive };
