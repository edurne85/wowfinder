import { debug } from '../../../utils';

const fontSize = (pt: number): string => `
    font-size: ${pt}pt;
`;
const smallText = fontSize(8.5);

const FontFamily = {
    priori: [
        debug ? '' : 'Priori Serif OT',
        'Quattrocento',
        'Sinistre S† Caroline',
        'Medieval Sharp',
        debug ? 'Priori Serif OT' : '',
        'serif',
    ],
} as const;

type FontFamily = (typeof FontFamily)[keyof typeof FontFamily];

interface fontArgs {
    family?: FontFamily;
    size?: number; // pt units
}

function asArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

const font = ({ family, size }: fontArgs): string => {
    const props: string[] = [];
    if (family) {
        props.push(
            `font-family: ${asArray(family)
                .filter(f => f)
                .map(f => (/[-a-zA-Z0-9]+/.test(`${f}`) ? f : `"${f}"`))
                .join(', ')};`,
        );
    }
    if (size) {
        props.push(`font-size: ${size}pt;`);
    }
    return props.join('\n');
};

const baseFont = font({
    family: FontFamily.priori,
    size: 11,
});

export { smallText, font, FontFamily, baseFont };
