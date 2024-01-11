import { getFiles, slurp } from '@utils';
import path from 'path';

const assetsPathFragment = 'assets';

function globalSetup(): void {
    const cwd = process.cwd();
    (window as any).Main = {
        asset: (asset: string): string =>
            path.join(cwd, assetsPathFragment, asset),
    } as any;
    (window as any).Files = {
        getFiles,
        slurp,
    } as any;
}

export { globalSetup };
