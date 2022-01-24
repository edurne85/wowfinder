import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Gear as G } from '../../../@types/Items/Gear';
import { explodeShape, Shape } from '../../../@types/Items/Gear/Slot';
import { debugOutline, scrollable } from '../../helpers/mixins';

function Slots({shape}: {shape: Shape}): JSX.Element {
    const {t} = useTranslation();
    const sep = t('gear.slot.$separator');
    return (<>{
        explodeShape(shape).map(s => t(`gear.slot.${s}`)).join(sep)
    }</>);
}

const GearDetailsContainer = styled.div`
    position: absolute;
    left: 0.3em;
    top: 100%;
    right: 0;
    background: #ffc;
    box-shadow: 3px 3px 3px #999;
    z-index: 1;
    padding: 0.1em;
`;

const GearItemTitle = styled.p`
    font-weight: bold;
`;
const GearItemLine = styled.p`
    font-style: italic;
    &>b {
        font-weight: bold;
    }
`;

const GearDetailLine: React.FC<{h?: string}> = ({h, children}) => {
    const H = (): JSX.Element => h ? (<><b>{h}</b>: {' '}</>) : (<></>);
    return (<GearItemLine>
        <H />
        {children}
    </GearItemLine>);
};

function GearDetails({item}: {item: G}): JSX.Element {
    // TODO Implement
    const {t} = useTranslation();
    return (<GearDetailsContainer className="details">
        <GearItemTitle>{t(`labels.gear.${item.label}`)}</GearItemTitle>
        <GearDetailLine h={t('ui.inventory.gear.slot')}>
            <Slots shape={item.shape} />
        </GearDetailLine>
        <GearDetailLine h={t('ui.inventory.weight')}>{item.weight.toString()}</GearDetailLine>
        Detailed item view under construction!
    </GearDetailsContainer>);
}

const GearItemContainer = styled.div`
    margin: 0.2em 0.1em;
    position: relative;
    &>div.details {
        display: none;
    }
    &:hover>div.details {
        display: block;
    }
`;

function GearItem({item}: {item: G}): JSX.Element {
    const {t} = useTranslation();
    return(<GearItemContainer>
        [<Slots shape={item.shape} />]
        {' ' + t(`labels.gear.${item.label}`)}
        <GearDetails item={item} />
    </GearItemContainer>);
}

const GearContainer = styled.div`
    height: 120mm;
    ${debugOutline({color: '#909'})}
    ${scrollable}
`;

export function Gear({gear}: {gear: G[]}): JSX.Element {
    let count = 0;
    return(<GearContainer>
        {gear.map(g => (<GearItem item={g} key={`gear-item-${++count}`} />))}
    </GearContainer>);
} 