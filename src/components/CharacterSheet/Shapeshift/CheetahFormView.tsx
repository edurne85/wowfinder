import { Character } from '../../../types/Character';
import { CheetahForm } from '../../../types/Transformation';
import Columns from '../../helpers/Columns';
import { useTranslation } from 'react-i18next';
import { ShapeshiftViewContainer } from './base';
import { Speed } from '../MainPage/Speed';

function CheetahFormView({ char }: { char: Character }): JSX.Element {
    const { t } = useTranslation();
    const cheetahRank = char.classFeaturesCondensed.count('cheetahForm');
    const cheetahFormTransformation = new CheetahForm({ rank: cheetahRank });
    cheetahFormTransformation.apply(char);
    const res = (
        <ShapeshiftViewContainer title={t('charsheet.shapeshift.cheetah')}>
            <Columns
                columns={[
                    {
                        key: 'CheetahSpeeds',
                        id: 'CheetahSpeeds',
                        children: <Speed speeds={char.speeds} />,
                    },
                    {
                        key: 'Placeholder',
                        id: 'Placeholder',
                        children: <></>,
                    },
                ]}
            />
        </ShapeshiftViewContainer>
    );
    char.clearOverride();
    return res;
}

export { CheetahFormView };
