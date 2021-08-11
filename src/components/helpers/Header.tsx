import styled from 'styled-components'
import { reverseColors } from './mixins';

const Header = styled.h1`
    text-align: center;
    text-transform: uppercase;
    ${reverseColors}
    font-weight: bold;
    font-size: 12pt;
    margin: 0;
`;

export default Header;