import { useTranslation } from 'react-i18next';
import { Character } from '@model/Character';
import { MoonkinForm } from '@model/Transformation';
import Columns from '../../helpers/Columns';
import { StatBlock } from '../MainPage/StatBlock';
import { ShapeshiftViewContainer, useTransformation } from './base';
import { MagicColumn } from '../MagicPage';
import { CastingMode, School, SubSchool } from '@model/Magic';

function MoonkinFormView({ char }: { char: Character }): React.JSX.Element {
    const { t } = useTranslation();
    const moonkinRank = char.classFeaturesCondensed.count('moonkinForm');
    useTransformation(char, new MoonkinForm({ rank: moonkinRank }));
    return (
        <ShapeshiftViewContainer title={t('charsheet.shapeshift.moonkin')}>
            <Columns
                columns={[
                    {
                        key: 'MoonkinStats',
                        id: 'MoonkinStats',
                        children: (
                            <>
                                <StatBlock stats={char.stats} />
                            </>
                        ),
                    },
                    {
                        key: 'MoonkinCasting',
                        id: 'MoonkinCasting',
                        children: MagicColumn({
                            char,
                            mode: CastingMode.spontaneous,
                            showTitle: false,
                            schoolsFilter: [School.con, SubSchool.celestial],
                        }),
                    },
                ]}
            />
        </ShapeshiftViewContainer>
    );
}

export { MoonkinFormView };
