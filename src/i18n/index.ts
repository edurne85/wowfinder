import i18n, { Resource, TypeOptions } from 'i18next';
import { initReactI18next, UseTranslationResponse } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { slurpRecursive } from './slurp';
import { debug } from '../utils/debug';

type TranslationProvider = UseTranslationResponse<
    TypeOptions['defaultNS']
>['t'];

function initTranslations(): void {
    const translationsPath = window.Main.asset('translations');

    const resources: Resource = {};
    function loadLang(lang: string): void {
        resources[lang] = {
            translation: slurpRecursive(
                window.Files.resolvePath(translationsPath, lang),
            ),
        };
    }
    const langs = ['en', 'es'];
    langs.forEach(loadLang);

    i18n.use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: 'en',
            debug,
            interpolation: {
                escapeValue: false,
            },
        });
}

export { initTranslations };
export type { TranslationProvider };
