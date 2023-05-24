import styled from 'styled-components';

const RewardsTableWrapper = styled.table`
    & th {
        font-weight: normal;
        padding: 0.25em 0.5em;
    }
    & tbody th {
        text-align: left;
    }
    & tbody td {
        text-align: right;
        font-family: Courier, mono;
    }
    & tbody tr:hover {
        background-color: #ff9;
    }
    & tbody tr.inactive {
        color: #a8a8ab;
    }
    & tbody tr.inactive:hover {
        background-color: #ccc;
    }
`;

export { RewardsTableWrapper };
