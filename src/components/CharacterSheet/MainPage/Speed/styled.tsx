import styled from 'styled-components';
import {
    borderless,
    borderThick,
    borderThin,
    printableBottomBorder,
    reverseColors,
    smallText,
} from '../../../helpers/mixins';

const StyledTable = styled.table`
    & th,
    & td,
    & input {
        width: 11.5mm;
        text-align: center;
    }
    & td {
        ${borderThin}
        text-align: left;
    }
    ${printableBottomBorder('& td')}
    & td.thick {
        ${borderThick}
    }
    & tbody th {
        ${reverseColors}
    }
    & thead th {
        ${smallText}
    }
    & input {
        width: 6mm;
        text-align: right;
        ${borderless};
    }
    & span.suffix {
        text-align: left;
    }
    & td[colspan='2'] {
        font-size: 10pt;
        select {
            width: 100%;
        }
        ${borderless}
    }
`;

export { StyledTable };
