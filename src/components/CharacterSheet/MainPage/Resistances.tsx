import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Character from "../../../@types/Character";
import { ResistanceBreakdown } from "../../../@types/Character/Resistances";
import { InputCell } from "../../helpers/InputCell";
import { borderless, borderThick, borderThin, reverseColors, smallText } from "../../helpers/mixins";

const StyledTable = styled.table`
    & th, & td, & input {
        box-sizing: border-box;
        width: 12.5mm;
        text-align: center;
        ${borderless}
    }
    & td {
        ${borderThin}
    }
    & td.thick {
        ${borderThick}
    }
    & tbody th {
        ${reverseColors}
        font-size: 9pt;
    }
    & thead th {
        ${smallText}
    }
`;

interface RowArgs {
    idSuffix: string;
    label: string;
    value: ResistanceBreakdown;
}
function Row({idSuffix, label, value}: RowArgs) {
    return(<tr id={`trResist${idSuffix}`}>
        <th>{label}</th>
        <InputCell id={`txtResistTotal${idSuffix}`} value={value.total} />
        <InputCell id={`txtResistEnhance${idSuffix}`} value={value.enhance} hideZero={true} />
        <InputCell id={`txtResistGear${idSuffix}`} value={value.gear} hideZero={true} />
        <InputCell id={`txtResistMisc${idSuffix}`} value={value.misc} hideZero={true} />
        <InputCell id={`txtResistTemp${idSuffix}`} value={value.temp} hideZero={true} />
    </tr>);
}

export function Resistances({char}: {char: Character}) {
    const { t } = useTranslation();
    const resists = char.resistances;
    return (<StyledTable>
        <thead>
            <tr id="trResistTitles">
                <th></th>
                <th>{t('ui.common.total')}</th>
                <th>{t('ui.common.enhancement')}</th>
                <th>{t('ui.common.gear')}</th>
                <th>{t('ui.common.misc')}</th>
                <th>{t('ui.common.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <Row idSuffix="Bludgeoning" label="Bludg" value={resists.bludgeoning} />
            <Row idSuffix="Slashing" label="Slash" value={resists.slashing} />
            <Row idSuffix="Piercing" label="Piercing" value={resists.piercing} />
            <Row idSuffix="Arcane" label="Arcane" value={resists.arcane} />
            <Row idSuffix="Fire" label="Fire" value={resists.fire} />
            <Row idSuffix="Cold" label="Cold" value={resists.cold} />
            <Row idSuffix="Nature" label="Nature" value={resists.nature} />
            <Row idSuffix="Shadow" label="Shadow" value={resists.shadow} />
            <Row idSuffix="Holy" label="Holy" value={resists.holy} />
        </tbody>
    </StyledTable>);
}