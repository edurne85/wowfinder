import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Size from '../../../types/Character/Size';
import { CastingMode, computeRange, StandardRange } from '../../../types/Magic';

const RangeContainer = styled.table`
    & th {
        width: 12mm;
        text-align: left;
    }
    & td {
        width: 30mm;
        text-align: right;
    }
`;

function rangeFormatted(range: StandardRange, efl: number): string {
    return efl > 0 ? computeRange(range, Size.medium, efl).fullDisplay : '';
}
export function SpellRange({
    efl = 0,
    mode,
}: {
    efl: number;
    mode: CastingMode;
}): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <RangeContainer>
            <tbody>
                <tr>
                    <th className="h" colSpan={2}>
                        {t('charsheet.magic.range')} (
                        {t(`magic.modes.abbr.${mode}`)})
                    </th>
                </tr>
                <tr>
                    <th>{t('magic.range.close')}</th>
                    <td>{rangeFormatted(StandardRange.close, efl)}</td>
                </tr>
                <tr>
                    <th>{t('magic.range.medium')}</th>
                    <td>{rangeFormatted(StandardRange.medium, efl)}</td>
                </tr>
                <tr>
                    <th>{t('magic.range.long')}</th>
                    <td>{rangeFormatted(StandardRange.long, efl)}</td>
                </tr>
            </tbody>
        </RangeContainer>
    );
}
