import { Mass } from '../../../Units';
import { SpellContainer } from './base';

class SpellScroll extends SpellContainer {
    get valueMultiplier(): number {
        return 2500;
    }

    get weight(): Mass {
        return Mass.asPounds(0.1);
    }

    static build(raw: any = {}): SpellScroll {
        return new SpellScroll(SpellContainer.generate('scroll', raw));
    }
}

export { SpellScroll };
