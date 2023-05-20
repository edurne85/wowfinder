import JSON5 from 'json5';
import { baseName, filesAndDirs } from './helpers';
import { Resource } from 'i18next';

type Slurper = (path: string) => any;

function jsonSlurp(path: string): any {
    try {
        return Object.assign({}, JSON5.parse(window.Files.slurp(path)));
    } catch (ex: any) {
        console.error(ex);
        return {};
    }
}

const customSlurpers: Record<string, Slurper> = {
    json: jsonSlurp,
    json5: jsonSlurp,
} as const;

const defaultSlurper: Slurper = window.Files.slurp;

function getSlurper(ext: string): Slurper {
    return customSlurpers[ext] ?? defaultSlurper;
}

const defaultExtensions = ['json5', 'txt', 'md', 'html'] as const;

function trySlurpByExtension(path: string): Resource | string {
    const extension = path.substring(path.lastIndexOf('.') + 1);
    if (extension) {
        if (window.Files.isFile(path)) {
            return getSlurper(extension)(path);
        }
    } else {
        for (const ext of defaultExtensions) {
            const suffixedPath = `${path}.${ext}`;
            if (window.Files.isFile(suffixedPath)) {
                return getSlurper(ext)(suffixedPath);
            }
        }
    }
    throw new Error(`Could not slurp ${path}`);
}

function slurpRecursive(path: string): Resource | string {
    const res: Resource = {};
    if (window.Files.isDirectory(path)) {
        for (const subPath of filesAndDirs(path)) {
            const base = baseName(subPath);
            const fullPath = window.Files.resolvePath(path, subPath);
            Object.assign(res, { [base]: slurpRecursive(fullPath) }, res);
        }
    } else {
        return trySlurpByExtension(path);
    }
    return res;
}

export { slurpRecursive };
