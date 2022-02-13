import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Gear as G, Weapon, Armor } from '../../../@types/Items/Gear';
import { explodeShape, Shape } from '../../../@types/Items/Gear/Slot';
import { debugOutline, scrollable } from '../../helpers/mixins';
import { Damage } from './Damage';

function Slots({ shape }: { shape: Shape }): JSX.Element {
    const { t } = useTranslation();
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
    background: #eee;
    box-shadow: 3px 3px 3px #999;
    z-index: 1;
    padding: 0.1em;
`;

const GearItemTitle = styled.p`
    font-weight: bold;
`;

const lineStyle = `
    font-style: italic;
    &>b {
        font-weight: bold;
    }
`;

const GearItemLine = styled.p`
    ${lineStyle}
`;

const GearDetailLine: React.FC<{ h?: string }> = ({ h, children }) => {
    const H = (): JSX.Element => h ? (<><b>{h}</b>: {' '}</>) : (<></>);
    return (<GearItemLine>
        <H />
        {children}
    </GearItemLine>);
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

function WeaponBonusDamage({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const h = t('ui.inventory.gear.bonusDamage');
    return weapon.hasBonusDamage ?
        (<GearDetailLine h={h}>
            <Damage damage={weapon.bonusDamage} />
        </GearDetailLine>)
        : <></>;
}
function WeaponDamage({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const critRange = weapon.criticalRange >= 20 ? '20' : `${weapon.criticalRange} - 20`;
    const hasCrit = weapon.criticalMultiplier > 1;
    return (<>
        <GearDetailLine h={t('ui.inventory.gear.baseDamage')}>
            <Damage damage={weapon.baseDamage} />
            {hasCrit ? `(${critRange} / ×${Math.floor(weapon.criticalMultiplier)})` : ''}
        </GearDetailLine>
        <WeaponBonusDamage weapon={weapon} />
    </>);
}

function WeaponIntrinsicMod({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const i = weapon.intrinsic;
    const prefix = i > 0 ? '+' : '';
    const h = t('ui.inventory.gear.intrinsic');
    return i === 0 ? (<></>) : <GearDetailLine h={h}>{prefix}{i}</GearDetailLine>;
}

function WeaponGrouping({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const groups = Array.from(weapon.groups).map(g => t(`gear.weapon.group.${g}`)).join(t('gear.weapon.group.$separator'));
    const rank = `${weapon.rank}`; // TODO: localize
    const proficiency = `${weapon.proficiency}`; // TODO: localize
    return (<GearDetailLine>
        {rank}: {proficiency} ({groups})
    </GearDetailLine>);
}

function WeaponDetails({ weapon }: { weapon: Weapon }): JSX.Element {
    const { t } = useTranslation();
    const range: string = weapon.ranged ? weapon.range.fullDisplay : t('ui.inventory.gear.range.melee');
    return (<>
        <GearDetailLine h={t('ui.inventory.gear.range.h')}>{range}</GearDetailLine>
        <WeaponDamage weapon={weapon} />
        <WeaponIntrinsicMod weapon={weapon} />
        <WeaponGrouping weapon={weapon} />
    </>);
}

function ArmorDetails({ armor }: { armor: Armor }): JSX.Element {
    return (<>
        <ToDo text={`Armor details ${armor.$type}`} />
    </>);
}

function GearDetails({ item }: { item: G }): JSX.Element {
    // TODO Implement
    const { t } = useTranslation();
    return (<GearDetailsContainer className="details">
        <GearItemTitle>{t(`labels.gear.${item.label}`)}</GearItemTitle>
        <GearDetailLine h={t('ui.inventory.gear.slot')}>
            <Slots shape={item.shape} />
        </GearDetailLine>
        {item instanceof Weapon ? <WeaponDetails weapon={item} /> : <></>}
        {item instanceof Armor ? <ArmorDetails armor={item} /> : <></>}
        <ToDo text="Item size category" />
        <GearDetailLine h={t('ui.inventory.weight.h')}>{item.weight.toString()}</GearDetailLine>
        <ToDo text="Bonus rendering" />
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

function GearItem({ item }: { item: G }): JSX.Element {
    const { t } = useTranslation();
    return (<GearItemContainer>
        [<Slots shape={item.shape} />]
        {' ' + t(`labels.gear.${item.label}`)}
        <GearDetails item={item} />
    </GearItemContainer>);
}

const GearContainer = styled.div`
    height: 100mm;
    ${debugOutline({ color: '#909' })}
    ${scrollable}
`;

export function Gear({ gear }: { gear: G[] }): JSX.Element {
    let count = 0;
    return (<GearContainer>
        {gear.map(g => (<GearItem item={g} key={`gear-item-${++count}`} />))}
    </GearContainer>);
} 