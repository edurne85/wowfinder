import { Mass } from '../../Units';
import { Good } from './base';

class Gem extends Good {
    get valueMultiplier(): number {
        return 5;
    }

    get weight(): Mass {
        return Mass.asPounds(0.2);
    }

    static build(raw: any): Gem {
        return new Gem(Good.generate('gem', raw));
    }
}

export { Gem };
