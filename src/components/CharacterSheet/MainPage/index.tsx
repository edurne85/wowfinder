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

const LogoImg = styled.img`
    display: inline-block;
    flex: auto;
    height: auto;
    width: 65mm;
`;

const Logo: React.FC<{src: string}> = ({src}) => (<LogoImg src={src} width={481} height={178} alt='' />);

export function MainPage({char}: {char: Character}) {
    const { t } = useTranslation();
    const bonuses = char.classBonuses;
    return (<Page key="Main" id="Main">
        <div />
        {/* <Logo src='static/charsheet-logo.png' /> */ }
        <PersonalBlock char={char} />
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
                    {/* TODO Speed */}
                    <Header>{t('ui.charsheet.h.armor')}</Header>
                    <div></div>
                    {/* TODO Armor */}
                    <Header>{t('ui.charsheet.h.saves')}</Header>
                    <div></div>
                    {/* TODO Saves */}
                    <Header>{t('ui.charsheet.h.resist')}</Header>
                    <div></div>
                    {/* TODO Resist */}
                    <Header>{t('ui.charsheet.h.attack')}</Header>
                    <div></div>
                    {/* TODO Attack */}
                </>),
            },
            {
                key: 'MainRight',
                id: 'MainRight',
                children: (<>
                    <Header>{t('ui.charsheet.h.classes')}</Header>
                    <div></div>
                    {/* TODO Classes */}
                </>),
            },
        ]} />
    </Page>);
}