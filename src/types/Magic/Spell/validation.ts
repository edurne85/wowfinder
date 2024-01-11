import { validateEnumValues } from '@model/Assets';
import { SpellBase } from './base';
import { SpellDescriptor } from './Descriptor';
import { SpellCoreComponent } from './Components';
import { validate as validateSpellArea } from './Area';
import { validate as validateSpellDuration } from './Duration';
import { SpellRange } from './Range';
import { ActionTime } from '../../Action/ActionTime';
import { SpellFlag } from './Flags';
import type { Spell } from './Spell';
import { validateSchool } from '../School';
import { SpellRank } from './Rank';

type SpellBaseValidableFields = 'castingTime' | 'range' | 'duration';

function validateDescriptors(spell: SpellBase): boolean {
    return validateEnumValues(spell.descriptors, SpellDescriptor);
}

function validateCastingTime(spell: SpellBase, optional = false): boolean {
    if (optional && !spell.castingTime) {
        return true;
    }
    return !!spell.castingTime && ActionTime.validate(spell.castingTime);
}

function validateComponents(spell: SpellBase): boolean {
    return validateEnumValues(spell.components, SpellCoreComponent);
}

function validateRange(spell: SpellBase, optional = false): boolean {
    if (optional && !spell.range) {
        return true;
    }
    return !!spell.range && SpellRange.validate(spell.range);
}

function validateArea(spell: SpellBase): boolean {
    return !spell.area || validateSpellArea(spell.area);
}

function validateDuration(spell: SpellBase, optional = false): boolean {
    return (
        (optional && !spell.duration) || validateSpellDuration(spell.duration)
    );
}

function validateFlags(spell: SpellBase): boolean {
    return validateEnumValues(spell.flags, SpellFlag);
}

function validateSpellBase(
    spell: SpellBase,
    optionalFields: Set<SpellBaseValidableFields> = new Set(),
): boolean {
    return (
        validateDescriptors(spell) &&
        validateCastingTime(spell, optionalFields.has('castingTime')) &&
        validateComponents(spell) &&
        validateRange(spell, optionalFields.has('range')) &&
        validateArea(spell) &&
        validateDuration(spell, optionalFields.has('duration')) &&
        validateFlags(spell)
    );
}

function validateSpell(spell: Spell): boolean {
    const parentDefined = new Set<SpellBaseValidableFields>();
    if (spell.castingTime) {
        if (validateCastingTime(spell)) {
            parentDefined.add('castingTime');
        } else {
            return false;
        }
    }
    if (spell.range) {
        if (validateRange(spell)) {
            parentDefined.add('range');
        } else {
            return false;
        }
    }
    if (spell.duration) {
        if (validateDuration(spell)) {
            parentDefined.add('duration');
        } else {
            return false;
        }
    }
    if (!validateSchool(spell.school, spell.subschool)) {
        return false;
    }
    if (!spell.ranks?.length) {
        return false;
    }
    return spell.ranks.every(
        rank =>
            rank instanceof SpellRank && validateSpellBase(rank, parentDefined),
    );
}

export { validateSpell };
