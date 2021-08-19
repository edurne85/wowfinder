import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { borderless, smallText } from "../../helpers/mixins";
import { HitPointProps } from "../base";

const StyledTable = styled.table`
    margin-top: 5mm;
    border-spacing: 0;
    & td, & th, & input {
        box-sizing: border-box;
        width: 15.5mm;
        text-align: center;
    }
	& td {
		border: 0.2mm #000 solid;
	}
	& td.separator, & th:empty {
		${borderless};
		width: 3.5mm;
	}
	& th {
		${smallText};
	}
    & input {
        ${borderless};
    }
`;

const HitPoints: React.FC<HitPointProps> = ({bonuses, misc, current}) => {
    const { t } = useTranslation();
    const base = bonuses.hp;
    const total = base + misc;
    const curr = (typeof(current) === 'undefined' ? total : current);
    return(<StyledTable id="tblHp">
        <tbody>
            <tr>
                <th>{t('ui.hitpoints.curr')}</th>
                <th></th>
                <th>{t('ui.hitpoints.total')}</th>
                <th></th>
                <th>{t('ui.hitpoints.base')}</th>
                <th></th>
                <th>{t('ui.hitpoints.misc')}</th>
                <th></th>
                <th>{t('ui.hitpoints.temp')}</th>
            </tr>
            <tr>
                <td><input id="txtHpCurrent" defaultValue={curr} /></td>
                <td className="separator">/</td>
                <td><input id="txtHpTotal" defaultValue={total} /></td>
                <td className="separator">=</td>
                <td><input id="txtHpBase" defaultValue={base} /></td>
                <td className="separator">+</td>
                <td><input id="txtHpMisc" defaultValue={misc} /></td>
                <td className="separator">+</td>
                <td><input id="txtHpTemp" /></td>
            </tr>
        </tbody>
    </StyledTable>);
};

export {
    HitPoints,
}