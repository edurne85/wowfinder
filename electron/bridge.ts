import { contextBridge, ipcRenderer } from 'electron';
import type { dumpable } from '../src/utils/files';

export const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     *
     * The function below can accessed using `window.Main.sayHello`
     */

    sendMessage: (message: string): void => {
        ipcRenderer.send('message', message);
    },

    asset: (asset: string): string => ipcRenderer.sendSync('asset', asset),

    builtin: (asset: string): string => ipcRenderer.sendSync('builtin', asset),

    translationsPath: (): string => ipcRenderer.sendSync('translationsPath'),

    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: (...args: unknown[]) => void): void => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    },
};

contextBridge.exposeInMainWorld('Main', api);

export const files = {
    slurp: (fpath: string): string => {
        return ipcRenderer.sendSync('files:slurp', fpath);
    },
    prepareDir: (target: string): void => {
        ipcRenderer.sendSync('files:prepareDir', target);
    },
    dump: (rpath: string, data: string): string => {
        return ipcRenderer.sendSync('files:dump', rpath, data);
    },
    del: (fpath: string): void => {
        ipcRenderer.sendSync('files:del', fpath);
    },
    getFiles: (dpath: string, filterKey = 'any'): string[] => {
        return ipcRenderer.sendSync('files:getFiles', dpath, filterKey);
    },
    getDirectories: (dpath: string): string[] => {
        return ipcRenderer.sendSync('files:getDirectories', dpath);
    },
    isFile: (path: string): boolean => {
        return ipcRenderer.sendSync('files:isFile', path);
    },
    isDirectory: (path: string): boolean => {
        return ipcRenderer.sendSync('files:isDirectory', path);
    },
    resolvePath: (...pathSegments: string[]): string => {
        return ipcRenderer.sendSync('files:resolvePath', ...pathSegments);
    },
    getTempDir: (): string => {
        return ipcRenderer.sendSync('files:getTempDir');
    },
    dumpToDir: (baseDirName: string, data: dumpable): void => {
        ipcRenderer.sendSync('files:dumpToDir', baseDirName, data);
    },
    zipDir: (dirPath: string, filePath: string): void => {
        ipcRenderer.sendSync('files:zipDir', dirPath, filePath);
    },
    dumpToZip: (baseDirName: string, data: dumpable): string => {
        return ipcRenderer.sendSync('files:dumpToZip', baseDirName, data);
    },
    saveToZip: (raw: dumpable, defaultPath = 'export.zip'): boolean => {
        return ipcRenderer.sendSync('files:saveToZip', raw, defaultPath);
    },
    loadFromZip: (targetDir?: string): boolean => {
        return ipcRenderer.sendSync('files:loadFromZip', targetDir);
    },
};

contextBridge.exposeInMainWorld('Files', files);
