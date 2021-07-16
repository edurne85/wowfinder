import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => { 
    ipcRenderer.send('message', message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)

export const files = {
  slurp: (fpath: string): string => {
    return ipcRenderer.sendSync('files:slurp', fpath);
  },
  getFiles: (dpath: string, filterKey: string = 'any'): string[] => {
    return ipcRenderer.sendSync('files:getFiles', dpath, filterKey);
  },
  prepareDir: (target: string): void => {
    ipcRenderer.sendSync('files:prepareDir', target)
  },
  dump: (rpath: string, data: string): string => {
    return ipcRenderer.sendSync('files:dump', rpath, data);
  },
  del: (fpath: string): void => {
    return ipcRenderer.sendSync('files:del', fpath);
  },
  isFile: (fpath: string): boolean => {
    return ipcRenderer.sendSync('files:isFile', fpath);
  },
};

contextBridge.exposeInMainWorld('Files', files);