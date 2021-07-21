import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const resources: Resource = {};
const translationsPath = 'assets/translations';

function baseName(path: string): string {
    path = path.replace(/\\/g, '/');
    let base: string = path.substring(path.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}

console.warn('getFiles()', window.Files.getFiles(translationsPath));
for (const file of window.Files.getFiles(translationsPath, 'json')) {
    const lang = baseName(file);
    try {
        console.log(`Loading language: ${lang}`);
        resources[lang] = {
            translation: JSON.parse(window.Files.slurp(file)),
        };
    } catch (e) {
        console.error(e);
    }
}
console.warn(resources);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });