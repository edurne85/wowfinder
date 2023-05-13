import styled from 'styled-components';
import Header from '../../helpers/Header';
import { Transformation } from '../../../types/Transformation';
import { Character } from '../../../types/Character';
import { useEffect } from 'react';

const ShapeshiftViewContainerDiv = styled.div`
    margin: 1.5em 0 0.5em;
`;

interface Props {
    children: React.ReactNode;
    title: string;
}

function useTransformation(char: Character, t: Transformation): void {
    char.clearOverride();
    t.apply(char);
    useEffect(() => {
        char.clearOverride();
    }, [char]);
}

const ShapeshiftViewContainer = ({ title, children }: Props): JSX.Element => {
    return (
        <ShapeshiftViewContainerDiv>
            <Header>{title}</Header>
            {children}
        </ShapeshiftViewContainerDiv>
    );
};

export type { Props as ShapeshiftViewContainerProps };
export { ShapeshiftViewContainer, useTransformation };
