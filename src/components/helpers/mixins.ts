import { debug } from '../../utils';

const colors = {
    transparent: 'transparent',
    white: '#fff',
    gray6: '#666',
    gray3: '#333',
    black: '#000',
    link: '#00f',
    linkBackground: '#ccf',
};
Object.freeze(colors);

const reverseColors = `
        color: ${colors.white};
        background-color: ${colors.black};
`;

const linkColors = `
        color: ${colors.link};
        background-color: ${colors.linkBackground};
`;

const screenZoomDefault = 1.6;

function screenZoom(factor = screenZoomDefault, minWidth?: number): string {
    const widthCondition = minWidth ? `and (min-width: ${minWidth}px)` : '';
    return `@media screen ${widthCondition} {
            zoom: ${factor};
        }`;
}

const mainColor = `
    color: ${colors.black};
    background: ${colors.white};
`;

const fontSize = (pt: number): string => `
    font-size: ${pt}pt;
`;
const smallText = fontSize(8.5);

const border = (mm: number, color: string, type = 'solid'): string => `
    border: ${mm}mm ${color} ${type};
`;

const borderThin = border(0.1, colors.gray6);

const borderThick = border(0.3, colors.black);

const borderless = border(0, colors.transparent, 'none');

const bottomLine = `border-bottom: 1px ${colors.gray3} solid;`;

const printableBottomBorder = (selector: string): string => `
    @media print {
        ${selector} {
            ${borderless}
            ${bottomLine}
        }
    }
`;

interface DebugOutlineArgs {
    selector?: string;
    width?: string;
    style?: string;
    color?: string;
}
const debugOutline = ({
    selector = '&',
    width = '1px',
    style = 'dashed',
    color = '#ccc',
}: DebugOutlineArgs): string =>
    debug
        ? `@media screen {
        ${selector} {
            outline: ${width} ${style} ${color};
        }
    }`
        : '';

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

const scrollable = 'overflow: auto;';

export {
    colors,
    reverseColors,
    linkColors,
    screenZoom,
    mainColor,
    smallText,
    borderThin,
    borderThick,
    borderless,
    bottomLine,
    printableBottomBorder,
    debugOutline,
    font,
    FontFamily,
    baseFont,
    scrollable,
};
