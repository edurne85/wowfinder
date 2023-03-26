import { SimpleSaves } from '../Saves';
import type { SimpleSavesBuilder } from '../Saves';
import { sum } from '../../../utils';

export default class SavesBonus extends SimpleSaves {
    constructor({fort = 0, refl = 0, will = 0}: SimpleSavesBuilder) {
        super({fort, refl, will});
    }

    static get zero(): SavesBonus { return new SavesBonus({}); }

    static sum(...args: SavesBonus[]): SavesBonus {
        return new SavesBonus({
            fort: sum(...args.map(a => a._fort)),
            refl: sum(...args.map(a => a._refl)),
            will: sum(...args.map(a => a._will)),
        });
    }

    static max(...args: SavesBonus[]): SavesBonus {
        return new SavesBonus({
            fort: Math.max(...args.map(a => a._fort)),
            refl: Math.max(...args.map(a => a._refl)),
            will: Math.max(...args.map(a => a._will)),
        });
    }

    static build(raw: any = {}): SavesBonus {
        return new SavesBonus({
            fort: raw.fort || 0,
            refl: raw.refl || 0,
            will: raw.will || 0,
        });
    }
}