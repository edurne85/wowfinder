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

const isFile = (fpath: string): boolean => fs.statSync(fpath).isFile();

export default function registerListeners(): void {
    ipcMain.on('files:prepareDir', (event, target: string) => {
        prepareDir(target);
    });
    ipcMain.on('files:dump', (event, rpath: string, data: string) => {
        const target = outputPrefix + rpath;
        prepareDir(target);
        fs.writeFileSync(target, data);
        event.returnValue =  target;
    });
    ipcMain.on('files:slurp', (event, fpath: string) => {
        event.returnValue = fs.readFileSync(fpath).toString();
    });
    ipcMain.on('files:del', (event, fpath: string) => {
        event.returnValue = fs.unlinkSync(fpath);
    });
    ipcMain.on('files:getFiles', (event, dpath: string, filterKey:string = 'any') => {
        event.returnValue = fs.readdirSync(dpath)
            .filter(filters[filterKey] || filters.any)
            .map((f) => path.resolve(dpath, f))
            .filter(isFile);
    });
};
