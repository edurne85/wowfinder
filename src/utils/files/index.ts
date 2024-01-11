import { registerFileBaseListeners } from './base';
import { registerDirectoryListeners } from './directories';
import { registerZipListeners } from './zip';

export default function registerListeners(): void {
    registerFileBaseListeners();
    registerDirectoryListeners();
    registerZipListeners();
}

export * from './base';
export * from './directories';
export * from './zip';

export type { dumpable } from './directories';
