import { registerFileBaseListeners } from './base';
import { registerDirectoryListeners } from './directories';
import { registerZipListeners } from './zip';

export default function registerListeners(): void {
    registerFileBaseListeners();
    registerDirectoryListeners();
    registerZipListeners();
}

export type { dumpable } from './directories';
export type { Archiver } from './zip';
