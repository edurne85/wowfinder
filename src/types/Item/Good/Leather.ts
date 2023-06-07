import { Mass } from '../../Units';
import { Good } from './base';

class Leather extends Good {
    get valueMultiplier(): number {
        return 15;
    }

    get weight(): Mass {
        return Mass.asPounds(1);
    }

    static build(raw: any): Leather {
        return new Leather(Good.generate('leather', raw));
    }
}

export { Leather };
