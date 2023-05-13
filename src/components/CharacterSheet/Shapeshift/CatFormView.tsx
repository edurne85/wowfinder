import { useTranslation } from 'react-i18next';
import { Character } from '../../../types/Character';
import { CatForm } from '../../../types/Transformation';
import Columns from '../../helpers/Columns';
import { StatBlock } from '../MainPage/StatBlock';
import { Defenses } from '../MainPage/Defenses';
import { HitPoints } from '../MainPage/HitPoints';
import Header from '../../helpers/Header';
import { ShapeshiftViewContainer, useTransformation } from './base';
import { Initiative } from '../MainPage/Initiative';

function CatFormView({ char }: { char: Character }): JSX.Element {
    const { t } = useTranslation();
    const catRank = char.classFeaturesCondensed.count('catForm');
    useTransformation(char, new CatForm({ rank: catRank }));
    const classBonuses = char.classBonuses;
    return (
        <ShapeshiftViewContainer title={t('charsheet.shapeshift.cat')}>
            <Columns
                columns={[
                    {
                        key: 'CatStats',
                        id: 'CatStats',
                        children: (
                            <>
                                <StatBlock stats={char.stats} />
                                <Header>{t('charsheet.initiative.h')}</Header>
                                <Initiative char={char} />
                            </>
                        ),
                    },
                    {
                        key: 'CatDefenses',
                        id: 'CatDefenses',
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
                        key: 'CatAttacks',
                        id: 'CatAttacks',
                        children: <></>,
                    },
                ]}
            />
        </ShapeshiftViewContainer>
    );
}

export { CatFormView };
