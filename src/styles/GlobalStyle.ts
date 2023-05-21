import { createGlobalStyle } from 'styled-components';
import { screenZoom } from '../components/helpers/mixins';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @media print {
    nav {
        display: none;
    }
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    ${screenZoom(1.6)}
  }
`;
