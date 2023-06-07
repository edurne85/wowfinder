import { builder, ByKeyRecursive, ByKeyRecursiveEntry } from '../../utils';
import { Item } from './base';
import { Armor, Gear, Weapon } from './Gear';
import * as Goods from './Good';

const builderByTypeKey: { [key: string]: builder<Item> } = {
    Gear: Gear.build,
    Accessory: Gear.build, // TODO #429: Review: specific class & builder needed?
    Weapon: Weapon.build,
    Armor: Armor.build,
    Ore: Goods.Ore.build,
    Metal: Goods.MetalBar.build,
    Stone: Goods.Stone.build,
    Cloth: Goods.Cloth.build,
    Leather: Goods.Leather.build,
    Gem: Goods.Gem.build,
    Enchanting: Goods.EnchantingReagent.build,
    Herb: Goods.Herb.build,
    Pigment: Goods.Pigment.build,
};

const builderKeys = Object.keys(builderByTypeKey);

const errors = {
    badKey: (fqkey: string): Error =>
        new Error(`Not a valid fqKey for Item: ${fqkey}`),
    badData: (raw: any): Error => new Error(`Invalid item data: ${raw}`),
};

function retrievePreloaded(fqkey: string): Item {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    let data: ByKeyRecursiveEntry<Item> = Item.load(undefined, buildItem);
    for (const chunk of fqkey.split('.')) {
        if (Object.keys(data).includes(chunk)) {
            data = (data as ByKeyRecursive<Item>)[chunk];
        } else {
            throw errors.badKey(fqkey);
        }
    }
    if (data instanceof Item) {
        return data as Item;
    } else {
        throw errors.badKey(fqkey);
    }
}

function buildItem(raw: any): Item {
    if (raw instanceof Item) {
        return raw;
    }
    if (typeof raw === 'string') {
        return retrievePreloaded(raw as string);
    }
    const $type = (raw?.$type as string) || '';
    if (builderKeys.includes($type)) {
        return builderByTypeKey[$type](raw);
    } else {
        throw errors.badData(raw);
    }
}

export { buildItem };
