import {
    validateEnumValue,
    validateEnumValues,
    validateNumber,
} from '@model/Validable';
import type { Armor } from './Armor';
import ArmorType from './Type';
import ArmorBonusType from './BonusType';
import ArmorFlags from './Flags';

function validateArmor(armor: any): asserts armor is Armor {
    validateEnumValue(armor.type, ArmorType);
    validateNumber(armor.acBonus);
    validateEnumValue(armor.bonusType, ArmorBonusType);
    validateNumber(armor.intrinsic);
    validateNumber(armor.maxDex);
    validateNumber(armor.acp);
    validateNumber(armor.asf);
    validateEnumValues(armor.flags, ArmorFlags);
}

export { validateArmor };
