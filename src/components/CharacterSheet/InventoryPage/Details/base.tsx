import { useTranslation } from 'react-i18next';
import { Shape, explodeShape } from '../../../../@types/Item/Gear/Slot';
import styled from 'styled-components';
import { ReactChildren } from '../../../../utils';

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

function Slots({ shape }: { shape: Shape }): JSX.Element {
    const { t } = useTranslation();
    const sep = t('gear.slot.$separator');
    return (<>{
        explodeShape(shape).map(s => t(`gear.slot.${s}`)).join(sep)
    }</>);
}

const DetailLine: React.FC<{ h?: string, children: ReactChildren }> = ({ h, children }) => {
    const H = (): JSX.Element => h ? (<><b>{h}</b>: {' '}</>) : (<></>);
    return (<ItemLine>
        <H />
        {children}
    </ItemLine>);
};

const ToDoLine = styled.p`
    ${lineStyle}
    &>b {
        color: red;
    }
`;

function ToDo({ text }: { text: string }): JSX.Element {
    return(<ToDoLine><b>To Do</b>: {text}</ToDoLine>);
}

export {
    DetailLine,
    ItemTitle,
    ToDo,
    Slots,
};