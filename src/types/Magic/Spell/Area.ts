import { TFunction } from 'i18next';
import { Length } from '../../Units';
import { unreachable } from '@utils/debug';
import { ValidationError } from '@model/Validable';

type SpellSelf = {
    spellAreaType: 'self';
};

type SpellPoint = {
    spellAreaType: 'point';
};

type SpellCone = {
    spellAreaType: 'cone';
    radius: Length;
};

type SpellCube = {
    spellAreaType: 'cube';
    size: Length;
};

type SpellLine = {
    spellAreaType: 'line';
    length: Length;
};

type SpellSphere = {
    spellAreaType: 'sphere';
    radius: Length;
    selfCentered: boolean;
};

type SpellArea =
    | SpellSelf
    | SpellPoint
    | SpellCone
    | SpellCube
    | SpellLine
    | SpellSphere;

function stringify(value: SpellArea, t: TFunction<'translation'>): string {
    switch (value.spellAreaType) {
        case 'self':
            return t('magic.area.self');
        case 'point':
            return t('magic.area.point');
        case 'cone':
            return t('magic.area.cone', { radius: value.radius.toString(t) });
        case 'cube':
            return t('magic.area.cube', { size: value.size.toString(t) });
        case 'line':
            return t('magic.area.line', { length: value.length.toString(t) });
        case 'sphere': {
            const suffix = value.selfCentered ? 'self' : 'point';
            return t(`magic.area.sphere.${suffix}`, {
                radius: value.radius.toString(t),
            });
        }
        default: {
            return unreachable(value);
        }
    }
}

function tryParseArea(input: string): SpellArea | undefined {
    const matches = /^([a-z.]+)\s*(\(.*\))?$/.exec(input.toLowerCase());
    if (!matches) {
        return undefined;
    }
    const [, areaType, param] = matches;
    const length = Length.tryParseLength(param);
    switch (areaType) {
        case 'self':
            return { spellAreaType: 'self' };
        case 'point':
            return { spellAreaType: 'point' };
        case 'cone':
            return length
                ? { spellAreaType: 'cone', radius: length }
                : undefined;
        case 'cube':
            return length ? { spellAreaType: 'cube', size: length } : undefined;
        case 'line':
            return length ? { spellAreaType: 'line', length } : undefined;
        case 'sphere.point':
            return length
                ? {
                      spellAreaType: 'sphere',
                      radius: length,
                      selfCentered: false,
                  }
                : undefined;
        case 'sphere.self':
            return length
                ? {
                      spellAreaType: 'sphere',
                      radius: length,
                      selfCentered: true,
                  }
                : undefined;
        default:
            return undefined;
    }
}

const defaultArea = { spellAreaType: 'point' } as const;

function parseArea(
    input: string,
    defaultValue: SpellArea = defaultArea,
): SpellArea {
    return tryParseArea(input) ?? defaultValue;
}

function validate(value: unknown): asserts value is SpellArea {
    const spellAreaType = (value as SpellArea)?.spellAreaType;
    const { radius, size, length } = value as any;
    switch (spellAreaType) {
        case 'self':
        case 'point':
            return;
        case 'sphere':
        case 'cone':
            if (!radius) {
                throw new ValidationError(value, 'Missing radius');
            }
            if (!(radius instanceof Length)) {
                throw new ValidationError(value, 'Invalid radius');
            }
            radius.validate();
            return;
        case 'cube':
            if (!size) {
                throw new ValidationError(value, 'Missing size');
            }
            if (!(size instanceof Length)) {
                throw new ValidationError(value, 'Invalid size');
            }
            size.validate();
            return;
        case 'line':
            if (!length) {
                throw new ValidationError(value, 'Missing length');
            }
            if (!(length instanceof Length)) {
                throw new ValidationError(value, 'Invalid length');
            }
            length.validate();
            return;
        default:
            throw new ValidationError(value, 'Invalid spell area type');
    }
}

export type {
    SpellArea,
    SpellPoint,
    SpellCone,
    SpellCube,
    SpellLine,
    SpellSphere,
};
export { stringify, tryParseArea, parseArea, validate };
