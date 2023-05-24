import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../../../types/Character';
import { FullArmorValues } from '../../../types/Character/ArmorValues';
import { InputCell, InputH } from '../../helpers/InputCell';
import {
    borderThin,
    reverseColors,
    smallText,
    borderless,
    colors,
    printableBottomBorder,
} from '../../helpers/mixins';

const StyledTable = styled.table`
    border-spacing: 0;
    & th,
    & td {
        padding: 0;
        ${borderless}
    }
    & th,
    & td,
    & input {
        box-sizing: border-box;
        width: 7.8mm;
        text-align: center;
        font-size: 10pt;
    }
    & thead th {
        ${smallText}
    }
    & tbody th {
        ${reverseColors}
    }
    & tbody th input {
        background: ${colors.white};
    }
    & tbody input {
        ${borderThin}
    }
    ${printableBottomBorder('& tbody input')}
`;

interface ArmorRowArgs {
    label: string;
    idPrefix: string;
    values?: FullArmorValues;
    skipPhysical?: boolean;
    skipEvasive?: boolean;
}

const EmptyTd = (): React.JSX.Element => <td></td>;

function ArmorRow({
    label,
    idPrefix,
    values,
    skipPhysical = false,
    skipEvasive = false,
}: ArmorRowArgs): React.JSX.Element {
    return (
        <tr>
            <th>{label}</th>
            <InputH id={`txt${idPrefix}Total`} value={values?.total} />
            <td>=10+</td>
            {skipPhysical ? (
                <EmptyTd />
            ) : (
                <InputCell id={`txt${idPrefix}Armor`} value={values?.armor} />
            )}
            {skipPhysical ? (
                <EmptyTd />
            ) : (
                <InputCell id={`txt${idPrefix}Shield`} value={values?.shield} />
            )}
            {skipEvasive ? (
                <EmptyTd />
            ) : (
                <InputCell id={`txt${idPrefix}Dex`} value={values?.dex} />
            )}
            <InputCell id={`txt${idPrefix}Size`} value={values?.size} />
            {skipEvasive ? (
                <EmptyTd />
            ) : (
                <InputCell
                    id={`txt${idPrefix}Dodge`}
                    value={values?.dodge}
                    hideZero={true}
                />
            )}
            {skipPhysical ? (
                <EmptyTd />
            ) : (
                <InputCell
                    id={`txt${idPrefix}Natural`}
                    value={values?.nat}
                    hideZero={true}
                />
            )}
            <InputCell
                id={`txt${idPrefix}Deflect`}
                value={values?.defl}
                hideZero={true}
            />
            <InputCell
                id={`txt${idPrefix}Misc`}
                value={values?.miscAll}
                hideZero={true}
            />
            <InputCell
                id={`txt${idPrefix}Temp`}
                value={values?.tempAll}
                hideZero={true}
            />
        </tr>
    );
}

export function Defenses({ char }: { char?: Character }): React.JSX.Element {
    const { t } = useTranslation();
    const armor = char?.armor;
    return (
        <StyledTable id="tblArmor">
            <thead>
                <tr>
                    <th></th>
                    <th>{t('charsheet.armor.total')}</th>
                    <th></th>
                    <th>{t('charsheet.armor.armor')}</th>
                    <th>{t('charsheet.armor.shield')}</th>
                    <th>{t('stats.abbr.DEX')}</th>
                    <th>{t('charsheet.common.size')}</th>
                    <th>{t('charsheet.armor.dodge')}</th>
                    <th>{t('charsheet.armor.nat')}</th>
                    <th>{t('charsheet.armor.defl')}</th>
                    <th>{t('charsheet.armor.misc')}</th>
                    <th>{t('charsheet.armor.temp')}</th>
                </tr>
            </thead>
            <tbody>
                <ArmorRow
                    label={t('charsheet.armor.AC')}
                    idPrefix="AcFull"
                    values={armor}
                />
                <ArmorRow
                    label={t('charsheet.armor.touch')}
                    idPrefix="AcTouch"
                    values={armor?.touch}
                    skipPhysical={true}
                />
                <ArmorRow
                    label={t('charsheet.armor.flatf')}
                    idPrefix="AcFlat"
                    values={armor?.flatFooted}
                    skipEvasive={true}
                />
            </tbody>
            <thead>
                <tr>
                    <th></th>
                    <th>{t('charsheet.armor.total')}</th>
                    <th></th>
                    <th>{t('charsheet.attack.bab')}</th>
                    <th>{t('stats.abbr.STR')}</th>
                    <th>{t('stats.abbr.DEX')}</th>
                    <th>{t('charsheet.common.size')}</th>
                    <th>{t('charsheet.armor.dodge')}</th>
                    <th></th>
                    <th>{t('charsheet.armor.defl')}</th>
                    <th>{t('charsheet.armor.misc')}</th>
                    <th>{t('charsheet.armor.temp')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{t('charsheet.armor.cmd')}</th>
                    <InputH id="txtCmdTotal" value={armor?.cmd} />
                    <td>=10+</td>
                    <InputCell id="txtCmdBab" value={armor?.bab} />
                    <InputCell id="txtCmdStr" value={armor?.str} />
                    <InputCell id="txtCmdDex" value={armor?.dex} />
                    <InputCell id="txtCmdSize" value={armor?.size} />
                    <InputCell
                        id="txtCmdDodge"
                        value={armor?.dodge}
                        hideZero={true}
                    />
                    <td></td>
                    <InputCell
                        id="txtCmdDeflect"
                        value={armor?.defl}
                        hideZero={true}
                    />
                    <InputCell
                        id="txtCmdMisc"
                        value={(armor?.misc || 0) + (armor?.miscE || 0)}
                        hideZero={true}
                    />
                    <InputCell
                        id="txtCmdTemp"
                        value={(armor?.temp || 0) + (armor?.tempE || 0)}
                        hideZero={true}
                    />
                </tr>
            </tbody>
        </StyledTable>
    );
}
