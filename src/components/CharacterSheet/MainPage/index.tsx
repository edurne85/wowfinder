import { useTranslation } from "react-i18next";
import Character from '../../../@types/Character';
import styled from 'styled-components'
import Page from '../../helpers/Page';
import { PersonalBlock } from './Personal';
import Columns from '../../helpers/Columns';
import { StatBlock } from './StatBlock';
import Header from '../../helpers/Header';
import { HitPoints } from "./HitPoints";
import { Speed } from "./Speed";
import { Defenses } from "./Defenses";

const LogoImg = styled.img`
    display: inline-block;
    flex: auto;
    height: auto;
    width: 65mm;
`;

const logoSrc = window.Main.asset('charsheet-logo.png');

export function MainPage({char, xp}: {char: Character, xp: number}) {
    const { t } = useTranslation();
    const bonuses = char.classBonuses;
    return (<Page key="Main" id="Main">
        <div />
        <LogoImg src={logoSrc} width={481} height={178} alt='' />
        <PersonalBlock char={char} xp={xp} />
        <Columns columns={[
            {
                key: 'MainLeft',
                id: 'MainLeft',
                children: (<>
                    <StatBlock stats={char.stats} />
                    <Header>{t('ui.charsheet.h.hitpoints.h')}</Header>
                    { /* TODO: extra (misc) HP */}
                    <HitPoints bonuses={bonuses} misc={char.miscHP} />
                    <Header>{t('ui.charsheet.h.speed.h')}</Header>
                    <Speed speeds={char.speed} />
                    <Header>{t('ui.charsheet.h.armor.h')}</Header>
                    <Defenses char={char} />
                    <Header>{t('ui.charsheet.h.saves.h')}</Header>
                    <div></div>
                    {/* TODO Saves */}
                    <Header>{t('ui.charsheet.h.resist.h')}</Header>
                    <div></div>
                    {/* TODO Resist */}
                    <Header>{t('ui.charsheet.h.attack.h')}</Header>
                    <div></div>
                    {/* TODO Attack */}
                </>),
            },
            {
                key: 'MainRight',
                id: 'MainRight',
                children: (<>
                    <Header>{t('ui.charsheet.h.classes.h')}</Header>
                    <div></div>
                    {/* TODO Classes */}
                </>),
            },
        ]} />
    </Page>);
}