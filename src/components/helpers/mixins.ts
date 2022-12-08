import { debug } from '../../utils';

const colors = {
    transparent: 'transparent',
    white: '#fff',
    gray6: '#666',
    gray3: '#333',
    black: '#000',
};
Object.freeze(colors);

const reverseColors = `
        color: ${colors.white};
        background-color: ${colors.black};
`;

const screenZoomDefault = 1.6;
const screenZoomMinWidthDefault = 900;

const screenZoom = (factor = screenZoomDefault, minWidth = screenZoomMinWidthDefault): string => `
    @media screen and (min-width: ${minWidth}px) {
        zoom: ${factor};
    }
`;

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
    width?: string,
    style?: string,
    color?: string,
}
const debugOutline = ({
    selector = '&',
    width = '1px',
    style = 'dashed',
    color = '#ccc',
}: DebugOutlineArgs): string => (
    debug ? `@media screen {
        ${selector} {
            outline: ${width} ${style} ${color};
        }
    }`: '');

enum FontFamily {
    priori = 'Priori Serif OT',
}

interface fontArgs {
    family?: FontFamily;
    size?: number; // pt units
}

const font = ({family, size}: fontArgs): string => {
    const props: string[] = [];
    if (family)  {
        props.push(`font-family: "${family}";`);
    }
    if (size) {
        props.push(`font-size: ${size}pt;`);
    }
    return props.join('\n');
};

const baseFont = font({
    family: FontFamily.priori,
    size: 12,
});

const scrollable = 'overflow: auto;';


export {
    colors,
    reverseColors,
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
