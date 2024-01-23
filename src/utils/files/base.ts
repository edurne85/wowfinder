import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

const outputPrefix = 'output/';

type fileFilter = (s: string) => boolean;
const filters: { [key: string]: fileFilter } = {
    any: () => true,
    json: s => /\.json$/i.test(s),
    json5: s => /\.json5?$/i.test(s),
    i18n: s =>
        /\.json5?$/i.test(s) ||
        /\.txt$/i.test(s) ||
        /\.md$/i.test(s) ||
        /\.html$/i.test(s),
};

const prepareDir = (target: string): void => {
    const dname = path.dirname(target);
    try {
        fs.mkdirSync(dname, { recursive: true });
    } catch (err: any) {
        if (err.code === 'EEXIST') {
            return;
        }
        throw err;
    }
};

const dump = (rpath: string, data: string): string => {
    const target = outputPrefix + rpath;
    prepareDir(target);
    fs.writeFileSync(target, data);
    return target;
};

const slurp = (fpath: string): string => fs.readFileSync(fpath).toString();

const del = (fpath: string): void => fs.unlinkSync(fpath);

const isFile = (path: string): boolean =>
    fs.existsSync(path) && fs.statSync(path).isFile();

function registerFileBaseListeners(): void {
    ipcMain.on('files:prepareDir', (_, target: string) => {
        prepareDir(target);
    });
    ipcMain.on('files:dump', (event, rpath: string, data: string) => {
        event.returnValue = dump(rpath, data);
    });
    ipcMain.on('files:slurp', (event, fpath: string) => {
        event.returnValue = slurp(fpath);
    });
    ipcMain.on('files:del', (_, fpath: string) => {
        del(fpath);
    });
    ipcMain.on('files:isFile', (event, path: string) => {
        event.returnValue = isFile(path);
    });
}

export type { fileFilter };
export { filters, isFile, slurp, registerFileBaseListeners };
