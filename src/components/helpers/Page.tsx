import styled from 'styled-components'
import { debug } from '../../utils';
import { baseFont, borderless, mainColor } from './mixins';

const PageStyled = styled.section`
    ${baseFont}
    width: 190mm;
    height: 277mm;
    margin: 10mm;
    padding: 0;
    ${mainColor}
    ${borderless}
    ${debug ? `
        outline: 1px dashed #ccc;
    ` : ''}
`;

const Page: React.FC<{key: string, id: string}> = ({id, children}) => (<PageStyled id={`page${id}`}>{children}</PageStyled>);

export default Page;