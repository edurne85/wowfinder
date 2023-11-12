import { useTranslation } from 'react-i18next';
import { SpellRange, StandardRange } from '@model/Magic/Spell';
import { styled } from 'styled-components';
import { Length } from '@model/Units';
import { ScalarView } from '@components/ScalarView';

const RangeContainer = styled.span`
    display: block;
`;

function StandardRangeView({
    range,
}: {
    range: StandardRange | 'special';
}): React.JSX.Element {
    const { t } = useTranslation();
    return <>{t(`magic.range.${range}`)}</>;
}

interface SpellRangeViewArgs {
    range: SpellRange;
}

function SpellRangeView({ range }: SpellRangeViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <RangeContainer>
            <b>{t('magic.range.h')}</b>:{' '}
            {range instanceof Length ? (
                <ScalarView value={range} />
            ) : (
                <StandardRangeView range={range} />
            )}
        </RangeContainer>
    );
}

function SpellRangeIfNeeded({
    range,
}: Partial<SpellRangeViewArgs>): React.JSX.Element | null {
    return range ? <SpellRangeView range={range} /> : null;
}

export { SpellRangeIfNeeded as SpellRange };
