import { styled } from 'styled-components';

const defaultTableBorderColor = '#ddd';
const defaultTableBorder = `1px solid ${defaultTableBorderColor}`;
const outerTableBorderColor = '#777';

const outerBorder = (side: 'top' | 'bottom' | 'left' | 'right'): string => {
    return `border-${side}-color: ${outerTableBorderColor};`;
};

const StyledMarkdownContainer = styled.div`
    table {
        border-collapse: collapse;
        td,
        th {
            padding: 0.2em 0.4em;
            text-align: left;
            border: ${defaultTableBorder};
            &:first-child {
                ${outerBorder('left')}
            }
            &:last-child {
                ${outerBorder('right')}
            }
        }
        thead > tr:first-child {
            td,
            th {
                ${outerBorder('top')}
            }
        }
        tbody > tr:last-child,
        thead > tr:last-child {
            td,
            th {
                ${outerBorder('bottom')}
            }
        }
        th {
            font-weight: bold;
        }
    }
`;

export { StyledMarkdownContainer };
