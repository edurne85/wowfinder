import { Character } from '../../../types/Character';
import { BearForm } from '../../../types/Transformation';
import Columns from '../../helpers/Columns';
import { StatBlock } from '../MainPage/StatBlock';
import { useTranslation } from 'react-i18next';
import { Defenses } from '../MainPage/Defenses';
import { HitPoints } from '../MainPage/HitPoints';
import Header from '../../helpers/Header';
import { ShapeshiftViewContainer, useTrasformation } from './base';
import { Initiative } from '../MainPage/Initiative';

function BearFormView({ char }: { char: Character }): JSX.Element {
    const { t } = useTranslation();
    const bearRank = char.classFeaturesCondensed.count('bearForm');
    useTrasformation(char, new BearForm({ rank: bearRank }));
    const classBonuses = char.classBonuses;
    return (
        <ShapeshiftViewContainer title={t('charsheet.shapeshift.bear')}>
            <Columns
                columns={[
                    {
                        key: 'BearStats',
                        id: 'BearStats',
                        children: (
                            <>
                                <StatBlock stats={char.stats} />
                                <Header>{t('charsheet.initiative.h')}</Header>
                                <Initiative char={char} />
                            </>
                        ),
                    },
                    {
                        key: 'BearDefenses',
                        id: 'BearDefenses',
                        children: (
                            <>
                                <Header>{t('charsheet.hitpoints.h')}</Header>
                                <HitPoints
                                    bonuses={classBonuses}
                                    misc={char?.miscHP}
                                />
                                <Header>{t('charsheet.armor.h')}</Header>
                                <Defenses char={char} />
                            </>
                        ),
                    },
                ]}
            />
            <Columns
                columns={[
                    {
                        key: 'BearAttacks',
                        id: 'BearAttacks',
                        children: <></>,
                    },
                ]}
            />
        </ShapeshiftViewContainer>
    );
}

export { BearFormView };
