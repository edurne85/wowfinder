import { builder } from '../../../utils';
import { Item } from '../base';
import { SpellPotion, SpellScroll, Wand } from './SpellContainer';

const consumableBuilderByTypeKey: { [key: string]: builder<Item> } = {
    SpellPotion: SpellPotion.build,
    SpellScroll: SpellScroll.build,
    SpellWand: Wand.build,
};

export { consumableBuilderByTypeKey };
