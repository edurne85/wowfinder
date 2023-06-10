import { DamageTypes } from '../../../../Damage';
import { CraftableConsumable, CraftableConsumableBuilder } from '../base';
import { Mass, Time } from '../../../../Units';

interface WeaponStoneBuilder extends CraftableConsumableBuilder {
    bonus: number;
    types: DamageTypes;
    duration?: string;
}

abstract class WeaponStone extends CraftableConsumable {
    #bonus: number;
    #types: DamageTypes;
    #duration: Time;
    constructor({
        bonus,
        types,
        duration = '30m',
        ...rest
    }: WeaponStoneBuilder) {
        super(rest);
        this.#bonus = bonus;
        this.#types = types;
        this.#duration = Time.parseTime(duration);
    }

    get weight(): Mass {
        return Mass.asPounds(1);
    }

    protected get skillValueMultiplier(): number {
        return 5;
    }

    get bonus(): number {
        return this.#bonus;
    }

    get types(): DamageTypes {
        return this.#types;
    }
}

type TypedWeaponStoneBuilder = Omit<WeaponStoneBuilder, 'types'>;

export { WeaponStone, WeaponStoneBuilder, TypedWeaponStoneBuilder };
