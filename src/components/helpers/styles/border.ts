import { colors } from './colors';

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

export {
    borderThin,
    borderThick,
    borderless,
    bottomLine,
    printableBottomBorder,
};
