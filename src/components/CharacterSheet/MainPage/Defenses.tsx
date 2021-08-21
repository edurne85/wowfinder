import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Character from "../../../@types/Character";
import { FullArmorValues } from "../../../@types/Character/ArmorValues";
import { InputCell, InputH } from "../../helpers/InputCell";
import { borderThin, reverseColors, smallText, borderless, colors } from "../../helpers/mixins";

const StyledTable = styled.table`
    border-spacing: 0;
    & th, & td {
        padding: 0;
        ${borderless}
    }
    & th, & td, & input {
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
`;

interface ArmorRowArgs {
    label: string,
    idPrefix: string,
    values: FullArmorValues,
    skipPhysical?: boolean,
    skipEvasive?: boolean,
}

const EmptyTd = () => (<td></td>);

function ArmorRow({
    label,
    idPrefix,
    values,
    skipPhysical = false,
    skipEvasive = false,
}: ArmorRowArgs) {
    return (<tr>
        <th>{label}</th>
        <InputH id={`txt${idPrefix}Total`} value={values.total} />
        <td>=10+</td>
        {skipPhysical ? <EmptyTd /> : <InputCell id={`txt${idPrefix}Armor`} value={values.armor} />}
        {skipPhysical ? <EmptyTd /> : <InputCell id={`txt${idPrefix}Shield`} value={values.shield} />}
        {skipEvasive ? <EmptyTd /> : <InputCell id={`txt${idPrefix}Dex`} value={values.dex} />}
        <InputCell id={`txt${idPrefix}Size`} value={values.size} />
        {skipEvasive ? <EmptyTd /> : <InputCell id={`txt${idPrefix}Dodge`} value={values.dodge} hideZero={true} />}
        {skipPhysical ? <EmptyTd /> : <InputCell id={`txt${idPrefix}Natural`} value={values.nat} hideZero={true} />}
        <InputCell id={`txt${idPrefix}Deflect`} value={values.defl} hideZero={true} />
        <InputCell id={`txt${idPrefix}Misc`} value={values.miscAll} hideZero={true} />
        <InputCell id={`txt${idPrefix}Temp`} value={values.tempAll} hideZero={true} />
    </tr>);
}

export function Defenses({char}: {char: Character})  {
    const { t } = useTranslation();
    const armor = char.armor;
    const statMods = char.stats.totalMods;
    return (<StyledTable id="tblArmor">
        <thead>
            <tr>
                <th></th>
                <th>{t('ui.armor.total')}</th>
                <th></th>
                <th>{t('ui.armor.armor')}</th>
                <th>{t('ui.armor.shield')}</th>
                <th>{t('stats.abbr.DEX')}</th>
                <th>{t('ui.common.size')}</th>
                <th>{t('ui.armor.dodge')}</th>
                <th>{t('ui.armor.nat')}</th>
                <th>{t('ui.armor.defl')}</th>
                <th>{t('ui.armor.misc')}</th>
                <th>{t('ui.armor.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <ArmorRow
                label={t('ui.armor.AC')}
                idPrefix="AcFull"
                values={armor} />
            <ArmorRow
                label={t('ui.armor.touch')}
                idPrefix="AcTouch"
                values={armor.touch}
                skipPhysical={true} />
            <ArmorRow
                label={t('ui.armor.flatf')}
                idPrefix="AcFlat"
                values={armor.flatFooted}
                skipEvasive={true} />
        </tbody>
        <thead>
            <tr>
                <th></th>
                <th>{t('ui.armor.total')}</th>
                <th></th>
                <th>{t('ui.attack.bab')}</th>
                <th>{t('stats.abbr.STR')}</th>
                <th>{t('stats.abbr.DEX')}</th>
                <th>{t('ui.common.size')}</th>
                <th>{t('ui.armor.dodge')}</th>
                <th></th>
                <th>{t('ui.armor.defl')}</th>
                <th>{t('ui.armor.misc')}</th>
                <th>{t('ui.armor.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>{t('ui.armor.cmd')}</th>
                <InputH id="txtCmdTotal" value={armor.cmd} />
                <td>=10+</td>
                <InputCell id="txtCmdBab" value={armor.bab} />
                <InputCell id="txtCmdStr" value={armor.str} />
                <InputCell id="txtCmdDex" value={armor.dex} />
                <InputCell id="txtCmdSize" value={armor.size} />
                <InputCell id="txtCmdDodge" value={armor.dodge} hideZero={true} />
                <td></td>
                <InputCell id="txtCmdDeflect" value={armor.defl} hideZero={true} />
                <InputCell id="txtCmdMisc" value={armor.misc + armor.miscE} hideZero={true} />
                <InputCell id="txtCmdTemp" value={armor.temp + armor.tempE} hideZero={true} />
            </tr>
        </tbody>
    </StyledTable>);
}