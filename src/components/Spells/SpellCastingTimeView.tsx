import { ActionTime } from '@model/Action';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const CastingTimeContainer = styled.span`
    display: block;
`;

interface SpellCastingTimeViewProps {
    castingTime: ActionTime;
}

function SpellCastingTimeView({
    castingTime,
}: SpellCastingTimeViewProps): React.JSX.Element {
    const { t } = useTranslation();
    const castingTimeString = ActionTime.stringify(castingTime, t);
    return (
        <CastingTimeContainer className="casting-time">
            <b>{t('magic.castingTime.h')}</b>: {castingTimeString}
        </CastingTimeContainer>
    );
}

function SpellCastinTimeIfNeeded({
    castingTime,
}: Partial<SpellCastingTimeViewProps>): React.JSX.Element | null {
    return castingTime ? (
        <SpellCastingTimeView castingTime={castingTime} />
    ) : null;
}

export { SpellCastinTimeIfNeeded as CastingTime };
