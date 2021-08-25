import styled from 'styled-components'
import { debug } from '../../utils';
import { baseFont, borderless, mainColor } from './mixins';

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
    ${debug ? `
        outline: 1px dashed #ccc;
    ` : ''}
`;

const Page: React.FC<{key: string, id: string, visible?: boolean}> = ({id, children, visible = true}) => {
    return <PageStyled visible={visible} id={`page${id}`}>{children}</PageStyled>;
};

export default Page;