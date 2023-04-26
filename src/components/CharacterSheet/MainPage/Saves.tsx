import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../types/Character';
import { SaveBreakdown } from '../../../types/Character/Saves';
import { InputCell } from '../../helpers/InputCell';
import {
    borderless,
    smallText,
    reverseColors,
    borderThin,
    borderThick,
    printableBottomBorder,
} from '../../helpers/mixins';

const StyledTable = styled.table`
    border-spacing: 0;
    & th,
    & td {
        padding: 0;
    }
    & th,
    & td,
    & input {
        box-sizing: border-box;
        width: 11.5mm;
        text-align: center;
        font-size: 10pt;
        ${borderless}
    }
    & td {
        ${borderThin}
    }
    ${printableBottomBorder('& td')}
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

interface RowArgs {
    idSuffix: string;
    label: string;
    value?: SaveBreakdown;
}
function Row({ idSuffix, label, value }: RowArgs): JSX.Element {
    return (
        <tr id={`tr${idSuffix}`}>
            <th>{label}</th>
            <InputCell id={`txtTotal${idSuffix}`} value={value?.total} />
            <InputCell id={`txtStat${idSuffix}`} value={value?.stat} />
            <InputCell id={`txtBase${idSuffix}`} value={value?.base} />
            <InputCell
                id={`txtEnhance${idSuffix}`}
                value={value?.enhance}
                hideZero={true}
            />
            <InputCell
                id={`txtGear${idSuffix}`}
                value={value?.gear}
                hideZero={true}
            />
            <InputCell
                id={`txtMisc${idSuffix}`}
                value={value?.misc}
                hideZero={true}
            />
            <InputCell
                id={`txtTemp${idSuffix}`}
                value={value?.temp}
                hideZero={true}
            />
        </tr>
    );
}

export function Saves({ char }: { char?: Character }): JSX.Element {
    const { t } = useTranslation();
    return (
        <StyledTable>
            <thead>
                <tr id="trSavesTitles">
                    <th></th>
                    <th>{t('charsheet.common.total')}</th>
                    <th>{t('charsheet.common.stat')}</th>
                    <th>{t('charsheet.common.base')}</th>
                    <th>{t('charsheet.common.enhancement')}</th>
                    <th>{t('charsheet.common.gear')}</th>
                    <th>{t('charsheet.common.misc')}</th>
                    <th>{t('charsheet.common.temp')}</th>
                </tr>
            </thead>
            <tbody>
                <Row
                    idSuffix="Fort"
                    label={t('charsheet.saves.abbr.fort')}
                    value={char?.saves.fort}
                />
                <Row
                    idSuffix="Refl"
                    label={t('charsheet.saves.abbr.refl')}
                    value={char?.saves.refl}
                />
                <Row
                    idSuffix="Will"
                    label={t('charsheet.saves.abbr.will')}
                    value={char?.saves.will}
                />
            </tbody>
        </StyledTable>
    );
}
