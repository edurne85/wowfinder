import { useTranslation } from 'react-i18next';
import { SpellDuration, stringify } from '@model/Magic/Spell/Duration';

import { styled } from 'styled-components';

const DurationContainer = styled.span`
    display: block;
`;

interface SpellDurationViewProps {
    duration: SpellDuration;
}

function SpellDurationView({
    duration,
}: SpellDurationViewProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <DurationContainer className="duration">
            <b>{t('magic.duration.h')}</b>: {stringify(duration, t)}
        </DurationContainer>
    );
}

function SpellDurationIfNeeded({
    duration,
}: Partial<SpellDurationViewProps>): React.JSX.Element | null {
    return duration ? <SpellDurationView duration={duration} /> : null;
}

export { SpellDurationIfNeeded as SpellDuration };
