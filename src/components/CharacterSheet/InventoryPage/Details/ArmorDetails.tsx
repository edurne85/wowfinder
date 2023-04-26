import { ToDo } from './base';
import { Armor, Item } from '../../../../types/Item';

function ArmorDetails({ armor }: { armor: Armor }): JSX.Element {
    return (
        <>
            <ToDo text={`Armor details ${armor.$type}`} />
        </>
    );
}

function ArmorDetailsWrapped({ item }: { item: Item }): JSX.Element {
    return item instanceof Armor ? <ArmorDetails armor={item} /> : <></>;
}

export { ArmorDetailsWrapped };
