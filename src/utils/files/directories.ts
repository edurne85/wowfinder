import { app, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { filters, isFile } from './base';

const isDirectory = (path: string): boolean =>
    fs.existsSync(path) && fs.statSync(path).isDirectory();

const getFiles = (dpath: string, filterKey = 'any'): string[] =>
    fs
        .readdirSync(dpath)
        .filter(filters[filterKey] || filters.any)
        .map(f => path.resolve(dpath, f))
        .filter(isFile);

const getDirectories = (dpath: string): string[] =>
    fs
        .readdirSync(dpath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const getTempDir = (): string => {
    return app.getPath('temp');
};

const mkdir = (dir: string): void => {
    fs.mkdirSync(dir, { recursive: true });
};

type dumpable = string | { [key: string]: dumpable };

const dumpToDirRecursive = (target: string, data: dumpable): void => {
    if (typeof data === 'string') {
        fs.writeFileSync(`${target}.json5`, data);
    } else {
        mkdir(target);
        for (const [key, value] of Object.entries(data)) {
            const subPath = path.join(target, key);
            dumpToDirRecursive(subPath, value);
        }
    }
};

const dumpToDir = (baseDirName: string, data: dumpable): string => {
    const dir = path.resolve(getTempDir(), 'wowfinder', baseDirName);
    dumpToDirRecursive(dir, data);
    return dir;
};

function registerDirectoryListeners(): void {
    ipcMain.on('files:getFiles', (event, dpath: string, filterKey = 'any') => {
        event.returnValue = getFiles(dpath, filterKey);
    });
    ipcMain.on('files:getDirectories', (event, dpath: string) => {
        event.returnValue = getDirectories(dpath);
    });
    ipcMain.on('files:isDirectory', (event, path: string) => {
        event.returnValue = isDirectory(path);
    });
    ipcMain.on('files:resolvePath', (event, ...pathSegments) => {
        event.returnValue = path.resolve(...pathSegments);
    });
    ipcMain.on('files:getTempDir', event => {
        event.returnValue = getTempDir();
    });
    ipcMain.on(
        'files:dumpToDir',
        (event, baseDirName: string, data: dumpable) => {
            event.returnValue = dumpToDir(baseDirName, data);
        }
    );
}

export type { dumpable };
export { registerDirectoryListeners, dumpToDir };
