import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import registerFilesListeners from '../src/utils/files';
import { debug, DebugTimer, skipAssetDump } from '../src/utils';
import { assetDump } from '../src/utils/files/directories';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (!skipAssetDump) {
    DebugTimer.execute('assetDump (in main process)', () => {
        assetDump();
    });
}

const sourceAssetsPath =
    process.env.NODE_ENV === 'production'
        ? process.resourcesPath
        : app.getAppPath();

interface WindowArguments {
    preload?: string;
    url: string;
    show?: boolean;
    openDevTools?: boolean;
}

function createWindow({
    preload,
    url,
    show = true,
    openDevTools,
}: WindowArguments): BrowserWindow {
    const devTools = typeof openDevTools === 'boolean' ? openDevTools : debug;
    const window = new BrowserWindow({
        show,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload,
        },
    });
    window.loadURL(url);
    if (show && devTools) {
        window.webContents.openDevTools();
    }
    return window;
}

function createWindows(): void {
    mainWindow = createWindow({
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        url: MAIN_WINDOW_WEBPACK_ENTRY,
    });
}

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

app.on('ready', createWindows)
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
        createWindows();
    }
});
