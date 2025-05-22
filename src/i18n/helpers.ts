import path from 'path-browserify';

interface DeepRecord {
    [key: string]: DeepRecord | string;
}

function baseName(path: string): string {
    path = path.replace(/\\/g, '/');
    let base: string = path.substring(path.lastIndexOf('/') + 1);
    if (base.lastIndexOf('.') !== -1)
        base = base.substring(0, base.lastIndexOf('.'));
    return base;
}

function extname(fspath: string): string {
    let ext = path.extname(fspath);
    if (ext?.startsWith('.')) {
        ext = ext.slice(1);
    }
    return ext;
}

function filesAndDirs(basePath: string): string[] {
    return [
        ...window.Files.getFiles(basePath, 'i18n'),
        ...window.Files.getDirectories(basePath),
    ];
}

export type { DeepRecord };
export { baseName, filesAndDirs, extname };
