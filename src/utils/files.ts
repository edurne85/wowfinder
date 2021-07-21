import fs from 'fs';
import path from 'path';
import { ipcMain } from 'electron';

const outputPrefix = 'output/';

type fileFilter = (s:string) => boolean;
const filters: {[key:string]: fileFilter} = {
    any: () => true,
    json: (s) => /\.json$/i.test(s),
    json5: (s) => /\.json5?$/i.test(s),
};


const prepareDir = (target: string): void => {
    const dname = path.dirname(target);
    try {
        fs.mkdirSync(dname, { recursive: true });
    }
    catch (err) {
        if (err.code === 'EEXIST') { return ;}
        throw err;
    }
};

const dump = (rpath: string, data: string): string => {
    const target = outputPrefix + rpath;
    prepareDir(target);
    fs.writeFileSync(target, data);
    return target;
}

const slurp = (fpath: string): string =>  fs.readFileSync(fpath).toString();

const del = (fpath: string): void => fs.unlinkSync(fpath);

const getFiles = (dpath: string, filterKey: string = 'any'): string[] =>
    fs.readdirSync(dpath)
        .filter(filters[filterKey] || filters.any)
        .map((f) => path.resolve(dpath, f))
        .filter(isFile);

const isFile = (fpath: string): boolean => fs.statSync(fpath).isFile();

export default function registerListeners(): void {
    ipcMain.on('files:prepareDir', (event, target: string) => {
        prepareDir(target);
    });
    ipcMain.on('files:dump', (event, rpath: string, data: string) => {
        event.returnValue =  dump(rpath, data);
    });
    ipcMain.on('files:slurp', (event, fpath: string) => {
        event.returnValue = slurp(fpath);
    });
    ipcMain.on('files:del', (event, fpath: string) => {
        del(fpath);
    });
    ipcMain.on('files:getFiles', (event, dpath: string, filterKey:string = 'any') => {
        event.returnValue = getFiles(dpath, filterKey);
    });
};

export {
    prepareDir,
    dump,
    slurp,
    del,
    getFiles,
    filters,
}
