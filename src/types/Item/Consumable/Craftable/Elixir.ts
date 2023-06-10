import { Mass, Time } from '../../../Units';
import { Bonus, BonusBuilder, BonusType } from '../../../Character/Bonus';
import { CraftableConsumable, CraftableConsumableBuilder } from './base';
import { Consumable } from '../base';

interface ElixirBuilder extends CraftableConsumableBuilder {
    duration: string;
    bonus: Omit<BonusBuilder, 'type'>;
}

class Elixir extends CraftableConsumable {
    #duration: Time;
    #bonus: Bonus;
    constructor({ duration, bonus, ...rest }: ElixirBuilder) {
        super(rest);
        this.#duration = Time.parseTime(duration);
        this.#bonus = new Bonus({ ...bonus, type: BonusType.temporal });
    }

    get weight(): Mass {
        return Mass.asPounds(0.5);
    }

    protected get skillValueMultiplier(): number {
        return 20;
    }

    get duration(): Time {
        return this.#duration;
    }

    get bonus(): BonusBuilder {
        return this.#bonus;
    }

    static build(raw: any = {}): Elixir {
        return new Elixir({
            ...Consumable.generate('elixir', raw),
            duration: raw.duration,
            bonus: raw.bonus,
        });
    }
}

export { ElixirBuilder, Elixir };
