import { useTranslation } from 'react-i18next';
import { Character } from '../../../types/Character';
import styled from 'styled-components';
import Page from '../../helpers/Page';
import { PersonalBlock } from './Personal';
import Columns from '../../helpers/Columns';
import { StatBlock } from './StatBlock';
import Header from '../../helpers/Header';
import { HitPoints } from './HitPoints';
import { Speed } from './Speed';
import { Defenses } from './Defenses';
import { Saves } from './Saves';
import { Resistances } from './Resistances';
import { Attacks } from './Attacks';
import Classes from './Classes';
import Traits from './Traits';

const LogoImg = styled.img`
    display: inline-block;
    flex: auto;
    height: auto;
    width: 65mm;
    aspect-ratio: auto 481 / 178;
`;

const logoSrc = window.Main.asset('charsheet-logo.png');

export function MainPage({char, xp, visible = true}: {char?: Character, xp: number, visible?: boolean}): JSX.Element {
    const { t } = useTranslation();
    const bonuses = char?.classBonuses;
    return (<Page key="Main" id="Main" visible={visible}>
        <div />
        <LogoImg src={logoSrc} width={245} height={90} alt='' />
        <PersonalBlock char={char} xp={xp} />
        <Columns columns={[
            {
                key: 'MainLeft',
                id: 'MainLeft',
                children: (<>
                    <StatBlock stats={char?.stats} />
                    <Header>{t('charsheet.speed.h')}</Header>
                    <Speed speeds={char?.speed} />
                    <Header>{t('charsheet.armor.h')}</Header>
                    <Defenses char={char} />
                    <Header>{t('charsheet.saves.h')}</Header>
                    <Saves char={char} />
                    <Header>{t('charsheet.resist.h')}</Header>
                    <Resistances char={char} />
                    <Header>{t('charsheet.attack.h')}</Header>
                    <Attacks char={char} />
                </>),
            },
            {
                key: 'MainRight',
                id: 'MainRight',
                children: (<>
                    <Header>{t('charsheet.classes.h')}</Header>
                    <Classes char={char} />
                    <Header>{t('charsheet.hitpoints.h')}</Header>
                    { /* TODO: extra (misc) HP */}
                    <HitPoints bonuses={bonuses} misc={char?.miscHP} />
                    <Header>{t('charsheet.traits.h')}</Header>
                    <Traits char={char} />
                </>),
            },
        ]} />
    </Page>);
}