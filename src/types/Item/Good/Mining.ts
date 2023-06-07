import { Mass } from '../../Units';
import { Good } from './base';

class Ore extends Good {
    get valueMultiplier(): number {
        return 10;
    }

    get weight(): Mass {
        return Mass.asPounds(2);
    }

    static build(raw: any): Ore {
        return new Ore(Good.generate('ore', raw));
    }
}

class MetalBar extends Good {
    get valueMultiplier(): number {
        return 20;
    }

    get weight(): Mass {
        return Mass.asPounds(2);
    }

    static build(raw: any): MetalBar {
        return new MetalBar(Good.generate('metal', raw));
    }
}

class Stone extends Good {
    get valueMultiplier(): number {
        return 5;
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    static build(raw: any): Stone {
        return new Stone(Good.generate('stone', raw));
    }
}

export { Ore, MetalBar, Stone };
