import * as archiver from 'archiver';
import { dialog, ipcMain } from 'electron';
import * as fs from 'fs';
import * as fsx from 'fs-extra';
import * as path from 'path';
import { dumpable, dumpToDir } from './directories';

type Archiver = archiver.Archiver;

function zipDir(dirPath: string, filePath: string): Archiver {
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

    return archive;
}

const dumpToZip = (fullZipPath: string, data: dumpable): string => {
    const fullDirPath = dumpToDir(path.basename(fullZipPath, '.zip'), data);
    zipDir(fullDirPath, fullZipPath);
    fsx.removeSync(fullDirPath);
    return fullZipPath;
};

const saveToZip = (
    raw: dumpable,
    defaultPath = 'export.zip'
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

function registerZipListeners(): void {
    ipcMain.on('files:zipDir', (event, dirPath: string, filePath: string) => {
        event.returnValue = zipDir(dirPath, filePath);
    });
    ipcMain.on(
        'files:dumpToZip',
        (event, baseDirName: string, data: dumpable) => {
            event.returnValue = dumpToZip(baseDirName, data);
        }
    );
    ipcMain.on(
        'files:saveToZip',
        async (event, raw: dumpable, defaultPath = 'export.zip') => {
            event.returnValue = await saveToZip(raw, defaultPath);
        }
    );
}

export type { Archiver };
export { registerZipListeners };
