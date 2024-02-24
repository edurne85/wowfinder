import { ToDo } from './base';
import { Armor, Item } from '../../../../types/Item';

type ArmorDetailsProps = Readonly<{
    armor: Readonly<Armor>;
}>;

function ArmorDetails({ armor }: ArmorDetailsProps): React.ReactNode {
    // TODO: #278
    return <ToDo text={`Armor details ${armor.$type}`} />;
}

function ArmorDetailsWrapped({ item }: { item: Item }): React.ReactNode {
    return item instanceof Armor ? <ArmorDetails armor={item} /> : <></>;
}

export { ArmorDetailsWrapped };
