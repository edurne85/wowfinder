import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Stats, { StatKeys } from "../../../@types/Character/Stats";
import { borderless, borderThick, reverseColors, smallText } from "../../helpers/mixins";

interface StatRowBuilder {
    key: string;
    id: string;
    total: number;
    mod: number;
    base: number;
    enhance: number;
    gear: number;
    misc: number;
    temp: number;
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
    & > input {
        ${commonStyles}
        ${borderless}
    }
`;

const StyledTable = styled.table`
    border-spacing: 0;
`;

function StatHead() {
    const { t } = useTranslation();
    return (<tr id="trStatsTitles">
        <StyledThTop></StyledThTop>
        <StyledThTop>{t('ui.common.total')}</StyledThTop>
        <StyledThTop>{t('ui.common.mod')}</StyledThTop>
        <StyledThTop>{t('ui.common.base')}</StyledThTop>
        <StyledThTop>{t('ui.common.enhance')}</StyledThTop>
        <StyledThTop>{t('ui.common.gear')}</StyledThTop>
        <StyledThTop>{t('ui.common.misc')}</StyledThTop>
        <StyledThTop>{t('ui.common.temp')}</StyledThTop>
    </tr>);
}

function StatRow({id, total, mod, base, enhance, gear, misc, temp}: StatRowBuilder) {
    const { t } = useTranslation();
    return (<tr id={`tr${id}`}>
        <StyledThBody>{t(`stats.abbr.${id}`)}</StyledThBody>
        <StyledTd><input id={`txtTotal${id}`} value={total} readOnly={true} /></StyledTd>
        <StyledTd><input id={`txtMod${id}`} value={mod} readOnly={true} /></StyledTd>
        <StyledTd><input id={`txtBase${id}`} value={base} readOnly={true} /></StyledTd>
        <StyledTd><input id={`txtEnhance${id}`} value={enhance || ''} readOnly={true} /></StyledTd>
        <StyledTd><input id={`txtGear${id}`} value={gear || ''} readOnly={true} /></StyledTd>
        <StyledTd><input id={`txtMisc${id}`} value={misc || ''} readOnly={true} /></StyledTd>
        <StyledTd><input id={`txtTemp${id}`} value={temp || ''} readOnly={true} /></StyledTd>
    </tr>);
}

export function StatBlock({stats}: {stats: Stats}) {
    const {totals, totalMods, base, enhance, gear, misc, temp} = stats;
    return (<StyledTable id="tblStats">
        <thead>
            <StatHead />
        </thead>
        <tbody>
            {StatKeys.map(key => <StatRow
                key={key}
                id={key}
                total={totals[key]}
                mod={totalMods[key]}
                base={base[key]}
                enhance={enhance[key]}
                gear={gear[key]}
                misc={misc[key]}
                temp={temp[key]}
            />)}
        </tbody>
    </StyledTable>);
}