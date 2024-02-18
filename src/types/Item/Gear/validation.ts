import { ValidationError, validateEnumValue } from '@model/Validable';
import type { Gear } from './base';
import GearSlot, { Shape } from './Slot';
import Size from '@model/Character/Size';

function validateShape(shape: Shape): void {
    if (!Array.isArray(shape)) {
        throw new ValidationError(shape, 'Shape must be an array');
    }
    shape.forEach(entry => {
        if ('slot' in entry) {
            validateEnumValue(entry.slot, GearSlot);
        } else {
            throw new ValidationError(entry, 'Entry must have a slot');
        }
        if ('qtty' in entry) {
            if (Number.isNaN(entry.qtty) || entry.qtty < 0) {
                throw new ValidationError(
                    entry,
                    'Quantity must be a non-negative number',
                );
            }
        }
    });
}

function validateGear(g: Gear): void {
    validateShape(g.shape);
    validateEnumValue(g.size, Size);
}

export { validateGear };
