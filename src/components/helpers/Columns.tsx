import { ReactNode } from 'react';
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
    flex-basis: 100%;
    flex: 1;
    & > *, & > h1 {
        margin-top: 5mm;
    }
    & > h1 {
        margin-bottom: -5mm;
    }
    & > *:first-child {
        margin-top: 0;
    }
`;

const Column: React.FC<{key: string, id: string}> = ({
    id, children
}) => (
    <ColumnDiv id={`column-${id}`}>
        {children}
    </ColumnDiv>
);

interface ColumnDefs {
    id?: string;
    columns: {
        key: string;
        id: string;
        children?: ReactNode | undefined;
    }[]
}

const Columns: React.FC<ColumnDefs> = (props: ColumnDefs) => {
    const attrs: {id?: string} = props.id ? { id: props.id } : {};
    return (<ColumnsContainer {...attrs}>
        {props.columns.map(c => <Column key={c.key} id={c.id}>{c.children}</Column>)}
    </ColumnsContainer>);
};

export default Columns;

export {
    ColumnDefs,
};
