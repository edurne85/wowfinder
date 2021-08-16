import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Character from "../../../@types/Character";
import { FullArmorValues } from "../../../@types/Character/ArmorValues";
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

function TdInput({id, value}: {id: string, value: number|string}) {
    return (<td><input id={id} readOnly={true} value={value || ''} /></td>);
}

function ThInput({id, value}: {id: string, value: number|string}) {
    return (<th><input id={id} readOnly={true} value={value} /></th>);
}

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
        <ThInput id={`txt${idPrefix}Total`} value={values.total} />
        <td>=10+</td>
        {skipPhysical ? <EmptyTd /> : <TdInput id={`txt${idPrefix}Armor`} value={values.armor} />}
        {skipPhysical ? <EmptyTd /> : <TdInput id={`txt${idPrefix}Shield`} value={values.shield} />}
        {skipEvasive ? <EmptyTd /> : <TdInput id={`txt${idPrefix}Dex`} value={values.dex} />}
        <TdInput id={`txt${idPrefix}Size`} value={values.size} />
        {skipEvasive ? <EmptyTd /> : <TdInput id={`txt${idPrefix}Dodge`} value={values.dodge} />}
        {skipPhysical ? <EmptyTd /> : <TdInput id={`txt${idPrefix}Natural`} value={values.nat} />}
        <TdInput id={`txt${idPrefix}Deflect`} value={values.defl} />
        <TdInput id={`txt${idPrefix}Misc`} value={values.miscAll} />
        <TdInput id={`txt${idPrefix}Temp`} value={values.tempAll} />
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
                <th>{t('ui.charsheet.h.armor.total')}</th>
                <th></th>
                <th>{t('ui.charsheet.h.armor.armor')}</th>
                <th>{t('ui.charsheet.h.armor.shield')}</th>
                <th>{t('stats.abbr.DEX')}</th>
                <th>{t('ui.charsheet.h.armor.size')}</th>
                <th>{t('ui.charsheet.h.armor.dodge')}</th>
                <th>{t('ui.charsheet.h.armor.nat')}</th>
                <th>{t('ui.charsheet.h.armor.defl')}</th>
                <th>{t('ui.charsheet.h.armor.misc')}</th>
                <th>{t('ui.charsheet.h.armor.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <ArmorRow
                label={t('ui.charsheet.h.armor.AC')}
                idPrefix="AcFull"
                values={armor} />
            <ArmorRow
                label={t('ui.charsheet.h.armor.touch')}
                idPrefix="AcTouch"
                values={armor.touch}
                skipPhysical={true} />
            <ArmorRow
                label={t('ui.charsheet.h.armor.flatf')}
                idPrefix="AcFlat"
                values={armor.flatFooted}
                skipEvasive={true} />
        </tbody>
        <thead>
            <tr>
                <th></th>
                <th>{t('ui.charsheet.h.armor.total')}</th>
                <th></th>
                <th>{t('ui.charsheet.h.attack.bab')}</th>
                <th>{t('stats.abbr.STR')}</th>
                <th>{t('stats.abbr.DEX')}</th>
                <th>{t('ui.charsheet.h.armor.size')}</th>
                <th>{t('ui.charsheet.h.armor.dodge')}</th>
                <th></th>
                <th>{t('ui.charsheet.h.armor.defl')}</th>
                <th>{t('ui.charsheet.h.armor.misc')}</th>
                <th>{t('ui.charsheet.h.armor.temp')}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>{t('ui.charsheet.h.armor.cmd')}</th>
                <TdInput id="txtCmdTotal" value={armor.cmd} />
                <td>=10+</td>
                <TdInput id="txtCmdBab" value={armor.bab} />
                <TdInput id="txtCmdStr" value={armor.str} />
                <TdInput id="txtCmdDex" value={armor.dex} />
                <TdInput id="txtCmdSize" value={armor.size} />
                <TdInput id="txtCmdDodge" value={armor.dodge} />
                <td></td>
                <TdInput id="txtCmdDeflect" value={armor.defl} />
                <TdInput id="txtCmdMisc" value={armor.misc + armor.miscE} />
                <TdInput id="txtCmdTemp" value={armor.temp + armor.tempE} />
            </tr>
        </tbody>
    </StyledTable>);
}