import { ByKeyRecursive, ByKeyRecursiveEntry } from '../../../utils';
import { Armor } from './Armor';
import Gear from './base';
import { Weapon } from './Weapon';

function buildGear(raw: any): Gear {
    if (raw instanceof Gear) {
        return raw;
    }
    if (typeof raw === 'string') {
        let data: ByKeyRecursiveEntry<Gear> = Gear.import(undefined, buildGear);
        for (const chunk of raw.split('.')) {
            if (Object.keys(data).includes(chunk)) {
                data = (data as ByKeyRecursive<Gear>)[chunk];
            } else {
                throw new Error(`Not a valid fqKey for Gear: ${raw}`);
            }
        }
        if (data instanceof Gear) {
            return data as Gear;
        } else {
            throw new Error(`Not a valid fqKey for Gear: ${raw}`);
        }
    }
    switch ((raw.$type as string) || '') {
        case 'Armor':
            return Armor.build(raw);
        case 'Weapon':
            return Weapon.build(raw);
        default:
            return Gear.build(raw);
    }
}

export { Gear, Armor, Weapon, buildGear };
