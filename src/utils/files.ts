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


const prepareDir = (target: string) => {
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
};

const slurp = (fpath: string) => fs.readFileSync(fpath).toString();

const del = (fpath: string) => fs.unlinkSync(fpath);

const isFile = (fpath: string) => fs.statSync(fpath).isFile();

const getFiles = (dpath: string, filterKey: string = 'any') => {
    const filter = filters[filterKey] || filters.any;
    return fs.readdirSync(dpath).filter(filter).map((f) => path.resolve(dpath, f)).filter(isFile);
}

export default function registerListeners() {
    ipcMain.on('files:prepareDir', (event, target: string) => {
        event.returnValue = prepareDir(target);
    });
    /* ipcMain.on('files:dump', (event, ...args) => {
        event.returnValue = files.dump(...args);
    }); */
    ipcMain.on('files:slurp', (event, fpath: string) => {
        event.returnValue = slurp(fpath);
    });
    /* ipcMain.on('files:del', (event, ...args) => {
        event.returnValue = files.del(...args);
    }); */
    ipcMain.on('files:getFiles', (event, dpath: string, filterKey:string = 'any') => {
        event.returnValue = getFiles(dpath, filterKey);
    });
}

export {
    outputPrefix,
    filters,
    prepareDir,
    dump,
    slurp,
    del,
    getFiles,
};
