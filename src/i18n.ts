import i18n, { Resource, TypeOptions } from 'i18next';
import { initReactI18next, UseTranslationResponse } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


type TranslationProvider = UseTranslationResponse<
    TypeOptions['defaultNS']
>['t'];

const translationsPath = window.Main.asset('translations');

function baseName(path: string): string {
    path = path.replace(/\\/g, '/');
    let base: string = path.substring(path.lastIndexOf('/') + 1);
    if (base.lastIndexOf('.') !== -1)
        base = base.substring(0, base.lastIndexOf('.'));
    return base;
}

function jsonSlurp(fpath: string): any {
    try {
        return JSON.parse(window.Files.slurp(fpath));
    } catch (ex: any) {
        console.error(ex);
        return {};
    }
}

function filesAndDirs(basePath: string): string[] {
    return [
        ...window.Files.getFiles(basePath, 'json'),
        ...window.Files.getDirectories(basePath),
    ];
}

function slurpRecursive(path: string): Resource {
    const res: Resource = {};
    const suffixedPath = `${path}.json`;
    if (window.Files.isFile(path)) {
        Object.assign(res, jsonSlurp(path));
    }
    if (window.Files.isFile(suffixedPath)) {
        Object.assign(res, jsonSlurp(suffixedPath));
    }
    if (window.Files.isDirectory(path)) {
        for (const subPath of filesAndDirs(path)) {
            const base = baseName(subPath);
            const fullPath = window.Files.resolvePath(path, subPath);
            Object.assign(res, {[base]: {}}, res);
            Object.assign(res[base], slurpRecursive(fullPath));
        }
    }
    return res;
}

const resources: Resource = {};
function loadLang(lang: string): void {
    resources[lang] = {
        translation: slurpRecursive(window.Files.resolvePath(translationsPath, lang)),
    };
}
const langs = ['en', 'es'];
langs.forEach(loadLang);

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export { slurpRecursive };
export type { TranslationProvider };
