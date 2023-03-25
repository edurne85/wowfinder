import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../@types/Character';
import { ResistanceBreakdown } from '../../../@types/Character/Resistances';
import { capitalizeFirstLetter } from '../../../utils';
import { InputCell } from '../../helpers/InputCell';
import { borderless, borderThick, borderThin, printableBottomBorder, reverseColors, smallText } from '../../helpers/mixins';

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
    ${printableBottomBorder('& td')}
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
    id: string;
    value?: ResistanceBreakdown;
}
function Row({id, value}: RowArgs): JSX.Element {
    const { t } = useTranslation();
    const idSuffix = capitalizeFirstLetter(id);
    return(<tr id={`trResist${idSuffix}`}>
        <th title={t(`damageTypes.full.${id}`)}>{t(`damageTypes.abbr.${id}`)}</th>
        <InputCell id={`txtResistTotal${idSuffix}`} value={value?.total} />
        <InputCell id={`txtResistEnhance${idSuffix}`} value={value?.enhance} hideZero={true} />
        <InputCell id={`txtResistGear${idSuffix}`} value={value?.gear} hideZero={true} />
        <InputCell id={`txtResistMisc${idSuffix}`} value={value?.misc} hideZero={true} />
        <InputCell id={`txtResistTemp${idSuffix}`} value={value?.temp} hideZero={true} />
    </tr>);
}

export function Resistances({char}: {char?: Character}): JSX.Element {
    const { t } = useTranslation();
    const resists = char?.resistances;
    return (<StyledTable>
        <thead>
            <tr id="trResistTitles">
                <th></th>
                <th>{t('charsheet.common.total')}</th>
                <th>{t('charsheet.common.enhancement')}</th>
                <th>{t('charsheet.common.gear')}</th>
                <th>{t('charsheet.common.misc')}</th>
                <th>{t('charsheet.common.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <Row id="bludgeoning" value={resists?.bludgeoning} />
            <Row id="slashing" value={resists?.slashing} />
            <Row id="piercing" value={resists?.piercing} />
            <Row id="arcane" value={resists?.arcane} />
            <Row id="fire" value={resists?.fire} />
            <Row id="cold" value={resists?.cold} />
            <Row id="nature" value={resists?.nature} />
            <Row id="shadow" value={resists?.shadow} />
            <Row id="holy" value={resists?.holy} />
        </tbody>
    </StyledTable>);
}