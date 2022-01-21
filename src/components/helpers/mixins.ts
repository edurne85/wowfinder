const colors = {
    transparent: 'transparent',
    white: '#fff',
    gray6: '#666',
    gray3: '#333',
    black: '#000',
};
Object.freeze(colors);

function screenColors(fg = colors.black, bg = colors.white): string {
    return `@media screen {
        color: ${fg};
        background-color: ${bg};
    }`;
}

const reverseColors = screenColors(colors.white, colors.black);

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

export {
    colors,
    screenColors,
    reverseColors,
    screenZoom,
    mainColor,
    smallText,
    borderThin,
    borderThick,
    borderless,
    bottomLine,
    printableBottomBorder,
    font,
    FontFamily,
    baseFont,
};