import { builder } from '../../../utils';
import { Item } from '../base';
import {
    Elixir,
    GearEnchant,
    Potion,
    SharpeningStone,
    WeightStone,
} from './Craftable';
import { SpellPotion, SpellScroll, Wand } from './SpellContainer';

const consumableBuilderByTypeKey: { [key: string]: builder<Item> } = {
    SpellPotion: SpellPotion.build,
    SpellScroll: SpellScroll.build,
    SpellWand: Wand.build,
    Potion: Potion.build,
    Elixir: Elixir.build,
    SharpeningStone: SharpeningStone.build,
    WeightStone: WeightStone.build,
    GearEnchant: GearEnchant.build,
};

export { consumableBuilderByTypeKey };
