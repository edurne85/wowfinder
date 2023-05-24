// import { ReactNode } from 'react';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ColumnsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    column-gap: 3mm;
`;

const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 0;
    flex-grow: 1;
    flex: 1;
    max-width: 50%;
    & > *,
    & > h1 {
        margin-top: 5mm;
    }
    & > h1 {
        margin-bottom: -5mm;
    }
    & > *:first-child {
        margin-top: 0;
    }
`;

const Column: React.FC<{
    key: string;
    id: string;
    children: ReactNode;
}> = ({ id, children }) => (
    <ColumnDiv id={`column-${id}`}>{children}</ColumnDiv>
);

interface ColumnDefs {
    id?: string;
    columns: {
        key: string;
        id: string;
        children?: React.ReactNode;
    }[];
}

function Columns(props: ColumnDefs): React.JSX.Element {
    const attrs: { id?: string } = props.id ? { id: props.id } : {};
    return (
        <ColumnsContainer {...attrs}>
            {props.columns.map(c => (
                <Column key={c.key} id={c.id}>
                    {c.children}
                </Column>
            ))}
        </ColumnsContainer>
    );
}

export default Columns;

export { ColumnDefs };
