import { createGlobalStyle } from 'styled-components';
import { screenZoom } from '../components/helpers/mixins';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    ${screenZoom(1.6, 1225)}
  }
  .rewards-table th {
    font-weight: normal;
    padding: 0.25em 0.5em;
  }
  .rewards-table tbody th {
    text-align: left;
  }
  .rewards-table tbody td {
    text-align: right;
    font-family: Courier, mono;
  }
  .rewards-table tbody tr:hover {
    background-color: #324;
  }
  .rewards-table tbody tr.inactive {
    color: #A8A8AB;
  }
  .rewards-table tbody tr.inactive:hover {
    background-color: #213;
  }
`;
