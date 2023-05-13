import { useTranslation } from 'react-i18next';
import { Character } from '../../../types/Character';
import { CatForm } from '../../../types/Transformation';
import Columns from '../../helpers/Columns';
import { StatBlock } from '../MainPage/StatBlock';
import { Defenses } from '../MainPage/Defenses';
import { HitPoints } from '../MainPage/HitPoints';
import Header from '../../helpers/Header';
import { ShapeshiftViewContainer } from './base';

function CatFormView({ char }: { char: Character }): JSX.Element {
    const { t } = useTranslation();
    const catRank = char.classFeaturesCondensed.count('catForm');
    const catFormTransformation = new CatForm({ rank: catRank });
    catFormTransformation.apply(char);
    const classBonuses = char.classBonuses;
    const res = (
        <ShapeshiftViewContainer title={t('charsheet.shapeshift.cat')}>
            <Columns
                columns={[
                    {
                        key: 'CatStats',
                        id: 'CatStats',
                        children: (
                            <>
                                <StatBlock stats={char.stats} />
                                {/* TODO Initiative */}
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
    char.clearOverride();
    return res;
}

export { CatFormView };
