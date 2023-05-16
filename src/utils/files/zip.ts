import * as archiver from 'archiver';
import * as unzipper from 'unzipper';
import { app, dialog, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { dumpable, dumpToDir } from './directories';

function zipDir(dirPath: string, filePath: string): void {
    console.log('zipDir', dirPath, filePath);
    const output = fs.createWriteStream(filePath);
    const archive = archiver.create('zip', { zlib: { level: 9 } });
    archive.pipe(output);

    const addFileToArchive = (filePath: string, archivePath: string): void => {
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            const files = fs.readdirSync(filePath);
            for (const file of files) {
                const subFilePath = path.join(filePath, file);
                const subArchivePath = path.join(archivePath, file);
                addFileToArchive(subFilePath, subArchivePath);
            }
        } else {
            archive.file(filePath, { name: archivePath });
        }
    };

    addFileToArchive(dirPath, '');

    archive.finalize();
}

const dumpToZip = (fullZipPath: string, data: dumpable): string => {
    const fullDirPath = dumpToDir(path.basename(fullZipPath, '.zip'), data);
    zipDir(fullDirPath, fullZipPath);
    // fsx.removeSync(fullDirPath);
    return fullZipPath;
};

const saveToZip = (
    raw: dumpable,
    defaultPath = 'export.zip',
): Promise<boolean> => {
    return dialog
        .showSaveDialog({ defaultPath })
        .then(({ canceled, filePath }): boolean => {
            if (canceled || !filePath) {
                return false;
            }
            dumpToZip(filePath, raw);
            return true;
        })
        .catch((err): boolean => {
            console.error(err);
            return false;
        });
};

function unzipToDir(zipPath: string, dirPath: string): void {
    const readStream = fs.createReadStream(zipPath);
    const extractionStream = unzipper.Extract({ path: dirPath });

    readStream.pipe(extractionStream);

    extractionStream.on('close', () => undefined);

    extractionStream.on('error', error => {
        throw error;
    });
}

const loadFromZip = (
    targetDir: string = app.getPath('userData'),
): Promise<boolean> => {
    return dialog
        .showOpenDialog({})
        .then(({ canceled, filePaths }): boolean => {
            if (canceled || !filePaths) {
                return false;
            }
            unzipToDir(filePaths[0], targetDir);
            console.info('loadFromFile', targetDir, filePaths);
            return true;
        })
        .catch((err): boolean => {
            console.error('loadFromFile', err);
            return false;
        });
};

function registerZipListeners(): void {
    ipcMain.on('files:zipDir', (_, dirPath: string, filePath: string) => {
        zipDir(dirPath, filePath);
    });
    ipcMain.on(
        'files:dumpToZip',
        (event, baseDirName: string, data: dumpable) => {
            event.returnValue = dumpToZip(baseDirName, data);
        },
    );
    ipcMain.on(
        'files:saveToZip',
        async (event, raw: dumpable, defaultPath = 'export.zip') => {
            event.returnValue = await saveToZip(raw, defaultPath);
        },
    );
    ipcMain.on(
        'files:unzipToDir',
        async (_, zipPath: string, dirPath: string) => {
            unzipToDir(zipPath, dirPath);
        },
    );
    ipcMain.on('files:loadFromZip', async (event, targetDir?: string) => {
        event.returnValue = await loadFromZip(targetDir);
    });
}

export { registerZipListeners };
