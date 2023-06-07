import { Mass } from '../../Units';
import { Good } from './base';

class Cloth extends Good {
    get valueMultiplier(): number {
        return 20;
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    static build(raw: any): Cloth {
        return new Cloth(Good.generate('cloth', raw));
    }
}

export { Cloth };
