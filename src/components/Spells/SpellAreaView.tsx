import { SpellArea, stringify } from '@model/Magic/Spell/Area';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const AreaContainer = styled.span`
    display: block;
`;

interface SpellAreaViewArgs {
    area: SpellArea;
}

function SpellAreaView({ area }: SpellAreaViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <AreaContainer>
            <b>{t('magic.area.h')}</b>: {stringify(area, t)}
        </AreaContainer>
    );
}

function SpellAreaIfNeeded({
    area,
}: Partial<SpellAreaViewArgs>): React.JSX.Element | null {
    return area ? <SpellAreaView area={area} /> : null;
}

export { SpellAreaIfNeeded as SpellArea };
