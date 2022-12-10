import styled from 'styled-components';

const FillableLine = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.empty {
        border-bottom: 1px dashed #999;
    }
`;

type ReactContent = string | number | JSX.Element | JSX.Element[];

function mapLines<T extends ReactContent> (lines: T[], keyPrefix: string): JSX.Element[] {
    let lineCount = 0;
    return lines.map((value: T) => {
        const args = {
            key: `${keyPrefix}${++lineCount}`,
            ...(value ? {} : {className: 'empty' }),
        };
        return <FillableLine {...args}>{value || '\xa0'}</FillableLine>;
    });
}

export {
    mapLines,
};