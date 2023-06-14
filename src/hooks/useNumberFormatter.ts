import { useCurrentLanguage } from './useCurrentLanguage';

function useNumberFormatters(): Record<string, (value: number) => string> {
    const lang = useCurrentLanguage();

    const plain = new Intl.NumberFormat(lang, {}).format;
    const signed = new Intl.NumberFormat(lang, { signDisplay: 'always' })
        .format;
    const signedNonZero = new Intl.NumberFormat(lang, {
        signDisplay: 'exceptZero',
    }).format;

    return { plain, signed, signedNonZero };
}

export { useNumberFormatters };
