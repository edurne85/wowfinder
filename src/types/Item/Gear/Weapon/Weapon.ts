import { Length, LengthUnit } from '../../../Units';
import WeaponFlags from './Flags';
import { WeaponBase } from './base';
import { WeaponBuilder, preBuildWeapon } from './builder';

class Weapon extends WeaponBase {
    get #meleeRange(): Length {
        const s =
            (this.size as number) + (this.flags.has(WeaponFlags.reach) ? 1 : 0);
        const value = Math.floor(5 * Math.pow(2, s));
        return new Length({ value, unit: LengthUnit.foot });
    }

    get ranged(): boolean {
        return super.range.value > 0;
    }

    get range(): Length {
        const range = super.range;
        return range?.value ? range : this.#meleeRange;
    }

    get $type(): string {
        return 'Weapon';
    }

    static preBuild(raw: any): WeaponBuilder {
        return preBuildWeapon(raw);
    }

    static build(raw: any = {}): Weapon {
        return new Weapon(Weapon.preBuild(raw));
    }
}

export { Weapon };
