import { ValidationError } from '@model/Validable';
import type { SpellList, SpellListEntry } from '.';
import { Spell } from '../Spell/Spell';

function ValidateSpellListEntry(
    entry: unknown,
): asserts entry is SpellListEntry {
    if (typeof entry !== 'object' || !entry) {
        throw new ValidationError(entry, `Invalid spell list entry: ${entry}`);
    }
    const spell = (entry as any).spell;
    let spellObject: Spell | undefined;
    if (typeof spell === 'string') {
        spellObject = Spell.load()[spell];
        if (!spellObject) {
            throw new ValidationError(entry, `Invalid spell key: ${spell}`);
        }
    } else if (spell instanceof Spell) {
        spellObject = spell;
    } else {
        throw new ValidationError(entry, `Invalid spell: ${spell}`);
    }
    const rank = (entry as any).rank;
    if (typeof rank === 'number') {
        spellObject.getRank(rank);
    } else {
        throw new ValidationError(entry, `Invalid rank: ${rank}`);
    }
}

function ValildateSpellListLevel(
    level: unknown,
): asserts level is SpellListEntry[] {
    if (!Array.isArray(level)) {
        throw new ValidationError(level, `Invalid spell list level: ${level}`);
    }
    level.forEach(ValidateSpellListEntry);
}

function ValidateSpellListContents(
    contents: unknown,
): asserts contents is SpellList {
    if (typeof contents !== 'object' || !contents) {
        throw new ValidationError(
            contents,
            `Invalid spell list levels: ${contents}`,
        );
    }
    const levels = Object.keys(contents);
    levels.forEach(level => {
        const levelNumber = parseInt(level);
        if (isNaN(levelNumber)) {
            throw new ValidationError(
                contents,
                `Invalid spell list level: ${level}`,
            );
        }
        if (levelNumber < 0) {
            throw new ValidationError(
                contents,
                `Invalid spell list level: ${level}`,
            );
        }
    });
    for (const level of levels) {
        ValildateSpellListLevel((contents as any)[level]);
    }
}

function ValidateSpellList(spellList: unknown): asserts spellList is SpellList {
    if (typeof spellList !== 'object' || !spellList) {
        throw new ValidationError(
            spellList,
            `Invalid spell list: ${spellList}`,
        );
    }
    const key = (spellList as any).key;
    if (typeof key !== 'string') {
        throw new ValidationError(spellList, `Invalid spell list key: ${key}`);
    }
    ValidateSpellListContents((spellList as any).spells);
}

export {
    ValidateSpellListEntry,
    ValildateSpellListLevel,
    ValidateSpellListContents,
    ValidateSpellList,
};
