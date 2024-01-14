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
import { CompoundValidationError, ValidationError } from '@model/Validable';

type SpellBaseValidableFields = 'castingTime' | 'range' | 'duration';

function validateCastingTime(spell: SpellBase, optional = false): void {
    if (!spell.castingTime) {
        if (optional) {
            return;
        }
        throw new ValidationError(spell, 'Casting time is required');
    }
    ActionTime.validate(spell.castingTime as ActionTime);
}

function validateRange(spell: SpellBase, optional = false): void {
    if (!spell.range) {
        if (optional) {
            return;
        }
        throw new ValidationError(spell, 'Range is required');
    }
    SpellRange.validate(spell.range);
}

function validateDuration(spell: SpellBase, optional = false): void {
    if (!spell.duration) {
        if (optional) {
            return;
        }
        throw new ValidationError(spell, 'Duration is required');
    }
    validateSpellDuration(spell.duration);
}

function validateSpellBase(
    spell: SpellBase,
    optionalFields: Set<SpellBaseValidableFields> = new Set(),
): void {
    validateEnumValues(spell.descriptors, SpellDescriptor);
    validateCastingTime(spell, optionalFields.has('castingTime'));
    validateEnumValues(spell.components, SpellCoreComponent);
    validateRange(spell, optionalFields.has('range'));
    if (spell.area) {
        validateSpellArea(spell.area);
    }
    validateDuration(spell, optionalFields.has('duration'));
    validateEnumValues(spell.flags, SpellFlag);
}

function validateSpell(spell: Spell): void {
    try {
        const parentDefined = new Set<SpellBaseValidableFields>();
        if (spell.castingTime) {
            validateCastingTime(spell);
            parentDefined.add('castingTime');
        }
        if (spell.range) {
            validateRange(spell);
            parentDefined.add('range');
        }
        if (spell.duration) {
            validateDuration(spell);
            parentDefined.add('duration');
        }
        validateSchool(spell.school, spell.subschool);
        if (!spell.ranks?.length) {
            throw new ValidationError(
                spell,
                'Spell must have at least one rank',
            );
        }
        spell.ranks.forEach(rank => {
            if (!(rank instanceof SpellRank)) {
                throw new ValidationError(
                    rank,
                    'Spell rank must be a SpellRank',
                );
            }
            validateSpellBase(rank, parentDefined);
        });
    } catch (error) {
        throw new CompoundValidationError(
            spell,
            'Spell validation failed',
            error as Error,
        );
    }
}

export { validateSpell };
