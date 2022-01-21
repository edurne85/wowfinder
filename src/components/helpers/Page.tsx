import styled from 'styled-components';
import { baseFont, borderless, printableBottomBorder, mainColor, debugOutline } from './mixins';

interface PageStyledProps {
    visible: boolean;
}

const PageStyled = styled.section`
    ${baseFont}
    width: 190mm;
    height: 277mm;
    margin: 10mm;
    padding: 0;
    ${mainColor}
    ${borderless}
    display: ${ (props: PageStyledProps) => props.visible ? 'block' : 'none'};
    ${printableBottomBorder('input, select')}
    @media print {
        select {
            -webkit-appearance: none;
        }
    }
    ${debugOutline({})}
`;

const Page: React.FC<{key: string, id: string, visible?: boolean}> = ({id, children, visible = true}) => {
    return <PageStyled visible={visible} id={`page${id}`}>{children}</PageStyled>;
};

export default Page;