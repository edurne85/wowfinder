import { Join } from '@components/helpers/Join';
import { SpellComponent, SpellCoreComponent } from '@model/Magic';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const ComponentsContainer = styled.span`
    display: block;
`;

interface PartialComponentProps {
    value: string;
}
function PartialComponent({ value }: PartialComponentProps): React.JSX.Element {
    const { t } = useTranslation();
    return <span title={t(`magic.components.${value}`)}>{value}</span>;
}

interface CoreComponentsViewArgs {
    components: SpellCoreComponent[];
}

function CoreComponentsView({
    components,
}: CoreComponentsViewArgs): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <ComponentsContainer>
            <b>{t('magic.components.h')}</b>:{' '}
            <Join
                separator=", "
                items={components.sort().map(c => (
                    <PartialComponent key={c} value={c} />
                ))}
            />
        </ComponentsContainer>
    );
}

function CoreComponentsViewIfNeeded({
    components,
}: CoreComponentsViewArgs): React.JSX.Element {
    return components.length > 0 ? (
        <CoreComponentsView components={components} />
    ) : (
        <></>
    );
}

interface SpellComponentsViewArgs {
    components: SpellComponent[];
}

function SpellComponentsView({
    components,
}: SpellComponentsViewArgs): React.JSX.Element {
    const coreComponentEnumValues = Object.values(SpellCoreComponent);
    const coreComponents = components
        .map(c => c as SpellCoreComponent)
        .filter(c => coreComponentEnumValues.includes(c));
    return <CoreComponentsViewIfNeeded components={coreComponents} />;
}

export { SpellComponentsView as Components };
