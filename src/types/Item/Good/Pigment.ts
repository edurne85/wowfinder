import { Mass } from '../../Units';
import { Good } from './base';

class Pigment extends Good {
    get valueMultiplier(): number {
        return 2;
    }

    get weight(): Mass {
        return Mass.asPounds(0.2);
    }

    static build(raw: any): Pigment {
        return new Pigment(Good.generate('enchanting', raw));
    }
}

export { Pigment };
