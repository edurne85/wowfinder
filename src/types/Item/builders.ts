import { builder, ByKeyRecursive, ByKeyRecursiveEntry } from '../../utils';
import { Item } from './base';
import { gearBuilderByTypeKey } from './Gear';
import { goodBuilderByTypeKey } from './Good';

const builderByTypeKey: { [key: string]: builder<Item> } = {
    ...gearBuilderByTypeKey,
    ...goodBuilderByTypeKey,
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
