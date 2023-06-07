import { Mass } from '../../Units';
import { Good } from './base';

class EnchantingReagent extends Good {
    get valueMultiplier(): number {
        return 5;
    }

    get weight(): Mass {
        return Mass.asPounds(0.01);
    }

    static build(raw: any): EnchantingReagent {
        return new EnchantingReagent(Good.generate('enchanting', raw));
    }
}

export { EnchantingReagent };
