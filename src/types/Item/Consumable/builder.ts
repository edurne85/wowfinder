import { builder } from '../../../utils';
import { Item } from '../base';
import { Potion } from './Potion';
import { SpellPotion, SpellScroll, Wand } from './SpellContainer';

const consumableBuilderByTypeKey: { [key: string]: builder<Item> } = {
    SpellPotion: SpellPotion.build,
    SpellScroll: SpellScroll.build,
    SpellWand: Wand.build,
    Potion: Potion.build,
};

export { consumableBuilderByTypeKey };
