import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import registerFilesListeners from '../src/utils/files';
import { copyDir } from '../src/utils/files/directories';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const sourceAssetsPath =
    process.env.NODE_ENV === 'production'
        ? process.resourcesPath
        : app.getAppPath();

function createWindow(): void {
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

copyDir(path.join(sourceAssetsPath, 'assets'), app.getPath('userData'));

async function registerListeners(): Promise<void> {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log(message);
    });
    ipcMain.on('asset', (event, asset: string) => {
        event.returnValue = path.join(app.getPath('userData'), 'assets', asset);
    });
    ipcMain.on('builtin', (event, asset: string) => {
        event.returnValue = path.join(sourceAssetsPath, 'assets', asset);
    });
    ipcMain.on('translationsPath', event => {
        event.returnValue = path.join(sourceAssetsPath, 'translations');
    });
    registerFilesListeners();
}

app.on('ready', createWindow)
    .whenReady()
    .then(registerListeners)
    .catch(e => console.error(e));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
