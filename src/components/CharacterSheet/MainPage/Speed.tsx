import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { borderThick, borderThin, reverseColors, smallText } from "../../helpers/mixins";

const StyledTable = styled.table`
    & th, & td, & input {
        width: 11.5mm;
        text-align: center;
    }
    & td {
        ${borderThin}
        text-align: left;
    }
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
        width: 8mm;
    }
    & .feet::after {
        content: "'";
    }
    & .meters::after {
        content: "m";
    }
    & .squares::after {
        content: "□";
    }
    & td[colspan="2"] {
        font-size: 10pt;
        select {
            width: 100%;
        }
    }
`;

