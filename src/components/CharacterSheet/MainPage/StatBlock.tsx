import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
    Stats,
    StatKeys,
    StatSet,
    statMod,
} from '../../../types/Character/Stats';
import {
    borderless,
    borderThick,
    borderThin,
    reverseColors,
    smallText,
} from '../../helpers/styles';

interface StatRowBuilder {
    key: string;
    id: string;
    total?: number;
    mod?: number;
    base?: number;
    enhance?: number;
    gear?: number;
    misc?: number;
    temp?: number;
}

const commonStyles = `
    width: 11.5mm;
    text-align: center;
`;
const commonTStyles = `
    ${commonStyles}
    padding: 0;
`;

const StyledThTop = styled.th`
    ${commonTStyles}
    ${smallText}
    ${borderless}
`;

const StyledThBody = styled.th`
    ${commonTStyles}
    ${borderless}
    ${reverseColors}
`;

const StyledTd = styled.td`
    ${commonTStyles}
    ${smallText}
    ${borderThick}
    @media print {
        ${borderThin}
    }
    & > input {
        ${commonStyles}
        ${borderless}
    }
`;

const StyledTable = styled.table`
    border-spacing: 0;
`;

function StatHead(): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <tr id="trStatsTitles">
            <StyledThTop></StyledThTop>
            <StyledThTop>{t('charsheet.common.total')}</StyledThTop>
            <StyledThTop>{t('charsheet.common.mod')}</StyledThTop>
            <StyledThTop>{t('charsheet.common.base')}</StyledThTop>
            <StyledThTop>{t('charsheet.common.enhancement')}</StyledThTop>
            <StyledThTop>{t('charsheet.common.gear')}</StyledThTop>
            <StyledThTop>{t('charsheet.common.misc')}</StyledThTop>
            <StyledThTop>{t('charsheet.common.temp')}</StyledThTop>
        </tr>
    );
}

function StatRow({
    id,
    total,
    mod,
    base,
    enhance,
    gear,
    misc,
    temp,
}: StatRowBuilder): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <tr id={`tr${id}`}>
            <StyledThBody>{t(`stats.abbr.${id}`)}</StyledThBody>
            <StyledTd>
                <input id={`txtTotal${id}`} value={total} readOnly={true} />
            </StyledTd>
            <StyledTd>
                <input id={`txtMod${id}`} value={mod} readOnly={true} />
            </StyledTd>
            <StyledTd>
                <input id={`txtBase${id}`} value={base} readOnly={true} />
            </StyledTd>
            <StyledTd>
                <input
                    id={`txtEnhance${id}`}
                    value={enhance || ''}
                    readOnly={true}
                />
            </StyledTd>
            <StyledTd>
                <input id={`txtGear${id}`} value={gear || ''} readOnly={true} />
            </StyledTd>
            <StyledTd>
                <input id={`txtMisc${id}`} value={misc || ''} readOnly={true} />
            </StyledTd>
            <StyledTd>
                <input id={`txtTemp${id}`} value={temp || ''} readOnly={true} />
            </StyledTd>
        </tr>
    );
}

function StatBlock({ stats }: { stats?: Stats }): React.JSX.Element {
    return (
        <StyledTable id="tblStats">
            <thead>
                <StatHead />
            </thead>
            <tbody>
                {StatKeys.map(key => (
                    <StatRow
                        key={key}
                        id={key}
                        total={stats?.totals[key]}
                        mod={stats?.totalMods[key]}
                        base={stats?.base[key]}
                        enhance={stats?.enhance[key]}
                        gear={stats?.gear[key]}
                        misc={stats?.misc[key]}
                        temp={stats?.temp[key]}
                    />
                ))}
            </tbody>
        </StyledTable>
    );
}

interface SimpleStatRowBuilder {
    key: string;
    id: string;
    value: number;
    mod: number;
}

function SimpleStatRow({
    id,
    value,
    mod,
}: SimpleStatRowBuilder): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <tr id={`tr${id}`}>
            <StyledThBody>{t(`stats.abbr.${id}`)}</StyledThBody>
            <StyledTd>
                <input id={`txtValue${id}`} value={value} readOnly={true} />
            </StyledTd>
            <StyledTd>
                <input id={`txtMod${id}`} value={mod} readOnly={true} />
            </StyledTd>
        </tr>
    );
}

function SimpleStatBlock({ stats }: { stats: StatSet }): React.JSX.Element {
    return (
        <StyledTable id="tblStats">
            <tbody>
                {StatKeys.map(key => (
                    <SimpleStatRow
                        key={key}
                        id={key}
                        value={stats[key]}
                        mod={statMod(stats[key])}
                    />
                ))}
            </tbody>
        </StyledTable>
    );
}

export { StatBlock, SimpleStatBlock };
