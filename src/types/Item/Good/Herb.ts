import { Mass } from '../../Units';
import { Good } from './base';

class Herb extends Good {
    get valueMultiplier(): number {
        return 2;
    }

    get weight(): Mass {
        return Mass.asPounds(0.2);
    }

    static build(raw: any): Herb {
        return new Herb(Good.generate('enchanting', raw));
    }
}

export { Herb };
