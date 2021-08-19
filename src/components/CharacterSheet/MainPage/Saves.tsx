import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Character from "../../../@types/Character";
import { SaveBreakdown } from "../../../@types/Character/Saves";
import { borderless, smallText, reverseColors, colors, borderThin, borderThick } from "../../helpers/mixins";

const StyledTable = styled.table`
    border-spacing: 0;
    & th, & td {
        padding: 0;
    }
    & th, & td, & input {
        box-sizing: border-box;
        width: 11.5mm;
        text-align: center;
        font-size: 10pt;
        ${borderless}
    }
    & td {
        ${borderThin}
    }
    & td.thick {
        ${borderThick}
    }
    & thead th {
        ${smallText}
    }
    & tbody th {
        ${reverseColors}
    }
`;

function InputCell({id, value, hideZero = false}: {id: string, value: number, hideZero?: boolean}) {
    const val = value || (hideZero ? '' : 0);
    return (<td>
        <input id={id} value={val} readOnly={true} />
    </td>);
}

interface RowArgs {
    idSuffix: string;
    label: string;
    value: SaveBreakdown;
}
function Row({idSuffix, label, value}: RowArgs) {
    return (<tr id={`tr${idSuffix}`}>
        <th>{label}</th>
        <InputCell id={`txtTotal${idSuffix}`} value={value.total} />
        <InputCell id={`txtStat${idSuffix}`} value={value.stat} />
        <InputCell id={`txtBase${idSuffix}`} value={value.base} />
        <InputCell id={`txtEnhance${idSuffix}`} value={value.enhance} hideZero={true} />
        <InputCell id={`txtGear${idSuffix}`} value={value.gear} hideZero={true} />
        <InputCell id={`txtMisc${idSuffix}`} value={value.misc} hideZero={true} />
        <InputCell id={`txtTemp${idSuffix}`} value={value.temp} hideZero={true} />
    </tr>);
}

export function Saves({char}: {char: Character}) {
    const { t } = useTranslation();
    const { fort, refl, will } = char.saves;
    return (<StyledTable>
        <thead>
            <tr id="trSavesTitles">
                <th></th>
                <th>{t('ui.common.total')}</th>
                <th>{t('ui.common.stat')}</th>
                <th>{t('ui.common.base')}</th>
                <th>{t('ui.common.enhancement')}</th>
                <th>{t('ui.common.gear')}</th>
                <th>{t('ui.common.misc')}</th>
                <th>{t('ui.common.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <Row idSuffix="Fort" label="Fort" value={fort} />
            <Row idSuffix="Refl" label="Refl" value={refl} />
            <Row idSuffix="Will" label="Will" value={will} />
        </tbody>
    </StyledTable>);
}