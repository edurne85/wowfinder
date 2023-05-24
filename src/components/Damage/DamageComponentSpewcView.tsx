import styled from 'styled-components';
import { DamageComponentSpec, DamageType } from '../../types/Damage';
import { colorByTypes } from './helpers';
import { useTranslation } from 'react-i18next';

const DamageComponentSpecContainer = styled.span`
    text-decoration: underline;
    text-decoration-color: ${colorByTypes};
    margin: 0 0.2em;
`;

interface DamageComponentSpecViewProps {
    prefix?: string;
    spec: DamageComponentSpec;
}

function DamageComponentSpecView({
    prefix,
    spec,
}: DamageComponentSpecViewProps): React.JSX.Element {
    const { t } = useTranslation();
    const typeKeys = Object.keys(spec.types)
        .map(type => type as DamageType)
        .filter(type => !!spec.types[type as DamageType]);
    const title =
        typeKeys
            .map(type => t(`damageTypes.full.${type}`))
            .filter(Boolean)
            .join(', ') ?? undefined;
    const types = typeKeys
        .map(type => t(`damageTypes.abbr.${type}`))
        .filter(Boolean)
        .join(', ');
    return (
        <>
            {prefix && `${prefix} `}
            <DamageComponentSpecContainer title={title} types={spec.types}>
                {`${spec.dice.toString()} ${types}`}
            </DamageComponentSpecContainer>
        </>
    );
}

export { DamageComponentSpecView };
