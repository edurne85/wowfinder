import styled from 'styled-components';
import { DamageSpec } from '../../types/Damage';
import { DamageComponentSpecView } from './DamageComponentSpewcView';

const DamageSpecContainer = styled.span``;

interface DamageSpecViewProps {
    spec: DamageSpec;
}

function DamageSpecView({ spec }: DamageSpecViewProps): React.JSX.Element {
    return (
        <DamageSpecContainer>
            {spec.components.map((component, index) => (
                <DamageComponentSpecView
                    spec={component}
                    prefix={index > 0 ? ' + ' : ''}
                    key={index}
                />
            ))}
        </DamageSpecContainer>
    );
}

export { DamageSpecView };
