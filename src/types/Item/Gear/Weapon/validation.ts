import { DamageSpec } from '@model/Damage';
import { Length } from '@model/Units';
import {
    ValidationError,
    validateEnumValue,
    validateEnumValues,
    validateNumber,
} from '@model/Validable';
import WeaponFlags from './Flags';
import WeaponGroup from './Group';
import WeaponProficiency from './Proficiency';
import WeaponRank from './Rank';
import type { Weapon } from './Weapon';

function validateWeapon(weapon: any): asserts weapon is Weapon {
    if (!(weapon.damage instanceof DamageSpec)) {
        throw new ValidationError(weapon, 'Invalid damage');
    }
    DamageSpec.validate(weapon.damage);
    validateNumber(weapon.intrinsic);
    validateEnumValues(weapon.groups, WeaponGroup);
    validateEnumValue(weapon.rank, WeaponRank);
    validateEnumValue(weapon.proficiency, WeaponProficiency);
    validateEnumValues(weapon.flags, WeaponFlags);
    validateNumber(weapon.criticalRange);
    validateNumber(weapon.criticalMultiplier);
    Length.validate(weapon.range);
}

export { validateWeapon };
