import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
    borderless,
    printableBottomBorder,
    smallText,
} from '../../helpers/styles';
import { Character } from '../../../types/Character';

const StyledTable = styled.table`
    margin-top: 5mm;
    border-spacing: 0;
    & td,
    & th,
    & input {
        box-sizing: border-box;
        width: 15.5mm;
        text-align: center;
    }
    & td {
        border: 0.2mm #000 solid;
    }
    ${printableBottomBorder('& td')}
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

const Initiative = ({ char }: { char?: Character }): React.JSX.Element => {
    const { t } = useTranslation();
    const dex = char?.stats?.totalMods?.DEX || 0;
    const total = dex;
    return (
        <StyledTable id="tblHp">
            <tbody>
                <tr>
                    <th>{t('charsheet.initiative.total')}</th>
                    <th></th>
                    <th>{t('stats.abbr.DEX')}</th>
                    <th></th>
                    <th>{t('charsheet.initiative.misc')}</th>
                    <th></th>
                    <th>{t('charsheet.initiative.temp')}</th>
                </tr>
                <tr>
                    <td>
                        <input
                            id="txtInitiativeTotal"
                            defaultValue={char ? total : ''}
                        />
                    </td>
                    <td className="separator">=</td>
                    <td>
                        <input
                            id="txtInitiativeDex"
                            defaultValue={char ? dex : ''}
                        />
                    </td>
                    <td className="separator">+</td>
                    <td>
                        <input id="txtInitiativeMisc" />
                    </td>
                    <td className="separator">+</td>
                    <td>
                        <input id="txtInitiativeTemp" />
                    </td>
                </tr>
            </tbody>
        </StyledTable>
    );
};

export { Initiative };
