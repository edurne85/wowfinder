import { useTranslation } from 'react-i18next';
import { Shape, explodeShape } from '../../../../types/Item/Gear/Slot';
import styled from 'styled-components';
import { ReactNode } from 'react';

const ItemTitle = styled.p`
    font-weight: bold;
`;

const lineStyle = `
    font-style: italic;
    &>b {
        font-weight: bold;
    }
`;

const ItemLine = styled.p`
    ${lineStyle}
`;

function Slots({ shape }: Readonly<{ shape: Shape }>): React.JSX.Element {
    const { t } = useTranslation();
    const sep = t('gear.slot.$separator');
    return (
        <>
            {explodeShape(shape)
                .map(s => t(`gear.slot.${s}`))
                .join(sep)}
        </>
    );
}

const H: React.FC<{ h: string }> = ({ h }) => (
    <>
        <b>{h}</b>:{' '}
    </>
);

const Heading: React.FC<{ h?: string }> = ({ h }) => (h ? <H h={h} /> : <></>);

const DetailLine: React.FC<{ h?: string; children: ReactNode }> = ({
    h,
    children,
}) => {
    return (
        <ItemLine>
            <Heading h={h} />
            {children}
        </ItemLine>
    );
};

const ToDoLine = styled.p`
    ${lineStyle}
    &>b {
        color: red;
    }
`;

function ToDo({ text }: Readonly<{ text: string }>): React.JSX.Element {
    return (
        <ToDoLine>
            <b>To Do</b>: {text}
        </ToDoLine>
    );
}

export { DetailLine, ItemTitle, ToDo, Slots };
