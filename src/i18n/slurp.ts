import JSON5 from 'json5';
import { baseName, filesAndDirs } from './helpers';
import { Resource } from 'i18next';

function jsonSlurp(fpath: string): any {
    try {
        return JSON5.parse(window.Files.slurp(fpath));
    } catch (ex: any) {
        console.error(ex);
        return {};
    }
}

function slurpRecursive(path: string): Resource {
    const res: Resource = {};
    const suffixedPath = `${path}.json5`;
    if (window.Files.isFile(path)) {
        Object.assign(res, jsonSlurp(path));
    }
    if (window.Files.isFile(suffixedPath)) {
        Object.assign(res, jsonSlurp(suffixedPath));
    }
    if (window.Files.isDirectory(path)) {
        for (const subPath of filesAndDirs(path)) {
            const base = baseName(subPath);
            const fullPath = window.Files.resolvePath(path, subPath);
            Object.assign(res, { [base]: {} }, res);
            Object.assign(res[base], slurpRecursive(fullPath));
        }
    }
    return res;
}

export { slurpRecursive };
