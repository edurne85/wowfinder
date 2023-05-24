import styled from 'styled-components';

const FillableLine = styled.div`
    overflow: visible;
    &.empty {
        border-bottom: 1px dashed #999;
    }
`;

function mapLines<T extends React.ReactNode>(
    lines: T[],
    keyPrefix: string,
): React.JSX.Element[] {
    let lineCount = 0;
    return lines.map((value: T) => {
        const args = {
            key: `${keyPrefix}${++lineCount}`,
            ...(value ? {} : { className: 'empty' }),
        };
        return <FillableLine {...args}>{value || '\xa0'}</FillableLine>;
    });
}

export { mapLines };
