import { useTranslation } from 'react-i18next';

function useCurrentLanguage(): string {
    const { i18n } = useTranslation();
    return i18n.languages[0];
}

export { useCurrentLanguage };
