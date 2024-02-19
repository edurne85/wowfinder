import { Validable } from '@model/Validable';
import { Length, LengthUnit } from '../../../Units';
import WeaponFlags from './Flags';
import { WeaponBase } from './base';
import { WeaponBuilder, preBuildWeapon } from './builder';
import { validateWeapon } from './validation';

class Weapon extends WeaponBase implements Validable {
    constructor(builder: WeaponBuilder) {
        super(builder);
        this.validate();
    }

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

    validate(): void {
        super.validate();
        validateWeapon(this);
    }

    static validate(weapon: Weapon): void {
        validateWeapon(weapon);
    }

    static preBuild(raw: any): WeaponBuilder {
        return preBuildWeapon(raw);
    }

    static build(raw: any = {}): Weapon {
        return new Weapon(Weapon.preBuild(raw));
    }
}

export { Weapon };
