import { builder } from '../../../utils';
import { Item } from '../base';
import { Cloth } from './Cloth';
import { CommonGood } from './CommonGood';
import { EnchantingReagent } from './Enchanting';
import { Gem } from './Gem';
import { Herb } from './Herb';
import { Leather } from './Leather';
import { Ore, MetalBar, Stone } from './Mining';
import { Pigment } from './Pigment';

const goodBuilderByTypeKey: { [key: string]: builder<Item> } = {
    Ore: Ore.build,
    Metal: MetalBar.build,
    Stone: Stone.build,
    Cloth: Cloth.build,
    Leather: Leather.build,
    Gem: Gem.build,
    Enchanting: EnchantingReagent.build,
    Herb: Herb.build,
    Pigment: Pigment.build,
    Common: CommonGood.build,
};

export { goodBuilderByTypeKey };
