import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Gear, Item } from '../../../types/Item';
import { mapLines } from '../../helpers/FillableLine';
import { debugOutline } from '../../helpers/mixins';
import { ReactContent } from '../../helpers/ReactContent';
import { ItemDetails } from './Details';
import { Slots } from './Details/base';

const ItemsListContainer = styled.div`
    ${debugOutline({ color: '#909' })}
`;

const ListItemContainer = styled.div`
    margin: 0.2em 0.1em;
    position: relative;
    & > div.details {
        display: none;
    }
    &:hover > div.details {
        display: block;
    }
    overflow: visible;
`;

const ListItemHeading = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: nowrap;
`;

function ListItem({
    item,
    showSlots,
}: {
    item: Item;
    showSlots: boolean;
}): React.JSX.Element {
    const { t } = useTranslation();
    return (
        <ListItemContainer>
            <ListItemHeading>
                {showSlots && item instanceof Gear ? (
                    <>
                        [<Slots shape={item.shape} />]{' '}
                    </>
                ) : (
                    ''
                )}
                {t(`labels.items.gear.${item.label}`)}
            </ListItemHeading>
            <ItemDetails item={item} />
        </ListItemContainer>
    );
}

interface ItemsListArguments {
    items: Item[];
    maxLines: number;
    height: number;
    showSlots?: boolean;
}

function ItemsList({
    items,
    maxLines,
    height,
    showSlots = false,
}: ItemsListArguments): React.JSX.Element {
    const lines: ReactContent[] = [];
    lines.push(...items.map(g => <ListItem item={g} showSlots={showSlots} />));
    lines.splice(maxLines);
    lines.push(...Array(maxLines - lines.length).fill(''));
    return (
        <ItemsListContainer style={{ height: `${height}mm` }}>
            {mapLines(lines, 'gear-item-')}
        </ItemsListContainer>
    );
}

export { ItemsList };
