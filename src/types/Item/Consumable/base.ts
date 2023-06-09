import { ActionTime } from '../../Action';
import Money from '../Money';
import { Item } from '../base';

abstract class Consumable extends Item {
    abstract get useTime(): ActionTime;

    abstract get value(): Money; // TODO: #553 Move up to Item
}

export { Consumable };
