import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Gear, Item, rarityColorsLight } from '../../../../types/Item';
import { ArmorDetailsWrapped } from './ArmorDetails';
import { DetailLine, ItemTitle, Slots } from './base';
import { WeaponDetailsWrapped } from './WeaponDetails';
import { BonusSummaryView } from '../../../BonusView';
import { GearSizeView } from './GearSize';

const ItemDetailsContainer = styled.div`
    position: absolute;
    left: 0.5em;
    top: 150%;
    height: auto;
    right: 0.5em;
    background: #eee;
    box-shadow: 3px 3px 3px #999;
    z-index: 1;
    padding: 0.1em;
`;

function GearDetails({ gear }: { gear: Gear }): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            <DetailLine h={t('charsheet.inventory.gear.slot') || undefined}>
                <Slots shape={gear.shape} />
            </DetailLine>
            <GearSizeView size={gear.size} />
            <WeaponDetailsWrapped item={gear} />
            <ArmorDetailsWrapped item={gear} />
            <BonusSummaryView bonus={gear.bonuses} />
        </>
    );
}

function GearDetailsWrapped({ item }: { item: Item }): React.JSX.Element {
    return item instanceof Gear ? <GearDetails gear={item} /> : <></>;
}

function ItemDetails({ item }: { item: Item }): React.JSX.Element {
    // TODO #278 Implement
    const { t } = useTranslation();
    return (
        <ItemDetailsContainer className="details">
            <ItemTitle style={{ color: rarityColorsLight[item.rarity] }}>
                {t(`labels.items.gear.${item.label}`)}
            </ItemTitle>
            <GearDetailsWrapped item={item} />
            <DetailLine h={t('charsheet.inventory.weight.h') || undefined}>
                {item.weight.toString()}
            </DetailLine>
        </ItemDetailsContainer>
    );
}

export { ItemDetails };
