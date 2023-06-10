import { Mass, Time, TimeUnit } from '../../../Units';
import { ItemBuilder as CraftableConsumableBuilder } from '../../base';
import { CraftableConsumable } from './base';
import { Bonus, BonusBuilder, BonusType } from '../../../Character/Bonus';
import { Shape, buildShape } from '../../Gear';

interface GearEnchantBuilder extends CraftableConsumableBuilder {
    bonus: Omit<BonusBuilder, 'type'>;
    slots: string[];
}

class GearEnchant extends CraftableConsumable {
    #bonus: Bonus;
    #slots: Shape;

    constructor({ bonus, slots, ...rest }: GearEnchantBuilder) {
        super(rest);
        this.#bonus = new Bonus({ ...bonus, type: BonusType.enchant });
        this.#slots = buildShape(slots);
    }

    get useTime(): Time {
        return new Time({ value: 1, unit: TimeUnit.min });
    }

    get bonus(): Bonus {
        return this.#bonus;
    }

    get slots(): Shape {
        return this.#slots.map(slot => ({ ...slot }));
    }

    get weight(): Mass {
        return Mass.asPounds(0.1);
    }

    protected get skillValueMultiplier(): number {
        return 20;
    }

    static build(raw: any = {}): GearEnchant {
        return new GearEnchant({
            ...CraftableConsumable.generate('enchant', raw),
            bonus: raw.bonus,
            slots: raw.slots,
        });
    }
}

export { GearEnchantBuilder, GearEnchant };
