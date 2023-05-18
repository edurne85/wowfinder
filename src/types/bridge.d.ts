import { api, files } from '../../electron/bridge';

declare global {
    interface Window {
        Main: typeof api;
        Files: typeof files;
    }
}
