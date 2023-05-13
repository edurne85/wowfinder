import styled from 'styled-components';
import Header from '../../helpers/Header';

const ShapeshiftViewContainerDiv = styled.div`
    margin: 1.5em 0 0.5em;
`;

interface Props {
    children: React.ReactNode;
    title: string;
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
export { ShapeshiftViewContainer };
