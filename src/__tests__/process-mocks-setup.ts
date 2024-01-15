import {
    getDirectories,
    getFiles,
    resolvePath,
} from '@utils/files/directories';
import { slurp } from '@utils/files/base';
import path from 'path';

const assetsPathFragment = 'assets';

function globalSetup(): void {
    const cwd = process.cwd();
    (window as any).Main = {
        asset: (asset: string): string =>
            path.join(cwd, assetsPathFragment, asset),
    } as any;
    (window as any).Files = {
        getDirectories,
        getFiles,
        resolvePath,
        slurp,
    } as any;
}

export { globalSetup };
