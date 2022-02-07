import { contextBridge, ipcRenderer } from 'electron';

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
    return ipcRenderer.sendSync('files:del', fpath);
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
};

contextBridge.exposeInMainWorld('Files', files);