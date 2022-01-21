import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Character from '../../../@types/Character';
import { InputCell } from '../../helpers/InputCell';
import { borderless, borderThick, borderThin, printableBottomBorder, reverseColors, smallText } from '../../helpers/mixins';

const StyledTable = styled.table`
    & th, & td, & input {
        box-sizing: border-box;
        width: 11.0mm;
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
    }
    & thead th {
        ${smallText}
    }
`;
interface RowArgs {
    label: string,
    idSuffix: string,
    bab?: number,
    gear?: number,
    stat?: number,
    sizeMod?: number,
    misc?: number,
    temp?: number,
}
function Row({label, idSuffix, bab, gear, stat, sizeMod, misc, temp}: RowArgs): JSX.Element {
    const total = 
        (bab != null || gear != null || stat != null || sizeMod != null || misc != null || temp != null)
        ? (bab || 0) + (gear || 0) + (stat || 0) + (sizeMod || 0) + (misc || 0) + (temp || 0)
        : undefined;
    return (<tr>
        <th>{label}</th>
        <InputCell id={`txtTotal${idSuffix}`} value={total} hideZero={true}  />
        <InputCell id={`txtBab${idSuffix}`} value={bab} hideZero={true}  />
        <InputCell id={`txtGear${idSuffix}`} value={gear} hideZero={true} />
        <InputCell id={`txtStat${idSuffix}`} value={stat} hideZero={true} />
        <InputCell id={`txtSize${idSuffix}`} value={sizeMod} hideZero={true}  />
        <InputCell id={`txtMisc${idSuffix}`} value={misc} hideZero={true} />
        <InputCell id={`txtTemp${idSuffix}`} value={temp} hideZero={true} />
    </tr>);
}

export function Attacks({char}: {char?: Character}): JSX.Element {
    const { t } = useTranslation();
    const bab = char?.classBonuses.bab;
    const stats = char?.stats.totalMods;
    // TODO Add actual support for sizeMod gear, misc, temp modifiers
    return(<StyledTable>
        <thead>
            <tr>
                <th></th>
                <th>{t('ui.common.total')}</th>
                <th>{t('ui.attack.bab')}</th>
                <th>{t('ui.common.gear')}</th>
                <th>{t('ui.common.stat')}</th>
                <th>{t('ui.common.size')}</th>
                <th>{t('ui.common.misc')}</th>
                <th>{t('ui.common.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <Row label={t('ui.attack.melee')}
                idSuffix={'Melee'}
                bab={bab}
                gear={0}
                stat={stats?.STR}
                sizeMod={0}
                misc={0}
                temp={0} />
            <Row label={t('ui.attack.ranged')}
                idSuffix={'Ranged'}
                bab={bab}
                gear={0}
                stat={stats?.DEX}
                sizeMod={0}
                misc={0}
                temp={0} />
            <Row label={t('ui.attack.cmb')}
                idSuffix={'Cmb'}
                bab={bab}
                gear={0}
                stat={stats?.STR}
                sizeMod={0}
                misc={0}
                temp={0} />
        </tbody>
    </StyledTable>);
}