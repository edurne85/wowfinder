import * as files from '@utils/files';
import path from 'path';

const assetsPathFragment = 'assets';

function globalSetup(): void {
    const cwd = process.cwd();
    (window as any).Main = {
        asset: (asset: string): string =>
            path.join(cwd, assetsPathFragment, asset),
    } as any;
    (window as any).Files = {
        ...files,
    } as any;
}

export { globalSetup };
