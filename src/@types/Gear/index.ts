import Armor from './Armor';
import Gear from './base';
import Weapon from './Weapon';

function buildGear(raw: any): Gear {
    switch(raw.$type as string || '') {
        case 'Armor':
            return Armor.build(raw);
        case 'Weapon':
            return Weapon.build(raw);
        default: 
            return Gear.build(raw);
    }
}

export {
    Gear,
    Weapon,
    buildGear,
};