import { app, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { filters, isFile } from './base';
import { DebugTimer } from '../DebugTimer';

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

function shouldCopy(
    sourceStats: fs.Stats | null,
    destinationStats: fs.Stats | null,
): boolean {
    return (
        !!sourceStats &&
        (!destinationStats || sourceStats.mtime > destinationStats.mtime)
    );
}

function copyDir(source: string, destination: string): void {
    const dirTimer = new DebugTimer(`copyDir ${source} -> ${destination}`);
    const dirName = path.basename(source);
    const destinationDir = path.join(destination, dirName);

    try {
        const existCheckTimer = new DebugTimer(
            `check if exists ${destinationDir}`,
        );
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir);
        }
        existCheckTimer.finish();

        const items = fs.readdirSync(source);

        for (const item of items) {
            const sourcePath = path.join(source, item);
            const destinationPath = path.join(destinationDir, item);

            const sourceStats = fs.statSync(sourcePath);
            const destinationStats = fs.existsSync(destinationPath)
                ? fs.statSync(destinationPath)
                : null;
            if (sourceStats.isFile()) {
                if (shouldCopy(sourceStats, destinationStats)) {
                    fs.copyFileSync(sourcePath, destinationPath);
                }
            } else if (sourceStats.isDirectory()) {
                copyDir(sourcePath, destinationDir);
            }
        }
    } catch (err) {
        console.error(`Failed to copy dir: ${err}`);
    }
    dirTimer.finish();
}

function assetDump(): void {
    const sourceAssetsPath =
        process.env.NODE_ENV === 'production'
            ? process.resourcesPath
            : app.getAppPath();
    copyDir(path.join(sourceAssetsPath, 'assets'), app.getPath('userData'));
}

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
        },
    );
    ipcMain.on('files:assetDump', () => {
        const timer = new DebugTimer('on(files:assetDump)');
        assetDump();
        timer.finish();
    });
}

export type { dumpable };
export { registerDirectoryListeners, dumpToDir, copyDir };
