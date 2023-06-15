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

function Slots({ shape }: { shape: Shape }): React.JSX.Element {
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

const DetailLine: React.FC<{ h?: string; children: ReactNode }> = ({
    h,
    children,
}) => {
    const H = (): React.JSX.Element =>
        h ? (
            <>
                <b>{h}</b>:{' '}
            </>
        ) : (
            <></>
        );
    return (
        <ItemLine>
            <H />
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

/** @deprecated */
function ToDo({ text }: { text: string }): React.JSX.Element {
    return (
        <ToDoLine>
            <b>To Do</b>: {text}
        </ToDoLine>
    );
}

/* eslint-disable-next-line deprecation/deprecation */
export { DetailLine, ItemTitle, ToDo, Slots };
